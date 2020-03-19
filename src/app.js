// 网站

let _ = require('lodash');
let Koa = require('koa');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');
const logUtil = require('./tool/logUtil');

import { errorCatch, adminCheck } from './middleware';
import MainRoutes from './routes/main-routes';
import fs from 'fs';
import path from 'path';

const koajwt = require('koa-jwt');

const xmlParser = require('koa-xml-body');


import {
	System as SystemConfig,
	Session as SessionConfig,
	PUBLIC,
	JWT,
} from './config';


/***********************init path****************************/

if (!fs.existsSync(PUBLIC.root)) {
	fs.mkdirSync(PUBLIC.root);
}
if (!fs.existsSync(path.join(PUBLIC.root, PUBLIC.images))) {
	fs.mkdirSync(path.join(PUBLIC.root, PUBLIC.images));
}

logUtil.initLogPath();

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/***********************init path****************************/


//引入配置文件
// var config = require('../config');

// 将端口号设置为配置文件的端口号，默认值为3000
var port = normalizePort(SystemConfig.API_server_port || '3000');
// 打印输出端口号
console.log('env:', process.env.NODE_ENV, 'port = ' + port);

let app = new Koa();


app.keys = [SystemConfig.secert_key];

app
	.use((ctx, next) => {
		// if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
		ctx.set('Access-Control-Allow-Origin', '*');
		// } else {
		//     ctx.set('Access-Control-Allow-Origin', SystemConfig.API_server_host);
		// }
		ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		ctx.set('Access-Control-Allow-Credentials', true); // 允许带上 cookie
		return next();
	})

	//logger
	.use(async (ctx, next) => {
		//响应开始时间
		const start = new Date();
		//响应间隔时间
		var ms;
		try {
			//开始进入到下一个中间件
			await next();

			ms = new Date() - start;
			//记录响应日志
			logUtil.logResponse(ctx, ms);

		} catch (error) {

			ms = new Date() - start;
			//记录异常日志
			logUtil.logError(ctx, error, ms);
		}
	})

	.use(session(SessionConfig, app))
	.use(async (ctx, next) => {
		ctx.state.ip = ctx.headers['x-real-ip'] || ctx.ip;
		await next();
	})

	.use(require('koa-static')(PUBLIC.root))
	.use(errorCatch)
	.use(koajwt({
		secret: JWT.SECRET,
	}).unless({
		path: [/^\/login/, /^\/wechat\/notify/, /^\/admin\/login/, /^\/user\/register/, /^\/user\/passwordLogin/, /^\/user\/get_code/,/^\/images/],
	}))
	// /user/get_code
	.use(xmlParser())
	.use((ctx, next) => {
		ctx.data = ctx.request.body;
		return next();
	})
	.use(bodyParser({
		formLimit: '10MB',
		enableTypes: ['json', 'form', 'text'],
		extendTypes: {
			text: ['text/xml', 'application/xml'],
		},
	}))


	.use(MainRoutes.routes())
	.use(MainRoutes.allowedMethods());


console.log("instance ID:", process.env.NODE_APP_INSTANCE);
 //if (process.env.NODE_APP_INSTANCE === '0') {
	// 定时任务
	// schedule.register();
 //}
// require('./init-db');

app.listen(SystemConfig.API_server_port, "127.0.0.1");

console.log(`listen on http://localhost:${SystemConfig.API_server_port}`);



