import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Tag = sequelize.define('tag', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		type_id: Seqeuelize.INTEGER,
		type: Seqeuelize.INTEGER,
		rate:Seqeuelize.FLOAT,
		like_num:Seqeuelize.INTEGER,
		comment_num:Seqeuelize.INTEGER,


		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = Tag;
