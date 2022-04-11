const {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks,
  nonFundedWizardPaths,
  nonFundedWizardForks
} = require('../utils/eyll-wizard-paths')

module.exports = router => {
  router.get('/eyll', (req, res) => {
    res.render('eyll/index', { paths: eyllWizardPaths(req) })
  })

  router.get('/eyll/:view', (req, res) => {
    res.render(`eyll/${req.params.view}`, { paths: eyllWizardPaths(req) })
  })

  router.get('/eyll-nursery/:view', (req, res) => {
    res.render(`eyll-nursery/${req.params.view}`, { paths: eyllNurseryWizardPaths(req) })
  })

  router.get('/non-funded/:view', (req, res) => {
    res.render(`non-funded/${req.params.view}`, { paths: nonFundedWizardPaths(req) })
  })

  router.post([
    '/eyll',
    '/eyll/:view'
  ], function (req, res) {
    const fork = eyllWizardForks(req)
    const paths = eyllWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/eyll-nursery',
    '/eyll-nursery/:view'
  ], function (req, res) {
    const fork = eyllNurseryWizardForks(req)
    const paths = eyllNurseryWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/non-funded',
    '/non-funded/:view'
  ], function (req, res) {
    const fork = nonFundedWizardForks(req)
    const paths = nonFundedWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
