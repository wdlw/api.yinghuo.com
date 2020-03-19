import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const User = sequelize.define('user', {

		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nickName: Seqeuelize.STRING,
		avatarUrl: Seqeuelize.STRING,
		gender: Seqeuelize.INTEGER,
		phone: Seqeuelize.STRING,
		openid: Seqeuelize.STRING,
		city: Seqeuelize.STRING,
		country: Seqeuelize.STRING,
		province: Seqeuelize.STRING,
		language: Seqeuelize.STRING,
		access_token: Seqeuelize.STRING,
		session_key: Seqeuelize.STRING,
		created_at: Seqeuelize.DATE,
		updated_at: Seqeuelize.DATE
	}, {
		underscored: true,
	},
);
module.exports = User;
