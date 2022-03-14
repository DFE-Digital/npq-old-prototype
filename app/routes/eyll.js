const {
  eyllWizardPaths,
  eyllWizardForks,
  eyllSchoolWizardPaths,
  eyllSchoolWizardForks
} = require('../utils/eyll-wizard-paths')

module.exports = router => {
  router.get('/eyll', (req, res) => {
    res.render('eyll/index', { paths: eyllWizardPaths(req) })
  })

  router.get('/eyll/:view', (req, res) => {
    res.render(`eyll/${req.params.view}`, { paths: eyllWizardPaths(req) })
  })

  router.get('/eyll-school/:view', (req, res) => {
    res.render(`eyll-school/${req.params.view}`, { paths: eyllSchoolWizardPaths(req) })
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
    '/eyll-school',
    '/eyll-school/:view'
  ], function (req, res) {
    const fork = eyllSchoolWizardForks(req)
    const paths = eyllSchoolWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
