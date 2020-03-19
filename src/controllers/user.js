import UserDao  from  '../dao/user';
import _ from "lodash";
import {assert} from '../services/auth';
import { UserModel } from "../models/index_new";


exports.updateUserInfo = async (ctx, next) => {
	let {userInfo, userId} = ctx.request.body;
	let { gender,nickName,avatarUrl,city,country,province } = userInfo;
	assert(userId, '缺少参数!');
	let user = await UserModel.findById(userId);
	_.assign(user, {gender,nickName,avatarUrl,city,country,province});
	// console.log(user);
	let res = await user.save();
	ctx.body = {
		success: 1,
		data: UserDao.getUserBase(res),
	};
};
