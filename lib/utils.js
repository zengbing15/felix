/** AGENT **/
var util = require("util");
var url = require("url");

/** TIMER **/

function Timer(delay) {
  this.delay = delay;
}
util.inherits(Timer, require("events").EventEmitter);

/* Starts the timer, does nothing if started already. */
Timer.prototype.set = function set() {
  if (this.timeout) return;
  this.timeout = setTimeout(function () {
    this.timeout = null;
    this.emit("fire");
  }.bind(this), this.delay);
  this.emit("active");
};

/* Cancels the timer if set. */
Timer.prototype.cancel = function cancel() {
  if (!this.timeout) return;
  clearTimeout(this.timeout);
  delete this.timeout;
};

/* Starts the timer, cancelling first if set. */
Timer.prototype.reset = function reset() {
  this.cancel();
  this.set();
};

/** AGENT **/

function createAgent() {
    var proxy = process.env["https_proxy"] || process.env["all_proxy"];
    if (!proxy) return;
  
    try {
      proxy = url.parse(proxy);
    } catch (e) {
      console.error("Error parsing proxy URL:", e, "Ignoring proxy.");
      return;
    }
  
    if ([ "socks:", "socks4:", "socks4a:", "socks5:", "socks5h:" ].indexOf(proxy.protocol) !== -1) {
      try {
        var SocksProxyAgent = require('socks-proxy-agent');
      } catch (e) {
        console.error("Error loading SOCKS proxy support, verify socks-proxy-agent is correctly installed. Ignoring proxy.");
        return;
      }
      return new SocksProxyAgent(proxy);
    }
    if ([ "http:", "https:" ].indexOf(proxy.protocol) !== -1) {
      try {
        var HttpsProxyAgent = require('https-proxy-agent');
      } catch (e) {
        console.error("Error loading HTTPS proxy support, verify https-proxy-agent is correctly installed. Ignoring proxy.");
        return;
      }
      return new HttpsProxyAgent(proxy);
    }
  
    console.error("Unknown proxy protocol:", util.inspect(proxy.protocol), "Ignoring proxy.");
  }

  exports.createAgent = createAgent;