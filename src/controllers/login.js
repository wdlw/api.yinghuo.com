import {assert, getToken} from '../services/auth';
import { WeiXin } from "../config";
import {
	wechat as WechatService,
	user as userService,
} from '../services';
let utils = require('utility');
let WXBizDataCrypt = require('../lib/WXBizDataCrypt');
import UserDAO  from  '../dao/user'

exports.test = async (ctx, next) => {
	ctx.body = {
		success: 1,
		data: {
			phone:'1222'
		},
	};
};

exports.minaLogin = async (ctx, next) => {
	let {code, userInfo, signature, rawData, encryptedData, iv} = ctx.request.body;
	let tempUser = await WechatService.minaLogin(code);

	assert(signature === utils.sha1(rawData + tempUser.session_key), '签名错误1');

	let pc = new WXBizDataCrypt(WeiXin.APP_ID, tempUser.session_key);
	let data = pc.decryptData(encryptedData, iv);

	assert(data.openId === tempUser.openid, '签名错误2');
	assert(data.watermark.appid === WeiXin.APP_ID, '水印错误');

	userInfo.openid = tempUser.openid;
	userInfo.session_key = tempUser.session_key;
	userInfo.location_name = "";
	// console.log(data);

	let user1 = await userService.creatUser(userInfo,tempUser.openid,tempUser);
	console.log(user1);
	let token = getToken(user1);
	let user = UserDAO.getUserBase(user1);
	console.log(user, 'aaaaa');
	ctx.body = {
		success: 1,
		data: {
			token,
			user,
		},
	};
};
