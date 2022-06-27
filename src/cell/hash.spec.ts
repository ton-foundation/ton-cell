import { beginCell } from "./Builder";

describe('hash', () => {
    it('should calculate hash', () => {
        let cell = beginCell()
            .storeUInt(123, 32)
            .endCell();
        console.warn(cell.toString());
    });
});