const {
  registerWizardPaths,
  registerWizardForks
} = require('../utils/register-wizard-paths')

module.exports = router => {
  router.get('/register', (req, res) => {
    res.render('register/index', { paths: registerWizardPaths(req) })
  })

  router.get('/register/aso-from-npqh', (req, res) => {
    req.session.data.register.course = 'Additional Support Offer (ASO) for NPQH'
    res.render('register/aso', { paths: registerWizardPaths(req) })
  })

  router.get('/register/:view', (req, res) => {
    res.render(`register/${req.params.view}`, { paths: registerWizardPaths(req) })
  })

  router.post([
    '/register',
    '/register/:view'
  ], function (req, res) {
    const fork = registerWizardForks(req)
    const paths = registerWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
