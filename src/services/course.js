import {
	CourseModel,
	FollowModel,
	TagModel,
	ReviewsModel,
	UserModel,
	TeacherModel, MechanismModel
} from "../models/index_new"
import myUtils from "../tool/mUtils";
import {Op} from 'sequelize'

exports.getDetailById = async (id, userInfo) => {
	let course = await CourseModel.findById(id);
	myUtils.assert(course, "课程不存在");

	let teachers = await TeacherModel.findAll({
		where: {
			cour_id: id
		}
	});

	let type = await TagModel.findOne({
		where: {
			type_id: id,
			type: '2',
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

	let rate = 0;
	for (var i in list) {
		rate += list[i].rate
	}
	course.isFollowed = isCollected;
	course.list = list;
	course.teachers = teachers;
	course.rate = rate;

	return course;
};

exports.getRecommend = async () => {
	return await TagModel.findAll({
		where: {
			type: '2',
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
	let course = CourseModel.findAll({
		where: {
			level: level
		}
	});
	for (var i in course) {
		course[i].tag = await TagModel.findOne({
			where: {
				type_id: course[i].id,
				type: '2'
			}
		})
	}

	return course
};

exports.coursesList = async (user, pageNo, pageSize, isList, condi, sorti) => {
	if (!condi) {
		condi = {};
	}
	if (!sorti) {
		sorti = [
			['rate', 'DESC'],
		];
	}
	let total = await CourseModel.count({ where: condi });
	let courses = CourseModel.findAll({
		where: condi,
		offset: (pageNo - 1) * pageSize,
		limit: pageSize,
		include: [
			{
				association: CourseModel.belongsTo(TagModel, { foreignKey: "type_id" }),
				order: sorti,
			},
		],
	});
	if (isList) {
		for (var i in courses) {
			courses[i].detail = getDetailById(courses[i].tag.id, user);
		}
	}

	return {
		items: courses,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	};
};

