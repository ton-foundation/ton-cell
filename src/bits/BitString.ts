import { BitStringWriter } from "./BitStringWriter";
import inspectSymbol from 'symbol.inspect';

export class BitString {

    #buffer: Buffer;
    #length: number;

    constructor(buffer: Buffer, length: number) {
        let bytes = Math.ceil(length / 8);
        this.#buffer = Buffer.from(buffer, 0, bytes);
        this.#length = length;
        Object.freeze(this);
    }

    get length() {
        return this.#length;
    }

    at(index: number) {
        if (index < 0 || index > this.#length) {
            throw Error('Out of range');
        }
        return (this.#buffer[(index / 8) | 0] & (1 << (7 - (index % 8)))) > 0;
    }

    equals(src: BitString) {
        if (src.#length !== this.#length) {
            return false;
        }
        for (let i = 0; i < this.#length; i++) {
            if (this.at(i) !== src.at(i)) {
                return false;
            }
        }
        return true;
    }

    //
    // Debugging and inspections
    //

    [inspectSymbol] = () => this.toString()

    toString = (): string => {
        if (this.#length % 4 === 0) {
            const s = this.#buffer.subarray(0, Math.ceil(this.#length / 8)).toString('hex').toUpperCase();
            if (this.#length % 8 === 0) {
                return s;
            } else {
                return s.slice(0, s.length - 1);
            }
        } else {
            // Pad string
            const tmp = new BitStringWriter();
            tmp.storeBits(this);
            tmp.storeBit(1);
            while (tmp.offset % 4 !== 0) {
                tmp.storeBit(0);
            }
            const hex = tmp.endString().toString();
            return hex + '_';
        }
    }

    toBinaryString = (): string => {
        let res = '';
        for (let i = 0; i < this.#length; i++) {
            if (this.at(i)) {
                res = res + '1';
            } else {
                res = res + '0';
            }
        }
        return res;
    }
}