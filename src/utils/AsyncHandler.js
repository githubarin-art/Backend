import  ConnectDb  from '../db/index.js';

const asyncHandler = (HandlerWrapper) => {
    return async function (req, res, next) {
        // Fixed 'eq' to 'req'
        try {
            await ConnectDb(); // Ensure the database is connected
            return await HandlerWrapper(req, res, next);
        } catch (error) {
            console.error("Error occurred", error);
            next(error); // Pass the error to the next middleware
        }
    };
};


export { asyncHandler };