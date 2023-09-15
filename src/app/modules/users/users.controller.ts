import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./users.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";




const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUser();

    sendResponse<User[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all users successfully',
        data: result,
      });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userServices.getSingleUser(id);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single user successfully',
        data: result,
      });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await userServices.updateUser(id, data);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user updated successfully',
        data: result,
      });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userServices.deleteUser(id);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user deleted successfully',
        data: result,
      });
});

export const userController = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};