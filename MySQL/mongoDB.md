## mongoDB

```
index.html
==========

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
</head>
<body>
    <input id='name' placeholder="이름"><br>
    <input id='age' placeholder="나이"><br>
    <input type="checkbox">결혼 여부<br>
    <button id="addMember">등록</button>
    <button id="updateMember">수정</button>

    <button id="getAllMember">모든 멤버 보기</button>
    <br><hr><br>
    <input id='user_id' placeholder="사용자 아이디"><br>
    <input id='comment' placeholder="댓글"><br>
    <button id="commentAdd">등록</button>
    

    <div id='all_div'></div>
    <script>
        function deleteMember(_id) {
            $.post('/member/delete',{_id}, function(returnData){
                alert(returnData.message)
            })
        }
        function display(_id, name, age, comment, married) {
            $.cookie('_id', _id);
            console.log($.cookie('_id'));

            $('#name').val(name);
            $('#age').val(age);
            $('#comment').val(comment);
            $('#user_id').val(_id);
            if(married){
                $('input[name="married"]').prop("checked", true);
            }else{
                $('input[name="married"]').prop("checked", false);
            }
        }
        

        $(document).ready(function(){
            $('#commentAdd').click(function(){
                const _id=$.cookie('_id');
                const comment=$('#comment').val();
                const send_param={
                    _id, comment
                }
                $.post('/member/comment', send_param, function(returnData){
                    alert(returnData.message);
                })
            })

            $('#updateMember').click(function(){
                const _id=$.cookie('_id');
                const name=$('#name').val();
                const age=$('#age').val();
                const married=$('input[name="married"]').is("checked");
                const send_param={
                    _id,name, age, married
                }
                $.post('/member/update', send_param, function(returnData){
                    alert(returnData.message);
                })
            })
            $('#addMember').click(function() {
                const name=$('#name').val();
                const age=$('#age').val();
                const married=$('input[name="married"]').is("checked");
                const send_param={
                    name, age, married
                }
                $.post('/member/add', send_param, function(returnData){
                    alert(returnData.message);
                })
            })
            $('#getAllMember').click(function(){
                $.post('/member/getAllUser',{}, function(returnData){
                    console.log(returnData.users);
                    let result=`<table border="1"><tr><td>아이디</td><td>이름</td>`
                        result+=`<td>나이</td><td>결혼</td><td>댓글</td><td>삭제여부</td></tr>`;

                    returnData.users.forEach((e)=>{
                        result+=`<tr><td onclick="display('${e._id}','${e.name}','${e.age}','${e.comment}', '${e.married}')">${e._id}</td><td>${e.name}</td><td>${e.age}</td><td>${e.married}</td>`
                        result+=`<td>${e.comment}</td><td><button onclick="deleteMember('${e._id}')">삭제</button></td></tr>`;

                    });
                    result+='</table>';
                    $('#all_div').html(result);
                })
            })
        })
    </script>
</body>
</html>
```

```
mongo_userRouter.js
===================

const express=require('express');
const router=express.Router();
const User=require('../schemas/user');

router.post('/comment', async (req,res)=>{
    try{
        const result= await User.update({_id:req.body._id}, {_id:req.body._id, comment:req.body.comment});
        res.json({result});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

router.post('/delete', async (req,res)=>{
    try{
        const result= await User.remove({_id:req.body._id});
        res.json({result});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

router.post('/update', async (req,res)=>{
    try{
        const result= await User.update({_id:req.body._id}, {name:req.body.name, age:req.body.age, married:req.body.married});
        res.json({result});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})


router.post('/add', async (req,res)=>{
    try{
        const user=new User(req.body);
        const result=await user.save();
        res.json({result});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

router.post('/getAllUser', async (req,res)=>{
    try{

        const users=await User.find({});
        res.json({users})
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

module.exports=router;
```

