const router = require('express').Router()
const User   = require('../models/User')
const Order  = require('../models/Order')
const MenuUser = require('../models/MenuUser')
const { isLogged, checkRole } = require('../helpers/middlewares')

router.get('/', isLogged, checkRole('user'), (req, res, next) => {
  const { _id } = req.user
  Order.find({ user: _id }).populate('user').populate('fonda').populate('menuUser')
    .then(orders => {
      res.render('user/user', { orders })
    })
    .catch(err => next(err))
})

router.post('/remove-menu', isLogged, checkRole('user'), (req, res, next) => {
  const { order, menu } = req.body
  Order.findByIdAndUpdate(order, { $pull : { menuUser: menu }},{ new: true })
    .then(order => {
      MenuUser.findByIdAndDelete(menu)
        .then(() => res.redirect('/user'))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/reservation/:id/delete', isLogged, checkRole('user'), (req,res,next) => {
  const { id } = req.params
  Order.findByIdAndDelete(id)
    .then(() => res.redirect('/user'))
    .catch(err => next(err))
})


module.exports = router