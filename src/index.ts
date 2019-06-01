import * as path from 'path';
import ts2js from './ts2js';
import eslintJs from './eslintJs';
import prettierJS from './prettierJs';
import * as fs from 'fs-extra';

declare namespace sylvanas {
  type Action = 'none' | 'write' | 'overwrite';
  interface Option {
    outDir?: string;
    cwd?: string;
    action?: Action;
  }

  interface FileEntity {
    sourceFilePath: string;
    targetFilePath?: string;
    data: string;
  }
}

function sylvanas(files: string[], option: sylvanas.Option) {
  const cwd = option.cwd || process.cwd();
  const outDir = option.outDir || cwd;
  const action: sylvanas.Action = option.action || 'none';

  const fileList: sylvanas.FileEntity[] = files.map(
    (file): sylvanas.FileEntity => {
      const filePath = path.resolve(cwd, file);
      const targetFilePath = path.resolve(
        outDir,
        file.replace(/\.ts$/, '.js').replace(/\.tsx$/, '.jsx'),
      );

      return {
        sourceFilePath: filePath,
        targetFilePath,
        data: fs.readFileSync(filePath, 'utf8'),
      };
    },
  );

  // Get js from ts
  const jsFiles = ts2js(fileList);

  // eslint
  const lintFiles = eslintJs(jsFiles);

  // prettier
  const prettierFiles = prettierJS(lintFiles);

  if (action === 'write' || action === 'overwrite') {
    prettierFiles.forEach(({ sourceFilePath, targetFilePath, data }) => {
      fs.ensureFileSync(targetFilePath);
      fs.writeFileSync(targetFilePath, data);

      if (action === 'overwrite') {
        fs.unlinkSync(sourceFilePath);
      }
    });
  }

  return prettierFiles;
}

export = sylvanas;
