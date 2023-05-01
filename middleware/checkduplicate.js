const user=require('../model/user')

exports.checkdup=(req,res,next)=>{
    user.findOne({
        name:req.body.name
    }).exec((err,data)=>{
        if(data){
            req.flash('message1','Name already exists')
           return res.redirect('/register')
        }
        user.findOne({
            email:req.body.email
        }).exec((err,data)=>{
            if(data){
                req.flash('message1','Email already exists')
               return res.redirect('/register')
            }

            const password=req.body.password
            const confirm=req.body.confirm
            if(password!=confirm){
                req.flash('message1','Password and Confirm password did not match')
                return res.redirect('/register')
            }
            next()
    })
})
}