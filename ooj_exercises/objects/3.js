function objectsEqual(first, second) {
  let keys = [Object.keys(first), Object.keys(second)];

  return keys[0].every(key => first[key] === second[key]) &&
         keys[1].every(key => first[key] === second[key]);
}



console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
