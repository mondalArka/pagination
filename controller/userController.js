const user=require('../model/user')
const postModel=require('../model/post')
const comment=require('../model/comment')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const path=require('path')
var c=0

const home=(req,res)=>{
    if(req.query.search){
        const search=req.query.search
     
    postModel.find({$or:[
        {title:{$regex:'.*'+search+'.*',$options:'i'}},
        {subTitle:{$regex:'.*'+search+'.*',$options:'i'}},
        
    ]}).populate('user').then(result=>{
        res.render('./user/home',{
            data:req.user,
            displayData:result,
            totalpages:0
    })
   

    })

}else{
    const limit=2
    const page=req.query.page || 1
    var count
    var counting=postModel.find().count(function(err,data){
        console.log("counting of datas"+data);
         count=data
    
    console.log("Count data"+count);
    var totalpages=Math.ceil(count/limit)
    console.log("Total pages"+totalpages);
    postModel.find().populate('user').limit(limit).skip((page-1) * limit).then(result=>{
        
       
        res.render('./user/home',{
            data:req.user,
            displayData:result,
            totalpages:Math.ceil(count/limit)
    })
   
})
})
}
}
const post=(req,res)=>{
    if(req.user){
        const id=req.user
        user.findById(id.id).then(result=>{
            console.log(result);
            res.render('./user/post',{
                message:req.flash('message'),
                data:req.user,
                result:result
            })
        })  
    }
    
}
const viewpost=(req,res)=>{
    const view_id=req.params.id
    console.log(view_id);
    
        postModel.findById(view_id).populate('user').then(result=>{
            
         comment.find().populate('user').populate('post').then(result2=>{
                console.log(result2);
                    res.render('./user/viewpost',{
                        data:req.user,
                        postData:result,
                        com:result2,
                        id:view_id,
                        message:req.flash('message')
                    })
                
            })
            
        })
    
}
const create_post=(req,res)=>{
  const  image=req.file
  const id=req.user
    const create=new postModel({
        title:req.body.title,
        subTitle:req.body.subtitle,
        postText:req.body.post,
        image:image.path,
        user:id.id
    })
    const saving=create.save().then(result=>{
        req.flash('message','Post Successfully Created')
        res.redirect('/post')
    })
}
const contact=(req,res)=>{
    res.render('./user/contact',{
        data:req.user
    })
}
 const comment_create=(req,res)=>{
    const id=req.user
    const user_id=id.id
 const com_id=req.params.id
 console.log(com_id);
 const add= new comment({
     comment:req.body.comment,
     post:com_id,
     user:user_id
 })
 const saving= add.save().then(result=>{
     req.flash('message','Comment Added')
    res.redirect(`/viewpost/${com_id}`)
 })
}

const register=(req,res)=>{
    res.render('./user/register',{
        message:req.flash('message'),
        message1:req.flash('message1'),
        data:req.user
    })
}
const login=(req,res)=>{
    logindetails={}
    logindetails.email=req.cookies.email?req.cookies.email:undefined
    logindetails.password=req.cookies.password?req.cookies.password:undefined
    if(c%2!=0){
        c=0
        res.render('./user/login',{
            message:req.flash('message'),
            message1:req.flash('message1'),
            data:req.user,
            data1:logindetails
        })
    }else{
        c=0
        res.render('./user/login',{
            message:req.flash('message'),
            message1:req.flash('message1'),
            data:req.user,
            data1:""
        })
    }
        
  
    
}
const registration=(req,res)=>{
    const image=req.file
const data=new user({
    name:req.body.name,
    email:req.body.email,
    image:image.path,
    password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
    phone:req.body.phone
    
})
  data.save().then(result=>{
    req.flash('message','Registration Successful')
    res.redirect('/login')
})
}
const login_create=(req,res)=>{

user.findOne({email:req.body.lemail}).exec((err,data)=>{
    if(data){
        const hashpassword=data.password
        if(bcrypt.compareSync(req.body.lpassword,hashpassword)){
            const token=jwt.sign({
                id:data._id,
                username:data.name
            },'Arkamondal12345678',{expiresIn:'10m'})
            res.cookie('userToken',token)
            if(req.body.remember){
                c=c+1;
                console.log(c);
                res.cookie('email',req.body.lemail)
                res.cookie('password',req.body.lpassword)
            }
            res.redirect('/post')
        }else{
            req.flash('message',"Invalid Password")
        res.redirect('/login')
        }
    }else{
        req.flash('message',"Invalid Email")
        res.redirect('/login')
    }
})
}
const auth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next()
    }else{
        req.flash('message1',"Login First")
        res.redirect('/login')
    }
}
const logout=(req,res)=>{
    res.clearCookie('userToken')
    res.redirect('/login')
}
module.exports={home,post,viewpost,comment_create,create_post,contact,register,registration,login,login_create,auth,logout}