const {
  exampleWizardPaths,
  exampleWizardForks
} = require('../utils/example-wizard-paths')

module.exports = router => {
  router.get('/example-wizard', (req, res) => {
    res.render('example-wizard/index', { paths: exampleWizardPaths(req) })
  })

  router.get('/example-wizard/:view', (req, res) => {
    res.render(`example-wizard/${req.params.view}`, { paths: exampleWizardPaths(req) })
  })

  router.post([
    '/example-wizard',
    '/example-wizard/:view'
  ], function (req, res) {
    const fork = exampleWizardForks(req)
    const paths = exampleWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
