const express = require('express')
const router = express.Router()

// Example wizard
require('./routes/feature-flags')(router)
require('./routes/example-wizard')(router)
require('./routes/register')(router)
require('./routes/soft-close')(router)
require('./routes/eyll')(router)

// Add your routes here - above the module.exports line

module.exports = router
