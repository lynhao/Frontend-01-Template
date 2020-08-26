# Phantomjs 无头浏览器

> 安装, [下载](https://phantomjs.org/download)好安装包后,将**phantomjs.exec**丢到本地当前node文件夹下即可

## 什么是Phantomjs? 可以做什么?

**Phantomjs**是一个命令行工具,类似**win**下的**Powershell**或者**macos/linux**下的**terminal/items**,PhantomJS适合执行各种页面自动化任务

- 可以用来截取屏幕内容

Phantomjs提供了```page.render()```来渲染某个站点下的内容

- 提供一个类似沙盒的测试功能

> 虽然Phantomjs可以像在Web浏览器上运行一样，可以访问标准的DOM脚本和CSS选择器,但似乎不支持高版本ECMA标准导致例如像Map函数等不能使用


# OAuth

## 注册一个[github app](https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/)

> 第一步到github注册一个app

**Settings** >> **Developer settings** >> **GitHub Apps** >> **[Your App Name]**

> 第二步,获取一个code

拼接一个身份验证url

url:https://github.com/login/oauth/authorize
client_id:Iv1.196c4e788469c56a
redirect_uri:http://localhost:3001/auth
scope=read:Auser
state:123abc

encodeURIComponent(https://github.com/login/oauth/authorize?client_id=Iv1.196c4e788469c56a&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth&scope=read%3Auser&state=123abc)
https://github.com/login/oauth/authorize?client_id=Iv1.196c4e788469c56a&redirect_uri=http://localhost:3001/auth&state=123abc

最终得到类似
```http://localhost:3001/auth?code=5f7c28fe822918c3fb71&state=123abc```这么一串字符串

> 第三步,用code去换取token

```code
{
    let state = "abc123"
    let code = '5f7c28fe822918c3fb71';
    let client_secret = '95a1058860c57e60b88819864e79590f2bf679d9'
    let client_id = 'Iv1.196c4e788469c56a'
    let redirect_uri = encodeURIComponent("http://localhost:3001/auth")

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`

    let xhr = new XMLHttpRequest;

    xhr.open("GET", `https://github.com/login/oauth/access_token?${params}`, true)
    //xhr.open("GET", `https://github.com`, true)

    xhr.send(null)

    xhr.addEventListener("readystatechange", function(event) {
        if (event.target.readyState === 4) {
            console.log(event.target.responseText);
        }
    })
}
```

在github域名下运行后,会得到类似这么一串

```
access_token=a66d4fa7f836dbe6b595bf2b1ffd94500ce1b517&expires_in=28800&refresh_token=r1.58108d0ce7ebf85c08d20854d91e5a1c4f06a2546cd9e0299da80ad923dbbbd84ca85de589e91d65&refresh_token_expires_in=15897600&scope=&token_type=bearer
```

> 第四步, 获取当前账号的信息

```
{
	let xhr = new XMLHttpRequest;

    xhr.open("GET", `https://api.github.com/user`, true)
    xhr.setRequestHeader("Authorization", "token a66d4fa7f836dbe6b595bf2b1ffd94500ce1b517")

    xhr.send(null)

    xhr.addEventListener("readystatechange", function(event) {
        if (event.target.readyState === 4) {
            console.log(event.target.responseText);
        }
    })
}