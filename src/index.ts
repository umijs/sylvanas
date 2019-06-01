import * as path from 'path';
import ts2js from './ts2js';
import eslintJs from './eslintJs';
import prettierJS from './prettierJs';
import * as fs from 'fs';

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
  const fileList: sylvanas.FileEntity[] = files.map((file):sylvanas.FileEntity => {
    const filePath = path.resolve(cwd, file);
    return {
      sourceFileName: filePath,
      targetFileName: filePath.replace(/\.ts$/, '.js').replace(/\.tsx$/, '.jsx'),
      data: fs.readFileSync(filePath, 'utf8'),
    };
  });

  // Get js from ts
  const jsFiles = ts2js(fileList);

  // eslint
  const lintFiles = eslintJs(jsFiles);

  // prettier
  const prettierFiles = prettierJS(lintFiles);

  return prettierFiles;
}

export = sylvanas;
