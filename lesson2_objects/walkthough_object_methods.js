let me = {
  firstName: 'Callie',
  lastName: 'Buruchara',
};

//

//let me = {};
//me.firstName = 'Callie';
//åme.lastName = 'Buruchara';

//

function fullName(person) {
  console.log(person.firstName + ' ' + person.lastName);
}

fullName(me); // => 'Callie Buruchara'

//

let friend = {
  firstName: 'Emely',
  lastName: 'Umaña',
};

let mother = {
  firstName: 'Dawn',
  lastName: 'Thomas',
}

let father = {
  firstName: 'Tony',
  lastName: 'Williams',
}

//
/*
let people = [];
people.push(me);
people.push(friend);
people.push(mother);
people.push(father);
*/
//
/*
function rollCall(collection) {
  let length = collection.length;
  let i;
  for (i = 0; i < length; i += 1) {
    fullName(collection[i]);
  }
}
*/
//
/*
function rollCall(collection) {
  collection.forEach(function(item) {
    fullName(item);
  });
}

rollCall(people);
*/

//
/*
function rollCall(collection) {
  collection.forEach(fullName);
}

rollCall(people);
*/
//

let people = {
  collection: [],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  rollCall: function () {
    this.collection.forEach(this.fullName);
  },

  add: function(person) {
    if (this.isInvalidPerson(person)) return;
    person.id = this.collection.length;
    this.collection.push(person);
  },

  getIndex: function(person) {
    let index = -1;
    this.collection.forEach(function(comparator, i) {
      if (comparator.firstName === person.firstName &&
          comparator.lastName === person.lastName) {
        index = i;
      }
    });
    
    return index;
  },

  remove: function(person) {
    if (this.isInvalidPerson(person)) return;

    let index = this.getIndex(person);
    if (index === -1) return;
    
    this.collection.splice(index, 1);
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName !== 'string' &&
      typeof person.lastName !== 'string';
  },

  get: function(person) {
    if (this.isInvalidPerson(person)) return;

    return this.collection[this.getIndex(person)];
  },

  update: function(person) {
    if (this.isInvalidPerson(person)) return;

    let existingPersonId = this.getIndex(person);
    if (existingPersonId === -1) {
      this.add(person);
    } else {
      this.collection[existingPersonId] = person;
    }
  },
};

people.add(me);
people.add(mother);
people.add(father);
people.add(friend);
console.log(people.collection);
