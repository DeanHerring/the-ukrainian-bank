import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

const app = express();
const router = express.Router();
const upload = multer({ dest: 'src/uploads/passports/' });

// Constants
const PORT: number = 3001;

// Controllers
import { addUser } from './controllers/addUser.ts';
import { authUser } from './controllers/authUser.ts';
import { getCountryDialingCodes } from './controllers/getCountryDialingCodes.ts';
import { getTariffs } from './controllers/getTarrifs.ts';
import { uploadPassport } from './controllers/uploadPassport.ts';

// Use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

// app.use(multer({ dest: 'uploads' }).single('filedata'));

// GET
router.get('/getCountryDialingCodes', getCountryDialingCodes);
router.get('/getTariffs', getTariffs);

// POST
router.post('/addUser', addUser);
router.post('/authUser', authUser);
router.post('/uploadPassport', upload.single('passport'), uploadPassport);

// app.post('/uploadPassport', upload.single('image'), (req, res) => {
//   console.log('New Upload Passport: ', req.file);
//   res.status(200);
// });

// Other
app
  .listen(PORT)
  .on('listening', () => {
    console.log(`[INDEX.TS] Сервер запущен на порту ${PORT}.`);
  })
  .on('error', (err: Error) => {
    console.error(err);
  });
