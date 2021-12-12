const path = require('path');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    domains: ['itbook.store'],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
};
