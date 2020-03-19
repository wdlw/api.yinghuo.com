import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Teacher = sequelize.define('teacher', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: Seqeuelize.STRING,

		user_id: Seqeuelize.INTEGER,
		cour_id: Seqeuelize.INTEGER,
		mech_id: Seqeuelize.INTEGER,

		url: Seqeuelize.STRING,
		content: Seqeuelize.STRING,
		type: Seqeuelize.STRING,


		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = Teacher;
