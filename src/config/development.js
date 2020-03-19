/**
 * 开发环境的配置内容
 */
import path from 'path';
module.exports = {
	System: {
		API_server_type: 'http://', // API服务器协议类型,包含"http://"或"https://"
		API_server_host: 'localhost', // API服务器暴露的域名地址,请勿添加"http://"
		API_server_port: '3000', // API服务器监听的端口号
		db_type: 'mysql', // 数据库类型
		env: 'development', //环境名称
		System_country: 'zh-cn', // 所在国家的国家代码
		ROOT_PATH: path.join(__dirname, '../../'),
		secert_key: "asdfghjkl",
	},
	database: {
		DATABASE: 'yinghuo',
		USERNAME: 'root',
		PASSWORD: 'root',
		PORT: '3306',
		HOST: 'localhost',
	},

	WeiXin: {

		//yinghuo
		APP_ID: "wx4dbb66e3fbfcb3a5",
		APP_SECRET: "7aaa8858cdac99875d906c1064c82e30"

	},

	LEANCLOUD: {
		LEAN_APPID: "eg38EuFh9M4qUtoTOnyI837y-gzGzoHsz",
		LEAN_APPKEY: "ogtKFgmDozLVnlECxTwiIElq",
		LEAN_MASTERKEY: "LxCfATcE559Qjv3IuWjijjIA",
	},

	Session: {
		key: 'c2c:sess', /** (string) cookie key (default is koa:sess) */
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		overwrite: true,
		/** (boolean) can overwrite or not (default true) */
		httpOnly: false,
		/** (boolean) httpOnly or not (default true) */
		signed: true,
		/** (boolean) signed or not (default true) */
		rolling: false,
		/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
		renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
	},

	PUBLIC: {
		root: path.join(__dirname, '..', 'public'),
		images: 'images',
	},

	JWT: {
		SECRET: "taOyoUxiaN",
		EXPIRE: "10d"
	}

};


