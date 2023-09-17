import { Order, OrderedBook, PrismaClient } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createOrder = async (user: any | null, orderedBooksData: OrderedBook[]): Promise<Order | null> => {

  const newOrder = await prisma.order.create({
    data: {
      userId: user.userId,
      status: 'pending',
    },
  });

  const createdOrderedBooks = [];

  for (const data of orderedBooksData) {
    const orderedBook = await prisma.orderedBook.create({
      data: {
        orderId: newOrder.id,
        bookId: data.bookId,
        quantity: data.quantity,
      },
    });

    createdOrderedBooks.push(orderedBook);
  }

  const result = await prisma.order.findUnique({
    where: {
        id: newOrder.id
    },
    include: {
        orderedBooks: true
    }
  });

  return result;

};

const getAllOrders = async(): Promise<Order[]> => {
    const result = await prisma.order.findMany({
        include: {
            orderedBooks: true
        }
    });
    return result;
};

const getSpecificCustomerOrder = async (user:  any | null): Promise<Order[] | null> =>{
    console.log('service',user.userId);

    if (!user || !user.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user object or missing userId.");
      }

    const result = await prisma.order.findMany({
        where: {
            userId: user.userId
        },
        include: {
            orderedBooks: true
        }
    });
    return result;
};


export const orderServices = {
  createOrder,
  getAllOrders,
  getSpecificCustomerOrder,
};
