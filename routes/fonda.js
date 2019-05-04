const router = require('express').Router()
const Menu = require('../models/Menu')
const Fonda = require('../models/Fonda')
const Order = require('../models/Order')
const MenuUser = require('../models/MenuUser')
const { isLogged, checkRole } = require('../helpers/middlewares')
const moment = require('moment')

router.get('/admin', (req, res, next) => {
  Fonda.find({user: req.user._id})
    .then(fonda => {
      Order.find({fonda: fonda._id}).populate('user').populate('menuUser')
        .then(order => {
          console.log(order)
        })
        .catch(err => next(err))
    })

})

router.post('/', (req, res, next) => {
  const { main } = req.body
  if(!main) return res.redirect('/')
  Menu.find({ $or: [
    { mainOne: { $regex: main, $options: 'i' } },
    { mainTwo: { $regex: main, $options: 'i' } },
    { mainThree: { $regex: main , $options: 'i'} }
  ]}).populate('fonda')
    .then(menus => {
      res.render('fondas/list', { menus, main })
    })
    .catch(err => next(err))
})

router.get('/new-menu', isLogged, checkRole('fonda'), (req, res, next) => {
  res.render('fondas/new_menu')
})

router.post('/new-menu', isLogged, checkRole('fonda'),(req, res , next) => {
  const { mainOne , mainTwo, mainThree } = req.body
  if(!mainOne || !mainTwo || !mainThree) return res.render('fondas/new_menu', {err: 'Debes ingresar todos los platos fuertes de tu menú.'})

  Fonda.findOne({ user: req.user._id })
    .then(fonda => {
      Menu.create({ ...req.body, fonda: fonda._id })
        .then(() => res.render('fondas/new_menu', { message: '¡Está listo tu menú de hoy!'}))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/new-order', isLogged, (req, res, next) => {
  const { fonda, howMany, arrive } = req.body
  if(!fonda || !howMany || !arrive) return res.redirect(`/fondas/${fonda}`)
  Order.create({ fonda, howMany, arrive, user: req.user._id })
    .then(order => res.redirect(`/fondas/${fonda}`))
    .catch(err => next(err))
})

router.post('/reservation', isLogged, (req, res, next) => {
  const { fonda, order, firstTime, secondTime, main } = req.body

  MenuUser.create({ firstTime, secondTime, main })
    .then(menuUser => {
      Order.findByIdAndUpdate(order, {$push: { menuUser: menuUser } }, { new: true })
        .then(() => res.redirect(`/fondas/${fonda}`))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/:id', isLogged, async (req, res, next) => {
  const { id } = req.params

  let order = await Order.findOne({ user: req.user.id, fonda: id })
  let { _doc: menu } = await Menu.findOne({ fonda: id }).populate('fonda')

  if(!order) {
    order = null
    res.render('fondas/detail', { ...menu, person: 1, createdAt: moment(menu.createdAt).locale('es').format('LL'), order })
  } else {
    if(order.menuUser.length < order.howMany) {
      res.render('fondas/detail', { ...menu, person: order.menuUser.length + 1, createdAt: moment(menu.createdAt).locale('es').format('LL'), order })
    } else {
      res.render('fondas/detail', { ...menu, createdAt: moment(menu.createdAt).locale('es').format('LL'), order, done: true })
    }
  }
})


module.exports = router


