import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Course = sequelize.define('course', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: Seqeuelize.STRING,
		content:Seqeuelize.STRING,
		level: Seqeuelize.STRING,

		cour_id: Seqeuelize.INTEGER,
		url: Seqeuelize.STRING,

		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = Course;
