let foo = {
  a: 1,

  begetObject() {
    return new this;
  }
};

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true
