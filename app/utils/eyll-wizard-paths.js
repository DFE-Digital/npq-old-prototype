const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function eyllWizardPaths (req) {
  var paths = [
    '/eyll/trn',
    '/eyll/email',
    '/eyll/email-confirmation',
    '/eyll/personal-details',
    '/eyll/work-in-ey',
    '/eyll/nursery',
    '/eyll/nursery-type',
    '/eyll/do-you-have-urn',
    '/eyll/find-early-years',
    '/eyll/choose-npq',
    '/eyll/funding-vague',
    '/eyll/choose-provider-ey-ll',
    '/eyll/share-information',
    '/eyll/check',
    '/eyll/confirmation'

  ]

  return nextAndBackPaths(paths, req)
}

function eyllWizardForks (req) {
  var forks = [

    
    {
      currentPath: '/eyll/work-in-ey',
      storedData: ['register', 'ey'],
      values: ['No'],
      forkPath: '/non-funded/choose-npq'
    },

    {
      currentPath: '/eyll/nursery',
      storedData: ['register', 'nursery'],
      values: ['No'],
      forkPath: '/eyll/do-you-have-urn'
    },

    {
      currentPath: '/eyll/nursery-type',
      storedData: ['register', 'nursery-type'],
      excludedValues: ['Private nursery'],
      forkPath: '/eyll-nursery/where-nursery'
    },

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
      currentPath: '/eyll/nursery',
      storedData: ['register', 'nursery'],
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
      values: ['NPQ for Leading Teaching (NPQLT)', 'NPQ for Leading Behaviour and Culture (NPQLBC)', 'NPQ for Leading Teacher Development (NPQLTD)', 'NPQ for Senior Leadership (NPQSL)', 'NPQ for Headship (NPQH)', 'NPQ for Executive Leadership (NPQEL)', 'NPQ Leading Literacy (NPQLL)', 'The Early Headship Coaching Offer'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ for Leading Teaching (NPQLT)':
            return '/eyll-nonfund/funding-not-available-npq'
          case 'NPQ for Leading Behaviour and Culture (NPQLBC)':
            return '/eyll-nonfund/funding-not-available-npq'
          case 'NPQ for Leading Teacher Development (NPQLTD)':
              return '/eyll-nonfund/funding-not-available-npq'
          case 'NPQ for Senior Leadership (NPQSL)':
              return '/eyll-nonfund/funding-not-available-npq'
          case 'NPQ for Headship (NPQH)':
              return '/eyll-nonfund/funding-not-available-npq'
          case 'NPQ for Executive Leadership (NPQEL)':
              return '/eyll-nonfund/funding-not-available-npq'
              case 'NPQ Leading Literacy (NPQLL)':
                return '/eyll-nonfund/funding-not-available-npq'
          case 'The Early Headship Coaching Offer':
                return '/register/aso'
        }
      }
    },

    {
      currentPath: '/eyll/choose-provider',
      skipTo: '/eyll/funding-vague'
    },
  ]
  return nextForkPath(forks, req)
}

function eyllNurseryWizardPaths (req) {
  var paths = [
    '/eyll-nursery/where-nursery',
    '/eyll-nursery/which-nursery',
    '/eyll-nursery/choose-npq', 
    '/eyll-nursery/funding-vague',
    '/eyll-nursery/choose-provider-ey-ll',
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
      currentPath: '/eyll-nursery/choose-provider',
      skipTo: '/eyll-nursery/funding-vague'
    },

    {
      currentPath: '/eyll-nursery/choose-npq',
      storedData: ['register', 'course'],
      values: ['The Early Headship Coaching Offer'],
      forkPath: '/register/aso'
    },

  ]
  return nextForkPath(forks, req)
}


function nonFundedWizardPaths (req) {
  var paths = [
    '/non-funded/choose-npq', 
    '/non-funded/about-where-you-work', 
    '/non-funded/how-pay',
    '/non-funded/choose-provider',
    '/non-funded/share-information',
    '/non-funded/check',
    '/non-funded/confirmation'


  ]

  return nextAndBackPaths(paths, req)
}

function nonFundedWizardForks (req) {
  var forks = [

    {
      currentPath: '/non-funded/choose-npq',
      storedData: ['register', 'course'],
      values: ['The Early Headship Coaching Offer'],
      forkPath: '/register/aso'
    },

  ]
  return nextForkPath(forks, req)
}

function asoUserWizardPaths (req) {
  var paths = [
    '/aso-user/aso-funding-not-available',
    '/aso-user/aso-how-pay',
    '/aso-user/aso-choose-provider',
    '/aso-user/share-information',
    '/aso-user/check',
    '/register/confirmation'

  ]

  return nextAndBackPaths(paths, req)
}

function asoUserWizardForks (req) {
  var forks = [


    {
      currentPath: '/aso-user/aso-funding',
      skipTo: '/aso-user/aso-choose-provider'
    },

  ]
  return nextForkPath(forks, req)
}

function eyllNonfundWizardPaths (req) {
  var paths = [

    '/eyll-nonfund/funding-not-available-npq',
    '/eyll-nonfund/how-pay',
    '/eyll-nonfund/choose-provider',
    '/eyll-nonfund/share-information',
    '/eyll-nonfund/check',
    '/register/confirmation',




  ]

  return nextAndBackPaths(paths, req)
}

function eyllNonfundWizardForks (req) {
  var forks = [

  ]
  return nextForkPath(forks, req)
}

function schoolNonfundWizardPaths (req) {
  var paths = [

    '/school-nonfund/funding-not-available',
    '/school-nonfund/how-pay',
    '/school-nonfund/choose-provider',
    '/school-nonfund/share-information',
    '/school-nonfund/check',
    '/register/confirmation',




  ]

  return nextAndBackPaths(paths, req)
}

function schoolNonfundWizardForks (req) {
  var forks = [

  ]
  return nextForkPath(forks, req)
}

module.exports = {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks,
  nonFundedWizardPaths,
  nonFundedWizardForks,
  asoUserWizardPaths,
  asoUserWizardForks,
  eyllNonfundWizardPaths,
  eyllNonfundWizardForks,
  schoolNonfundWizardPaths,
  schoolNonfundWizardForks,
}
