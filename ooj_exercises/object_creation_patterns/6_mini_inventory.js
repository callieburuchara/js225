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
  function findObj(sku) {
    return allItems.filter(obj => obj.SKU === sku)[0];
  }

  let allItems = [];

  return {
    items: allItems,

    create(name, category, quantity) {
      let newItem = ItemCreator.newItem(name, category, quantity);
      if (newItem.notValid) {
        return false
      } else {
        allItems.push(newItem);
      }
    },

    update(sku, obj) {
      let chosenObj = findObj(sku);
      
      Object.keys(obj).forEach (key => {
        chosenObj[key] = obj[key];
      });

      return chosenObj;
    },

    delete(sku) {
      let toDeleteIdx = allItems.findIndex(obj => {
        return obj.SKU === sku;
      });
      
      return allItems.splice(toDeleteIdx, 1);
    },

    inStock() {
      return allItems.filter(obj => {
        return obj.quantity > 0;
      });
    },

    itemsInCategory(category) {
      return allItems.filter(obj => {
        return obj.category === category;
      });
    },
  }

})();

const ReportManager = (() => {
  let items;

  function findObj(sku) {
    debugger;
    return items.items.filter(obj => obj.SKU === sku)[0];
  }
  
  return {
    init(itemManager) {
      items = itemManager;
    },

    createReporter(sku) {
      let chosenObj = findObj(sku);
      debugger;
      return {
        itemInfo() {
          Object.keys(chosenObj).forEach (key => {
            console.log(key + ': ' + chosenObj[key]);
          });
        }
      }
    },

    reportInStock() {
      let stockedItems = items.inStock();
      console.log(stockedItems.map (obj => obj.name).join(', '));
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

ItemManager.items;       
// returns list with the 4 valid items

ReportManager.init(ItemManager);
//ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
//ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
