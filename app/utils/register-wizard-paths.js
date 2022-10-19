const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function registerWizardPaths (req) {
  const typesOfUser = typeOfUser(req)

  const paths = [
    "/start",
    "/register/trn",
    "/register/email",
    "/register/email-confirmation",
    "/register/ask-questions",
    "/register/gai-name",
    "/register/gai-dob",
    "/register/gai-have-nino",
    "/register/gai-nino",
    "/register/gai-trn",
    "/register/gai-have-qts",
    "/register/gai-how-qts",
    "/register/check-answers-gai",
    "/register/finish-gai",
    "/register/chosen",
    "/register/where-do-you-work",
    "/register/what-setting",
    "/register/where-school",
    "/register/which-school",
    "/register/choose-npq",
    "/register/funding-vague",
    "/register/choose-provider",
    "/register/share-information",
    "/register/check",
    "/register/confirmation",
  ];

  return nextAndBackPaths(paths, req)
}

function registerWizardForks (req) {
  var forks = [
    {
      currentPath: "/register/trn",
      storedData: ["register", "know-trn"],
      values: ["dont-know", "no-trn"],
      forkPath: (value) => {
        switch (value) {
          case "dont-know":
            return "/register/get-your-trn";
          case "no-trn":
            return "/register/get-a-trn";
        }
      },
    },

    {
      currentPath: "/register/not-received-code",
      skipTo: "/register/email",
    },

    {
      currentPath: "/register/email",
      storedData: ["register", "email"],
      values: ["returning user"],
      forkPath: "/register/returning",
    },

    {
      currentPath: "/register/gai-have-nino",
      storedData: ["register", "have-nino"],
      values: ["No"],
      forkPath: "/register/gai-trn",
    },

    {
      currentPath: "/register/gai-have-qts",
      storedData: ["register", "haveqts"],
      values: ["No"],
      forkPath: "/register/check-answers-gai",
    },

    {
      currentPath: "/register/chosen",
      storedData: ["register", "chosen"],
      values: ["No"],
      forkPath: "/register/choose-an-npq-and-provider",
    },

    {
      currentPath: "/register/what-setting",
      storedData: ["register", "what-setting"],
      values: ["Other", "Early years or childcare", "A school"],
      forkPath: (value) => {
        if (req.session.data.register["where-do-you-work"] != "England") {
        console.log("Not England");
        return "/register/choose-npq";
        }
        if (req.session.data.register["what-setting"] == "Other") {
          console.log("Other!");
          return "/other/employment";
        } else if (
          req.session.data.register["what-setting"] ==
          "Early years or childcare"
        ) {
          console.log("EY!");
          return "/eyll/nursery";
        }
        
      },
    },


    {
      currentPath: "/register/returning",
      skipTo: "/register/chosen",
    },

    {
      currentPath: "/register/choose-npq",
      storedData: ["register", "course"],
      values: [
        "NPQ for Leading Behaviour and Culture (NPQLBC)",
        "NPQ for Leading Literacy (NPQLL)",
        "NPQ for Leading Teaching (NPQLT)",
        "NPQ for Leading Teacher Development (NPQLTD)",
        "NPQ for Leading Teacher Development (NPQLTD)",
        "NPQ for Senior Leadership (NPQSL)",
        "NPQ for Headship (NPQH)",
        "NPQ for Executive Leadership (NPQEL)",
        "NPQ for Early Years Leadership (NPQEYL)",
        "The Early Headship Coaching Offer",
      ],
      forkPath: (value) => {
        console.log(
          "where do you work:",
          req.session.data.register["where-do-you-work"]
        );
        console.log("do you have ofsted:", req.session.data.register["ofsted"]);


        if (req.session.data.register["where-do-you-work"] === "England") {
   
          if (req.session.data.register["course"]== "The Early Headship Coaching Offer")
          {
            return "/aso/aso-intro";
          }

          if (req.session.data.register["what-setting"] === "Other") {
            console.log("other maybe");
            return "/register/choose-provider";
          }

          if (req.session.data.register["school"] === "private school") {
            console.log("private school");
            return "/not-funded/funding-not-available";
          }

          if (
            req.session.data.register["nursery-type"] === "Private nursery" &&
            req.session.data.register["ofsted"] === "Yes" &&
            req.session.data.register["course"] !=
              "NPQ for Early Years Leadership (NPQEYL)"
          ) {
            console.log("Not doing EY");
            return "/not-funded/funding-not-available";
          }

          if (req.session.data.register["ofsted"] === "No") {
            console.log("no ofsted");
            return "/not-funded/funding-not-available";
          }
           else {
            console.log("funded");
            return "/register/funding-vague";
          }
        } else 

        {
          console.log("not eng");
          return "/not-funded/funding-not-available";
        }
      },
    },



   

  
  ];
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
