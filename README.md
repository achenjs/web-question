# typeof返回的数据类型？（考察js变量类型）
```
值类型：number、string、boolean、undefined  
引用类型：object（{}、[]、null）、function  
number、string、boolean、object、function、undefined
```
# 何时使用=== 何时使用==？（强制类型转换）
```
obj.a == null 相当于 obj.a === null || obj.a === undefined. 这是jquery源码中推荐的写法
```
# JS中有哪些内置函数？ （数据封装类对象）
```
Object、Array、Boolean、Number、String、Function、Date、RegExp（正则表达式）、Error
```
# JS变量按照存储方式区分为哪些类型，并描述其特点
```
值类型  
var a = 10  
var b = a   
a = 11  
console.log(b)          // 10  

引用类型  
var obj1 = {x: 100}  
var obj2 = obj1  
obj1.x = 200  
console.log(obj2.x)     // 200
```
# 如何理解JSON
```
JSON只不过是一个JS 对象而已  
JSON.stringify({a: 10})  
JSON.parse('{a: 10}')
```
# 用JS创建10个 \<li\> 标签，点击的时候弹出来对应的序号？ （作用域）
```
var i  
for (i = 0; i < 10; i++) {  
  (function (i) {  
    var a = document.createElement('li')  
    a.addEventListener('click', function (e) {  
      e,perventDefault()  
      alert(i)  
    })  
  })(i) 
}
```

# 实现数组的随机排序 （JS基础算法）
```
//  利用Math.random() 返回 0 ~ 1之间的随机数  
function randomSort (a, b) {  
  return Math.random() > 0.5 ? -1 : 1  
}  
var arr = [1, 2, 3, 4, 5, 6]  
arr.sort(randomSort)
```
# 构造函数 (构造函数首字母要大写规范)
```
function Foo (name, age) {  
  this.name = name  
  this.age = age  
//  return this  // 默认有这一行  

}  
var f = new Foo('achen', 22)
```
# 构造函数-扩展
```
var a = {} 其实是 var a = new Object() 的语法糖  
var a = [] 其实是 var a = new Array() 的语法糖  
function Foo(){...} 其实是 var Foo = new Function(...)  
使用 instanceof 判断一个函数是否是一个变量的构造函数
```
# 原型规则和示例
**1.所有的引用类型（数组、对象、函数）,都具有对象特性，即可自由扩展属性**  
var obj = {}  obj.a = 100  
function fn() {}  fn.a = 100  
**2.所有的引用类型（数组、对象、函数）,都有一个\_\_proto\_\_属性,属性值是一个普通的对象**  
console.log(obj.\_\_proto\_\_)  
console.log(fn.\_\_proto\_\_)  
**3.所有的函数, 都有一个prototype属性，属性值也是普通的对象**  
console.log(fn.prototype)  
**4.所有的引用类型（数组、对象、函数）,\_\_proto\_\_属性值指向它的构造函数的"prototype"属性值**  
console.log(obj.\_\_proto\_\_ === Object.prototype)  
console.log(fn.\_\_proto\_\_ === Function.prototype)  
**5.当试图得到一个对象的某个属性时, 如果这个对象本身没有这个属性, 那么会去它的\_\_proto\_\_即它的构造函数的prototype中寻找**  
//  构造函数  
```  
function Foo(name, age) {  
  this.name = name  
}  
Foo.prototype.alertName = function () {  
  alert(this.name)  
}  
//  创建示例  
var f = new Foo('achen')  
f.printName = function () {  
  console.log(this.name)  
}  
//  测试  
f.printName()  
f.alertName()   //  显示原型中没有会去隐示原型中去寻找  
f.toString()    //  要去 f.__proto__.__proto__ 中查找
```
## 循环对象自身的属性
```
var item  
for (item in f) {  
  //  高级浏览器已经在 for in 中屏蔽了来自原型的属性  
  //  但是这里建议还是加上这个判断，保证程序的健壮性  
  if (f.hasOwnProperty(item)) {  
    console.log(item)  
  }  
}
```
# 原型链
![Alt text](/images/__proto__.png)  

