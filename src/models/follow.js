import sequelize from '../lib/sequelize';
import Seqeuelize from 'sequelize';

const Follow = sequelize.define('follow', {
		id: {
			type: Seqeuelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type_id:Seqeuelize.INTEGER,
		user_id: {
			type: Seqeuelize.INTEGER,
			references: {
				model: 'users', // 可以是一个表示表名的字符串或模型引用
				key: "id"
			}
		},
		deleted_at:Seqeuelize.DATE,
		updated_at:Seqeuelize.DATE,
	},
	{
		underscored: true,
		createdAt: false,
	}
);

module.exports = Follow;
