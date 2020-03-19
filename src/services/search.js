import {
	follows_school as FollowSchoolModel,
	university as UniversityModel,
	user as UserModel,
	follow as FollowModel,
	friendship as FriendshipModel,
	identity as identityModel,
	goods_pic as GoodsPicModel, like as LikesModel,
} from "../models";
import _ from "lodash";
import {Op} from 'sequelize';
import {CommentModel, GoodsModel} from "../models/index_new";
import {getCardList} from "../services/goods"
import {getKey, setKey, hmsetKey, getMKey, hgetAllKey, hkeys, hgetKey} from "../tool/redis";

let moment = require('moment');

//搜索学校
exports.schools = async (pageNo, pageSize, keyword, meID) => {
	let condi = {
		[Op.or]: [{
			name: {
				[Op.like]: '%' + keyword + '%',//模糊查询
			},
		}],
	};
	let sorti = {
		updated_date: -1,
	};
	console.log(condi);
	let total = await UniversityModel.count({where: condi});
	let schoolList = await UniversityModel.findAll(
		{
			where: condi,
			offset: (pageNo - 1) * pageSize,
			limit: pageSize,
			sort: sorti,
		},
	);
	let schoolFollow = await FollowSchoolModel.findAll({
		where: {
			fromuser_id: meID,
			deleted_at: null,
		},
	});
	let followSchoolIds = new Set();
	schoolFollow.map(f => {
		followSchoolIds.add(f.school_id);
	});
	let school = _.map(schoolList, school => _.pick(school, ['id', 'name', 'location', 'school_badge']));
	for (var i = 0; i < school.length; i++) {
		let isFollowed = followSchoolIds.has(school[i].id);
		_.assign(school[i], {isFollowed: isFollowed});
	}
	// return school;
	return {
		items: school,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	}
};

//搜索用户
exports.users = async (pageNo, pageSize, keyword, condi, meID) => {
	console.log(pageNo, pageSize)

	let sorti = [
		['updated_at', 'DESC'],
	];
	let total = await UserModel.count({where: condi});
	let usersList = await UserModel.findAll(
		{
			where: condi,
			offset: (pageNo - 1) * pageSize,
			limit: pageSize,
			sort: sorti,
		},
	);
	let userFollow = await FollowModel.findAll({
		where: {
			fromuser_id: meID,
			deleted_at: null,
		},
	});
	let userFriend = await FriendshipModel.findAll({
		where: {
			my_id: meID,
			deleted_at: null,
		},
	});
	let followUserIds = new Set();
	userFollow.map(f => {
		followUserIds.add(f.touser_id);
	});
	let friendUserIds = new Set();
	userFriend.map(f => {
		friendUserIds.add(f.your_id);
	});
	let user = _.map(usersList, user => _.pick(user, ['id', 'nickName', 'avatarUrl', 'school']));
	for (var i = 0; i < user.length; i++) {
		let isFollowed = followUserIds.has(user[i].id);
		let isFriend = friendUserIds.has(user[i].id);
		_.assign(user[i], {isFollowed, isFriend});
	}
	return {
		items: user,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	}
};

exports.identity = async (pageNo, pageSize, keyword) => {
	let condi = {
		[Op.or]: [{
			nickName: {
				[Op.like]: '%' + keyword + '%',//模糊查询
			},
		}],
	};
	let soti = [
		['created_at', 'DESC'],
	];
	let total = await identityModel.count();
	let userList1 = await identityModel.findAll({
		include: [
			{
				association: identityModel.belongsTo(UserModel, {foreignKey: 'user_id'}),
				where: condi,
			},
		],
		offset: (pageNo - 1) * pageSize,
		limit: pageSize,
		order: soti,
	});
	let users = _.map(userList1, user => _.pick(user, ['id', 'student_card', 'user', 'front_side', 'back_side', 'status', 'stu_status', 'created_at']));
	let users2 = await revertTime(users)
	return {
		items: users2,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	};
};
//TODO
//搜索订单
let revertTime = async (users) => {
	let users1 = [];
	for (var i = 0; i < users.length; i++) {
		users1[i] = users[i];
		users1[i].created_at = moment(users[i].created_at).format('ll');
		users1[i].updated_at = moment(users[i].updated_at).format('ll');
	}
	return users1;
};

