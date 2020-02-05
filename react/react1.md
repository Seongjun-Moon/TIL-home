## 2020.02.05 react 정리

- javascript

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #container {
            padding: 50px;
            background-color: #EEE;
        }
        #container h1 {
            font-size: 70px;
            font-family: sans-serif;
            color: #0080a8;
        }
    </style>
</head>
<body>
    <script>
        function a() {
            alert();
            
            
            var div = document.createElement( 'div' );
            var div_i = document.createElement( 'i' );
            div.appendChild(div_i);
            var div_text = document.createTextNode( 'Why so serious... Bat man' );
            div_i.appendChild( div_text );
            div.setAttribute('id', 'container');
            document.body.appendChild( div );
            document.getElementsByTagName('button')[0].remove();
        }
    </script>
    <button onclick="a()">첫 번째 javascript</button>

    
    
</body>
</html>
```

- jquery

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <style>
        #container {
            padding: 50px;
            background-color: #EEE;
        }
        #container h1 {
            font-size: 70px;
            font-family: sans-serif;
            color: #0080a8;
        }
    </style>
</head>
<body>
    <script>
        $(document).ready(function() {
            $('#text').click(function() {
                alert();
                let div="<div id='container' >"
                    div+="<p><i>Why so serious... Bat man</i></p></div><br>"
                $('#serious_div').html(div);
            });
        });    
    </script>
    <div id="serious_div"><input type="button" id="text" value="첫번째 jquery"></div>
    
    <!-- <div id="container">
        <p><i>Why so serious... Bat man</i></p>
    </div> -->
</body>
</html>
```

- react

```
index.html
==========
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <a href="./react1.html">첫 번째 리액트</a>
</body>
</html>
```

```react
react.html



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
    <style>
        #container {
            padding: 50px;
            background-color: #EEE;
        }
        #container h1 {
            font-size: 70px;
            font-family: sans-serif;
            color: #0080a8;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
          
        
        class HelloWorld extends React.Component{
            render(){ 
                return (
                    <p><i>{this.props.greeting} {this.props.b}</i></p>
                );
            }
        }


        const destination=document.querySelector('#container')
        ReactDOM.render(
        <div>    
            <HelloWorld greeting="Why so serious..." b="Bat man" />
            
            
        </div>,
        destination
        )
    </script>
</body>
</html>
```

