function add(a, b) {

  if (b) return a + b;
  return (b2) => {
    return a + b2;
  };
}

function sub(a, b) {
  if (b) return a - b;
  return (b2) => {
    return b2 - a;
  };
}

function mul(a, b) {
  if (b) return a * b;
  return (b2) => {
    return a * b2;
  };
}

function div(a, b) {
  if (b) return a / b;
  return (b2) => {
    return b2 / a;
  };
}

function pipe(...acc) {
  return (arg) => {
    return acc.reduce((acc, curr) => {
      return curr(acc);
    }, arg);
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

let doSmth = pipe(add(58), sub(29), mul(30), div(3));

let result = doSmth(0);
let x = pipe(add(1), mul(2))(3); // 8
console.log(result);

