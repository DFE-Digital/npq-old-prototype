module.exports = {
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
      on: false,
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
