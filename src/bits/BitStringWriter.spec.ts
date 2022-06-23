import { BN } from "bn.js";
import { BitStringWriter } from "./BitStringWriter";

describe('BitStringWriter', () => {
    it('should pass case #1', () => {
        // () do_1() method_id {
        //     set_data(begin_cell()
        //         .store_uint(1, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(1, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('00000001');
    });
    it('should pass case #2', () => {
        // () do_2() method_id {
        //     set_data(begin_cell()
        //         .store_uint(233, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(233, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('000000E9');
    });
    it('should pass case #3', () => {
        // () do_3() method_id {
        //     set_data(begin_cell()
        //         .store_uint(1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(1231233123, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('49632063');
    });
    it('should pass case #4', () => {
        // () do_4() method_id {
        //     set_data(begin_cell()
        //         .store_uint(3231, 12)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(3231, 12);
        let str = writer.endString();
        expect(str.toString()).toEqual('C9F');
    });
    it('should pass case #5', () => {
        // () do_5() method_id {
        //     set_data(begin_cell()
        //         .store_uint(4095, 12)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(4095, 12);
        let str = writer.endString();
        expect(str.toString()).toEqual('FFF');
    });
    it('should pass case #6', () => {
        // () do_6() method_id {
        //     set_data(begin_cell()
        //         .store_uint(4095, 15)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(4095, 15);
        let str = writer.endString();
        expect(str.toString()).toEqual('1FFF_');
    });
    it('should pass case #7', () => {
        // () do_7() method_id {
        //     set_data(begin_cell()
        //         .store_uint(21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(new BN('21312398126389717239612938712983712387612937123'), 255);
        let str = writer.endString();
        expect(str.toString()).toEqual('00000000000000000000000007775CAA000F4689FB1A1B724E3591F0C2641747_');
    });

    it('should pass case #8', () => {
        // () do_8() method_id {
        //     set_data(begin_cell()
        //         .store_int(1, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(1, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('00000001');
    });
    it('should pass case #9', () => {
        // () do_9() method_id {
        //     set_data(begin_cell()
        //         .store_int(233, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(233, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('000000E9');
    });
    it('should pass case #10', () => {
        // () do_10() method_id {
        //     set_data(begin_cell()
        //         .store_int(1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(1231233123, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('49632063');
    });
    it('should pass case #11', () => {
        // () do_11() method_id {
        //     set_data(begin_cell()
        //         .store_int(3231, 13)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(3231, 13);
        let str = writer.endString();
        expect(str.toString()).toEqual('64FC_');
    });
    it('should pass case #12', () => {
        // () do_12() method_id {
        //     set_data(begin_cell()
        //         .store_int(4095, 13)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(4095, 13);
        let str = writer.endString();
        expect(str.toString()).toEqual('7FFC_');
    });
    it('should pass case #13', () => {
        // () do_13() method_id {
        //     set_data(begin_cell()
        //         .store_int(4095, 17)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeUInt(4095, 17);
        let str = writer.endString();
        expect(str.toString()).toEqual('07FFC_');
    });
    it('should pass case #14', () => {
        // () do_14() method_id {
        //     set_data(begin_cell()
        //         .store_int(21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(new BN('21312398126389717239612938712983712387612937123'), 255);
        let str = writer.endString();
        expect(str.toString()).toEqual('00000000000000000000000007775CAA000F4689FB1A1B724E3591F0C2641747_');
    });
    it('should pass case #15', () => {
        // () do_15() method_id {
        //     set_data(begin_cell()
        //         .store_int(-21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(new BN('-21312398126389717239612938712983712387612937123'), 255);
        let str = writer.endString();
        expect(str.toString()).toEqual('FFFFFFFFFFFFFFFFFFFFFFFFF888A355FFF0B97604E5E48DB1CA6E0F3D9BE8BB_');
    });
    it('should pass case #16', () => {
        // () do_16() method_id {
        //     set_data(begin_cell()
        //         .store_int(-1, 1)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(-1, 1);
        let str = writer.endString();
        expect(str.toString()).toEqual('C_');
    });
    it('should pass case #17', () => {
        // () do_17() method_id {
        //     set_data(begin_cell()
        //         .store_int(-1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let writer = new BitStringWriter();
        writer.storeInt(-1231233123, 32);
        let str = writer.endString();
        expect(str.toString()).toEqual('B69CDF9D');
    });
});