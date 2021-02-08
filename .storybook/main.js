const path = require('path');

module.exports = {
    stories: [
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-actions",
        '@storybook/addon-controls',
        'storybook-dark-mode/register'
    ],
    webpackFinal: async config => {

        const nextConfig = require('../next.config.js');

        config.node = {
            fs: 'empty'
        };

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [{
                    loader: require.resolve('awesome-typescript-loader'),
                    options: {
                        configFileName: path.resolve(__dirname, '../tsconfig.json')
                    }
                },
                // Optional
                {
                    loader: require.resolve('react-docgen-typescript-loader'),
                    options: {
                        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),

                    }
                },
            ],
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
};