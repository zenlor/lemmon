/**
 * Defaults
 */

// 30 seconds timeout for heroku
var _timeout = 3e4

module.exports = Lemmon

function Lemmon (res, timeout) {
  this.res = res
  this.timeout = timeout || _timeout
  this.refreshed = Date.now()
}

Lemmon.prototype.send = function (data) {
  var self = this
  // reset out internal timeout
  this.refreshed = Date.now()

  clearTimeout(this.to)

  this.to = setTimeout(this._refresh.bind(this), this.timeout)

  if (typeof data !== 'string')
    data = JSON.stringify(data)

  this.res.write(data)
}

Lemmon.prototype.end = function() {
  if (!! this.to)
    clearTimeout(this.to)
  this.res.end('')
}

Lemmon.prototype._refresh = function () {
  if (Date.now() - this.refreshed >= this.timeout) {
    this.send('\n')
    this.refreshed = Date.now()
  }
}
