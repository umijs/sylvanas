import { transformSync } from '@babel/core';
import sylvanas from './index';

function ts2js(fileList: sylvanas.FileEntity[]): sylvanas.FileEntity[] {
  const jsFiles: sylvanas.FileEntity[] = fileList.map(
    (entity): sylvanas.FileEntity => {
      const { code } = transformSync(entity.data, {
        plugins: [
          [
            require.resolve('@babel/plugin-transform-typescript'),
            {
              isTSX: true,
            },
          ],
        ],
      });

      return {
        ...entity,
        data: code,
      };
    },
  );

  return jsFiles;
}

export default ts2js;
