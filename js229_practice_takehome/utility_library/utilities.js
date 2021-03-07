(function() {
  var _ = function(element) {
    u = {

      first() {
        return element[0];
      },

      last() {
        return element[element.length - 1];
      },

      without(...removeThese) {
        let otherArr = element.slice(0);

        removeThese.forEach (removeThis => {
          let removeIdx = otherArr.indexOf(removeThis);
          if (removeIdx === -1) return;
          otherArr.splice(removeIdx, 1);
        });

        return otherArr;
      },

      lastIndexOf(item) {
        let idx = -1;

        for (let iterIdx = element.length; iterIdx >= 0; iterIdx -= 1) {
          if (element[iterIdx] === item) {
            idx = iterIdx;
            break;
          }
        }

        return idx;
      },

      sample(amount = 1) {
        let answer = [];

        for (let num = 1; num <= amount; num += 1) {
          let selection;

          while (true) {
            debugger;
            let randomIdx = Math.floor(Math.random() * element.length);
            selection = element[randomIdx]
            if (!answer.includes(selection)) break;
          }

          answer.push(selection);
        }

        return (answer.length === 1 ? answer[0] : answer);
      },

      findWhere(searchObj) {
        return this.where(searchObj)[0];  
      },

      where(searchObj) {
        let selected = element.filter(possibleObj => {
          return Object.keys(searchObj).every(key => {
            return searchObj[key] === possibleObj[key];
          });
        });
        
        return selected;
      },

      pluck(key) {
        let chosen = element.filter(obj => obj[key]);
        return chosen.map(obj => obj[key]);
      },

      keys() {
        return Object.keys(element);
      },

      values() {
        return Object.values(element);
      },

      pick(...keys) {
        let newObj = {};
        keys.forEach(key => newObj[key] = element[key]);
        return newObj;
      },

      omit(...keys) {
        let newObj = {};

        Object.keys(element).forEach(elemKey => {
          if (!keys.includes(elemKey)) {
            newObj[elemKey] = element[elemKey]
          }
        });

        return newObj;
      },

      has(key) {
        return Object.keys(element).includes(key); 
      }
    };

    (['isElement', 'isArray', 'isObject', 'isFunction', 
      'isBoolean', 'isString', 'isNumber']).forEach(methodName => {
      u[methodName] = function() { _[methodName].call(u, element)};
    });

    return u;
  };

  window._ = _;

  _.range = function(...numbers) {
    let first = numbers.length === 2 ? numbers[0] : 0;
    let last = numbers[numbers.length - 1];
    let answer = [];

    for (let num = first; num < last; num += 1) {
      answer.push(num);
    }
    console.log(answer);
    return answer;
  };

  _.extend = function(...objs) {
    objs.reverse();
    let toExtend = objs[0];

    for (let idx = 1; idx < objs.length; idx += 1) {
      let currentObj = objs[idx];

      Object.keys(toExtend).forEach(key => {
        currentObj[key] = toExtend[key];
      });

      toExtend = currentObj;
    }

    return objs.reverse()[0];
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };

  _.isArray = Array.isArray || function(arr) {
    return toString.call(arr) === '[object Array]';
  }

  _.isObject = function(obj) {
    return (typeof obj === 'object' || typeof obj === 'function');
  }

  _.isFunction = function(func) {
    return (typeof func === 'function');
  } 

  _.isBoolean = function(input) {
    return (typeof input === 'boolean') ||
      (typeof input === 'object' && ['false', 'true'].includes(String(input)));
  }

  _.isString = function(str) {
    return toString.call(str) === '[object String]';  
  }

  _.isNumber = function(num) {
    return toString.call(num) === '[object Number]';
  }
})();
