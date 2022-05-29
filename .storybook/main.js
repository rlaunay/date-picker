const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "storybook-addon-sass-postcss"
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                    },
                },
                require.resolve('sass-loader')
            ]
        },
    );
    return config;
  },
}