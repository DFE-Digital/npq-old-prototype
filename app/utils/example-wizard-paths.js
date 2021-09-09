const {
  nextAndBackPaths,
  nextForkPath
} = require('../utils/wizard-helpers')

function exampleWizardPaths (req) {
  var paths = [
    '/example-wizard',
    '/example-wizard/name',
    '/example-wizard/where-do-you-live',
    '/example-wizard/england',
    '/example-wizard/nationality',
    '/example-wizard/check',
    '/example-wizard/confirm',
    '/'
  ]

  return nextAndBackPaths(paths, req)
}

function exampleWizardForks (req) {
  var forks = [
    // Example fork:
    // Skip the England question if an answer other
    // than England is given for where you live
    {
      currentPath: '/example-wizard/where-do-you-live',
      storedData: ['example-wizard', 'where-do-you-live'],
      excludedValues: ['England'],
      forkPath: '/example-wizard/nationality'
    }
  ]
  return nextForkPath(forks, req)
}

module.exports = {
  exampleWizardPaths,
  exampleWizardForks
}
