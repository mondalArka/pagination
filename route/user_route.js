const express=require('express')
const route=express.Router()
const user_cont=require('../controller/userController')
const check=require('../middleware/checkduplicate')

route.get('/',user_cont.home)
route.get('/post',user_cont.auth,user_cont.post)
route.get('/contact',user_cont.contact)
route.get('/register',user_cont.register)
route.get('/login',user_cont.login)
route.get('/viewpost/:id',user_cont.viewpost)
route.get('/logout',user_cont.logout)
route.post('/registration',[check.checkdup],user_cont.registration)
route.post('/login_create',user_cont.login_create)
route.post('/create_post',user_cont.create_post)
route.post('/comment_create/:id',user_cont.auth,user_cont.comment_create)
module.exports=route