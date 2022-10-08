module.exports = {
	//基本路径
	publicPath: "./",
	devServer: {
		port: 8888,
		open: true,
	},
	productionSourceMap: true,
	//构建时的输出目录
	// outputDir: "www",
	//html的输出路径
	indexPath: "index.html",
	//文件名哈希
	filenameHashing: true,
	lintOnSave: false, //false是解决eslint过多空格报错问题。
};
