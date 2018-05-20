import fs from 'fs';
import path from 'path';
import test from 'ava';
import rearrange from '../rearrange';

const files = fs.readdirSync(__dirname);
files.forEach(file => {
    if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
        const codePath = path.join(__dirname, file, '_code.js');
        const resultPath = path.join(__dirname, file, '_result.js');
        if (fs.existsSync(codePath) && fs.existsSync(resultPath)) {
            const code = fs.readFileSync(codePath, 'utf8');
            const result = fs.readFileSync(resultPath, 'utf8');
            test('it should rearrange the code based on order of use', t => {
                t.is(result, rearrange(code), `${file} test passed`);
            });
        }
    } 
});