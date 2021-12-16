const fs = require('fs')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  // govuk-prototype-kit-plus filters
  /* ------------------------------------------------------------------ */

  // 'This is my string' returns 'This is my&nbsp;string'
  filters.noOrphans = string => {
    const indexOflastSpace = string.lastIndexOf(' ')
    if (indexOflastSpace === -1) {
      return string
    }

    const begin = string.substring(0, indexOflastSpace)
    const end = string.substring(indexOflastSpace + 1)
    return `${begin}&nbsp;${end}`
  }

  filters.countryNameFromCode = code => {
    const countries = JSON.parse(fs.readFileSync('public/govuk-country-and-territory-autocomplete/location-autocomplete-canonical-list.json', 'utf8'))
    return countries.find(country => country[1] === code)[0]
  }

  filters.redact = text => {
    return `*****${text.slice(-2)}`
  }

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
