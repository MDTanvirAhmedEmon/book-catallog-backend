import { Book } from "@prisma/client";
import httpStatus from "http-status";
import { bookServices } from "./book.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";



const createBook = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await bookServices.createBook(data);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'book created successfully',
        data: result,
      });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, ['minPrice', 'maxPrice', 'category', 'searchTerm']);
    const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
    console.log(filters);
    console.log(options);
    const result = await bookServices.getAllBook(filters, options);

    sendResponse<Book[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all books successfully',
        meta: result.meta,
        data: result.data,
      });
});

const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const result = await bookServices.getBookByCategory(categoryId);

    sendResponse<Book[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get selected category books successfully',
        data: result,
      });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await bookServices.getSingleBook(id);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single book successfully',
        data: result,
      });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    const result = await bookServices.updateBook(id, data);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'update book successfully',
        data: result,
      });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await bookServices.deleteBook(id);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'deleted book successfully',
        data: result,
      });
});


export const bookController = {
    createBook,
    getAllBook,
    getBookByCategory,
    getSingleBook,
    updateBook,
    deleteBook,
};