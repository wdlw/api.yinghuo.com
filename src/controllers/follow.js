import { follow as FollowsServices } from "../services"

exports.followList = async (ctx, next) => {
	let user = ctx.state.user;
	let type = ctx.query.type || 1;
	let pageNo = ctx.query.pageNo || 1;
	let pageSize = ctx.query.pageSize || 50;

	let list = FollowsServices.getList(user, type, pageNo, pageSize);

	ctx.body = {
		success: 1,
		data: list,
	};
};
