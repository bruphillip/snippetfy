const bcrypt = require('bcryptjs')
const { Users } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },
  async register(req, res) {
    const { email } = req.body;

    if (await Users.findOne({ where: { email } })) {
      req.flash('error', 'E-mail já cadastrado');
      return res.redirect('back');
    }

    const password = await bcrypt.hash(req.body.password, 5);

    await Users.create({ ...req.body, password });
    req.flash('success', 'Usuário cadastrado com sucesso!');
    return res.redirect('/');
  },
};
