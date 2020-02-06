## react

- state 선언 및 화살표함수

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
        class MyCounter extends React.Component{
            state={
                counter:0
            };
            // 본문에 들어갈 counter를 state 선언을 통해 정의
            

            timerTick=()=>{
                this.setState({
                    counter: this.state.counter + 100
                });
                 
            }
            // 화살표 함수가 없으면(timertick(){}) binding이 안됨. 즉, 객체의 종속성이 떨어져 counter가 이 class 내에 있다고 판단하지 않고, class 외부인 window(객체)에서 찾게됨. 화살표 함수를 통해 binding을 하면 함수의 독립성을 없애게 되고, 정의한 것처럼 counter 값을 1초에 100씩 증가시킴.

            componentDidMount(){
                setInterval(this.timerTick,1000);
            }
            // 1초에 한번씩 나타내게(setInterval) 하는 메소드(componentDidMount)
            
            render() {
                return(
                    <h1> {this.state.counter} </h1>
                )
            }
            
            //  이 클래스 안의 state의 countr 값을 render로 호출.
        }
        
        ReactDOM.render(
            <MyCounter />, 
            document.querySelector('#container'));
    </script>
</body>
</html>
```

