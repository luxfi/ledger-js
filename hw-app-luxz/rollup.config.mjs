/*
 * @Author: Jason
 * @Description:
 */
/*
 * @Author: Jason
 * @Description:
 */
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
//import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: process.env.BUILD === 'production' ? false : true,
        exports: 'named',
    },
    plugins: [
        del({ targets: 'dist/*' }),
        typescript({
            //typescript: ttypescript,
            tsconfig: 'tsconfig.json',
            tsconfigOverride: {
                exclude: ['./test/**'],
                compilerOptions: {
                    rootDir: './src',
                    declarationDir: './dist', // Ensure this is set to match your tsconfig
                },
            },
        }),
        json(),
        commonjs(),
    ],
    external: [
        'luxnet',
        'luxnet/dist/utils',
        'luxnet/dist',
        'ethers',
        'web3',
        'url',
        'events',
        '@openzeppelin/contracts/build/contracts/ERC20.json',
        'xss',
        'bs58',
        '@ledgerhq/hw-app-eth',
    ],
};

