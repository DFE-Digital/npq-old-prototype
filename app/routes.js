const express = require('express')
const router = express.Router()

// Example wizard
require('./routes/feature-flags')(router)
require('./routes/example-wizard')(router)
require('./routes/register')(router)
require('./routes/soft-close')(router)
require('./routes/accounts')(router)

router.post('/receive-data', (req, res) => {
  req.session.data['account-data'] = JSON.parse(req.body['account-data'])
  res.redirect('/register/where-do-you-work')
})

// Add your routes here - above the module.exports line

module.exports = router
