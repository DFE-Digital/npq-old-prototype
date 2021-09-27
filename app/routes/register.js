const {
  registerWizardPaths,
  registerWizardForks
} = require('../utils/register-wizard-paths')

module.exports = router => {
  router.all('/register/*', (req, res, next) => {
    const registerData = req.session.data.register
    res.locals.isInternational = registerData && registerData['teach-in-england'] === 'No, I’m a teacher somewhere else'
    res.locals.isNonTeacher = registerData && registerData['teach-in-england'] === 'No, I’m not a teacher'

    // Allow a non-answer to default to England teacher
    res.locals.isEnglandTeacher = !(res.locals.isNonTeacher || res.locals.isInternational)
    next()
  })

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
