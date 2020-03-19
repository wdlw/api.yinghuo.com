module.exports = async function (ctx, next) {
	try {
		await next();
	} catch (e) {
		ctx.body = {
			err: e.status,
			msg: e.message || '请先登录',
		};
		console.error(e);
		logger.error(ctx.request);
		logger.error(e);
	}
};
