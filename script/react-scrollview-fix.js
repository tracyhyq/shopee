/*
 * @description: 临时方案修复 react-native-spring-scrollview bug
 * @author: tracyqiu
 * @LastEditors: tracyqiu
 * @LastEditTime: 2020-03-18 14:44:18
 */

const fs = require("fs");

try {
	console.log("React spring scroll view fix...");
	var rootDir = process.cwd();

	var file = `${rootDir}/node_modules/react-native-spring-scrollview/SpringScrollView.js`;
	var data = fs.readFileSync(file, "utf8");
	var dataFix = 'react-native/Libraries/Components/TextInput/TextInputState';

	if (data.indexOf(dataFix) !== -1) {
		throw "> Already fixed";
	}

	var result = data.replace(
		/react-native\/lib\/TextInputState/g,
		dataFix,
	);
	fs.writeFileSync(file, result, "utf8");
	console.log("> Done");
} catch (error) {
	console.error(error);
}
