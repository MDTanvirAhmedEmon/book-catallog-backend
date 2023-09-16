import express from 'express';
import { bookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN), bookController.createBook);
router.get('/', bookController.getAllBook);

export const bookRouter = router;