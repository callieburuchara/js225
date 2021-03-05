function makeAccount(number) {
    let balance = 0;
    let transactions = [];
  return {

    balance() {
      return balance;
    },

    number() {
      return number;
    },

    transactions() {
      return transactions;
    },
  
    deposit(amount) {
      balance += amount;
      transactions.push({type: 'deposit', amount});
      return amount;
    },
  
    withdraw(amount) {
      if (amount > balance) amount = balance;
      balance -= amount;
      transactions.push({type: 'withdraw', amount});
      return amount;
    },
  }
}

function makeBank() {
  let accountNumber = 101;
  let accounts = [];

  return {
    openAccount() {
      let number = accounts.length + 101;
      let account = makeAccount(number)
      accounts.push(account);
      return account;
    },

    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    },
  }
}

let bank = makeBank();
let acc = bank.openAccount();
console.log(acc.balance());
acc.deposit(17);
let secAcc = bank.openAccount();
console.log(secAcc.number());
console.log(acc.transactions());
