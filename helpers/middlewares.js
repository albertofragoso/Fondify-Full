exports.isLogged = (req, res, next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}

exports.checkRole = role => (req, res, next) => {
  role !== req.user.role ? res.redirect('/') : next()
}

exports.isActive = (req, res, next) => {
  (req.user.status === "Active") ? next() : res.render('index', { err: 'Por favor, confirma tu cuenta en tu correo electrónico para poder continuar.' })
}
    