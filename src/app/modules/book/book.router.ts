import express from 'express';
import { bookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-book',auth(ENUM_USER_ROLE.ADMIN), bookController.createBook);
router.get('/', bookController.getAllBook);
router.get('/:categoryId/category', bookController.getBookByCategory);
router.get('/:id', bookController.getSingleBook);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), bookController.updateBook);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), bookController.deleteBook);

export const bookRouter = router;