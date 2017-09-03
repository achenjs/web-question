# typeof返回的数据类型？（考察js变量类型）
**值类型**：number、string、boolean、undefined  
**引用类型**：object（{}、[]、null）、function  
**number、string、boolean、object、function、undefined**

# 何时使用=== 何时使用==？（强制类型转换）
obj.a == null 相当于 obj.a === null || obj.a === undefined. 这是jquery源码中推荐的写法

# JS中有哪些内置函数？ （数据封装类对象）
Object、Array、Boolean、Number、String、Function、Date、RegExp（正则表达式）、Error

# JS变量按照存储方式区分为哪些类型，并描述其特点
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

# 如何理解JSON
JSON只不过是一个JS 对象而已  
JSON.stringify({a: 10})  
JSON.parse('{a: 10}')

# window.onload 和 DOMContentLoaded 的区别？ （浏览器的渲染过程）

# 用JS创建10个 \<li\> 标签，点击的时候弹出来对应的序号？ （作用域）
var i  
for (i = 0; i < 10; i++) {  
>>(function (i) {  
>>>>var a = document.createElement('li')  
>>>>a.addEventListener('click', function (e) {  
>>>>>>e,perventDefault()  
>>>>>>alert(i)  

>>>>})  

>>})(i) 

}

# 简述如何实现一个模块加载器，实现类似require.js的基本功能 （JS模块化）

# 实现数组的随机排序 （JS基础算法）

# 构造函数 (构造函数首字母要大写规范)
function Foo (name, age) {  
>>this.name = name  
this.age = age  
//  return this  // 默认有这一行  

}  

var f = new Foo('achen', 22)

# 构造函数-扩展
var a = {} 其实是 var a = new Object() 的语法糖  
var a = [] 其实是 var a = new Array() 的语法糖  
function Foo(){...} 其实是 var Foo = new Function(...)  
使用 instanceof 判断一个函数是否是一个变量的构造函数

# 原型规则和示例
1.所有的引用类型（数组、对象、函数）,都具有对象特性，即可自由扩展属性  
var obj = {}  obj.a = 100  
function fn() {}  fn.a = 100  
2.所有的引用类型（数组、对象、函数）,都有一个\_\_proto\_\_属性,属性值是一个普通的对象  
console.log(obj.\_\_proto\_\_)  
console.log(fn.\_\_proto\_\_)  
3.所有的函数, 都有一个prototype属性，属性值也是普通的对象  
console.log(fn.prototype)  
4.所有的引用类型（数组、对象、函数）,\_\_proto\_\_属性值指向它的构造函数的"prototype"属性值  
console.log(obj.\_\_proto\_\_ === Object.prototype)  
console.log(fn.\_\_proto\_\_ === Function.prototype)  
5.当试图得到一个对象的某个属性时, 如果这个对象本身没有这个属性, 那么会去它的\_\_proto\_\_即它的构造函数的prototype中寻找  
//  构造函数    
function Foo(name, age) {  
>>this.name = name  

}  
Foo.prototype.alertName = function () {  
>>alert(this.name)  

}  
//  创建示例  
var f = new Foo('achen')  
f.printName = function () {  
>>console.log(this.name)  

}  
//  测试  
f.printName()  
f.alertName()   //  显示原型中没有会去隐示原型中去寻找  
f.toString()    //  要去 f.\_\_proto_\_\.\_\_proto\_\_ 中查找

## 循环对象自身的属性
var item  
for (item in f) {  
>>//  高级浏览器已经在 for in 中屏蔽了来自原型的属性  
//  但是这里建议还是加上这个判断，保证程序的健壮性  
if (f.hasOwnProperty(item)) {  
>>>console.log(item)  

>>}  

}

# 原型链
![Alt text](/images/__proto__.png)  

# 如何准确判断一个变量是数组类型
arr instanceof Array

# 写一个原型链继承的例子
function Elem (id) {  
>>this.elem = document.getElementById(id)  

}  
  
Elem.prototype.html = function (val) {  
>>var elem = this.elem  
if(val) {  
>>>>elem.innerHTML = val  
>>>>return this  // 链式操作

>>} else {  
>>>>return elem.innerHTML  

>>}

}  

Elem.prototype.on = function (type, fn) {  
>>var elem = this.elem  
>>elem.addEventListener(type, fn)  
>>return this
}

var div1 = new Elem('div1')
div1.html('\<p\>achen<\/p>').on('click', function() {  
>>alert('clicked')  

}).html('\<p\>javascript<\/p>')

# 描述new 一个对象的过程
1.创建一个新对象  
2.this指向这个新对象  
3.执行代码，即对this赋值  
4.返回this  
![Alt text](/images/structure.png)

# zepto（或其他框架）源码中如何使用原型链

# 说一下对变量提升的理解
函数声明和函数表达式、变量提升

# 说明this几种不同的使用场景
**1.this要在执行时才能确认值，定义时无法确认**
var a = {  
>>name: 'A',  
>>fn: function () {  
>>>>console.log(this.name)  

>>}

}
a.fn()      // this === a  
a.fn.call({name: 'B'}, options)  //  this === {name: 'B'}  
var fn1 = a.fn  
fn1()   //  this === window

**作为构造函数执行**  
**作为对象属性执行**  
**作为普通函数执行**  
**call apply bind**  

# 如何理解作用域
**1.无块级作用域**  
if (true) {  
>>var name = 'achen'  

}  
console.log(name)

**2.函数和全局作用域**
var a = 100  
function fn () {  
>>var a = 200  
>>console.log('fn', a)  

}  
console.log('global', a)  
fn()  

# 实际开发中闭包的应用 （用于封装变量，收敛权限）
function isFirstLoad () {  
>>var _list = []  
>>return function (id) {  
>>>>if (_list.indexOf(id) >= 0) {  
>>>>>>return false  

>>>>} else {  
>>>>>>_list.push(id)  
>>>>>>retun true  

>>>>}  

>>}  

}  

var firstLoad = isFirstLoad()  
firstLoad(10)   //  true  
firstLoad(10)   //  false  
firstLoad(20)   //  true  