const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  const isEnglandTeacher = typeOfUser(req).isEnglandTeacher
  const data = req.session.data

  var paths = [
    '/start',
    '/register/chosen',
    ...data.features['non-teacher'].on ? ['/register/are-you-a-teacher'] : [],
    ...data.features.international.on ? ['/register/where-do-you-work'] : [],
    '/register/trn',
    ...data.features['name-changes'].on ? ['/register/name-changes'] : [],
    '/register/email',
    '/register/email-confirmation',
    ...(data.features['name-changes'].on || data.features['name-change-guidance'].on) ? ['/register/personal-details'] : [
      '/register/your-trn',
      '/register/your-name',
      '/register/your-dob',
      '/register/your-nino'
    ],
    ...isEnglandTeacher ? [
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
    ...isEnglandTeacher ? ['/register/funding-vague'] : ['/register/funding'],
    '/register/share-information',
    '/register/check',
    '/register/confirmation',

    ...data.features['name-changes'].on ? [
      '/register/name-changes',
      '/register/updated-name',
      '/register/updating-your-name',
      '/register/change-name-on-tra'] : [],

    '/register/aso',
    '/register/aso-funding-not-available',
    '/register/aso-how-pay'
  ]

  return nextAndBackPaths(paths, req)
}

function registerWizardForks (req) {
  var forks = [
    {
      currentPath: '/register/are-you-a-teacher',
      storedData: ['register', 'are-you-a-teacher'],
      values: ['No, I’m not a teacher or school leader'],
      forkPath: '/register/chosen'
    },
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
      values: ['yes', 'not-sure'],
      forkPath: (value) => {
        switch (value) {
          case 'yes':
            return '/register/email'
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

  const isInternational = registerData &&
    ['Scotland', 'Wales', 'Northern Ireland', 'other'].includes(registerData['where-do-you-work'])

  const isNonTeacher = registerData &&
    registerData['are-you-a-teacher'] === 'No, I’m not a teacher or school leader'

  // Allow a non-answer to default to England teacher
  const isEnglandTeacher = !(isNonTeacher || isInternational)
  return { isInternational, isNonTeacher, isEnglandTeacher }
}

module.exports = {
  registerWizardPaths,
  registerWizardForks,
  typeOfUser
}
