module.exports = {
  register: {},
  features: {
    'aso-loop': {
      on: false,
      name: 'Additional Support Offer Loop',
      description: 'Allow users to loop from the confirmation page back into an ASO course registration journey'
    },
    'registration-closed': {
      on: true,
      name: 'Registration closed',
      description: 'How the service behaves when you cannot register for Autumn 2022 yet'
    }
  }
}
