function newStack() {
  let stack = [];

  return {
    push(val) {
      stack.push(val);
    },

    pop() {
     return stack.pop();
    },

    printStack() {
      stack.forEach(elem => console.log(elem));
    },
  }
}

let stack = newStack();
stack.printStack();
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(8);
stack.printStack();
stack.pop();
stack.printStack();
