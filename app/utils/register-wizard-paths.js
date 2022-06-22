const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  const typesOfUser = typeOfUser(req)

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
    '/register/funding-vague',
    '/register/choose-provider',
    '/register/share-information',
    '/register/check',
    '/register/confirmation'
  ]

  return nextAndBackPaths(paths, req)
}

function registerWizardForks (req) {
  var forks = [
    {
      currentPath: '/register/chosen',
      storedData: ['register', 'chosen'],
      values: ['No'],
      forkPath: '/register/choosing-an-npq'
    },

    {
      currentPath: '/register/work-in-school',
      storedData: ['register', 'work-in-school'],
      values: ['No'],
      forkPath: '/eyll/trn'
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
      currentPath: '/register/not-received-code',
      skipTo: '/register/email'
    },

    {
      currentPath: '/register/choose-npq',
      storedData: ['register', 'course'],
      values: ['NPQ for Leading Literacy (NPQLL)', 'NPQ for Early Years Leadership (NPQEYL)', 'NPQ for Leading Teaching (NPQLT)', 'NPQ for Leading Behaviour and Culture (NPQLBC)', 'NPQ for Leading Teacher Development (NPQLTD)', 'NPQ for Senior Leadership (NPQSL)', 'NPQ for Headship (NPQH)', 'NPQ for Executive Leadership (NPQEL)'],
      forkPath: (value) => {
        switch (value) {
          case 'NPQ for Leading Literacy (NPQLL)':
            return '/register/funding-vague'
          case 'NPQ for Early Years Leadership (NPQEYL)':
            return '/register/funding-vague'
          case 'NPQ for Leading Teaching (NPQLT)':
            return '/register/funding-vague'
          case 'NPQ for Leading Behaviour and Culture (NPQLBC)':
            return '/register/funding-vague'
          case 'NPQ for Leading Teacher Development (NPQLTD)':
              return '/register/funding-vague'
          case 'NPQ for Senior Leadership (NPQSL)':
              return '/register/funding-vague'
          case 'NPQ for Headship (NPQH)':
              return '/register/funding-vague'
          case 'NPQ for Executive Leadership (NPQEL)':
              return '/register/funding-vague'
        }
      }
    },

    {
      currentPath: '/register/aso-completed-npqh',
      storedData: ['register', 'aso-completed-npqh'],
      values: ['no'],
      forkPath: '/register/aso-cannot-register'
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
      values: ['No'],
      forkPath: '/aso-user/aso-funding-not-available'
    },
    
    {
      currentPath: '/register/aso-early-headship',
      storedData: ['register', 'aso-early-headship'],
      values: ['No', 'Yes'],
      forkPath: (value) => {
        switch (value) {
          case 'No':
            return '/aso-user/aso-funding-not-available'
          case 'Yes':
            return '/aso-user/aso-funding'
        }
      }
    },

    {
      currentPath: '/register/aso-funding',
      skipTo: '/register/choose-provider'
    },


   
  ]
  return nextForkPath(forks, req)
}

function existingUserWizardPaths (req) {
  const typesOfUser = typeOfUser(req)
  const paths = [
    '/register/email-confirmation',
    '/existing-user/are-you',
    '/existing-user/confirm-dob',
    '/existing-user/registered-before',
    '/existing-user/where-do-you-work',
    '/existing-user/work-in-school',
    ...typesOfUser.isInSchoolAndIsInEngland ? [
      '/existing-user/where-school',
      '/existing-user/which-school'
    ] : [],
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
      currentPath: `${basePath}/email-confirmation`,
      storedData: ['register', 'email'],
      values: ['existing@example.com'],
      forkPath: '/existing-user/are-you'
    },

    {
      currentPath: `${basePath}/email-confirmation`,
      storedData: ['register', 'email'],
      values: ['head@example.com'],
      forkPath: '/accounts/are-you'
    },
    {
      currentPath: `${basePath}/are-you`,
      storedData: ['register', 'are-you'],
      values: ['No'],
      forkPath: `${basePath}/are-you-no`
    },
    {
      currentPath: `${basePath}/registered-before`,
      storedData: ['register', 'details-correct'],
      values: ['no'],
      forkPath: `${basePath}/change-some-details`
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
