// function MathHandle () {
// }

// MathHandle.prototype.add = function() {
//   return this.x + this.y;
// }

// function B (x, y) {
//   this.x = x;
//   this.y = y;
// }
// B.prototype = new MathHandle();
// B.prototype.dog = function () {
//   return console.log(`${this.x}`);
// }

// console.log(new B(2, 2).add());

class MathHandles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add () {
    return this.x - this.y;
  }
}

// var b = new MathHandles(3, 1);
// console.log(b.add());

// console.log(b);

class B extends MathHandles {
  constructor() {
    super();
  }
}

var b = new B(1 ,2);
console.log(b.add());