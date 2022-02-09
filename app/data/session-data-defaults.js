module.exports = {
  register: {},
  features: {
    'aso-loop': {
      on: false,
      name: 'Additional Support Offer Loop',
      description: 'Allow users to loop from the confirmation page back into an ASO course registration journey'
    },
    'registration-soft-close': {
      on: false,
      name: 'Registration soft close',
      description: 'How the service behaves when the service is closed but allows for delayed registrations'
    },
    'registration-closed': {
      on: false,
      name: 'Registration closed',
      description: 'How the service behaves when you cannot register for Autumn 2022 yet'
    },
    'npq-accounts': {
      on: false,
      name: 'NPQ accounts',
      description: 'Enabling users to have change/edit there registration details more efficiently'
    }
  }
}
