module.exports = {
  getDebt(req, res) {
    const db = req.app.get('db');
    db
      .run('select * from lexy_debt')
      .then(originalDebt => {
        db
          .run('select sum(payment) from lexy_payments')
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
    const { value, date } = req.body;
    db
      .run(SQL_STRING, [value, date])
      .then(originalDebt => {
        db
          .run('select sum(payment) from lexy_payments')
          .then(payments => {
            res.status(200).json(originalDebt.pop().debt - payments.pop().sum);
          })
          .catch(err => res.status(200).json(err));
      })
      .catch(err => res.status(500).json(err));
  },
};
