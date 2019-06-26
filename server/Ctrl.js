module.exports = {
  getDebt(req, res) {
    const db = req.app.get('db');
    db.query('select * from lexy_debt')
      .then(originalDebt => {
        db.query('select sum(payment) from lexy_payments')
          .then(payments => {
            res.status(200).json(originalDebt.pop().debt - payments.pop().sum);
          })
          .catch(err => res.status(200).json(err));
      })
      .catch(err => res.status(200).json(err));
  },
  addFunds(req, res) {
    const db = req.app.get('db');
    const SQL_STRING = `insert into lexy_payments (payment, date) values ($1, $2);
      select * from lexy_debt;`;

    const { inputValue, date } = req.body;
    db.query(SQL_STRING, [inputValue, date])
      .then(originalDebt => {
        db.query('select sum(payment) from lexy_payments')
          .then(payments => {
            res.status(200).json(originalDebt.pop().debt - payments.pop().sum);
          })
          .catch(err => res.status(200).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
};
