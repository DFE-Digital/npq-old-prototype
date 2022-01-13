const {
  softCloseWizardPaths,
  softCloseWizardForks
} = require('../utils/soft-close-wizard-paths')

module.exports = router => {
  router.get('/soft-close', (req, res) => {
    res.render('soft-close/index', { paths: softCloseWizardPaths(req) })
  })

  router.get('/soft-close/:view', (req, res) => {
    res.render(`soft-close/${req.params.view}`, { paths: softCloseWizardPaths(req) })
  })

  router.post([
    '/soft-close',
    '/soft-close/:view'
  ], function (req, res) {
    const fork = softCloseWizardForks(req)
    const paths = softCloseWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })
}
