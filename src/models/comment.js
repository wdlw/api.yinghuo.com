import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Comment = sequelize.define('comment', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: Seqeuelize.STRING,

		reviews_id: Seqeuelize.INTEGER,
		user_id: Seqeuelize.INTEGER,

		comm_id: Seqeuelize.INTEGER,		//回复对象评论ID


		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = Comment;
