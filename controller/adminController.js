const user=require('../model/user')
const postModel=require('../model/post')
const com=require('../model/comment')
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')

const dashboard=(req,res)=>{
    if(req.user){
        res.render('./admin/dashboard',{
            data:req.user      
        })
}       
}

const login=(req,res)=>{
    adminlogindetails={}
    adminlogindetails.email=req.cookies.email?req.cookies.email:undefined
   adminlogindetails.password=req.cookies.password?req.cookies.password:undefined
    res.render('./admin/login',{
        message:req.flash('message'),
        message1:req.flash('message1'),
        data:req.user,
        data1:adminlogindetails
    })
}
const login_create=(req,res)=>{
    user.findOne({email:req.body.email}).exec((err,data)=>{
        if(data){
            const hashpassword=data.password
            if(bcrypt.compareSync(req.body.password,hashpassword)){
                const token=jwt.sign({
                    id:data._id,
                    username:data.name,
                    picture:data.image
                },'Arkamondal123456789',{expiresIn:'10m'})
                res.cookie('adminToken',token)
                if(req.body.rememberme){
                    res.cookie('email',req.body.email)
                    res.cookie('password',req.body.password)
                }
                res.redirect('/admin/dashboard')
            }else{
                req.flash('message',"Invalid Password")
            res.redirect('/admin/login')
            }
        }else{
            req.flash('message',"Invalid Email")
            res.redirect('/admin/login')
        }
    })
    }
    const auth=(req,res,next)=>{
        if(req.user){
            console.log(req.user);
            next()
        }else{
            req.flash('message1',"Login Again")
            res.redirect('/admin/login')
        }
    }
   

    const comments=(req,res)=>{
        
        com.find().populate('post').populate('user').then(result=>{
            console.log(result);
            res.render('./admin/comments',{
                displayData:result,
                data:req.user
            })
        })
    
    }
    const deactivecomment=(req,res)=>{
        const com_id=req.params.id
        com.findByIdAndUpdate(com_id,{status:false}).then(result=>{
            res.redirect('/admin/comments')
        })
    }
    const activecomment=(req,res)=>{
        const com_id=req.params.id
        com.findByIdAndUpdate(com_id,{status:true}).then(result=>{
            res.redirect('/admin/comments')
        })
    }
    const getUser=(req,res)=>{
        
        user.find().then(result=>{
            res.render('./admin/users',{
                data:req.user,
                displayData:result
            })
        })
   
    }
    const posts=(req,res)=>{
        console.log(req.user);
        const allpost=postModel.find().populate('user').then(result=>{
            console.log(result);
            res.render('./admin/posts',{
                displayData:result,
                data:req.user
            })
        })
        
    }
    const logout=(req,res)=>{
        res.clearCookie('adminToken')
        res.redirect('/admin/login')
    }

    const activepost=(req,res)=>{
        const id=req.params.id
        postModel.findByIdAndUpdate(id,{status:true}).then(result=>{
            res.redirect('/admin/posts')
        })
    }
    const deactivepost=(req,res)=>{
        const id=req.params.id
        postModel.findByIdAndUpdate(id,{status:false}).then(result=>{
            res.redirect('/admin/posts')
        })
    }
module.exports={
    login,
    dashboard,
    login_create,
    login,
    auth,
    comments,
    posts,
    logout,
    activepost,
    deactivepost,
    deactivecomment,
    activecomment,
    getUser
}