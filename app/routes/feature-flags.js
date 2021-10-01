module.exports = router => {
  router.post('/feature-flags', (req, res) => {
    for (const key in req.body.features) {
      const flag = req.body.features[key]
      switch (flag.on) {
        case 'true':
          req.session.data.features[key].on = true
          break
        case 'false':
          req.session.data.features[key].on = false
          break
      }
    }

    res.locals.success = true
    res.render('feature-flags')
  })
}
