const { i18n } = require('./next-i18next.config');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  // Включать при критах, отключает проверку типов при прод билде
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['rupor-ui-kit', 'rupor-common'],
  output: 'standalone',
  i18n,
  images: {
    domains: [
      'imgproxy.rupor-test.rutube.dev',
      'imgproxy.rupor-dev.rutube.dev',
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };
    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          async: false,
          typescript: {
            diagnosticOptions: {
              semantic: true,
              syntactic: true
            }
          },
        })
    )
    return config;
  },
};
