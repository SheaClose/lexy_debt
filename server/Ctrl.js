module.exports = {
  getDebt(req, res) {
    req.app
      .get('db')
      .run('select * from lexy_debt')
      .then(response => res.status(200).json(response))
      .catch(err => res.status(200).json(err));
  },
};
