# 接口功能说明
![](./images/1.png)
![](./images/2.png)
![](./images/3.png)
![](./images/4.png)
![](./images/16.png)
![](./images/17.png)

## 登录凭证
![](./images/5.png)
![](./images/6.png)

## 认识cookie
![](./images/7.png)
![](./images/8.png)

## 设置cookie
![](./images/9.png)
![](./images/10.png)

## session是基于cookie实现机制
### Koa-Session简单介绍
session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。
### Session的工作流程
当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。 客户的信息都保存在session中
![](./images/11.png)

## 认识token
![](./images/12.png)
![](./images/13.png)

## JWT实现Token机制
### 对称加密
![](./images/14.png)
### 非对称加密 
![](./images/15.png)
```
    git bash终端
    openssl 进入openssl
    genrsa -out private.key 1024 生成私钥并导出(长度1024)
    rsa -in private.key -pubout -out public.key 运用私钥生成一个公钥并导出
```