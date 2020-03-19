require('should');
let _ = require('lodash');
let utils = require('utility');
let superagent = require('superagent');
import { WeiXin } from '../config';
let appID = WeiXin.APP_ID;
let appSerect = WeiXin.APP_SECRET;

let {assert} = require('./auth');


exports.minaLogin = async (code) => {
	let {text} = await superagent.get('https://api.weixin.qq.com/sns/jscode2session').query({
		appid: appID,
		secret: appSerect,
		js_code: code,
		grant_type: 'authorization_code',
	});
	let data = JSON.parse(text);
	console.log('weixin login res', data);

	assert(!data.errcode, data.errmsg);
	return data;
};
