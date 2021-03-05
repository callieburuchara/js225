function createPayment(services = {}) {

  return {
    internet: services.internet || 0,
    phone: services.phone || 0,

    total() {
      return services.amount || this.internet + this.phone;
    }
  }



}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));
console.log(payments);
console.log(paymentTotal(payments));      // => 24000
