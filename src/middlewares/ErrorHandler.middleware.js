import APIRESPONSE from '../utils/APIRESPONSE.js';
export const ResponseErrorHandler=(err,req,res,next)=>{
    console.error(err.stack);
    const response=new APIRESPONSE(null,err.status||500,err.message||"Internal response error ")
    res.status(response.status).json(response);
}