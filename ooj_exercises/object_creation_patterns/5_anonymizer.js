const Account = (() => {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function anonymize() {
    const allChars = 'abcdefghijklmnopqrstuvwxyz';
    let sequence = '';

    for (let iter = 0; iter <= 16; iter += 1) {
      let randomIdx = Math.floor(Math.random() * allChars.length);
      sequence += allChars[randomIdx]
    }

    return sequence;
  }

  function isCorrectPassword(attempt) {
    return attempt === userPassword;
  }
  
  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      
      return this;
    },
  

    reanonymize(attempt) {
      if (isCorrectPassword(attempt)) {
        this.displayName = anonymize();
        debugger;
        return true;
      } else {
        return "Invalid password."
      }

    },
  
    resetPassword(original, newPassword) {
      if (isCorrectPassword(original)) {
        userPassword = newPassword;
        return true;
      } else {
        return "Invalid password."
      }
  
    },
  
    firstName(attempt) {
      if (isCorrectPassword(attempt)) {
        return userFirstName;
      } else {
        return 'Invalid password.'
      }
    },
  
    lastName() {
      if (isCorrectPassword()) {
        return userLastName;
      } else {
        return 'Invalid password.'
      }
  
    },
  
    email() {
      if (isCorrectPassword()) {
        return userLastName;
      } else {
        return 'Invalid password.'
      }
    },
  }

})();

const fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

const displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
