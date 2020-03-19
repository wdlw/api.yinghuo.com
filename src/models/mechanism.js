import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Follow = sequelize.define('follow', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name:Seqeuelize.STRING,
		content:Seqeuelize.STRING,
		level: Seqeuelize.STRING,
		url:Seqeuelize.STRING,
		created_at: Seqeuelize.DATE,
		deleted_at:Seqeuelize.DATE,
		updated_at:Seqeuelize.DATE,
	},
	{
		underscored: true,
		createdAt: false,
	}
);

module.exports = Follow;
