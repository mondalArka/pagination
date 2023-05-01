const express=require('express')
const ejs=require('ejs')
const mongoose=require('mongoose')
const path=require('path')
const flash=require('connect-flash')
const session=require('express-session')
const cookie=require('cookie-parser')
const multer=require('multer')
const verify=require('./middleware/verify')
const admin_verify=require('./middleware/admin_verify')
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookie())
app.use(flash())
app.use(session({
    cookie:{maxAge:6000},
    secret:"Arka",
    resave:false,
    saveUninitialized:false
}))
app.use('/upload',express.static(path.join(__dirname,'upload')))
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const filefilter=(req,file,cb)=>{
    if(file.mimetype.includes("png")||
    file.mimetype.includes("jpg")||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
app.use(multer({storage:filestorage,fileFilter:filefilter,limits:{fieldSize:1024*1024*5}}).single('image'))


app.set('view engine','ejs')
app.set('views','views')

const user_route=require('./route/user_route')
const admin_route=require('./route/admin_route')
app.use(verify.authenticate)
app.use(user_route)
app.use(admin_verify.admin_authenticate)
app.use(admin_route)

const port=2345

const dbCon="mongodb+srv://Arka:rkAozOH726ywp06F@cluster0.zjvh01u.mongodb.net/small_project"
mongoose.connect(dbCon,({useNewUrlParser:true,useUnifiedTopology:true})).then(result=>{
    app.listen(port,()=>{
        console.log(`server started http://localhost:${port}`);
    })
}).catch(err=>{
    console.log(err);
})

