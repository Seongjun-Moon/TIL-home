## react

- 쿠키(세션의 key 역할)

```
import React, {Component} from 'react';
import './Menu.css';
import $ from 'jquery';
import { NavLink,HashRouter} from 'react-router-dom';
import {} from 'jquery.cookie';

class Menu extends Component {
    state={
        login_email:"",
        login_sytle:"inline-block",
        logout_style:"none"
    }
    
    logout=()=>{
        $.get('http://localhost:8080/member/logout', (returnData)=>{
            if(returnData.message){
                $.removeCookie("login_name");
                this.setState({
                    login_email:"",
                    login_sytle:"inline-block",
                    logout_style:"none"
                })
            }
            this.emailE.focus();
        })
    }

    login=()=>{
        const send_param={
            email:this.emailE.value,
            pw:this.pwE.value
        }
        $.post('http://localhost:8080/member/login', send_param, (returnData)=>{
            if(returnData.message){
                $.cookie("login_name", returnData.message)
                this.setState({
                    login_email:returnData.message,
                    login_sytle:"none",
                    logout_style:"inline-block"
                });
                
            } else {
                alert("login fail");
            }
            this.emailE.value=""
            this.pwE.value=""
            
        } );
        
    }
    
    render() {
        const login_sytle={
            display:this.state.login_sytle
        }
        const logout_style={
            display: this.state.logout_style
        }

        let login_name;
        if($.cookie("login_name")){
            login_name=$.cookie("login_name");
            login_sytle.display="none";
            logout_style.display="inline-block";
        }
        let visibility = "hide";

        if (this.props.menuVisibility) {
            visibility ="show"
        }
        return(
            <HashRouter >
            <div id="flyoutMenu" onDrag={this.props.handleMouseDown} className={visibility}>
                <div style={login_sytle}>
                    이메일 <input ref={ref=>this.emailE=ref}/><br />
                    비밀번호 <input type="password" ref={ref=>this.pwE=ref}/><br />
                    <button onClick={this.login}>로그인</button>
                    <NavLink to ="Contact">
                    <button onClick={this.props.handleMouseDown}>회원가입</button>
                    
                    </NavLink>
                </div>
                <div style={logout_style} >
                    {login_name} 님 환영합니다.
                    <button onClick={this.logout}>logout</button>
                </div>
                <h2><a href="/">Home</a></h2>
                <h2><a href="/">About</a></h2>
                <h2><a href="/">Contact</a></h2>
                <h2><a href="/">Search</a></h2>
            </div>
            </HashRouter>
        )
    }
}


export default Menu;
```

- 세션

```
const express=require('express');
const router=express.Router();
const mysql=require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });




router.post('/insert', (req,res)=>{
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
    
});

router.get('/logout', (req,res) =>{
   req.session.destroy(()=>{
    res.json({message:true})
   });
   
});

router.post('/login', (req,res) =>{
    console.log(req.body);
    var email = req.body.email;
    var pw = req.body.pw;
    var sql = 'SELECT * FROM members WHERE email =? and  password= ?';
    con.query(sql, [email, pw], function (err, result) {
    if (err) {
        res.json({message:false})
    }else{
        req.session.email=email;
        res.json({message:result[0].name})
    }
    console.log(result);
    });
    
});

module.exports=router;
```

