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
      excludedValues: ['private'],
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
      values: ['NPQ Leading Teaching (NPQLT)', 'NPQ Leading Behaviour and Culture (NPQLBC)', 'NPQ Leading Teacher Development (NPQLTD)', 'NPQ for Senior Leadership (NPQSL)', 'NPQ for Headship (NPQH)', 'NPQ for Executive Leadership (NPQEL)', 'Additional Support Offer for new headteachers'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ Leading Teaching (NPQLT)':
            return '/eyll/choose-provider'
          case 'NPQ Leading Behaviour and Culture (NPQLBC)':
            return '/eyll/choose-provider'
          case 'NPQ Leading Teacher Development (NPQLTD)':
              return '/eyll/choose-provider'
          case 'NPQ for Senior Leadership (NPQSL)':
              return '/eyll/choose-provider'
          case 'NPQ for Headship (NPQH)':
              return '/eyll/choose-provider'
          case 'NPQ for Executive Leadership (NPQEL)':
              return '/eyll/choose-provider'
          case 'Additional Support Offer for new headteachers':
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
      values: ['NPQ Leading Teaching (NPQLT)', 'NPQ Leading Behaviour and Culture (NPQLBC)', 'NPQ Leading Teacher Development (NPQLTD)', 'NPQ for Senior Leadership (NPQSL)', 'NPQ for Headship (NPQH)', 'NPQ for Executive Leadership (NPQEL)', 'Additional Support Offer for new headteachers'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ Leading Teaching (NPQLT)':
            return '/eyll-nursery/choose-provider'
          case 'NPQ Leading Behaviour and Culture (NPQLBC)':
            return '/eyll-nursery/choose-provider'
          case 'NPQ Leading Teacher Development (NPQLTD)':
              return '/eyll-nursery/choose-provider'
          case 'NPQ for Senior Leadership (NPQSL)':
              return '/eyll-nursery/choose-provider'
          case 'NPQ for Headship (NPQH)':
              return '/eyll-nursery/choose-provider'
          case 'NPQ for Executive Leadership (NPQEL)':
              return '/eyll-nursery/choose-provider'
          case 'Additional Support Offer for new headteachers':
                return '/register/aso'
        }
      }
    },

    {
      currentPath: '/eyll-nursery/choose-provider',
      skipTo: '/eyll-nursery/funding-vague'
    },

  ]
  return nextForkPath(forks, req)
}


function nonFundedWizardPaths (req) {
  var paths = [
    '/non-funded/choose-npq',
    '/non-funded/choose-provider-ey-ll', 
    '/non-funded/about-where-you-work', 
    '/non-funded/funding',
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
      values: ['NPQ Leading Teaching (NPQLT)', 'NPQ Leading Behaviour and Culture (NPQLBC)', 'NPQ Leading Teacher Development (NPQLTD)', 'NPQ for Senior Leadership (NPQSL)', 'NPQ for Headship (NPQH)', 'NPQ for Executive Leadership (NPQEL)', 'Additional Support Offer for new headteachers'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ Leading Teaching (NPQLT)':
            return '/non-funded/choose-provider'
          case 'NPQ Leading Behaviour and Culture (NPQLBC)':
            return '/non-funded/choose-provider'
          case 'NPQ Leading Teacher Development (NPQLTD)':
              return '/non-funded/choose-provider'
          case 'NPQ for Senior Leadership (NPQSL)':
              return '/non-funded/choose-provider'
          case 'NPQ for Headship (NPQH)':
              return '/non-funded/choose-provider'
          case 'NPQ for Executive Leadership (NPQEL)':
              return '/non-funded/choose-provider'
          case 'Additional Support Offer for new headteachers':
                return '/register/aso'
        }
      }
    },

    {
      currentPath: '/non-funded/choose-provider',
      skipTo: '/non-funded/about-where-you-work'
    },

  ]
  return nextForkPath(forks, req)
}

module.exports = {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks,
  nonFundedWizardPaths,
  nonFundedWizardForks
}
