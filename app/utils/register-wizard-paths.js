const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  const typesOfUser = typeOfUser(req)

  const paths = [
    '/start',
    '/register/chosen',
    '/register/email',
    '/register/email-confirmation',
    '/existing-user/is-this-you',
    '/register/where-do-you-work',
    '/register/work-in-school',
    '/register/trn',
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
    ...ASOForks('/register')
  ]
  return nextForkPath(forks, req)
}

function existingUserWizardPaths (req) {
  const typesOfUser = typeOfUser(req)
  const paths = [
    '/register/email-confirmation',
    '/existing-user/is-this-you',
    '/existing-user/registered-before',
    '/existing-user/choose-npq',
    '/existing-user/aso',
    '/existing-user/aso-completed-npqh',
    '/existing-user/aso-headteacher',
    '/existing-user/aso-early-headship',
    '/existing-user/aso-funding',
    '/existing-user/choose-provider',
    ...typesOfUser.isInSchoolAndIsInEngland ? ['/existing-user/funding-vague'] : ['/existing-user/funding'],
    '/existing-user/check-another-course',
    '/existing-user/confirmation',

    '/existing-user/aso',
    '/existing-user/aso-funding-not-available',
    '/existing-user/aso-how-pay'
  ]

  return nextAndBackPaths(paths, req)
}

function existingUserWizardForks (req) {
  var forks = ASOForks('/existing-user')
  return nextForkPath(forks, req)
}

function ASOForks (basePath) {
  return [
    {
      currentPath: `${basePath}/choose-npq`,
      storedData: ['register', 'course'],
      excludedValues: ['Additional Support Offer for new headteachers'],
      forkPath: `${basePath}/choose-provider`
    },
    {
      currentPath: `${basePath}/choose-provider`,
      storedData: ['register', 'course'],
      values: ['Additional Support Offer for new headteachers'],
      forkPath: (value) => {
        if (basePath === '/register') {
          return `${basePath}/share-information`
        } else {
          return `${basePath}/check`
        }
      }
    },
    {
      currentPath: `${basePath}/aso-completed-npqh`,
      storedData: ['register', 'aso-completed-npqh'],
      values: ['no'],
      forkPath: `${basePath}/aso-cannot-register`
    },
    {
      currentPath: `${basePath}/aso-headteacher`,
      storedData: ['register', 'aso-headteacher'],
      values: ['no'],
      forkPath: `${basePath}/aso-funding-not-available`
    },
    {
      currentPath: `${basePath}/aso-from-npqh`,
      skipTo: `${basePath}/aso-completed-npqh`
    },
    {
      currentPath: `${basePath}/aso-early-headship`,
      storedData: ['register', 'aso-early-headship'],
      values: ['no'],
      forkPath: `${basePath}/aso-funding-not-available`
    },
    {
      currentPath: `${basePath}/aso-funding-not-available`,
      storedData: ['register', 'aso-pay-another-way'],
      values: ['no'],
      forkPath: `${basePath}/aso-contact-provider`
    },
    {
      currentPath: `${basePath}/aso-how-pay`,
      skipTo: `${basePath}/choose-provider`
    }
  ]
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
  existingUserWizardPaths,
  existingUserWizardForks,
  typeOfUser
}
