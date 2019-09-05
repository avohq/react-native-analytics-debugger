const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /avo-react-native-debugger\/node_modules\/react-native\/Libraries\/.*/,
            /avo-react-native-debugger\/node_modules\/react-native\/react-native-git-upgrade\/.*/,
            /avo-react-native-debugger\/node_modules\/react-native\/react-native-cli\/.*/,
            /avo-react-native-debugger\/node_modules\/react-native\/package.json/,
        ])
    },
};