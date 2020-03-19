import {CourseModel, FollowModel, MechanismModel, TagModel, UserModel} from "../models/index_new"

exports.getList = async (user, type, pageNo, pageSize) => {
	let res = [];
	if(type == 1) {
		res = [
			{
				association: TagModel.belongsTo(MechanismModel, { foreignKey: "type_id" }),
			}
		]
	}else {
		res = [
			{
				association: TagModel.belongsTo(CourseModel, { foreignKey: "type_id" }),
			}
		]
	}
	return FollowModel.findOne({
		where: {
			user_id: user.id
		},
		include:[
			{
				association: FollowModel.belongsTo(TagModel, { foreignKey: "type_id" }),
				where: {
					type: type
				},
				include:res
			}
		]
	})
};
