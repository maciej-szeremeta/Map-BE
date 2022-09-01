// Połączenie mysql2/promise lokalnie
import chalk from 'chalk';
import { createPool, } from 'mysql2/promise';
import { config as DB, } from '../config/config';

const config = {
  host             : DB.localhost.MYSQL_HOST,
  user             : DB.localhost.MYSQL_USER,
  password         : DB.localhost.MYSQL_PASSWORD,
  port             : DB.localhost.MYSQL_PORT,
  database         : DB.localhost.MYSQL_DATABASE,
  namedPlaceholders: true,
  decimalNumbers   : true,
};

export const pool = createPool (config);
