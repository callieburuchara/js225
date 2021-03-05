function makeList() {
  let todoItems = [];
  return function(item) {
    if (item === undefined) {
      if (todoItems.length === 0) {
        console.log("The list is empty.");
        return;
      } else {
        todoItems.forEach(item => console.log(item));
        return;
      }
    } else if (!todoItems.includes(item)) {
      todoItems.push(item);
      console.log(`${item} added!`);
    } else {
      let idx = todoItems.indexOf(item);
      todoItems.splice(idx, 1);
      console.log(`${item} removed!`);
    }
  }
}

let list = makeList();
list();
list('make breakfast');
list('read book');
list();
list('make breakfast');
list();
