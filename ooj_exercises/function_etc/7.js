function makeCounter() {
  let count = 1;

  return () => {
    console.log(count++)
  };
}

const counter = makeCounter();
counter();
// the value assigned to `count` will not be GCed because closure. 
// more code
