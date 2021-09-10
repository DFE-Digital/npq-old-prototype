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
    '/register/choosing-an-npq',

    '/register/trn',
    '/register/get-your-trn'
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
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  registerWizardPaths,
  registerWizardForks
}
