const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function eyllWizardPaths (req) {
  var paths = [
    '/eyll/nursery',
    '/eyll/nursery-type',
    '/eyll/do-you-have-urn',
    '/eyll/find-early-years',
    '/register/choose-npq'
  ]

  return nextAndBackPaths(paths, req)
}

function eyllWizardForks (req) {
  var forks = [


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
      forkPath: '/register/where-school'
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
      values: ['No'],
      forkPath: '/register/choose-npq'
    },

  ]
  return nextForkPath(forks, req)
}

function eyllNurseryWizardPaths (req) {
  var paths = [
    '/eyll-nursery/where-nursery',
    '/eyll-nursery/which-nursery',
    '/register/choose-npq', 
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


function OtherWizardPaths (req) {
  var paths = [
    "/other/employment",
    "/other/role",
    "/other/employer",
    "/register/choose-npq",
    "/other/choose-provider",
    "/other/share-information",
    "/other/check",
    "/other/confirmation",
  ];

  return nextAndBackPaths(paths, req)
}

function OtherWizardForks (req) {
  var forks = [
    {
      currentPath: "/other/employment",
      storedData: ["register", "employment"],
      values: ["ITT mentor"],
      forkPath: "/itt-mentor/find-itt",
    },

    {
      currentPath: "/other/choose-npq",
      storedData: ["register", "course"],
      values: ["The Early Headship Coaching Offer"],
      forkPath: "/register/aso",
    },
  ];
  return nextForkPath(forks, req)
}

function asoWizardPaths (req) {
  var paths = [
    "/aso/aso-intro",
    "/aso/aso-completed-npqh",
    "/aso/aso-headteacher",
    "/aso/aso-early-headship",
    "/aso/aso-funding-not-available",
    "/aso/aso-how-pay",
    "/register/choose-provider",
  ];

  return nextAndBackPaths(paths, req)
}

function asoWizardForks (req) {
  var forks = [
    {
      currentPath: "/aso/aso-completed-npqh",
      storedData: ["register", "aso-completed-npqh"],
      values: ["no"],
      forkPath: "/aso/aso-cannot-register",
    },

    {
      currentPath: "/aso/aso-headteacher",
      storedData: ["register", "aso-headteacher"],
      values: ["No"],
      forkPath: "/aso/aso-funding-not-available",
    },

    {
      currentPath: "/aso/aso-early-headship",
      storedData: ["register", "aso-early-headship"],
      values: ["Yes"],
      forkPath: "/aso/aso-funding",
    },
  ];
  return nextForkPath(forks, req)
}

function notFundedWizardPaths(req) {
  var paths = [
    "/not-funded/funding-not-available",
    "/not-funded/how-pay",
    "/register/choose-provider",
  ];

  return nextAndBackPaths(paths, req);
}

function notFundedWizardForks(req) {
  var forks = [
    {
      currentPath: "/not-funded/funding-not-available",
      skipTo: "/not-funded/how-pay",
    },
  ];
  return nextForkPath(forks, req);
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

function ittMentorWizardPaths(req) {
  var paths = [
    '/itt-mentor/find-itt',
    '/register/choose-npq',
    '/itt-mentor/funding-not-available-npq',
    '/itt-mentor/how-pay',
    '/itt-mentor/choose-provider',
    '/itt-mentor/share-information',
    '/itt-mentor/check',
    '/itt-mentor/confirmation',
  ];

  return nextAndBackPaths(paths, req);
}

function ittMentorWizardForks(req) {
  var forks = [
    {
      currentPath: "/itt-mentor/choose-npq",
      storedData: ["register", "course"],
      values: ["NPQ for Leading Teacher Development (NPQLTD)"],
      forkPath: "/itt-mentor-funded/funding-vague",
    },

  ];
  return nextForkPath(forks, req);
}

function ittMentorFundedWizardPaths(req) {
  var paths = [
    '/itt-mentor-funded/funding-vague',
    '/itt-mentor-funded/choose-provider',
    '/itt-mentor-funded/share-information',
    '/itt-mentor-funded/check',
    '/itt-mentor-funded/confirmation',
  ];

  return nextAndBackPaths(paths, req);
}

function ittMentorFundedWizardForks(req) {
  var forks = [

  ];
  return nextForkPath(forks, req);
}


module.exports = {
  eyllWizardPaths,
  eyllWizardForks,
  eyllNurseryWizardPaths,
  eyllNurseryWizardForks,
  OtherWizardPaths,
  OtherWizardForks,
  asoWizardPaths,
  asoWizardForks,
  notFundedWizardPaths,
  notFundedWizardForks,
  schoolNonfundWizardPaths,
  schoolNonfundWizardForks,
  ittMentorWizardPaths,
  ittMentorWizardForks,
  ittMentorFundedWizardPaths,
  ittMentorFundedWizardForks,
};
