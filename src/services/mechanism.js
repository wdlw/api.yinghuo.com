import {
	MechanismModel,
	FollowModel,
	TagModel,
	ReviewsModel,
	UserModel
} from "../models/index_new"
import myUtils from "../tool/mUtils";
import {Op} from 'sequelize'

exports.getDetailById = async (id, userInfo) => {
	let mechanism = await MechanismModel.findById(id);
	myUtils.assert(mechanism, "机构不存在");

	let type = await TagModel.findOne({
		where: {
			type_id: id,
			type: '1',
			deleted_at: null,
		}
	});
	myUtils.assert(type, "标签不存在");
	let isCollected = !!(await FollowModel.findOne({
		where: {
			type_id: type.id,
			user_id: userInfo.id,
			deleted_at: null,
		},
	}));
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

	// let rate = 0;
	// for (var i in list) {
	// 	rate += list[i].rate
	// }
	mechanism.isFollowed = isCollected;
	mechanism.list = list;
	mechanism.type = type;

	return mechanism;
};

exports.getRecommend = async () => {
	return await TagModel.findAll({
		where: {
			type: '1',
			deleted_at: null,
			rate: {
				$gt: 4.9
			},
		},order: [
			['rate', 'DESC'],
		]
	});
};

exports.getListByLevel = async (level) => {
	let mechanisms = MechanismModel.findAll({
		where: {
			level: level
		}
	});
	for (var i in mechanisms) {
		mechanisms[i].tag = await TagModel.findOne({
			where: {
				type_id: mechanisms[i].id,
				type: '1'
			}
		})
	}

	return mechanisms
};

exports.mechanismsList = async (user, pageNo, pageSize, isList, condi, sorti) => {
	if (!condi) {
		condi = {};
	}
	if (!sorti) {
		sorti = [
			['rate', 'DESC'],
		];
	}
	let total = await MechanismModel.count({ where: condi });
	let mechanisms = MechanismModel.findAll({
		where: condi,
		offset: (pageNo - 1) * pageSize,
		limit: pageSize,
		include: [
			{
				association: MechanismModel.belongsTo(TagModel, { foreignKey: "type_id" }),
				order: sorti,
			},
		],
	});
	if (isList) {
		for (var i in mechanisms) {
			mechanisms[i].detail = getDetailById(mechanisms[i].tag.id, user);
		}
	}

	return {
		items: mechanisms,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	};
};
