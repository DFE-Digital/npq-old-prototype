const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function accountsWizardPaths (req) {
  var paths = [
    '/start',
    '/accounts/email',
    '/accounts/email-confirmation',
    '/accounts/are-you',
    '/accounts/confirm-dob'
  ]

  return nextAndBackPaths(paths, req)
}

function accountsWizardForks (req) {
  var forks = [
    {
      currentPath: '/accounts/applied-before',
      storedData: ['accounts', 'applied'],
      values: ['No'],
      forkPath: '/register/chosen'
    }
  ]
  return nextForkPath(forks, req)
}

function accountsAsoWizardPaths (req) {
  var paths = [
    '/accounts-aso/aso',
    '/accounts-aso/provider',
    '/accounts-aso/workplace-change',
    '/accounts-aso/completed-npqh',
    '/accounts-aso/headteacher',
    '/accounts-aso/early-headship',
    '/accounts-aso/share-information',
    '/accounts-aso/check',
    '/accounts-aso/confirmation'
  ]

  return nextAndBackPaths(paths, req)
}

function accountsAsoWizardForks (req) {
  var forks = [
    {
      currentPath: '/accounts-aso/workplace-change',
      storedData: ['accounts', 'workplace'],
      values: ['No'],
      forkPath: '/accounts-aso/where-do-you-work'
    }
  ]
  return nextForkPath(forks, req)
}

function accountsSignedInWizardForks (req) {
  var forks = [
    {
      currentPath: '/accounts-signed-in/where-do-you-work',
      storedData: ['accounts', 'country'],
      values: ['Scotland'],
      forkPath: '/accounts-signed-in/funding'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  accountsWizardPaths,
  accountsWizardForks,
  accountsAsoWizardPaths,
  accountsAsoWizardForks,
  accountsSignedInWizardForks
}
