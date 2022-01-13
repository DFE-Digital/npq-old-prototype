const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function softCloseWizardPaths (req) {
  var paths = [
    '/start',
    '/soft-close/chosen',
    '/soft-close/alert',
    '/soft-close/no-confirm'
  ]

  return nextAndBackPaths(paths, req)
}

function softCloseWizardForks (req) {
  var forks = [
    // Example fork:
    // Skip the England question if an answer other
    // than England is given for where you live
    {
      currentPath: '/soft-close/chosen',
      storedData: ['soft-close', 'chosen'],
      values: ['Yes'],
      forkPath: '/register/email'
    },
    {
      currentPath: '/soft-close/alert',
      storedData: ['soft-close', 'alert'],
      values: ['Yes'],
      forkPath: '/notification/sign-up'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  softCloseWizardPaths,
  softCloseWizardForks
}
