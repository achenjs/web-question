var obj = {}

Object.defineProperty(obj, 'name', {
  get: function() {
    console.log('get');
  },
  set: function(newVal) {
    console.log(newVal);
  }
})

obj.name
obj.name = 'achen'
