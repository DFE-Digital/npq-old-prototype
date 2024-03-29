const {
  eyllWizardPaths,
  eyllWizardForks,
  OtherWizardPaths,
  OtherWizardForks,
  asoWizardPaths,
  asoWizardForks,
  notFundedWizardPaths,
  notFundedWizardForks,
  ittMentorWizardPaths,
  ittMentorWizardForks,
  ittMentorFundedWizardPaths,
  ittMentorFundedWizardForks,
} = require("../utils/eyll-wizard-paths");

module.exports = router => {
  router.get('/eyll', (req, res) => {
    res.render('eyll/index', { paths: eyllWizardPaths(req) })
  })

  router.get('/eyll/:view', (req, res) => {
    res.render(`eyll/${req.params.view}`, { paths: eyllWizardPaths(req) })
  })

  router.get('/other/:view', (req, res) => {
    res.render(`other/${req.params.view}`, { paths: OtherWizardPaths(req) })
  })

  router.get('/aso/:view', (req, res) => {
    res.render(`aso/${req.params.view}`, { paths: asoWizardPaths(req) })
  })

  router.get('/not-funded/:view', (req, res) => {
    res.render(`not-funded/${req.params.view}`, {
      paths: notFundedWizardPaths(req),
    });
  })


    router.get('/itt-mentor/:view', (req, res) => {
    res.render(`itt-mentor/${req.params.view}`, { paths: ittMentorWizardPaths(req) })
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
    '/other',
    '/other/:view'
  ], function (req, res) {
    const fork = OtherWizardForks(req)
    const paths = OtherWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/aso',
    '/aso/:view'
  ], function (req, res) {
    const fork = asoWizardForks(req)
    const paths = asoWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/eyll-nonfund',
    '/eyll-nonfund/:view'
  ], function (req, res) {
    const fork = notFundedWizardForks(req);
    const paths = notFundedWizardPaths(req);
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post(
    ["/itt-mentor", "/itt-mentor/:view"],
    function (req, res) {
      const fork = ittMentorWizardForks(req);
      const paths = ittMentorWizardPaths(req);
      fork ? res.redirect(fork) : res.redirect(paths.next);
    }
  )
   
  router.post(["/itt-mentor-funded", "/itt-mentor-funded/:view"], function (req, res) {
    const fork = ittMentorFundedWizardForks(req);
    const paths = ittMentorFundedWizardPaths(req);
    fork ? res.redirect(fork) : res.redirect(paths.next);
  });
}
