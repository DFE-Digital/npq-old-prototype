const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  var paths = [
    '/start',
    '/register/chosen',
    '/register/share-information',
    '/register/trn',
    '/register/confirmation',

    '/register/chosen',
    '/register/choosing-an-npq'
  ]

  return nextAndBackPaths(paths, req)
}

function registerWizardForks (req) {
  var forks = [
    {
      currentPath: '/register/chosen',
      storedData: ['register', 'chosen'],
      values: ['no'],
      forkPath: '/register/choosing-an-npq'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  registerWizardPaths,
  registerWizardForks
}
