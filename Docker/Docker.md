### Docker

문제 풀어보기

\1. Docker Hub에서 Star가 2000개 이상인 nginx 이미지를 기반으로 컨테이너를 실행합니다. 
\2. 컨테이너 생성 시 호스트의 7988 포트와 컨테이너의 80 포트를 맵핑해 줍니다.
\3. 컨테이너에 hello.html 파일을 생성합니다. (세부 조건 3-1~3-3 참조)
3-1. 파일 저장 경로는속 URL 경로를 참고하여 정의합니다.
3-2 nginx의 웹 루트 디렉터리는 “/usr/share/nginx/html/”입니다.
3-3. hello.html 내용은 아래와 같습니다. 







# 안녕하세요. 1반 홍길동입니다.



\4. 호스트의 웹 브라우저로 http://localhost:7988/1-ban/hello.html를 접속하면, 아래와 같은 결과가 출력됩니다. 
안녕하세요. 1반 홍길동입니다. 
\5. 컨테이너를 커밋해서 hello 이미지를 생성하고 생성한 이미지를 Docker Hub에 등록합니다.





Docker 설치 가정하

```
1,2

root@server:~/docker# docker container run -itd --name nginx -p 7988:80 nginx /bin/bash

 => /bin/bash 쉘이 없으면 attach로 붙어도 쓸 수 없음.
```

```
3
root@server:~/docker# docker attach nginx
root@339cfe6050e9:/# mkdir /1-ban
root@339cfe6050e9:/# exit
exit
root@server:~/docker# gedit hello.html
---
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">	
</head>
<body>
	<h1> 안녕하세요. 1반 홍길동입니다 </h1>
</body>
---

```

---

---

---



접속 안됨.

찾아보기1 docker attach 후 exit 했을 때 docker가 background에서 계속 실행되게 하는법

찾아보기2 nginx 웹루트 디렉터리 설정하는법 찾기

찾아보기3 /1-ban에서 /hello.html 폴더 생성 왜 안되는지