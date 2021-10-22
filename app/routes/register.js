const fs = require('fs')
const {
  registerWizardPaths,
  registerWizardForks,
  typeOfUser
} = require('../utils/register-wizard-paths')

module.exports = router => {
  router.all('/register/*', (req, res, next) => {
    const typesOfUser = typeOfUser(req)
    res.locals.isInternational = typesOfUser.isInternational
    res.locals.isNonTeacher = typesOfUser.isNonTeacher
    res.locals.isEnglandTeacher = typesOfUser.isEnglandTeacher
    next()
  })

  router.get('/register', (req, res) => {
    res.render('register/index', { paths: registerWizardPaths(req) })
  })

  router.all('/register/where-do-you-work', (req, res, next) => {
    res.locals.countries = [{ text: '', value: '' }].concat(JSON.parse(fs.readFileSync('public/govuk-country-and-territory-autocomplete/location-autocomplete-canonical-list.json', 'utf8'))
      .map(country => {
        return { text: country[0], value: country[1] }
      }))

    next()
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
