import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { categoryServices } from "./category.services";
import sendResponse from "../../../shared/sendResponse";
import { Category } from "@prisma/client";
import httpStatus from "http-status";


const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await categoryServices.createCategory(data);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category created successfully',
        data: result,
      });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {

    const result = await categoryServices.getAllCategory();

    sendResponse<Category[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all category successfully',
        data: result,
      });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await categoryServices.getSingleCategory(id);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single category successfully',
        data: result,
      });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await categoryServices.updateCategory(id, data);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category updated successfully',
        data: result,
      });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await categoryServices.deleteCategory(id);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category deleted successfully',
        data: result,
      });
});




export const categoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};

