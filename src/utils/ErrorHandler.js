  const ErrorHandler=(err,req,res,next)=>{
    console.log(err.stack);
    return res.status(500).json({
        message: "unexpected Server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
    
}
export default ErrorHandler;