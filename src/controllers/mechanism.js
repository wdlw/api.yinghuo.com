import {
	mechanism as MechanismsServices,
} from "../services";

exports.details = async (ctx, next) => {
	let mechanism = await MechanismsServices.getDetailById(ctx.query.id, ctx.state.user);

	ctx.body = {
		success: 1,
		data: mechanism,
	};
};

exports.recommend = async (ctx, next) => {
	let mechanisms = await MechanismsServices.getRecommend();

	ctx.body = {
		success: 1,
		data: mechanisms,
	};
};

exports.getLevelList = async (ctx, next) => {
	let mechanisms = await MechanismsServices.getListByLevel(ctx.query.level);

	ctx.body = {
		success: 1,
		data: mechanisms,
	};
};
