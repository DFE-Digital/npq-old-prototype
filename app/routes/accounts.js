const { get: getKeypath, set: setKeypath } = require('lodash')
const {
  accountsWizardPaths,
  accountsWizardForks,
  accountsAsoWizardPaths,
  accountsAsoWizardForks,
  accountsSignedInWizardForks
} = require('../utils/accounts-wizard-paths')

module.exports = router => {
  router.get('/accounts', (req, res) => {
    res.render('accounts/index', { paths: accountsWizardPaths(req) })
  })

  router.get('/accounts-aso/:view', (req, res) => {
    res.render(`accounts-aso/${req.params.view}`, { paths: accountsAsoWizardPaths(req) })
  })

  router.post('/accounts/email', (req, res, next) => {
    const email = getKeypath(req, 'body.accounts.email')
    console.log (req.body,email)
    if (email === 'barbara@head.com') {
      const accounts = {
        email: 'returning@head.com',
        // 'work-in-school': 'Yes',
        // 'where-do-you-work': 'England',
        'know-trn': 'yes',
        trn: '1234567',
        name: 'Barbara Hepworth',
        'dob-day': '01',
        'dob-month': '01',
        'dob-year': '1980',
        // nino: 'QQ 12 34 56 C',
        // 'school-location': 'London',
        // school: 'Oftborough College',
        // course: 'NPQ Leading Teaching (NPQLT)',
        // provider: 'Ambition Institute',
        employer: 'Acme Ltd',
        role: 'Manager',
        'agree-to-share': ['yes']
      }

      setKeypath(req, 'session.data.accounts', accounts)
    }
    next()
  })

  router.post([
    '/accounts',
    '/accounts/:view'
  ], function (req, res) {
    const fork = accountsWizardForks(req)
    const paths = accountsWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/accounts-aso',
    '/accounts-aso/:view'
  ], function (req, res) {
    const fork = accountsAsoWizardForks(req)
    const paths = accountsAsoWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/accounts-signed-in',
    '/accounts-signed-in/:view'
  ], function (req, res) {
    const fork = accountsSignedInWizardForks(req)
    fork ? res.redirect(fork) : res.redirect('/accounts-signed-in/home')
  })
}
