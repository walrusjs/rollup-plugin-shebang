import { join } from 'path';
import { rollup, RollupWarning } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

import shebang from '../src';

// type WarningParam = string | RollupWarning // Rollup@1
type WarningParam = RollupWarning // Rollup@2

const getWarningCode = (warning: WarningParam) =>
  typeof warning === 'string' ? warning : warning.code;

const fixtures = join(__dirname, './fixtures');

describe('build js', () => {
  const cwd = join(fixtures, 'basic-js');

  it('preserves shebang in output file', async () => {
    const bundle = await rollup({
      input: join(cwd, 'cli.js'),
      plugins: [
        shebang()
      ],
    });
  
    const output = await bundle.generate({ format: 'cjs' });
    expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
  });
  
  it('supports sourcemaps', async () => {
    let sourcemapOk = true;
  
    const bundle = await rollup({
      input: join(cwd, 'cli.js'),
      plugins: [
        shebang(),
        typescript()
      ],
      onwarn: (warning, deafultHandler) => {
        sourcemapOk = sourcemapOk && getWarningCode(warning) !== 'SOURCEMAP_BROKEN';
        deafultHandler(warning);
      },
    });
  
    const output = await bundle.write({
      format: 'cjs',
      sourcemap: true,
      dir: join(cwd, 'dist')
    });
    expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
    expect(sourcemapOk).toBe(true);
  });
});

describe('build ts', () => {
  const cwd = join(fixtures, 'basic-ts');

  it('preserves shebang in output file', async () => {
    const bundle = await rollup({
      input: join(cwd, 'cli.ts'),
      plugins: [
        shebang(),
        typescript()
      ],
    });
  
    const output = await bundle.generate({ format: 'cjs' });
    expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
  });
  
  it('supports sourcemaps', async () => {
    let sourcemapOk = true;
  
    const bundle = await rollup({
      input: join(cwd, 'cli.ts'),
      plugins: [
        shebang()
      ],
      onwarn: (warning, deafultHandler) => {
        sourcemapOk = sourcemapOk && getWarningCode(warning) !== 'SOURCEMAP_BROKEN';
        deafultHandler(warning);
      },
    });
  
    const output = await bundle.write({
      format: 'cjs',
      sourcemap: true,
      dir: join(cwd, 'dist')
    });
    expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
    expect(sourcemapOk).toBe(true);
  });
})