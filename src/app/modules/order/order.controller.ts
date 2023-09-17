import { Order } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { orderServices } from "./order.services";



const createOrder = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const data = req.body;

    const result = await orderServices.createOrder(user ,data.orderedBooks);

    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order created successfully',
        data: result,
      });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {

    const result = await orderServices.getAllOrders();

    sendResponse<Order[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get all orders successfully',
        data: result,
      });
});

const getSpecificCustomerOrder = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;

    console.log(user)
    const result = await orderServices.getSpecificCustomerOrder(user);

    sendResponse<Order[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get specific customer order successfully',
        data: result,
      });
});

export const orderController = {
    createOrder,
    getAllOrders,
    getSpecificCustomerOrder,
};