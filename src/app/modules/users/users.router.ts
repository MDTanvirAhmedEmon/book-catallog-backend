import express from "express";
import { userController } from "./users.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get('/',auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser)
router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser)
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), userController.updateUser)
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser)

export const userRouter = router;
 