exports.goodsUser = async (user, pageNo, pageSize, keyword) => {
	let condi = {
		[Op.or]: [{
			nickName: {
				[Op.like]: '%' + keyword + '%',//模糊查询
			},
		}],
	};
	let sorti = [
		['updated_at', 'DESC']
	];
	let total = await GoodsModel.count({
		include: [
			{
				association: GoodsModel.belongsTo(UserModel, {foreignKey: 'user_id'}),
				where: condi
			},
		],
	});
	let res = await GoodsModel.findAll(
		{
			include: [
				{
					association: GoodsModel.belongsTo(UserModel, {foreignKey: 'user_id'}),
					where: condi
				},
				{
					association: GoodsModel.hasMany(GoodsPicModel, {foreignKey: 'goods_id'}),
				},
			],
			offset: (pageNo - 1) * pageSize,
			limit: pageSize,
			order: sorti,
		},
	);
	let ret = await getCardList(res, user);
	return {
		items: ret,
		hasMore: total - pageNo * pageSize > 0,
		total: total,
	};
};


exports.setGooodsHotWrds = async (keyword) => {
	let goodsKeyWords = await hgetAllKey('商品2');
	console.log(goodsKeyWords, '当前所有的商品搜索');
	if (goodsKeyWords) {
		console.log(goodsKeyWords, 'aaaaaaaaaaaa', keyword);
		let goodsKeyWord = await hkeys("商品2", keyword);
		let tag;
		for (var i = 0; i < goodsKeyWord.length; i++) {
			if (goodsKeyWord[i] === keyword) {
				tag = true;
				let goodsKey = await hgetKey("商品2", keyword);
				console.log(goodsKeyWord[i]);
				console.log(parseInt(goodsKey), '111111111');
				let num = parseInt(goodsKey);
				console.log(++num, 'xxxxxx')
				hmsetKey('商品2', keyword, ++num, 10800)
			}
		}
		if (!tag) {
			console.log('new', keyword)
			hmsetKey('商品2', keyword, 1, 10800)
		}
	}
	else {
		hmsetKey('商品2', keyword, 1, 10800)
	}
	let goodsKey = await hkeys('商品2', keyword);
	return goodsKey || '暂无热搜';
}
;


exports.setSchoolHotWrds = async (keyword) => {
	let goodsKeyWords = await hgetAllKey('学校');
	console.log(goodsKeyWords, '当前所有的商品搜索');
	if (goodsKeyWords) {
		console.log(goodsKeyWords, 'aaaaaaaaaaaa', keyword);
		let goodsKeyWord = await hkeys("学校", keyword);
		let tag;
		for (var i = 0; i < goodsKeyWord.length; i++) {
			if (goodsKeyWord[i] === keyword) {
				tag = true;
				let goodsKey = await hgetKey("学校", keyword);
				console.log(goodsKeyWord[i]);
				console.log(parseInt(goodsKey), '111111111');
				let num = parseInt(goodsKey);
				console.log(++num, 'xxxxxx');
				hmsetKey('商品2', keyword, ++num, 10800)
			}
		}
		if (!tag) {
			console.log('new', keyword)
			hmsetKey('学校', keyword, 1, 10800)
		}
	}
	else {
		hmsetKey('学校', keyword, 1, 10800)
	}
	let goodsKey = await hkeys('学校', keyword);
	return goodsKey || '暂无热搜';
};


//getHotWords
exports.getHotWords = async (schoolKeyWords, goodsKeyWords) => {
	console.log('aaaaa');
	// let aaa =goodsKeyWords.toString();
	let goodsWords = await getWords(goodsKeyWords);
	let schoolWords = await getWords(schoolKeyWords);

	return {
		goodsWords,
		schoolWords
	};
};

let getWords = async (wordsList) => {
	for (var i = 0; i < wordsList.length; i++) {
		for (var j = 0; j < wordsList.length - i - 1; j++) {
			let goodsKey1 = parseInt(await hgetKey("商品2", wordsList[j]));
			let goodsKey2 = parseInt(await hgetKey("商品2", wordsList[j+1]));;
			console.log(goodsKey2,'>>>',goodsKey2)
			if (goodsKey1 < goodsKey2) {
				var temp;
				temp = wordsList[j + 1];
				wordsList[j + 1] = wordsList[j];
				wordsList[j] = temp;
			}
		}
	}
	console.log(wordsList);
	return wordsList;
};
