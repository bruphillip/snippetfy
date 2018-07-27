const bcrypt = require('bcryptjs');
const {
  Users,
} = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },
  async register(req, res) {
    try {
      const {
        email,
      } = req.body;

      if (await Users.findOne({
          where: {
            email,
          }
        })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);

      await Users.create({ ...req.body,
        password
      });
      req.flash('success', 'Usuário cadastrado com sucesso!');
      return res.redirect('/');
    } catch (err) {

    }
  },
  async authenticate(req, res) {
    const {
      email,
      password,
    } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      req.flash('error', 'Usuário Inexistente');
      return res.redirect('back');
    }

    if (!await bcrypt.compare(password, user.password)) {
      req.flash('error', 'Senha incorreta');
      return res.redirect('back');
    }

    req.session.user = user;

    return req.session.save(() => {
      res.redirect('app/dashboard');
    });
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