# 如何准确判断一个变量是数组类型
arr instanceof Array

# 写一个原型链继承的例子
```
function Elem (id) {  
  this.elem = document.getElementById(id)  
}  
  
Elem.prototype.html = function (val) {  
  var elem = this.elem  
  if(val) {  
    elem.innerHTML = val  
    return this  // 链式操作
  } else {  
    return elem.innerHTML  
  }
}  

Elem.prototype.on = function (type, fn) {  
  var elem = this.elem  
  elem.addEventListener(type, fn)  
  return this
}

var div1 = new Elem('div1')
div1.html('<p>achen</p>').on('click', function() {  
  alert('clicked')  
}).html('<p>javascript</p>')
```
# 描述new 一个对象的过程
**1.创建一个新对象**  
**2.this指向这个新对象**  
**3.执行代码，即对this赋值**  
**4.返回this**  
![Alt text](/images/structure.png)

# 说一下对变量提升的理解
函数声明和函数表达式、变量提升

# 说明this几种不同的使用场景
**1.this要在执行时才能确认值，定义时无法确认**  
```
var a = {  
  name: 'A',  
  fn: function () {  
    console.log(this.name)  
  }
} 
a.fn()      // this === a  
a.fn.call({name: 'B'}, options)  //  this === {name: 'B'}  
var fn1 = a.fn  
fn1()   //  this === window
```
**作为构造函数执行**  
**作为对象属性执行**  
**作为普通函数执行**  
**call apply bind**  

# 如何理解作用域
**1.无块级作用域**  
```
if (true) {  
  var name = 'achen'  
}  
console.log(name)
```
**2.函数和全局作用域**
```
var a = 100  
function fn () {  
  var a = 200  
  console.log('fn', a)  
}  
console.log('global', a)  
fn()  
```
# 实际开发中闭包的应用 （用于封装变量，收敛权限）
```
function isFirstLoad () {  
  var _list = []  
  return function (id) {  
    if (_list.indexOf(id) >= 0) {  
      return false  
    } else {  
      _list.push(id)  
      retun true  
    }  
  }  
}  
var firstLoad = isFirstLoad()  
firstLoad(10)   //  true  
firstLoad(10)   //  false  
firstLoad(20)   //  true  
```
# 同步和异步的区别是什么？ 分别举一个同步和异步的例子
### 区别
**1. 同步会阻塞代码执行，而异步不会**  
**2. alert是同步，setTimeout是异步**
<img src="./images/async.png" width="400" style="display: block">  
**异步不会阻塞程序的运行**
//  异步例子
```
console.log(100)  
setTimeout(() => {  
  console.log(200)  
}, 1000)  
console.log(300)
```
//  同步例子
```
console.log(100)  
alert(200)  
console.log(300)  
```
# 一个关于 setTimeout 的笔试题
```
console.log(1)  
setTimeout(function () {  
  console.log(2)  
}, 0)  
console.log(3)  
setTimeout(function () {  
  console.log(4)  
}, 1000)  
console.log(5)    
```
答案： 1, 3, 5, 2, 4  

# 前端使用异步的场景有哪些
**1.定时任务：setTimeout、setInverval**  
**2.网络请求：ajax请求、动态\<img\>加载**  
**3.事件绑定**  

# Date 类型的方法
![Alt text](/images/date.png)  

# Array 类型的方法
<img src="./images/Array.png" width="400" style="display: block">  
```
var arr = [1, 2, 3] 
arr.forEach((item, index) => {  
  console.log(index, item)  
}) 
arr.every((item, index) => {  
  if (item < 4) {  
    return true  
  }    
}) 
arr.some((item, index) => {  
  if (item < 4) {  
    return true  
  } 
}) 
arr.sort((a, b) => {  
  //    从小到大排序
  return a - b
})
arr.map((item, index) => {  
  return '<b>' + item + '|' + index + '</b>'
}) 
//  ['<b>1|0</b>', '<b>2|1</b>', '<b>3|2</b>']
arr.filter((item, index) => {  
  if (item >= 2) {  
    return true  
  }    
})  
//  [2, 3]
```
# 获取 2017-06-10 格式的日期
![Alt text](/images/formatDate.png)  

