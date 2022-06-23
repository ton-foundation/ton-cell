export class Cell {
    readonly bits: BitString;
    readonly refs: Cell[] = [];
    readonly kind: CellType;
}