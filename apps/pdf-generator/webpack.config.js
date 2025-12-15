const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/pdf-generator'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',

      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
      assets: [
        './src/assets',
        {
          glob: '**/*',
          input: 'apps/pdf-generator/src/app/templates',
          output: './templates',
        },
      ],
    }),
  ],
};
