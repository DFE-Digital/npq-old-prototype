const express = require('express')
const router = express.Router()

// Example wizard
require('./routes/feature-flags')(router)
require('./routes/register')(router)

// Add your routes here - above the module.exports line

module.exports = router
