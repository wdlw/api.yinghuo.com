import { UserModel } from "../models/index_new";

exports.creatUser = async (userInfo,openid,tempUser) => {
	let [user1, created] = await UserModel.findOrCreate({
		where: {
			openid: openid,
		},
		defaults: userInfo,
	});
	console.log(user1,created,"1000000000")

	if (!created) {
		user1.openid = tempUser.openid;
		user1.session_key = tempUser.session_key;
		await user1.save();
	}
	return user1;
};