# 获取一个随机数，要求是长度一直的字符串格式
var random = Math.random()  
var random = random + '00000'   //  后面加上5个零  
var random = random.slice(0, 5) //  字符串截取  
console.log(random)  

# 写一个能遍历对象和数组的通用 forEach 函数
```
function forEach (obj, fn) {  
  var key  
  if (obj instanceof Array) {  
    //  准确判断是不是数组
    obj.forEach((item, index) => {  
      fn(item, index)  
    })  
  } else {  
    //  不是数组就是对象  
    for (key in obj) {  
      fn(obj[key], key)  
    }  
  }
}  
var arr = [1, ,2 ,3]  
forEach(arr, (item, index) => {  
  console.log(item, index)  
})  
var obj = {x: 100, y: 200}  
forEach(obj, (value, key) => {  
  console.log(value, key)  
})
```
# DOM操作的常用API有哪些
**1. 获取DOM节点，以及节点的property和Attribute**  
**2. 获取父节点，获取子节点**  
>>childNodes  //得到s的全部子节点  
>>parentNode   //得到s的父节点  
>>nextSbiling   //获得s的下一个兄弟节点  
>>previousSbiling  //得到s的上一个兄弟节点  
>>firstChild   //获得s的第一个子节点  
>>lastChile   //获得s的最后一个子节点  

**3. 新增节点，删除节点**
>>appendChild  
>>removeChild  

# DOM节点的attr和property有何区别  
**1. property 只是一个JS对象的属性的修改**  
**2. Attribute 是对HTML标签属性的修改**  

# BOM
**1. navigator浏览器属性**    
var ua = navigator.userAgent  
var isChrome = ua.indexOf('Chrome')  
console.log(isChrome)

**2. screen屏幕属性**  
console.log(screen.width)

**3. location、URL属性**  
console.log(location.href)  
console.log(location.protocol)  //  'http:' 'https:'  
console.log(location.pathname)  //  '/learn/199'  
console.log(location.search)    //  '?a=1&b=2'  
console.log(location.hash)      //  '#/sasa'  

4. **history历史记录**
history.back()      //  返回  
history.forward()   //  前进

# 编写一个通用的事件绑定函数
![Alt text](/images/addEventListener.png)

# 简述事件冒泡流程
1. DOM树形结构
2. 事件冒泡
3. 阻止冒泡
4. 代理

# 无限下拉加载图片的页面，绑定事件
1. 使用代理
2. 知道代理的两个优势

# CommonJS
**nodeJs 模块化规范，现在被大量用于前端，原因：**  
**1. 前端开发依赖的插件和库，都可以从npm中获取**    
**2. 构建工具的高度自动化，使得使用npm的成本非常低**  
**3. CommonJS 不会异步加载JS，而是同步一次性加载出来**  

# 从输入url到得到html的详细过程
**1. 输入域名之后，浏览器根据DNS服务器得到域名的IP地址**  
**2. 向这个IP的机器发送http请求**  
**3. 服务器收到、处理并返回http请求**  
**4. 浏览器得到返回内容**  

# window.onload 和 DOMContentLoaded 的区别
```
window.addEventListener('load', () => {  
  // 页面的全部资源加载完才会执行，包括图片、视频等  
})  
document.addEventListener('DOMContentLoaded', () => {  
  // DOM 渲染完即可执行，此时图片、视频可能还没加载完  
})
```
# 前端安全
<img src="./images/XSS.png" width="400">    

>>### 解决方案
>>1. 前端替换关键字，例如 \< 为 \&lt; \> 为 \&gt;  
>>2. 后端替换  

<img src="./images/XSRF.png" width="400">  

>>### 解决方案
>>1. 增加验证流程，如输入指纹、密码、短信验证码


 



