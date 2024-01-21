import { Request } from "express";
export {IRequest}

// declare global {
//     namespace Express {
//         interface Request {
//             user?: any,
//         }
//     }
// }

interface IRequest extends Request{
    user?: any,
}

