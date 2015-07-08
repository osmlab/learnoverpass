var wp = require('webpack');

module.exports = {
    entry: {
        docs:     "./themes/src/scripts/docs.js",
        exercise: "./themes/src/scripts/exercise.js",
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [
        new wp.optimize.CommonsChunkPlugin("vendor.bundle.js")
    ],
};
