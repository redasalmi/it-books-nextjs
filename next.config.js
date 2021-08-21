const path = require('path');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    domains: ['itbook.store'],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /dataUri/, // foo.svg?dataUri
          type: 'asset/inline',
          generator: {
            dataUrl: (content) => {
              content = content.toString();
              return svgToMiniDataURI(content);
            },
          },
        },
        {
          resourceQuery: /component/, // foo.svg?component
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
        },
      ],
    });

    return config;
  },
};
