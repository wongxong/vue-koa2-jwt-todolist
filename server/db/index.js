const fs = require('fs');
const path = require('path');
const DB_DEV_CONF = require('../config/db.dev.conf');
const DB_PROD_CONF = require('../config/db.prod.conf');
const isProduction = process.env.NODE_ENV === 'production';
const DB_CONF = isProduction ? DB_PROD_CONF : DB_DEV_CONF;
const Sequelize = require('sequelize');
const { camelize, capitalize } = require('../utils/util');

const sequelize = new Sequelize(DB_CONF.database, DB_CONF.username, DB_CONF.password, {
  host: DB_CONF.host,
  port: DB_CONF.port,
  dialect: DB_CONF.dialect,
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  pool: DB_CONF.pool
});

const exp = {
  sequelize,
  sync: () => {
    if(process.env.NODE_ENV !== 'production') {
      return sequelize.sync({ force: true });
    }

    throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
  }
};

fs.readdirSync(path.resolve(__dirname, '../schema'))
.filter(filename => filename.endsWith('.js'))
.forEach(filename => {
  console.log(`import model from file ${ filename }...`);

  const name = filename.substring(0, filename.length - 3);

  exp[capitalize(camelize(name))] = sequelize.import(path.resolve(__dirname, '../schema', filename));
});

module.exports = exp;