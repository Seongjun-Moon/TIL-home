const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const User=require('../models').User;


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });


/* router.post('/insert', (req,res)=>{
    res.json({message:`${req.body.email}`})
}) */

router.post('/insert', async (req,res)=>{
    const nick=req.body.name;
    const email=req.body.email;
    const password=req.body.pw;
    const comments=req.body.comments
   try{
    const result=await User.create({
        email,
        nick,
        password
    });
    console.log(result);
    res.json({message:nick});
    }catch(err){
        res.json({message:false});
    }
    
});

/* router.post('/insert', (req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const pw=req.body.pw;
    const comments=req.body.comments
    var sql = "INSERT INTO members (name, email, password, comments) VALUES (?, ?, ?, ?)";
    con.query(sql, [name, email, pw, comments], function (err, result) {
    if (err) {
        res.json({message:false})
    }else {
        res.json({message:name})
    }
    console.log("1 record inserted");
    });
    
}); */

router.get('/logout', (req,res) =>{
   req.session.destroy(()=>{
    res.json({message:true})
   });
   
});

/* const user={id:"a"}

router.post('/login', (req,res) =>{
    if(user.id === req.body.email){
        res.json({message:`${user.id}님 로그인`})
    }else{
        res.json({message:`다시 로그인`})
        
    }
}) */

router.post('/login', async (req,res) =>{
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.pw;
   
        try{
            const result=await User.findOne({where:{email,password}})
            
            res.json({
                message:result.nick,
                id: result.id
            });
            
            res.json({nick: result.nick, id:result.id});
        }
        catch(err) {
            res.json({message:false});
        }
    
    
});



module.exports=router;