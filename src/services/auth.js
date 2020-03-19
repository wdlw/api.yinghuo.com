require('should');
import jwt from 'jsonwebtoken';
import { JWT } from "../config";

let ERR_CODE = 1;

export let assert = function (condition, msg, err_code) {
	if (!err_code) {
		err_code = ERR_CODE;
	}
	if (!condition) {
		msg.should.be.a.String();
		let err = new Error(msg);
		err.status = err_code;
		throw err;
	}
};

export let getToken = (user, expire) => {
	return jwt.sign({
		id: user.id,
		phone : user.phone || '',
		openid: user.openid || '',
	}, JWT.SECRET, { expiresIn: expire || JWT.EXPIRE });
};
