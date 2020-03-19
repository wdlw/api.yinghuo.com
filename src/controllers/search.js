import {
	mechanism as MechanismServices,
	course as CourseSevices,
} from "../services";
import {Op} from 'sequelize'

exports.searchs = async (ctx, next) => {
	let user = ctx.state.user;
	let pageNo = ctx.query.pageNo || 1;
	let pageSize = Math.min(ctx.query.pageSize || 12, 20); // 最大20，默认12

	let keyword = ctx.query.keyword; //关键字
	console.log(keyword);
	let cata = ctx.query.class; // 需确定下
	console.log(cata);

	let data = {};
	let condi = {
		[Op.or]: [
			{
				name: {
					[Op.like]: '%'+keyword+'%'//模糊查询
				}
			}
		]
	};
	let sorti = [
		['updated_at', 'DESC']
	];
	console.log(condi);
	//搜索机构
	if (cata == 0) {
		data = await MechanismServices.mechanismsList(user, pageNo, pageSize, false, condi, sorti);
	//搜索全部
	} else if (cata == 1) {
		data = await MechanismServices.mechanismsList(user, pageNo, pageSize, false, condi, sorti);
		data.push(await CourseSevices.coursesList(user, pageNo, pageSize, false, condi, sorti));
	//搜索标签
	} else if(cate == 2) {
		data = await MechanismServices.mechanismsList(user, pageNo, pageSize, true, condi, sorti);
		data.push(await CourseSevices.coursesList(user, pageNo, pageSize, true, condi, sorti));
	}

	console.log(data);

	ctx.body = {
		success: 1,
		data: data,
	}
};

