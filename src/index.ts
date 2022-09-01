import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { json, Router, } from 'express';
import rateLimit from 'express-rate-limit';

// * Import plików konfiguracyjnych
import { config, } from './config/config';

// * Import async trycatch w router
import 'express-async-errors';

// * Import połączeń ia do bazy
// * MySql2
import './utils/db';

// * Import Błędy
import { handleError, } from './utils/error';

// Import ścieżki API
// import { homeRouter, } from './routers/home';

// * Aktywacja Express
const app = express ();

// * Bezpieczeństw o wystawia nagłówki
app.use (helmet () );

// * Bezpieczeństwo ilości zapytań
app.use (rateLimit ({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max     : 100, // Limit each IP to 100 requests per `window`  (here, per 15 minutes)
}));

// * Ustawienia CORS
// W skazanie jakie adresy dopuszczamy do backendu
app.use (cors ({
  origin : 'http://localhost:3000',
  methods: 'GET,POST,DELETE,PUT,PATCH',

  // Ustawia poświadczenia nagłówka
  credentials: true,
}));

// * Ustawienie Morgana
app.use (morgan ('dev'));

// * Dane przychodzące  do express z FE fetch, axios
app.use (json ());

// * Dodawanie prefix do ścieżek i zmiana ścieżek z app na router
const router = Router ();

// router.use (
//   '/ad', adRouter
// );
app.use (
  '/api', router
);

// * Error Handler 
app.use (handleError );

const PORT:number = config.PORT || 5000;

// * Nasłuchiwanie
app.listen (
  PORT, () => {
    return console.log (chalk.yellow.bold (`Server running in ${config.NODE_ENV} mode on http://localhost:${PORT}`));
  }
);
