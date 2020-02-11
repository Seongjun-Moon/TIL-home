## react

- TodoList 심화(sql, server 연동)

```
TodoList.jsx
============

import React, {Component} from 'react';
import TodoItem from './TodoItem'
import $ from 'jquery';



class TodoList extends Component {
    componentWillMount(){
        //render 되기 전에 서버 접속
        $.get('http://localhost:8080', (returnData)=>{
            console.log(returnData.message);
        })
    }
    state={
        items:[]
    }

    deleteItem=(key)=>{
        const send_param={
            key
        }
        $.post('http://localhost:8080/item/delete', send_param, (returnData)=>{
            if(returnData.message){
                const filteredItems=this.state.items.filter((items)=>{
                    return items.key !== key;
                });
                this.setState({
                    items:filteredItems
                })
                
            } else {
                alert("일정 삭제 오류")
            }
            
        })
        
    }
    
    addItem=()=>{
        const send_param={
            text :this.inputE.value,
            key:Date.now()
        }
        $.post('http://localhost:8080/item/add', send_param, (returnData)=>{
            if(returnData.message){
                this.state.items.unshift(send_param);
                this.setState({
                    items:this.state.items
                })
            }else{
                alert("일정 추가 오류")
            }
        });
        

        this.inputE.value=""
        this.inputE.focus();
    }
    
    render() {
        return (
            <div>
                <div>
                    <input ref={ref=>this.inputE=ref}></input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItem items={this.state.items} superDelete={this.deleteItem} />
            </div>
        )
    }
}

export default TodoList;
```

> open Folder -> todolist_server

```
server.js
=========
const express=require("express");
const app=express();
const cors=require("cors");
const itemRouter=require('./routes/item')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/item', itemRouter)

app.get('/', (req,res)=>{
    console.log("요청 받음")
    res.json({message:"ok"})
})




app.listen(8080, ()=>{
    console.log("8080 server ready!!!!!")
})
```

```
item.js
=======
const express=require('express');
const router=express.Router();
const mysql=require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port: "3306",
    database: "nodejs"
  });

router.post('/delete', (req, res) => {
    
    const key=parseInt(req.body.key);
    var sql = `DELETE FROM todolist WHERE \`key\` = ${key}`;
  con.query(sql, function (err, result) {
    if (err) {
        res.json({message:false});
    }else{
        console.log("Number of records deleted: " + result.affectedRows);
        res.json({message:true});
    }
    
  });

    
})

router.post('/add', (req, res) => {
    console.log(req.body);
   
        const key=parseInt(req.body.key);
        var sql = `INSERT INTO todolist (\`key\`, text) VALUES (${key},'${req.body.text}')`;
        con.query(sql, function (err, result) {
          if (err){
              console.log(err);
            res.json({message:false});
          }else {
            console.log("1 record inserted");
            res.json({message:true})
          }
        });
      
    
});



module.exports=router;
```

