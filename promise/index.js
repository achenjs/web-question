function loadImg(src) {
  const promise = new Promise((resolve, reject){
    var img = document.createElement('img');
    img.onload = function() {
      resolve(img);
    }
    img.onerror = function() {
      reject();
    }
    img.src = src;
  })
  return promise;
}

const result = loadImg('xxxxxx')

result.then((res) => {
  console.log(res.width);
}, (err) => {
  console.log(err);
})