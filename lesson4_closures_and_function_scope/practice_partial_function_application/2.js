function subtract(a, b) {
  return a - b;
}

function makeSubN(n) {
  return function(b) {
    return subtract(b, n);
  }
}

let sub5 = makeSubN(5);
sub5(10); // 5
