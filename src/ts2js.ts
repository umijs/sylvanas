import { transformFileSync } from '@babel/core';
import sylvanas from './index';

function ts2js(fileList: string[]): sylvanas.FileEntity[] {
  const jsFiles: sylvanas.FileEntity[] = fileList.map(
    (filePath): sylvanas.FileEntity => {
      const { code } = transformFileSync(filePath, {
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX: true,
            },
          ],
        ],
      });

      return {
        sourceFileName: filePath,
        data: code,
      };
    },
  );

  return jsFiles;
}

export default ts2js;
