import {
	FollowModel,
	TagModel,
	ReviewsModel,
	UserModel,
	TeacherModel
} from "../models/index_new"
import myUtils from "../tool/mUtils";
import {Op} from 'sequelize'

exports.getDetailById = async (id, userInfo) => {
	let teacher = await TeacherModel.findById(id);
	myUtils.assert(teacher, "老师不存在");

	let type = await TagModel.findOne({
		where: {
			type_id: id,
			type: '3',
			deleted_at: null,
		}
	});
	myUtils.assert(type, "标签不存在");
	// let isCollected = !!(await FollowModel.findOne({
	// 	where: {
	// 		type_id: type.id,
	// 		user_id: userInfo.id,
	// 		deleted_at: null,
	// 	},
	// }));
	let list = await ReviewsModel.findAll({
		where: {
			[Op.or]: [
				{
					type_ids: {
						[Op.like]: '%'+type.id+',%'//模糊查询
					}
				}
			]
		},
		include: [
			{
				association: ReviewsModel.belongsTo(UserModel, { foreignKey: "user_id" }),
			},
		],
	});

	let rate = 0;
	for (var i in list) {
		rate += list[i].rate
	}
	// teacher.isFollowed = isCollected;
	teacher.list = list;
	teacher.rate = rate;

	return mechanism;
};

