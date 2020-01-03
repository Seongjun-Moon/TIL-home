### Docker

##### 19-12-28

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
</html>
---

접속 안됨.

찾아보기1 docker attach 후 exit 했을 때 docker가 background에서 계속 실행되게 하는법

찾아보기2 nginx 웹루트 디렉터리 설정하는법 찾기


찾아보기3 /1-ban에서 /hello.html 폴더 생성 왜 안되는지
```

---

---

---

##### 19-12-29

접속 안됨.

찾아보기1 docker attach 후 exit 했을 때 docker가 background에서 계속 실행되게 하는법

???

찾아보기2 nginx 웹루트 디렉터리 설정하는법 찾기

```
docker contaienr run -itd --name nginx -p 7988:80 -w /usr/share/nginx/html/ nginx /bin/bash
```



찾아보기3 /1-ban에서 /hello.html 폴더 생성 왜 안되는지

```
root@server:~/docker# docker attach nginx
root@3e09d5a02c9e:/usr/share/nginx/html# mkdir 1-ban
root@3e09d5a02c9e:/usr/share/nginx/html# cd 1-ban/
root@3e09d5a02c9e:/usr/share/nginx/html/1-ban# mkdir hello.html
root@3e09d5a02c9e:/usr/share/nginx/html/1-ban# cd hello.html/

```



=> http://localhost:7988/1-ban/hello.html 접속하면 여전히 Server not found 뜸.



---

---

---



##### 20-01-01

```
root@server:~# docker container run -d --name nginx -p 7988:80 -w /usr/share/nginx/html nginx
8f975886711868456fe1465c02b7aa65073e47ce9582cc331eca4fc926fb953f
root@server:~# docker exec nginx mkdir 1-ban
root@server:~# docker exec nginx mkdir 1-ban/hello.html
root@server:~# cd docker/
root@server:~/docker# docker container cp ./hello.html nginx:/usr/share/nginx/html/1-ban/hello.html
```

> Not Found
>
> The requested URL /1-ban/hello.html/ was not found on this server.
> Apache/2.4.18 (Ubuntu) Server at localhost Port 80
> 라고  뜸.
>
> localhost:7988/1-ban/hello.html/hello.html 실행하면 됨(저장 위치 개념을 몰랐던 탓)



```
root@server:~# docker container run -d --name nginx -p 7988:80 -w /usr/share/nginx/html nginx
8f975886711868456fe1465c02b7aa65073e47ce9582cc331eca4fc926fb953f
root@server:~# docker exec nginx mkdir 1-ban
root@server:~# docker exec nginx mkdir 1-ban/hello.html
root@server:~# cd docker/
root@server:~/docker# docker container cp ./hello.html nginx:/usr/share/nginx/html/1-ban/hello.html

					↓	↓	↓	↓	↓

root@server:~/docker# docker exec -it nginx bash
root@8f9758867118:/usr/share/nginx/html# cd 1-ban/
root@8f9758867118:/usr/share/nginx/html/1-ban# rm -r hello.html
root@8f9758867118:/usr/share/nginx/html/1-ban# ls
root@8f9758867118:/usr/share/nginx/html/1-ban# exit
exit
root@server:~/docker# docker container cp ./hello.html nginx:/usr/share/nginx/html/1-ban

```

http://localhost:7988/1-ban/hello.html 접속시 

안녕하세요. 1반 홍길동입니다. 출력



```
찾아보기1.

docker exec -it CONTAINER_NAME bash로 접속해서 exit 하면 container 계속 실행중.
```



