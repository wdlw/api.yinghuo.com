const Sequelize = require('sequelize');
import { database as DBConfig, System as SystemConfig } from '../config';

export default new Sequelize(DBConfig.DATABASE, DBConfig.USERNAME, DBConfig.PASSWORD, {
	host: DBConfig.HOST,
	dialect: SystemConfig.db_type,
	logging: false,
	dialectOptions: { // MySQL > 5.5，其它数据库删除此项
		charset: 'utf8mb4',
		// collate: 'utf8mb4_unicode_520_ci',
		supportBigNumbers: true,
		bigNumberStrings: true,
	},
	pool: {
		max: 50,
		min: 0,
		idle: 10000,
	},
	operatorsAliases: false,
});
