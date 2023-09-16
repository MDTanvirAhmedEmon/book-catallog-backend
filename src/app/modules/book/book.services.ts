import { Book, Prisma, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IBookFiltersRequest } from "./book.interface";

const prisma = new PrismaClient();


const createBook = async (data: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data,
        include: {
            category: true,
        }
    });
    return result;
};

const getAllBook = async (filters: IBookFiltersRequest, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {

    const { searchTerm, ...filtersData } = filters;

    const {page, size, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(options);

    const andConditions = [];

    // search term
    if(searchTerm){
        andConditions.push({
            OR: ['title', 'author', 'genre', ].map((searchOption) => ({
                [searchOption]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                }
            }))
        })
    };

    // filters
    if (filtersData.minPrice) {
        andConditions.push({
          price: {
            gte: parseFloat(filtersData.minPrice),
          },
        });
      }
    
      if (filtersData.maxPrice) {
        andConditions.push({
          price: {
            lte: parseFloat(filtersData.maxPrice),
          },
        });
      }
    
      if (filtersData.category) {
        andConditions.push({
          categoryId: filtersData.category,
        });
      }

    const whereCondition: Prisma.BookWhereInput = andConditions.length > 0 ? { AND: andConditions }: {}; 


    const result = await prisma.book.findMany({

        where: whereCondition,
        // where: {
        //     AND: {
        //         OR: [
        //             {
        //                 title: {
        //                     contains: searchTerm,
        //                     mode: 'insensitive',
        //                 }
        //             },
        //             {
        //                 author: {
        //                     contains: searchTerm,
        //                     mode: 'insensitive',
        //                 }
        //             },
        //             {
        //                 genre: {
        //                     contains: searchTerm,
        //                     mode: 'insensitive',
        //                 }
        //             }
        //         ]
        //     },
        // },
        skip,
        take: size,
        orderBy: {
            [sortBy]: sortOrder
        },
    });

    const total = await prisma.book.count();
    const totalPage = Math.ceil(total / size);

    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result
    }
};


export const bookServices = {
    createBook,
    getAllBook,
};