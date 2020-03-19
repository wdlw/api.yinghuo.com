import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Like = sequelize.define('like', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		reviews_id: Seqeuelize.INTEGER,
		comm_id: Seqeuelize.INTEGER,
		user_id: Seqeuelize.INTEGER,

		deleted_at: Seqeuelize.DATE,
		created_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	}
);

module.exports = Like;
