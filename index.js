let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.balance = 0;
    this.transaction = [];
  }

  get balance() {
    return this.transaction.reduce((acc, cur) => acc + cur, 0);
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return +this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const snowPatrol = new Account("snow-patrol");

console.log("Starting balance:", snowPatrol.balance);

const t1 = new Deposit(120, snowPatrol);
t1.commit();

console.log("after t1", snowPatrol.balance);

const t2 = new Withdrawal(50.25, snowPatrol);
t2.commit();
console.log("after t2:", snowPatrol.balance);

// t2 = new Withdrawal(9.99, snowPatrol);
// t2.commit();
// console.log("Transaction 2:", t2);

// t3 = new Deposit(120.0, snowPatrol);
// t3.commit();
// console.log("Transaction 3:", t3);

// console.log("Balance:", balance);

// console.log("t2:", t2.__proto__.__proto__.__proto__.__proto__);
console.log("t2:", Object.getPrototypeOf(t2));
