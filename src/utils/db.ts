// Połączenie mysql2/promise lokalnie
import chalk from 'chalk';
import { createPool, } from 'mysql2/promise';
import { DB, } from '../config/config';

const config = {
  host             : DB.MYSQL_HOST,
  user             : DB.MYSQL_USER,
  password         : DB.MYSQL_PASSWORD,
  port             : DB.MYSQL_PORT,
  database         : DB.MYSQL_DATABASE,
  namedPlaceholders: true,
  decimalNumbers   : true,
};

export const pool = createPool (config);
