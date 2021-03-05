function makeMultipleLister(number) {
  const limit = 100;
  return function() {
    for (let num = number; num < limit; num += number) {
      console.log(num);
    }
  }
}

let lister = makeMultipleLister(13);
lister();
