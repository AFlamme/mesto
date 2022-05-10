const presets = [
    ['@babel/preset-env', { // используемый пресет
        targets: { // поддерживаемые версии браузеров
            edge: '17',
            ie: '11',
            firefox: '50',
            chrome: '64',
            safari: '11.1'
        },

        useBuiltIns: "entry"
    }]
];

module.exports = { presets };