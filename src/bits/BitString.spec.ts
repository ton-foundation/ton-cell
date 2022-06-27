import { BN } from "bn.js";
import { BitStringReader } from "./BitStringReader";
import { BitStringWriter } from "./BitStringWriter";

describe('BitString', () => {
    it('should pass case #1', () => {
        // () do_1() method_id {
        //     set_data(begin_cell()
        //         .store_uint(1, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(1, 32)
            .endString();
        expect(str.toString()).toEqual('00000001');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(32);
        reader.end();
        expect(v).toEqual(1);
    });
    it('should pass case #2', () => {
        // () do_2() method_id {
        //     set_data(begin_cell()
        //         .store_uint(233, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(233, 32)
            .endString();
        expect(str.toString()).toEqual('000000E9');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(32);
        reader.end();
        expect(v).toEqual(233);
    });
    it('should pass case #3', () => {
        // () do_3() method_id {
        //     set_data(begin_cell()
        //         .store_uint(1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(1231233123, 32)
            .endString();
        expect(str.toString()).toEqual('49632063');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(32);
        reader.end();
        expect(v).toEqual(1231233123);
    });
    it('should pass case #4', () => {
        // () do_4() method_id {
        //     set_data(begin_cell()
        //         .store_uint(3231, 12)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(3231, 12)
            .endString();
        expect(str.toString()).toEqual('C9F');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(12);
        reader.end();
        expect(v).toEqual(3231);
    });
    it('should pass case #5', () => {
        // () do_5() method_id {
        //     set_data(begin_cell()
        //         .store_uint(4095, 12)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(4095, 12)
            .endString();
        expect(str.toString()).toEqual('FFF');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(12);
        reader.end();
        expect(v).toEqual(4095);
    });
    it('should pass case #6', () => {
        // () do_6() method_id {
        //     set_data(begin_cell()
        //         .store_uint(4095, 15)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(4095, 15)
            .endString();
        expect(str.toString()).toEqual('1FFF_');
        let reader = new BitStringReader(str);
        let v = reader.loadUInt(15);
        reader.end();
        expect(v).toEqual(4095);
    });
    it('should pass case #7', () => {
        // () do_7() method_id {
        //     set_data(begin_cell()
        //         .store_uint(21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(new BN('21312398126389717239612938712983712387612937123'), 255)
            .endString();
        expect(str.toString()).toEqual('00000000000000000000000007775CAA000F4689FB1A1B724E3591F0C2641747_');
        let reader = new BitStringReader(str);
        let v = reader.loadBigUInt(255);
        reader.end();
        expect(v.eq(new BN('21312398126389717239612938712983712387612937123'))).toEqual(true);
    });

    it('should pass case #8', () => {
        // () do_8() method_id {
        //     set_data(begin_cell()
        //         .store_int(1, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(1, 32)
            .endString();
        expect(str.toString()).toEqual('00000001');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(32);
        reader.end();
        expect(v).toEqual(1);
    });
    it('should pass case #9', () => {
        // () do_9() method_id {
        //     set_data(begin_cell()
        //         .store_int(233, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(233, 32)
            .endString();
        expect(str.toString()).toEqual('000000E9');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(32);
        reader.end();
        expect(v).toEqual(233);
    });
    it('should pass case #10', () => {
        // () do_10() method_id {
        //     set_data(begin_cell()
        //         .store_int(1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(1231233123, 32)
            .endString();
        expect(str.toString()).toEqual('49632063');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(32);
        reader.end();
        expect(v).toEqual(1231233123);
    });
    it('should pass case #11', () => {
        // () do_11() method_id {
        //     set_data(begin_cell()
        //         .store_int(3231, 13)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(3231, 13)
            .endString();
        expect(str.toString()).toEqual('64FC_');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(13);
        reader.end();
        expect(v).toEqual(3231);
    });
    it('should pass case #12', () => {
        // () do_12() method_id {
        //     set_data(begin_cell()
        //         .store_int(4095, 13)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(4095, 13)
            .endString();
        expect(str.toString()).toEqual('7FFC_');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(13);
        reader.end();
        expect(v).toEqual(4095);
    });
    it('should pass case #13', () => {
        // () do_13() method_id {
        //     set_data(begin_cell()
        //         .store_int(4095, 17)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeUInt(4095, 17)
            .endString();
        expect(str.toString()).toEqual('07FFC_');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(17);
        reader.end();
        expect(v).toEqual(4095);
    });
    it('should pass case #14', () => {
        // () do_14() method_id {
        //     set_data(begin_cell()
        //         .store_int(21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(new BN('21312398126389717239612938712983712387612937123'), 255)
            .endString();
        expect(str.toString()).toEqual('00000000000000000000000007775CAA000F4689FB1A1B724E3591F0C2641747_');
        let reader = new BitStringReader(str);
        let v = reader.loadBigInt(255);
        reader.end();
        expect(v.eq(new BN('21312398126389717239612938712983712387612937123'))).toEqual(true);
    });
    it('should pass case #15', () => {
        // () do_15() method_id {
        //     set_data(begin_cell()
        //         .store_int(-21312398126389717239612938712983712387612937123, 255)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(new BN('-21312398126389717239612938712983712387612937123'), 255)
            .endString();
        expect(str.toString()).toEqual('FFFFFFFFFFFFFFFFFFFFFFFFF888A355FFF0B97604E5E48DB1CA6E0F3D9BE8BB_');
        let reader = new BitStringReader(str);
        let v = reader.loadBigInt(255);
        reader.end();
        expect(v.eq(new BN('21312398126389717239612938712983712387612937123').muln(-1))).toEqual(true);
    });
    it('should pass case #16', () => {
        // () do_16() method_id {
        //     set_data(begin_cell()
        //         .store_int(-1, 1)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(-1, 1)
            .endString();
        expect(str.toString()).toEqual('C_');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(1);
        reader.end();
        expect(v).toEqual(-1);
    });
    it('should pass case #17', () => {
        // () do_17() method_id {
        //     set_data(begin_cell()
        //         .store_int(-1231233123, 32)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeInt(-1231233123, 32)
            .endString();
        expect(str.toString()).toEqual('B69CDF9D');
        let reader = new BitStringReader(str);
        let v = reader.loadInt(32);
        reader.end();
        expect(v).toEqual(-1231233123);
    });
    it('should pass case #18', () => {
        // () do_18() method_id {
        //     set_data(begin_cell()
        //         .store_grams(0)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeCoins(0)
            .endString();
        expect(str.toString()).toEqual('0');
        let reader = new BitStringReader(str);
        let v = reader.loadCoins();
        reader.end();
        expect(v.eq(new BN(0))).toEqual(true);
    });
    it('should pass case #19', () => {
        // () do_19() method_id {
        //     set_data(begin_cell()
        //         .store_grams(1)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeCoins(1)
            .endString();
        expect(str.toString()).toEqual('101');
        let reader = new BitStringReader(str);
        let v = reader.loadCoins();
        reader.end();
        expect(v.eq(new BN(1))).toEqual(true);
    });
    it('should pass case #20', () => {
        // () do_20() method_id {
        //     set_data(begin_cell()
        //         .store_grams(10000000)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeCoins(new BN('10000000'))
            .endString();
        expect(str.toString()).toEqual('3989680');
        let reader = new BitStringReader(str);
        let v = reader.loadCoins();
        reader.end();
        expect(v.eq(new BN('10000000'))).toEqual(true);
    });
    it('should pass case #21', () => {
        // () do_21() method_id {
        //     set_data(begin_cell()
        //         .store_grams(1000000012312321312455123451)
        //         .end_cell()
        //     );
        // }
        let str = new BitStringWriter()
            .storeCoins(new BN('1000000012312321312455123451'))
            .endString();
        expect(str.toString()).toEqual('C033B2E3D4AAEA73CF55BE1FB');
        let reader = new BitStringReader(str);
        let v = reader.loadCoins();
        reader.end();
        expect(v.eq(new BN('1000000012312321312455123451'))).toEqual(true);
    });
});