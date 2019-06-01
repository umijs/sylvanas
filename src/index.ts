import * as path from 'path';
import ts2js from './ts2js';
import eslintJs from './eslintJs';

declare namespace sylvanas {
  interface Option {
    removeOriginFiles?: boolean;
    outDir: string;
    cwd?: string;
  }

  interface FileEntity {
    sourceFileName: string;
    targetFileName?: string;
    data: string;
  }
}

function sylvanas(files: string[], option: sylvanas.Option) {
  const { cwd = process.cwd() } = option;
  const fileList = files.map(file => path.resolve(cwd, file));

  // Get js from ts
  const jsFiles = ts2js(fileList);

  // eslint
  const lintFiles = eslintJs(jsFiles);

  console.log('~>', lintFiles);
}

export = sylvanas;
