module.exports = {
  getDebt(req, res) {
    req.app
      .get('db')
      .run('select * from lexy_debt')
      .then(response => res.status(200).json(response))
      .catch(err => res.status(200).json(err));
  },
  addFunds(req, res) {
    req.app
      .get('db')
      .run('select * from lexy_debt')
      .then(response => {
        const updatDebt = response.pop().debt - req.body.value;
        req.app
          .get('db')
          .run('UPDATE lexy_debt SET debt = $1 WHERE id =1;select * from lexy_debt', [updatDebt])
          .then(newDebt => res.status(200).json(newDebt))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  },
};
