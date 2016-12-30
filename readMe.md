## 简介
会唐网目前项目的开发环境为PHP，前后端混杂模式开发，过多的依赖php环境，造成前后端开发效率不高。前端页面资源不好管理，因此打算分离出来，使用nodeJs及其模块来实现前端自动化构建。
其中使用ejs来实现模板继承、使用forever来后台执行nodejs、使用BrowserSync 来自动刷新
目前主要解决了以下问题：
* 1.网页公共部抽离
普通HTML无法抽离头、尾等HTML碎片。为模块的维护带来极大的不便，这里使用express(nodeJs框架)+ ejs模板引擎（其语法和HTML语法一致，无需学习成本）实现了 include 和 layout等功能。 和php语法一致 。

如引入头部：
```
<% include ../inc/header.html %>
```
那么一个完整的html页面代码看起来是这样的：
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>大企业-订单列表</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="/css/ht-framework.css" rel="stylesheet">
</head>

<body>
    <% include ../inc/inc.ucenter.header.html %>
    <div class="u_main clearfix">
    <% include ../inc/inc.ucenter.sidebar.html %>
        <div class="u_content">
          <!--内容区-->
        </div>
    </div>
    <% include ../inc/inc.ucenter.footer.html %>
    <script type="text/javascript">
    //custom js
    </script>
</body>
</html>
```

同时所有的css js image等静态资料的路径全部默认指向了 wwwroot/下。
```
<link href="/css/ht-framework.css" rel="stylesheet"> //全部相对于wwwroot根目录 同实际环境保持一致

```

*  2.模拟真实的ajax请求
 通过express的route功能，前端可以自定义ajax请求url及响应内容。
 如定义一个 ```/testurl``` 的get请求接口：
```
//routes/user.js
router.get('/testurl', function(req, res, next) {
//返回的json串
  res.json({
  	errorno:0,
  	msg:"请求成功",
  	data:[1,2,3,4,5,6,7]
  });
});
```
然后就可以在页面中使用了：
```
$.getJSON('/testurl',function(data){
  console.log(data) // 输出： Object {errorno: 0, msg: "请求成功", data: Array[7]}
})
```
如果想模拟动态的假数据，可以使用mockJs来尽可能还原真实的数据。暂时先不加。



* 3.自动刷新、多设备同步
“自动刷新”并不是新的概念，但对关注“可见”的预览效果的前端开发者来说，它非常好用，可以节约很多时间。
试想开着两个显示器，一个手机、一个pad。你在IDE里新写了一小段代码，按下了ctrl+s保存。紧接着另一个显示器、手机和PAD的应用，就即时变成了更新后的效果，多么的酷。

这里选择了集成BrowserSync，它不需要浏览器插件，也不用手工添加代码（尽管也提供那样的用法）。一句控制台的命令之后，无论是在手机里还是电脑，无论用多少个浏览器（经测试，IE8+及其它），都可以拥有自动刷新的功能。

它使用了服务器的形式（直接或代理）来处理项目文件。默认情况下，访问它的服务器上的网页，可以看到这样的提示签：
![hint tag: Connected to BrowserSync](http://upload-images.jianshu.io/upload_images/6164-4922d7d3045f51a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这说明当前浏览的网页已连接到BrowserSync。查看一下源码，会发现它们都被添加了与BrowserSync有关的一段<script>
代码，就像LiveReload浏览器插件做的那样。这些代码会在浏览器和BrowserSync的服务器之间建立web socket连接，一旦有监听的文件发生变化，BrowserSync会通知浏览器。
如果发生变化的文件是css，js ，BrowserSync不会刷新整页，而是直接重新请求这个css或js文件，并更新到当前页中，感觉不到页面的刷新。

* 4.其他待添加功能
  + 自动js css image 压缩合并
  + 自动编译less为css，自动编译es6或Typescript。
  + 文件指纹 自动为文件名添加 MD5 戳。
  


## 如何使用

1. 安装node

2. 通过git clone 代码到本地



3 . 在项目目录执行命令,安装依赖： 

安装gulp

``` bash
$ npm install --global gulp-cli

```

``` bash
$ npm install
```
4.  开始工作

``` bash
$ npm start
```
执行后会自动打开chrome浏览器并访问http://localhost:3001

开始干活吧。。


npm install gulp-clean-css --save-dev


