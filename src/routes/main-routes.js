import KoaRouter from 'koa-router';

let body = require('koa-convert')(require('koa-better-body')());
import {
	login as LoginController,
	user as UserController,
	search as SearchController,
	reviews as ReviewsController,
	course as CoursesController,
	mechanism as MechanismsController,
	teacher as TeachersController,
	tag as TagsController,
	interaction as InteractionController,
	follow as FollowController
} from '../controllers';

const router = new KoaRouter();

router
	.get('/test',LoginController.test)

	.get('/search', SearchController.searchs)

	.post('/login/mina', LoginController.minaLogin)

	.put('/user',UserController.updateUserInfo)

	.get('/reviews/list', ReviewsController.getList)
	.post('/reviews', ReviewsController.publish)

	.get('/course', CoursesController.details)
	.get('/course/recommend', CoursesController.recommend)
	.get('/course/level', CoursesController.getLevelList)

	.get('/mechanism', MechanismsController.details)
	.get('/mechanism/recommend', MechanismsController.recommend)
	.get('/mechanism/level', MechanismsController.getLevelList)

	.get('/teacher', TeachersController.details)

	.get('/tag/level', TagsController.getLevelList)

	.post('/interaction/like', InteractionController.like)//点赞
	.post('/interaction/unlike', InteractionController.unlike)//取消点赞
	.post('/interaction/collect', InteractionController.collect)//收藏
	.post('/interaction/uncollect', InteractionController.uncollect)//取消收藏

	.get('/follow', FollowController.followList)

module.exports = router;
