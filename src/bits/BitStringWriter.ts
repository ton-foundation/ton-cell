import BN from "bn.js";
import { BitString } from "./BitString";

export class BitStringWriter {

    #target: Buffer;
    #length: number;
    #offset: number;
    #ended = false;

    constructor(maxLength: number = 1023 /* TON Default */) {
        this.#target = Buffer.alloc(Math.ceil(maxLength / 8), 0);
        this.#length = maxLength;
        this.#offset = 0;
    }

    get length() {
        return this.#length;
    }

    get offset() {
        return this.#offset;
    }

    storeBit = (value: number | boolean) => {
        if (this.#ended) {
            throw Error('Writer already closed');
        }
        if (this.#offset >= this.#length) {
            throw Error('Out of range');
        }
        let offset = this.#offset;
        this.#offset++;
        if (value === 0 || value === false) {
            // Set bit to ZERO
            this.#target[(offset / 8) | 0] &= ~(1 << (7 - (offset % 8)));
        } else {
            // Set bit to ONE
            this.#target[(offset / 8) | 0] |= 1 << (7 - (offset % 8));
        }
    }

    storeBits = (value: (boolean | number)[] | BitString) => {
        if (Array.isArray(value)) {
            for (let v of value) {
                this.storeBit(v);
            }
        } else {
            for (let i = 0; i < value.length; i++) {
                this.storeBit(value.at(i));
            }
        }
    }

    storeUInt = (value: number | BN, bits: number) => {
        let v = new BN(value);
        if (v.ltn(0)) {
            throw Error('Unable to store negative value as uint');
        }
        if (bits == 0 || (value.toString(2).length > bits)) {
            if (v.isZero()) {
                return;
            }
            throw Error(`bits is too small for a value ${v.toString()}. Got ${bits}, expected >= ${value.toString(2).length}`);
        }
        const s = v.toString(2, bits);
        for (let i = 0; i < bits; i++) {
            this.storeBit(s[i] === '1');
        }
    }

    storeInt = (value: number | BN, bits: number) => {
        let v = new BN(value);
        if (bits == 1) {
            if (v.eq(new BN(-1))) {
                this.storeBit(true);
                return;
            }
            if (v.isZero()) {
                this.storeBit(false);
                return;
            }
            throw Error(`bits is too small for a value ${v}`);
        } else {
            if (v.isNeg()) {
                this.storeBit(true);
                const b = new BN(2);
                const nb = b.pow(new BN(bits - 1));
                this.storeUInt(nb.add(v), bits - 1);
            } else {
                this.storeBit(false);
                this.storeUInt(v, bits - 1);
            }
        }
    }

    storeBuffer = (buffer: Buffer) => {
        for (let i = 0; i < buffer.length; i++) {
            this.storeUInt(buffer[i], 8);
        }
    }

    storeVarUInt = (value: BN | number, headerBits: number) => {
        let v = new BN(value);
        if (v.eq(new BN(0))) {
            this.storeUInt(0, headerBits);
        } else {
            let h = v.toString('hex');
            while (h.length % 2 !== 0) {
                h = '0' + h;
            }
            const l = Math.ceil((h.length) / 2);
            this.storeUInt(l, headerBits);
            this.storeBuffer(Buffer.from(h, 'hex'));
        }
    }

    storeCoins = (value: BN | number) => {
        this.storeVarUInt(value, 4);
    }

    endString = () => {
        if (this.#ended) {
            throw Error('Writer already ended');
        }
        return new BitString(this.#target, this.#offset);
    }
}