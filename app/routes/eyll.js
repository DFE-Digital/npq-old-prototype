const {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks,
  nonFundedWizardPaths,
  nonFundedWizardForks,
  asoUserWizardPaths,
  asoUserWizardForks,
  eyllNonfundWizardPaths,
  eyllNonfundWizardForks,
  schoolNonfundWizardPaths,
  schoolNonfundWizardForks,
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

  router.get('/eyll-nursery/:view', (req, res) => {
    res.render(`eyll-nursery/${req.params.view}`, { paths: eyllNurseryWizardPaths(req) })
  })

  router.get('/non-funded/:view', (req, res) => {
    res.render(`non-funded/${req.params.view}`, { paths: nonFundedWizardPaths(req) })
  })

  router.get('/aso-user/:view', (req, res) => {
    res.render(`aso-user/${req.params.view}`, { paths: asoUserWizardPaths(req) })
  })

  router.get('/eyll-nonfund/:view', (req, res) => {
    res.render(`eyll-nonfund/${req.params.view}`, { paths: eyllNonfundWizardPaths(req) })
  })

  router.get('/school-nonfund/:view', (req, res) => {
    res.render(`school-nonfund/${req.params.view}`, { paths: schoolNonfundWizardPaths(req) })
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

  router.post([
    '/aso-user',
    '/aso-user/:view'
  ], function (req, res) {
    const fork = asoUserWizardForks(req)
    const paths = asoUserWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/eyll-nonfund',
    '/eyll-nonfund/:view'
  ], function (req, res) {
    const fork = eyllNonfundWizardForks(req)
    const paths = eyllNonfundWizardPaths(req)
    fork ? res.redirect(fork) : res.redirect(paths.next)
  })

  router.post([
    '/school-nonfund',
    '/school-nonfund/:view'
  ], function (req, res) {
    const fork = schoolNonfundWizardForks(req)
    const paths = schoolNonfundWizardPaths(req)
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
