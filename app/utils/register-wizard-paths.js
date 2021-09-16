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
    '/register/email-confirmation',
    '/register/personal-details',
    '/register/where-school',
    '/register/which-school',
    // '/register/funding', // temporarily disable funding pending logic
    '/register/choose-npq',
    '/register/aso',
    '/register/aso-early-headship',
    '/register/aso-funding',
    '/register/choose-provider',
    '/register/funding-vague',
    '/register/check',
    '/register/confirmation',

    '/register/name-changes',
    '/register/updated-name',
    '/register/updating-your-name',
    '/register/change-name-on-tra',

    '/register/aso',
    '/register/aso-funding-not-available',
    '/register/aso-how-pay'
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
    },
    {
      currentPath: '/register/updated-name',
      storedData: ['register', 'updated-name'],
      values: ['not-sure', 'no'],
      forkPath: (value) => {
        switch (value) {
          case 'no':
            return '/register/updating-your-name'
          case 'not-sure':
            return '/register/dont-know-if-name-updated'
        }
      }
    },
    {
      currentPath: '/register/updating-your-name',
      storedData: ['register', 'updating-name-now'],
      values: ['no'],
      forkPath: '/register/email'
    },
    {
      currentPath: '/register/choose-npq',
      storedData: ['register', 'course'],
      excludedValues: ['Additional Support Offer (ASO) for NPQH'],
      forkPath: '/register/choose-provider'
    },
    {
      currentPath: '/register/choose-provider',
      storedData: ['register', 'course'],
      values: ['Additional Support Offer (ASO) for NPQH'],
      forkPath: '/register/check'
    },
    {
      currentPath: '/register/aso',
      storedData: ['register', 'aso-headteacher'],
      values: ['no'],
      forkPath: '/register/aso-funding-not-available'
    },
    {
      currentPath: '/register/aso-from-npqh',
      storedData: ['register', 'aso-headteacher'],
      values: ['yes', 'no'],
      forkPath: (value) => {
        switch (value) {
          case 'yes':
            return '/register/aso-early-headship'
          case 'no':
            return '/register/aso-funding-not-available'
        }
      }
    },
    {
      currentPath: '/register/aso-early-headship',
      storedData: ['register', 'aso-early-headship'],
      values: ['no'],
      forkPath: '/register/aso-funding-not-available'
    },
    {
      currentPath: '/register/aso-funding-not-available',
      storedData: ['register', 'aso-pay-another-way'],
      values: ['no'],
      forkPath: '/register/aso-contact-provider'
    },
    {
      currentPath: '/register/aso-how-pay',
      skipTo: '/register/choose-provider'
    },
    {
      currentPath: '/register/aso-from-npqh',
      skipTo: '/register/choose-provider'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  registerWizardPaths,
  registerWizardForks
}
