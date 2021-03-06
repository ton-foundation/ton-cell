import fs from 'fs';
import { Cell } from 'ton';
import * as compiler from 'ton-compiler';
import { getSelectorForMethod, runTVM } from 'ton-contract-executor';

(async () => {
    console.log('Compiling....');
    let code = fs.readFileSync(__dirname + '/generate.fc', 'utf-8');
    let fift = await compiler.compileFunc(code);
    let bin = await compiler.compileFift(fift);
    fs.writeFileSync(__dirname + '/generate.fif', fift);

    async function runDebug(name: string) {
        let r = await runTVM({
            code: bin.toString('base64'),
            data: bin.toString('base64'),
            debug: false,
            function_selector: getSelectorForMethod(name),
            init_stack: [],
            c7_register: { type: 'tuple', value: [] }
        });
        if (!r.ok) {
            throw Error('Error processing data');
        }
        return r.data_cell;
    }

    console.log('Runnging generator...');
    for (let i = 0; i < 21; i++) {
        console.log('Case ' + (i + 1));
        let res = await runDebug('do_' + (i + 1));
        let hash = Cell.fromBoc(Buffer.from(res, 'base64'))[0].hash();
        console.log('Output: ' + res);
        console.log('Hash: ' + hash.toString('base64'));
    }
})();