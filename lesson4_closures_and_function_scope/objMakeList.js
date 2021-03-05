function makeList() {

  items = [];
  return {
    add(item) {
      items.push(item);
      console.log(`${item} added!`);
    },

    remove(item) {
      let itemIdx = items.indexOf(item);
      items.splice(itemIdx, 1);
      console.log(`${item} removed!`);
    },

    list() {
      if (items.length === 0) {
        console.log("The list is empty.")
      } else {
      items.forEach(item => console.log(item));
      }
    },
  }
}

let list = makeList();
list.list();
list.add('peas');
list.list();
list.add('corn');
list.remove('peas');
console.log(list.items);
