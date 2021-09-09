/* global $ */

;(function (global) {
  'use strict'

  var PrototypeKit = global.PrototypeKit || {}
  PrototypeKit.Modules = PrototypeKit.Modules || {}

  PrototypeKit.Modules.Edge = function () {
    this.start = function (element) {
      element.on('click', 'a[href="#"], .js-edge', alertUser)

      function alertUser (e) {
        e.preventDefault()
        var target = $(e.target)
        var message = target.data('message') || 'Sorry, this hasn’t been built yet'

        window.alert(message)
      }
    }
  }

  global.PrototypeKit = PrototypeKit
})(window)
