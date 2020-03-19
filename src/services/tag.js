import { TagModel, FollowModel, ReviewsModel, UserModel} from "../models/index_new";

exports.getListByLevel = async (level, userInfo) => {
	let ret = "";
	if (level === 0) {
		ret = FollowModel.findAll({
			where: {
				user_id: userInfo.id
			},
			include: [
				{
					association: FollowModel.belongsTo(TagModel, { foreignKey: "type_id" }),
				},
			],
		})
	} else {
		ret = await TagModel.findAll({
			where: {
				type: level
			}
		})
	}

	return ret
};

