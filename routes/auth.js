const router       = require('express').Router()
const passport     = require('../helpers/passport')
const User         = require('../models/User')
const { isLogged } = require('../helpers/middlewares')
const { createToken } = require('../helpers/token')
const { sendEmail } = require('../helpers/nodemailer')

router.get('/signup', (req, res, next) => {
  const config = {
    title: 'Sign up',
    action: '/signup',
    submit: '¡Registrate!',
    sign: true
  }
  res.render('auth/signup', config)
})

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body

  if(name ==='' || email === '' || password === '') return res.render('auth/signup', 
  {
    err: 'Tu nombre, tu email o tu password no pueden estar vacios.', 
    title: 'Sign up',
    action: '/signup',
    submit: '¡Registrate!',
    sign: true
  })

  User.findOne({ email }, 'email', (err, user) => {
    if(user !== null) return res.render('auth/signup', 
    {
      err: 'Este usuario ya existe.', 
      title: 'Sign up',
      action: '/signup',
      submit: '¡Registrate!',
      sign: true
    })
  })

  User.register({ ...req.body, confirmationCode: createToken() }, req.body.password)
    .then(user => {
      passport.authenticate('local', (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.redirect('/login')
        req.logIn(user, err => {
          if(err) return next(err)
          req.app.locals.loggedUser = user
          sendEmail(user.name, user.email, user.confirmationCode)
            .then(() => res.render('index', { message: '¡Listo! Ahora confirma tu cuenta en tu correo electrónico.' }))
            .catch(err => next(err))
        })
      })(req, res, next)
    })
    .catch(err => next(err))
})

router.get('/login', (req, res, next) => {
  const config = {
    title: 'Login',
    action: '/login',
    submit: '¡Entra ya!',
  }
  res.render('auth/signup', config)
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) next(err)
    if(!user) return res.render('auth/signup', 
    {
      err: 'Los sentimos. No estás autorizado a entrar.',
      title: 'Login', 
      action:'/login', 
      submit: '¡Entra ya!'
    })
    req.logIn(user, err => {
      if(err) return next(err)
      req.app.locals.loggedUser = req.user
      res.redirect(`/`)
    })
  })(req, res, next)
})

router.get('/logout', (req, res, next) => {
  req.app.locals.loggedUser = ''
  req.logOut()
  req.session.destroy((err) => {
    if(!err) res.status(200).clearCookie('connect.sid', {path: '/'}).redirect('/')
  })
})

router.get('/profile', isLogged, (req, res, next) => {
  User.findById(req.app.locals.loggedUser._id)
    .then(user => res.render('profile', user))
    .catch(err => next(err))
})

router.get('/confirm/:confirmCode', (req, res, next) => {
  const { confirmCode } = req.params
  User.findOneAndUpdate({ confirmationCode: confirmCode }, { status: 'Active' })
    .then(user => res.render('auth/confirmation.hbs', user))
    .catch(err => next(err))
})

module.exports = router