import {tag as TagServices} from "../services";

exports.getLevelList = async (ctx, next) => {
	let tag = await TagServices.getListByLevel(ctx.query.level, ctx.state.user);

	ctx.body = {
		success: 1,
		data: tag,
	};
};
