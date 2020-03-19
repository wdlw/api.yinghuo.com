import { TagModel,FollowModel,ReviewsModel,LikeModel } from "../models/index_new"
import {assert} from '../services/auth';

exports.collect = async (ctx, next) => {
	let tagId = ctx.request.body.type_id;
	let tag = await TagModel.find({
		where: {
			id: tagId,
		},
	});
	assert(tag, '不存在');
	let res = await FollowModel.findOne({
		where: {
			user_id: ctx.state.userId,
			type_id: tagId,
		},
	});
	assert(!res || res.deleted_at, "收藏过了");

	if (!res) {
		res = await FollowModel.create({
			type_id: tagId,
			user_id: ctx.state.userId,
		});
	}
	console.log("res有值" + res.id);
	res.deleted_at = null;
	await res.save();

	ctx.body = {
		success: 1,
		data: res,
	};
};

exports.uncollect = async (ctx, next) => {
	let tagId = ctx.request.body.type_id;
	let tag = await TagModel.find({
		where: {
			id: tagId,
		},
	});
	assert(tag, '不存在');
	let res = await FollowModel.findOne({
		where: {
			user_id: ctx.state.userId,
			type_id: tagId,
		},
	});
	assert(res && !res.deleted_at, "没收藏过");

	res.deleted_at = new Date();
	await res.save();

	ctx.body = {
		success: 1,
		data: res,
	};
};

exports.like = async (ctx, next) => {
	let reviewId = ctx.request.body.reviewId;
	console.log(reviewId,'aaaaaaaaa')
	let review = await ReviewsModel.find({
		where: {
			id: reviewId,
		},
	});
	assert(review, '点评不存在');
	let res = await LikeModel.findOne({
		where: {
			user_id: ctx.state.userId,
			review_id: reviewId,
		},
	});
	assert(!res || res.deleted_at, "点过了");

	if (!res) {
		res = await LikeModel.create({
			review_id: reviewId,
			user_id: ctx.state.userId,
		});
	}
	// let alias = (await ReviewsModel.find({
	// 	where: {id: reviewId}
	// })).user_id;
	// alias = alias.toString();
	// console.log("转化后的",alias);
	//
	console.log("res有值" + res.id);
	res.deleted_at = null;
	res.created_at = new Date();
	await res.save();
	review.like_num++;
	review.updated_date = new Date();
	await review.save();

	//Todo 通知待做
	// let noti = await NotificaServices.createNotify("赞了我", goods.user_id, ctx.state.user.id, 1, goodsId);
	// console.log(noti);

	ctx.body = {
		success: 1,
		data: res,
	};
};

exports.unlike = async (ctx, next) => {
	let reviewId = ctx.request.body.reviewId;
	console.log(reviewId,'aaaaaaaaa')
	let review = await ReviewsModel.find({
		where: {
			id: reviewId,
		},
	});
	assert(review, '点评不存在');
	let res = await LikeModel.findOne({
		where: {
			user_id: ctx.state.userId,
			review_id: reviewId,
		},
	});
	assert(res && !res.deleted_at, "没赞过");

	res.deleted_at = new Date();
	review.like_num--;
	await res.save();
	await review.save();

	ctx.body = {
		success: 1,
		data: res,
	};
};
