import { BitString } from "../bits/BitString";
import { BitStringReader } from "../bits/BitStringReader";
import { BitStringWriter } from "../bits/BitStringWriter";
import { CellType } from "./CellType";
import { sha256_sync } from 'ton-crypto';
import inspectSymbol from 'symbol.inspect';

export class Cell {

    readonly bits: BitString;
    readonly refs: Cell[];
    readonly kind: CellType;
    readonly depth: number;
    readonly level: number;
    readonly #cache: {
        id?: string,
        hash?: Buffer
    } = {};

    constructor(kind: CellType, bits: BitString, refs: Cell[], level: number, depth: number) {

        // Configure
        this.kind = kind;
        this.bits = bits;
        this.refs = refs;
        this.depth = depth;
        this.level = level;

        // Feeze everything
        Object.freeze(this);
    }

    get hash(): Buffer {
        if (this.#cache.hash) {
            return this.#cache.hash;
        }
        let r = sha256_sync(getRepr(this));
        this.#cache.hash = r;
        return r;
    }

    get id(): string {
        if (this.#cache.id) {
            return this.#cache.id;
        }
        let r = this.hash.toString('hex');
        this.#cache.id = r;
        return r;
    }

    [inspectSymbol] = () => this.toString()

    toString(indent?: string): string {
        let id = indent || '';
        let s = id + 'x{' + this.bits.toString() + '}\n';
        for (let k in this.refs) {
            const i = this.refs[k];
            s += i.toString(id + ' ');
        }
        return s;
    }
}

function paddedBitSring(bits: BitString): Buffer {

    // Create padded bitstring
    let bts = bits;
    let tu = Math.ceil(bits.length / 8) * 8 - bits.length;
    if (tu > 0) {
        tu = tu - 1;
        const ret = new BitStringWriter();
        ret.storeBits(bits);
        ret.storeBit(true);
        while (tu > 0) {
            tu = tu - 1;
            ret.storeBit(false);
        }
        bts = ret.endString();
    }

    return new BitStringReader(bts).loadBuffer(bts.length / 8);
}

function getD1(cell: Cell) {
    return cell.refs.length + (cell.kind !== 'ordinary' ? 1 : 0) * 8 + cell.level * 32;
}

function getD2(cell: Cell) {
    return Math.ceil(cell.bits.length / 8) + Math.floor(cell.bits.length / 8)
}

function depthToBuffer(depth: number) {
    return Buffer.from([Math.floor(depth / 256), depth % 256]);
}

function getRepr(cell: Cell) {
    const reprArray: Buffer[] = [];

    // Cell Data
    reprArray.push(Buffer.from([getD1(cell)]));
    reprArray.push(Buffer.from([getD2(cell)]));
    reprArray.push(paddedBitSring(cell.bits));

    // References
    for (let k in cell.refs) {
        const i = cell.refs[k];
        reprArray.push(depthToBuffer(i.depth));
    }
    for (let k in cell.refs) {
        const i = cell.refs[k];
        reprArray.push(i.hash);
    }

    // Combine
    let x = Buffer.alloc(0);
    for (let k in reprArray) {
        const i = reprArray[k];
        x = Buffer.concat([x, i]);
    }
    return x;
}