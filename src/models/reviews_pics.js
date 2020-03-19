import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const ReviewsPic = sequelize.define('reviewsPics', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		reviews_id: Seqeuelize.INTEGER,
		url: Seqeuelize.STRING,



		created_at: Seqeuelize.DATE
	},
	{
		underscored: true,
	},
);
module.exports = ReviewsPic;
