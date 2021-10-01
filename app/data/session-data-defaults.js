module.exports = {
  features: {
    'aso-loop': {
      on: false,
      name: 'ASO Loop',
      description: 'Allow users to loop from the confirmation page back into an ASO course registration journey'
    },
    'international-and-non-teacher': {
      on: true,
      name: 'International and Non-teacher journeys',
      description: 'Tailor registration journey for international teachers and non-teachers'
    },
    'name-changes': {
      on: true,
      name: 'Name changes',
      description: 'Use the original ‘Name changes’ journey, which asks about whether someone has changed their name since they became a teacher'
    }
  }
}
