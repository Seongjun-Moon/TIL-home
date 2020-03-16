const express=require('express');
const app=express();
const cors=require('cors');
const session=require('express-session');
const sequelize=require('./models').sequelize;
sequelize.sync();

const corsOptions ={
    origin:true,
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    resave :false,
    saveUninitialized:true,
    secret:"미녀 강사 전은수",
    cooke:{
        httpOnly:true,
        secure:false
    }
}))

app.use('/member', require('./routes/memberRouter'));
app.use('/post', require('./routes/postRouter'));

app.listen(8080, ()=>{
    console.log("8080 server ready~!")
})