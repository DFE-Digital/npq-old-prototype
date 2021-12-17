const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  const typesOfUser = typeOfUser(req)
  const data = req.session.data

  const paths = [
    '/start',
    '/register/chosen',
    '/register/where-do-you-work',
    '/register/work-in-school',
    '/register/trn',
    '/register/email',
    '/register/email-confirmation',
    '/register/personal-details',
    ...typesOfUser.isInSchoolAndIsInEngland ? [
      '/register/where-school',
      '/register/which-school'
    ] : [],
    '/register/choose-npq',
    '/register/aso',
    '/register/aso-completed-npqh',
    '/register/aso-headteacher',
    '/register/aso-early-headship',
    '/register/aso-funding',
    '/register/choose-provider',
    ...typesOfUser.isInSchoolSetting ? [] : ['/register/about-where-you-work'],
    ...typesOfUser.isInSchoolAndIsInEngland ? ['/register/funding-vague'] : ['/register/funding'],
    '/register/share-information',
    '/register/check',
    '/register/confirmation',

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
      currentPath: '/register/choose-npq',
      storedData: ['register', 'course'],
      excludedValues: ['Additional Support Offer for new headteachers'],
      forkPath: '/register/choose-provider'
    },
    {
      currentPath: '/register/choose-provider',
      storedData: ['register', 'course'],
      values: ['Additional Support Offer for new headteachers'],
      forkPath: '/register/share-information'
    },
    {
      currentPath: '/register/aso-completed-npqh',
      storedData: ['register', 'aso-completed-npqh'],
      values: ['no'],
      forkPath: '/register/aso-cannot-register'
    },
    {
      currentPath: '/register/aso-headteacher',
      storedData: ['register', 'aso-headteacher'],
      values: ['no'],
      forkPath: '/register/aso-funding-not-available'
    },
    {
      currentPath: '/register/aso-from-npqh',
      skipTo: '/register/aso-completed-npqh'
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
    }
  ]
  return nextForkPath(forks, req)
}

function typeOfUser (req) {
  const registerData = req.session.data.register

  // Allow a non-answer to default to in school (the most common path)
  const isInSchoolSetting = !(registerData && registerData['work-in-school'] === 'No')

  // Allow a non-answer to default to in England (the most common path)
  const isInternational = registerData &&
    ['Scotland', 'Wales', 'Northern Ireland', 'other'].includes(registerData['where-do-you-work'])

  const isEngland = !isInternational
  const isInSchoolAndIsInEngland = isInSchoolSetting && isEngland

  const isASO = registerData && registerData.course === 'Additional Support Offer for new headteachers'

  return {
    // Do you work in a school
    isInSchoolSetting,

    // Where do you work answers
    isEngland,
    isInternational,

    // Combinations
    isInSchoolAndIsInEngland,
    isASO
  }
}

module.exports = {
  registerWizardPaths,
  registerWizardForks,
  typeOfUser
}
