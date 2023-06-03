import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const router = express.Router();

// Constants
const PORT: number = 3001;

// Controllers
import { addUser } from './controllers/addUser.ts';

// Use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

// GET
// router.get('/getUser/:id', getUser);

// POST
router.post('/addUser', addUser);

// Other
app
  .listen(PORT)
  .on('listening', () => {
    console.log(`[INDEX.TS] Сервер запущен на порту ${PORT}.`);
  })
  .on('error', (err: Error) => {
    console.error(err);
  });
