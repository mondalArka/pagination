const jwt=require('jsonwebtoken')

exports.admin_authenticate=(req,res,next)=>{
    if( req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,"Arkamondal123456789",(err,data)=>{
           
            req.user=data
            
            next()
        })
    }else{
        next()
    }
}
