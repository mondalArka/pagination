const jwt=require('jsonwebtoken')

exports.authenticate=(req,res,next)=>{
    if( req.cookies.userToken){
        jwt.verify(req.cookies.userToken,"Arkamondal12345678",(err,data)=>{
           
            req.user=data
            
            next()
        })
    }else{
        next()
    }
}
