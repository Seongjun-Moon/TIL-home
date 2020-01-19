## Javascript

- 이벤트 모델별 이벤트 객체 처리

```
<!DOCTYPE html>
<html>
<head>
	<title></title>

</head>
<body>
	

	<script>
		window.onload=function(){
			document.getElementByID("old").onclick=eventHandler;
			document.getElementByID("old").onmouseover=eventHandler;
			document.getElementByID("standard").addEventListener("click", eventHandler);
			document.getElementByID("standard").addEventListener("mouseover",eventHandler);
		}
	function eventHandler(e){
		var output=e+":"e.type+"이벤트가 발생함!";
		var obj=document.getElementByID("result");
		obj.innerHTML=output;
	}


	</script>

	<h4>이벤트 모델의 이벤트 객체 처리</h4>
	인라인 이벤트 모델:
	<button onclick="eventHandler(event);" onmouseover="eventHandler(event);">이벤트 발생</button><br>
	고전 이벤트 모델:
	<button id="old">이벤트 발생</button><br>
	표준 이벤트 모델:
	<button id="standard">이벤트 발생</button><br><hr>
	<div id="result"></div>
</body>
</html>
```

> 수정해서 실행되게 하기

```
수정본
<!DOCTYPE html>
<html>
<head>
	<title></title>

</head>
<body>
	

	<script>
		window.onload=function(){
			document.getElementById("old").onclick=eventHandler;
			document.getElementById("old").onmouseover=eventHandler;
			document.getElementById("standard").addEventListener("click", eventHandler);
			document.getElementById("standard").addEventListener("mouseover",eventHandler);
		}
	function eventHandler(e){
		var output=e+":"e.type+"이벤트가 발생함!";
		var obj=document.getElementByID("result");
		obj.innerHTML=output;
	}


	</script>

	<h4>이벤트 모델의 이벤트 객체 처리</h4>
	인라인 이벤트 모델:
	<button onclick="eventHandler(event);" onmouseover="eventHandler(event);">이벤트 발생</button><br>
	고전 이벤트 모델:
	<button id="old">이벤트 발생</button><br>
	표준 이벤트 모델:
	<button id="standard">이벤트 발생</button><br><hr>
	<div id="result"></div>
</body>
</html>
```

-  change 이벤트

```
<!DOCTYPE html>
<html>
<head>
	<title></title>

</head>
<body>
	<p>구매할 차종의 제작사(브랜드)를 선택하세요</p>
	<select id="mySelect" onchange="f()">
			<option value="아우디">Audi
			<option value="BMW">BMW
			<option value="메르세데스">Mercedes
			<option value="볼보">Volvo
	
	</select>
	<p id="demo"></p>
	<script>
		function f() {
			var x=document.getElementByID("mySelect").value;
			document.getElementByID("demo").innerHTML=x+"의 차를 선택하셨습니다";
		}
	</script>

	
</body>
</html>
```

> 수정해서 실행되게 하기
```
<!DOCTYPE html>
<html>
<head>
	<title></title>

</head>
<body>
	<p>구매할 차종의 제작사(브랜드)를 선택하세요</p>
	<select id="mySelect" onchange="f()">
			<option value="아우디">Audi
			<option value="BMW">BMW
			<option value="메르세데스">Mercedes
			<option value="볼보">Volvo
	
	</select>
	<p id="demo"></p>
	<script>
		function f() {
			var x=document.getElementById("mySelect").value;
			document.getElementById("demo").innerHTML=x+"의 차를 선택하셨습니다";
		}
	</script>

	
</body>
</html>
```
