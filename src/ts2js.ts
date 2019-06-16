import { transformSync } from '@babel/core';
import sylvanas from './index';
import decoratorPlugin from './babel-decorator-plugin';

function ts2js(
  fileList: sylvanas.FileEntity[],
  option: sylvanas.BabelOption = {},
): sylvanas.FileEntity[] {
  const jsFiles: sylvanas.FileEntity[] = fileList.map(
    (entity): sylvanas.FileEntity => {
      const { code } = transformSync(entity.data, {
        plugins: [
          [
            decoratorPlugin,
            {
              decoratorsBeforeExport: !!option.decoratorsBeforeExport,
            },
          ],
          [
            require.resolve('@babel/plugin-syntax-dynamic-import'),
          ],
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
