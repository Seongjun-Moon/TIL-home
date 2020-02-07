## react

- 게임 만들기

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
        class MyBall extends React.Component{
            aaa;
            state={
                ball_top:Math.random()*500,
                ball_left:Math.random()*500,
                ball_bgcolor:"yellow"
            }
            changeBallPosition=()=>{
                this.setState({
                    ball_top:Math.random()*500,
                    ball_left:Math.random()*500,
                });
            }
            componentDidMount() {
                this.aaa=setInterval(this.changeBallPosition, 200);
            }
            
            componentWillUnmount() {
                clearInterval(this.aaa);
            }

            catchMe=()=>{
                this.setState({
                    ball_bgcolor:"red"
                });
                clearInterval(this.aaa);
            }

            render(){
                const h3Style={
                    backgroundColor:this.state.ball_bgcolor,
                    width:100,
                    height:100,
                    borderRadius:50,
                    textAlign:"center",
                    position:"fixed",
                    lineHeight:2.5,
                    top:this.state.ball_top,
                    left:this.state.ball_left
                }

                return(
                    <h3 onClick={this.catchMe} style={h3Style}>나를 잡아봐~</h3>
                )
            }
        }
        
        class MyGamePanel extends React.Component{
            
            state={
                balls:[],
                score:0
            }
            
            createBalls=(B)=> {
                this.state.balls=[];
                for(let i=0; i<this.input_startNum.value; i++){
                    let a=<div key={i}> <MyBall ref={ref=>this.myball=ref} /></div>;
                    
                    this.state.balls[i]=a
                }
                this.setState({
                   
                });
                
                console.log(this.state.balls);
                this.input_startNum.focus();
                this.input_startNum.value=""
            }
            
            render() {
                const divStyle={
                    backgroundColor:"gray",
                    width:600,
                    height:600,
                }
                
                return(
                    <div>
                    <input ref={ref=>this.input_startNum=ref}></input>
                    <button onClick={this.createBalls} >start</button>
                    
                    <div style={divStyle}>  
                        
                        <div>
                        {this.state.balls}                
                        </div>
                    </div>
                    </div>
                )
            }
        }

        

        ReactDOM.render(
            <MyGamePanel />,
            document.querySelector("#container")
        );
    </script>
</body>
</html>
```

