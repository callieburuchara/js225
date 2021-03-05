/*
THE SYSTEM HIGH LEVEL
- Item Creator
  - Ensures all necessary info is (a) present and (valid)
- Items Manager
  - Creates items
  - Updates information about items
  - Deletes items
  - Queries information about items
- Reports Manager
  - Generates reports for a specific item
  - Generates reports for ALL items
  - Reports for specific items are generated from report obects
    created from the report manager
  - Reponsible for reports for all items
 

THE SYSTEM SPECIFICS
Required info for an item:
- SKU code - 5 characters
  - first 3 letters of item + first 2 letters of category
  - if item name consists of two words and the first word is only 
    2 letters, take the first letter of the second word
- Item name: must be min 5 letters, spaces don't count as characters
- Category: must be min 5 letters, only ONE word
- Quantity: Must not be blank. Can assume a valid num will be given

ITEMS MANAGER methods & properties
- create: create new item. Return false if unsuccessful.
- update(skuCode, obj): updates any information on an item. Can assume
    valid values will be provided.
- delete(skuCode): deletes the item from a list. May assume valid
    sku code.
- items: property that returns all the items
- inStock: method that lists all items with quantity > 0
0 itemsInCategory(category): method lists all items for given category
- cam add methods to this as I deem necessary

REPORTS MANAGER
- init: accepts the ItemManager obj as argument and assigns it to the 
  items property
- createReporter(skuCode) : accepts sku code as arg and returns an obj
  - returnd obj has one method, itemInfo. It logs to the console all
    properties of an object as "key:value" pairs (one pair per line).
    There are no other properties or methods on the returned object
    (except for those inherited by Object.prototype)
- reportInStock: logs to the console the item names of all the items
  in stock as a comma separated value

ITEM CREATOR
- If any of the require information provided is not valid, returns
  an object with a `notValid` property with a value of `true`.
*/

const ItemCreator = {
  areAllValid(name, category, quantity) {
    debugger;
    name = name.replace(/\s/g, '');

    return (name.length >= 5) && (category.length >= 5) &&
           (!category.includes(' ')) && (typeof quantity === 'number');
  },

  generateSku(name, category) {
    name = name.replace(/\s/g, '').toUpperCase();
    return name.substr(0, 3) + category.substr(0, 2).toUpperCase()
  },


  newItem(name, category, quantity) {
    if (this.areAllValid(name, category, quantity)) {
      return {
        name, 
        category,
        quantity,
        SKU: this.generateSku(name, category),
        }
      } else {
       return {
         notValid: true,
      }
    }
  }
}


const ItemManager = (() => {
  return {
    items: [],

    create(name, category, quantity) {
      let newItem = ItemCreator.newItem(name, category, quantity);
      if (newItem.notValid) {
        return false
      } else {
        this.items.push(newItem);
      }
    }
  }

})();

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);  // 3/5/21, all of this works so far


