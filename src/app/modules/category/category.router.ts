import express from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.ADMIN), categoryController.createCategory);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), categoryController.updateCategory);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), categoryController.deleteCategory);

export const categoryRouter = router;