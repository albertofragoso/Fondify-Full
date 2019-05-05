const express = require('express')
const router = express.Router()
const Fonda = require('../models/Fonda')
const Order = require('../models/Order')
const Menu = require('../models/Menu')
const { isLogged, checkRole } = require('../helpers/middlewares')

router.get('/', isLogged, checkRole('fonda'), (req, res, next) => {
  Fonda.findOne({ user: req.user._id })
    .then(fonda => {
      Order.find({ fonda: fonda._id}).populate('user').populate('menuUser')
        .then(orders => {
          res.render('fondas/fonda', { orders })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/new-menu', isLogged, checkRole('fonda'), (req, res, next) => {
  const config = {
    button: '¡Agregar!',
    colorButton: 'color-orange',
    action: '/fonda/new-menu'
  }
  res.render('fondas/new_menu', config)
})

router.post('/new-menu', isLogged, checkRole('fonda'),(req, res , next) => {
  const { mainOne , mainTwo, mainThree } = req.body
  if(!mainOne || !mainTwo || !mainThree) return res.render('fondas/new_menu', { err: 'Debes ingresar todos los platos fuertes de tu menú.' })

  Fonda.findOne({ user: req.user._id })
    .then(fonda => {
      Menu.create({ ...req.body, fonda: fonda._id })
        .then(() => res.render('fondas/new_menu', { message: '¡Está listo tu menú de hoy!' }))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/edit-menu', isLogged, checkRole('fonda'), (req, res, next) => {
  const config = {
    button: '¡Editar!',
    colorButton: 'yellow',
    action: '/fonda/edit-menu'
  }
  Fonda.findOne({ user: req.user._id })
    .then(fonda => {
      Menu.findOne({ fonda: fonda._id })
        .then(menu => res.render('fondas/new_menu', { ...config, menu }))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/edit-menu', isLogged, checkRole('fonda'), (req, res, next) => {
  const { menu, mainOne, mainTwo, mainThree } = req.body
  if(!mainOne || !mainTwo || !mainThree) return res.render('fondas/new_menu', { err: 'Debes ingresar todos los platos fuertes de tu menú.' })

  Menu.findByIdAndUpdate(menu, { mainOne, mainTwo, mainThree}, { new: true })
    .then(() =>  res.redirect('/fonda'))
    .catch(err => next(err))
})

module.exports = router