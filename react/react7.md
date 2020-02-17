## react

- follower 기능 추가

```
postRouter.js
=============

router.post('/follow', async (req, res)=>{
    try{
        const followerId=req.body.followerId
        const id = req.body.followingId

        const result= await User.findOne({
            where: {id}
        });
        result.addFollowers(followerId);

        res.json({message: true, result});
        }catch(err){
            console.log(err)
            res.json({message:false})
        }
});
```

```
Post.jsx
========

follow_btn= async (userId)=>{
        const send_param={
            headers,
            followerId:$.cookie("login_id"),
            followingId:userId
        }
        try {
            const result= await axios.post('http://localhost:8080/post/follow', send_param);
            
            console.log(result.data.result);
        }catch(err) {
            console.log(err);
        }
    }
    
    
    
let follow=<button onClick={()=> this.follow_btn(post.user.id)}>팔로우하기</button>
```



