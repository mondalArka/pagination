const express=require('express')
const route=express.Router()
const admin_cont=require('../controller/adminController')
route.get('/admin/login',admin_cont.login)
route.get('/admin/dashboard',admin_cont.auth,admin_cont.dashboard)
route.get('/admin/login',admin_cont.login)
route.get('/admin/posts',admin_cont.auth,admin_cont.posts)
route.get('/admin/comments',admin_cont.auth,admin_cont.comments)
route.get('/admin/logout',admin_cont.logout)
route.get('/activepost/:id',admin_cont.activepost)
route.get('/deactivepost/:id',admin_cont.deactivepost)
route.get('/deactivecomment/:id',admin_cont.deactivecomment)
route.get('/activecomment/:id',admin_cont.activecomment)
route.get('/admin/user',admin_cont.auth,admin_cont.getUser)
route.post('/admin/login_create',admin_cont.login_create)


module.exports=route