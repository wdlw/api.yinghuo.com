import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const MechCour = sequelize.define('mechcour', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		mech_id: Seqeuelize.INTEGER,
		cour_id: Seqeuelize.INTEGER,


		created_at: Seqeuelize.DATE,
		deleted_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE,
	},
	{
		underscored: true,
	},
);
module.exports = MechCour;
