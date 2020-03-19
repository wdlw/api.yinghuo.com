import {
	teacher as TeacherServices,
} from "../services";

exports.details = async (ctx, next) => {
	let teacher = await TeacherServices.getDetailById(ctx.query.id, ctx.state.user);

	ctx.body = {
		success: 1,
		data: teacher,
	};
};
