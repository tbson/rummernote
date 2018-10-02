module.exports = function(api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                modules: 'umd'
            }
        ],
        '@babel/preset-react',
        '@babel/preset-flow'
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-regenerator',
        [
            '@babel/transform-runtime',
            {
                corejs: 2
            }
        ]
    ];
    return {
        presets,
        plugins
    };
};
