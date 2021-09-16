const { DateTime } = require('luxon')

module.exports = function (env) {
  // If you need access to an internal nunjucks filter you can use env
  // see the example below for 'safe' which is used in 'filters.log'
  var nunjucksSafe = env.getFilter('safe')

  /**
   * Object used to store the filters
   * filters.foo("input") here, becomes {{ "input" | foo }} in templates
   * @type {Object}
   */
  var filters = {}

  /**
   * Logs an object in the template to the console in the browser.
   * @param  {Any} a any type
   * @return {String} a script tag with a console.log call.
   * @example {{ "hello world" | log }}
   * @example {{ "hello world" | log | safe }}  [for environments with autoescaping turned on]
   */
  filters.log = function log (a) {
    return nunjucksSafe('<script>console.log(' + JSON.stringify(a, null, '\t') + ');</script>')
  }

  // example: 7 December 2021
  filters.dateWithYear = datetimeString => {
    return DateTime.fromISO(datetimeString).toFormat('d MMMM yyyy')
  }

  // example: "not like this" becomes "Not like this"
  filters.capitaliseFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return filters
}
