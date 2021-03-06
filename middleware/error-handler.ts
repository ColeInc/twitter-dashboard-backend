import { ErrorRequestHandler } from "express";
import { CustomAPIError } from "../errors";

// const errorHandlerMiddleware = (err: Errback, req: Request, res: Response, next: NextFunction) => {
const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    // Set the error we're returning to a status code/msg explictly passed in, else use default values:
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later.",
    };

    // handling CastErrors thrown when user searches for job that no longer exists:
    // if (err.name === "CastError") {
    //     customError.msg = `No item found with id of ${err.value}`;
    //     customError.statusCode = 404;
    // }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
