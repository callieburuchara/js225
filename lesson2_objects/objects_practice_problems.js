let invoices = {
  unpaid: [],

  paid: [],

  add: function(clientName, amountOwed) {
    this.unpaid.push({clientName, amountOwed});
  },

  payInvoice: function(name) {
    let unpaid = [];
    
    this.unpaid.forEach((invoice, idx) => {
      if (invoice.clientName === name) {
        this.paid.push(invoice);
        this.unpaid.splice(idx, 1);
      }
    });


  },

  totalDue: function() {
    return this.unpaid.reduce((a, n) => a + n.amountOwed, 0);
  },

  totalPaid: function() {
    return this.paid.reduce((a, n) => a + n.amountOwed, 0);
  },

};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid());
console.log(invoices.totalDue());

