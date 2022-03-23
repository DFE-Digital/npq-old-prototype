const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function eyllWizardPaths (req) {
  var paths = [
    '/eyll/work-in-ey',
    '/eyll/la-nursery',
    '/eyll/trn',
    '/eyll/personal-details',
    '/eyll/do-you-have-urn',
    '/eyll/find-early-years',
    '/eyll/choose-npq',
    '/eyll/choose-provider-ey-ll',
    '/eyll/funding-vague',
    '/eyll/share-information',
    '/eyll/check',
    '/eyll/confirmation'

  ]

  return nextAndBackPaths(paths, req)
}

function eyllWizardForks (req) {
  var forks = [
    {
      currentPath: '/eyll/trn',
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
      currentPath: '/eyll/la-nursery',
      storedData: ['register', 'la-nursery'],
      values: ['Yes'],
      forkPath: '/eyll-nursery/trn'
    },

    {
      currentPath: '/eyll/do-you-have-urn',
      storedData: ['register', 'ofsted'],
      values: ['help'],
      forkPath: '/eyll/help-urn'
    },



    {
      currentPath: '/eyll/choose-npq',
      storedData: ['register', 'course'],
      excludedValues: ['NPQ Leading Literacy (NPQLL)', 'NPQ Early Years Leadership (NPQEYL)'],
      forkPath: '/eyll/choose-provider'
    }

  ]
  return nextForkPath(forks, req)
}

function eyllNurseryWizardPaths (req) {
  var paths = [
    '/eyll-nursery/trn',
    '/eyll-nursery/personal-details',
    '/eyll-nursery/where-nursery',
    '/eyll-nursery/which-nursery',
    '/eyll-nursery/choose-npq',
    '/eyll-nursery/choose-provider-ey-ll', 
    '/eyll-nursery/funding-vague',
    '/eyll-nursery/share-information',
    '/eyll-nursery/check',
    '/eyll-nursery/confirmation'


  ]

  return nextAndBackPaths(paths, req)
}

function eyllNurseryWizardForks (req) {
  var forks = [

    {
      currentPath: '/eyll-nursery/trn',
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
      currentPath: '/eyll-nursery/choose-npq',
      storedData: ['register', 'course'],
      excludedValues: ['NPQ Leading Literacy (NPQLL)', 'NPQ Early Years Leadership (NPQEYL)'],
      forkPath: '/eyll-nursery/choose-provider'
    },

    {
      currentPath: '/eyll-nursery/choose-provider',
      skipTo: '/eyll-nursery/funding-vague'
    },

  ]
  return nextForkPath(forks, req)
}

module.exports = {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks
}
