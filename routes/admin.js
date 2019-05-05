const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Fonda = require('../models/Fonda')
const uploadCloud = require('../helpers/cloudinary')
const { isLogged, checkRole } = require('../helpers/middlewares')

router.get('/fonda/new', isLogged, checkRole('admin'), (req, res, next) => {
  User.find({role: 'fonda'})
    .then(users => res.render('admin/new_fonda', { users }))
    .catch(err => next(err))
})

router.post('/fonda/new', isLogged, checkRole('admin'), uploadCloud.single('img'), (req, res, next) => {

  const { name, description, user } = req.body
  if(!name || !description || !user) return res.redirect('/admin/fonda/new')

  Fonda.create({...req.body, picPath: req.file.secure_url, picName: req.file.originalname })
    .then(() => res.redirect('/admin')) 
    .catch(err => next(err))
})

module.exports = router