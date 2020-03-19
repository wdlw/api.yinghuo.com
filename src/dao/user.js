import moment from 'moment';
import _ from 'lodash';
import { UserModel } from '../models/index_new';

let getUserBase = exports.getUserBase = (user) => {
	let res = _.pick(user, ['id', 'nickName', 'avatarUrl','phone','openid']);
	if (user) {
		res.created_at = moment(user.created_at).format('ll');
	}
	return res;
};

exports.getUserBase2 = (user) => {
	let res = getUserBase(user);
	res.name = user.nickName;
	return res;
};

exports.getUserBaseById = async (id) => {
	let user = await UserModel.findById(id);
	return getUserBase(user);
};


