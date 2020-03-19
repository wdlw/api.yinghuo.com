import {
	course as CourseServices, mechanism as MechanismsServices,
} from "../services";

exports.details = async (ctx, next) => {
	let course = await CourseServices.getDetailById(ctx.query.id, ctx.state.user);

	ctx.body = {
		success: 1,
		data: course,
	};
};

exports.recommend = async (ctx, next) => {
	let courses = await CourseServices.getRecommend();

	ctx.body = {
		success: 1,
		data: courses,
	};
};

exports.getLevelList = async (ctx, next) => {
	let courses = await CourseServices.getListByLevel(ctx.query.level);

	ctx.body = {
		success: 1,
		data: courses,
	};
};
