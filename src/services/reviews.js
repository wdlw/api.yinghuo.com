import {ReviewsModel, TagModel, UserModel} from "../models/index_new";
import myUtils from "../tool/mUtils";

exports.reviewsList = async () => {
	let reviews = await ReviewsModel.findAll({
		order: [
			['rate', 'DESC'],
		],
		include:[
			{
				association: ReviewsModel.belongsTo(UserModel, { foreignKey: "user_id" }),
			},
		]
	});
	return reviews
};

exports.getDetailById = async (id, userInfo) => {
	let review = await ReviewsModel.findById(id);
	myUtils.assert(review, "点评不存在");

	//点评详情未完成
	return reviews
}
