require("babel-polyfill");
require("babel-register")({
	presets: ["env"],
});
require("./app.js"); // 设置对应位置
