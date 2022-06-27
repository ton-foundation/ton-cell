import BN from "bn.js";
import { BitString } from "../bits/BitString";
import { BitStringWriter } from "../bits/BitStringWriter";
import { Cell } from "./Cell";

export class Builder {
    private bits = new BitStringWriter();
    private refs: Cell[] = [];
    private ended = false;

    storeRef = (src: Cell) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.refs.push(src);
        return this;
    }

    storeBit = (value: boolean | number) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeBit(value);
        return this;
    }

    storeBits = (value: (boolean | number)[] | BitString) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeBits(value);
        return this;
    }

    storeUInt = (value: number | BN, bits: number) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeUInt(value, bits);
        return this;
    }

    storeInt = (value: number | BN, bits: number) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeInt(value, bits);
        return this;
    }

    storeBuffer = (buffer: Buffer) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeBuffer(buffer);
        return this;
    }

    storeVarUInt = (value: BN | number, headerBits: number) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeVarUInt(value, headerBits);
        return this;
    }

    storeCoins = (value: BN | number) => {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.bits.storeCoins(value);
        return this;
    }

    endCell() {
        if (this.ended) {
            throw Error('Already ended')
        }
        this.ended = true;

        // Prepare level and depth of ordinary cell
        let level = 0;
        let depth = 0;
        if (this.refs.length > 0) {
            for (let r of this.refs) {
                if (r.depth > depth) {
                    depth = r.depth;
                }
                if (r.level > level) {
                    level = r.level;
                }
            }
            depth = depth + 1;
        }

        return new Cell('ordinary', this.bits.endString(), this.refs, level, depth);
    }
}

export function beginCell() {
    return new Builder();
}