import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Reviews = sequelize.define('reviews', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: Seqeuelize.STRING,
		rate: Seqeuelize.FLOAT,
		content: Seqeuelize.STRING,

		type_ids: Seqeuelize.STRING,
		user_id: Seqeuelize.INTEGER,


		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = Reviews;
