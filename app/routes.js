const express = require('express')
const router = express.Router()

// Example wizard
require('./routes/feature-flags')(router)
require('./routes/example-wizard')(router)
require('./routes/register')(router)
require('./routes/soft-close')(router)
require('./routes/accounts')(router)

// Add your routes here - above the module.exports line

router.post('/accounts-signed-in/where-do-you-work-answer', function (req, res) {
  const country = req.session.data['.country']

  if (country === 'England') {
    res.redirect('accounts-signed-in/home')
  } else {
    res.redirect('accounts-signed-in/funding')
  }
})
module.exports = router
