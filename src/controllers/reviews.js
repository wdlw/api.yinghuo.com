import { UserModel,ReviewsModel,ReviewPicModel } from "../models/index_new";
import _ from "lodash";
import { assert } from "../services/auth";
import {review as ReviewsServices} from "../services";

exports.publish = async (ctx, next) => {
	let {title, content, rate, pics, typeIds} = ctx.request.body;
	assert(title && content && rate && typeIds, "缺少参数");
	assert(pics && pics.length > 0, "没图");
	console.log("0000000000",pics);
	let user = await UserModel.findById(ctx.state.user.id);
	let createParams = {
		title: title,
		content: content,
		user_id: user.id,
		rate: rate,
		type_ids : typeIds
	};
	let review = await ReviewsModel.create(createParams);
	let promises = _.map(pics, pic=>ReviewPicModel.create({
		reviews_id: review.id,
		url: pic
	}));
	await Promise.all(promises);
	ctx.body = {
		success: 1,
		data: review.id,
	};
};

exports.getList = async (ctx, next) => {
	let reviews = await ReviewsServices.reviewsList();

	ctx.body = {
		success: 1,
		data: reviews,
	};
};
