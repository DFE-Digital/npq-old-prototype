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
    '/register/name-changes',
    '/register/email',
    '/register/confirmation'
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
    },
    {
      currentPath: '/register/trn',
      storedData: ['register', 'know-trn'],
      values: ['dont-know', 'no-trn'],
      forkPath: (value) => {
        switch (value) {
          case 'dont-know':
            return '/register/get-your-trn'
          case 'no-trn':
            return '/register/get-a-trn'
        }
      }
    },
    {
      currentPath: '/register/name-changes',
      storedData: ['register', 'name-changed'],
      values: ['yes'],
      forkPath: '/register/updated-name'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  registerWizardPaths,
  registerWizardForks
}
