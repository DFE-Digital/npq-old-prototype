const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function eyllWizardPaths (req) {
  var paths = [
    '/eyll/email',
    '/eyll/email-confirmation',
    '/eyll/chosen',
    '/eyll/trn',
    '/eyll/personal-details',
    '/eyll/where-do-you-work',
    '/eyll/what-setting',
    '/eyll/do-you-have-urn',
    '/eyll/which-early-years',
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
      currentPath: '/eyll/what-setting',
      storedData: ['register', 'setting'],
      values: ['School', '16 to 19 organisation', 'Academy trust', 'LA maintained nursery', 'other'],
      forkPath: (value) => {
        switch (value) {
          case 'School':
            return '/eyll-school/where-school'
          case '16 to 19 organisation':
            return '/eyll-school/where-school'
          case 'Academy trust':
            return '/eyll-school/where-school'
          case 'LA maintained nursery':
            return '/eyll-school/where-school'
          case 'other':
            return '/eyll-school/choose-npq'
        }
      }
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

function eyllSchoolWizardPaths (req) {
  var paths = [
    '/eyll-school/where-school',
    '/eyll-school/which-school',
    '/eyll-school/choose-npq',
    '/eyll-school/choose-provider',
    '/register/funding-vague'

  ]

  return nextAndBackPaths(paths, req)
}

function eyllSchoolWizardForks (req) {
  var forks = [
    {
      currentPath: '/eyll-school/choose-npq',
      storedData: ['register', 'course'],
      values: ['NPQ Leading Literacy (NPQLL)', 'NPQ Early Years Leadership (NPQEYL)', 'Additional Support Offer for new headteachers'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ Leading Literacy (NPQLL)':
            return '/eyll-school/choose-provider-ey-ll'
          case 'NPQ Early Years Leadership (NPQEYL)':
            return '/eyll-school/choose-provider-ey-ll'
          case 'Additional Support Offer for new headteachers':
            return '/register/aso'
        }
      }
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  eyllWizardPaths,
  eyllWizardForks,
  eyllSchoolWizardPaths,
  eyllSchoolWizardForks
}
