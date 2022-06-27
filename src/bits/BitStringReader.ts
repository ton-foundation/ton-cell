import BN from "bn.js";
import { BitString } from "./BitString";

export class BitStringReader {
    #source: BitString;
    #offset: number;

    constructor(source: BitString) {
        this.#source = source;
        this.#offset = 0;
    }

    loadBit = () => {
        if (this.#offset >= this.#source.length) {
            throw Error('Out of range');
        }
        let offset = this.#offset;
        this.#offset++;
        return this.#source.at(offset);
    }

    skip = (count: number) => {
        for (let i = 0; i < count; i++) {
            this.loadBit();
        }
    }

    loadBigUInt = (bits: number) => {
        if (bits == 0) {
            return new BN(0);
        }

        let res = '';
        for (let i = 0; i < bits; i++) {
            res += this.loadBit() ? '1' : '0';
        }
        return new BN(res, 2);
    }

    loadUInt = (bits: number) => {
        return this.loadBigUInt(bits).toNumber();
    }

    loadBigInt = (bits: number) => {
        if (bits === 0) {
            return new BN(0);
        }
        if (bits === 1) {
            if (this.loadBit() /* isNegative */) {
                return new BN(-1);
            } else {
                return new BN(0);
            }
        }

        if (this.loadBit() /* isNegative */) {
            let base = this.loadBigUInt(bits - 1);
            const b = new BN(2);
            const nb = b.pow(new BN(bits - 1));
            return base.sub(nb);
        } else {
            return this.loadBigUInt(bits - 1);
        }
    }

    loadInt = (bits: number) => {
        return this.loadBigInt(bits).toNumber();
    }

    loadBuffer(size: number) {
        let res: number[] = [];
        for (let i = 0; i < size; i++) {
            res.push(this.loadUInt(8));
        }
        return Buffer.from(res);
    }

    loadVarUint = (headerBits: number) => {
        let bytes = this.loadUInt(headerBits);
        if (bytes === 0) {
            return new BN(0);
        }
        return new BN(this.loadBuffer(bytes).toString('hex'), 'hex');
    }

    loadCoins = () => {
        return this.loadVarUint(4);
    }

    end = () => {
        if (this.#offset < this.#source.length) {
            throw Error('Not at end');
        }
    }
}