export const  requestHandler=(err,req,res,next)=>{
     const status=err.statusCode||500;
     const message=err.message||"Request issue..."
     console.log(`${req.method} ${req.url}`)
}
// next();  