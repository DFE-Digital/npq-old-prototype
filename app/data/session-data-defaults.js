module.exports = {
  register: {
    email: 'email@example.com',
    'work-in-school': 'Yes',
    'where-do-you-work': 'England',
    'know-trn': 'yes',
    'name-changed': 'no',
    trn: '1234567',
    name: 'Jane Doe',
    'dob-day': '1',
    'dob-month': '1',
    'dob-year': '1980',
    nino: 'QQ 12 34 56 C',
    'school-location': 'London',
    school: 'Oftborough College',
    course: 'NPQ Leading Teaching (NPQLT)',
    provider: 'Ambition Institute',
    'agree-to-share': ['yes']
  },
  features: {
    'aso-loop': {
      on: false,
      name: 'Additional Support Offer Loop',
      description: 'Allow users to loop from the confirmation page back into an ASO course registration journey'
    },
    international: {
      on: true,
      name: 'International journey',
      description: 'Include questions and contextual guidance for international teachers'
    },
    'non-teacher': {
      on: true,
      name: 'Non-teacher journey',
      description: 'Include questions and contextual guidance for non-teachers'
    },
    'name-changes': {
      on: true,
      name: 'Full name change flow',
      description: 'Use the original ‘Name changes’ journey, which asks about whether someone has changed their name since they became a teacher'
    },
    'name-change-guidance': {
      on: true,
      name: 'Single page ‘Check your details’ with name change guidance',
      description: 'Include guidance about changing names on the ‘Check your details’ page'
    }
  }
}
