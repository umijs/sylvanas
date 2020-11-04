import * as path from 'path';
import * as fs from 'fs-extra';

import ts2js from './ts2js';
import eslintJs from './eslintJs';
import prettierJS from './prettierJs';
import { FileEntity, BabelOption, Option, Action } from './typing';

function parse(fileList: FileEntity[], option: BabelOption = {}) {
  // Get js from ts
  const jsFiles = ts2js(fileList, option);

  // eslint
  const lintFiles = eslintJs(jsFiles);

  // prettier
  const prettierFiles = prettierJS(lintFiles);

  return prettierFiles;
}

function sylvanas(files: string[], option: Option) {
  const cwd = option.cwd || process.cwd();
  const outDir = option.outDir || cwd;
  const action: Action = option.action || 'none';

  const fileList: FileEntity[] = files.map(
    (file): FileEntity => {
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

  const parsedFileList = parse(fileList, option);

  if (action === 'write' || action === 'overwrite') {
    parsedFileList.forEach(({ sourceFilePath, targetFilePath, data }) => {
      fs.ensureFileSync(targetFilePath);
      fs.writeFileSync(targetFilePath, data);

      if (action === 'overwrite') {
        fs.unlinkSync(sourceFilePath);
      }
    });
  }

  return parsedFileList;
}

sylvanas.parseText = function parseText(text: string, option: BabelOption = {}): string {
  const result = parse(
    [
      {
        sourceFilePath: option.filename,
        data: text,
      },
    ],
    option,
  );

  return result[0].data;
};

export = sylvanas;
