function add(a, b) {

  if (b) return a + b;
  else return (b2) => {
    return a + b2;
  };
}

function sub(a, b) {
  if (b) return a - b;
  else return (b2) => {
    return b2 - a;
  };
}

function mul(a, b) {
  if (b) return a * b;
  else return (b2) => {
    return a * b2;
  };
}

function div(a, b) {
  if (b) return a / b;
  else return (b2) => {
    return a / b2;
  };
}

function pipe(...acc) {
  return (arg) => {

  };
}


let a = add(1, 2); // 3
console.log(a);

let b = mul(a, 10); // 30
console.log(b);

let sub1 = sub(1); // sub1 отнимает от любого числа единицу
let c = sub1(b); // 29
console.log(c);

let d = mul(sub(a, 2))(c); // 29

console.log(d);

// let doSmth = pipe(add(20), sub(5), mul(4), div(5));

// let result = doSmth(1);
// // let x = pipe(add(1), mul(2))(3); // 8
// console.log(result);