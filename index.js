;(function() {
  
  /**
   * The MIT License (MIT)
   * Copyright (c) 2013 Chuck Preslar
   * 
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the "Software"), 
   * to deal in the Software without restriction, including without limitation 
   * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
   * and/or sell copies of the Software, and to permit persons to whom the Software 
   * is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in 
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
   * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
   * SOFTWARE.
   */
  
  var broadcaster = (function() {

    var events = {};

    /**
     * Event Broadcaster to be used for interapplication communication
     *
     * @constructor
     */

    function Broadcaster() {
      if(!(this instanceof Broadcaster))
        return new Broadcaster();
    }

    /**
     * Adds a listener function to respond the specified event
     *
     * @param {String} event Name of the event
     * @param {Function} listener Listener to run until removed from the events listener array
     * 
     * @returns {Function} The listener provided
     */

    Broadcaster.prototype.addListener = Broadcaster.prototype.on = function(event, listener) {
      if(typeof events[event] === 'undefined' || events[event] === null)
        events[event] = { maxListeners: -1, listeners: [] };
      if(typeof listener !== 'function')
        throw new Error('Broadcaster#addListener expects an event name and listener as parameters.');
      if(!~events[event].maxListeners || event[event].listeners.length < event[event].maxListeners)
        events[event].listeners.push(listener);
      else
        throw new Error('The maximum amount of listeners for event `' + event + '` has been reached.');
      return listener;
    };

    /**
     * Fires the listener only once before it is removed from the events
     * listener list.
     *
     * @param {String} event Name of the event
     * @param {Function} listener Listener to run only once on when the event fires
     */

    Broadcaster.prototype.once = function(event, listener) {
      var self = this;
      return this.addListener(event, function wrapper() {
        listener.apply(this, arguments);
        self.removeListener(wrapper)
      });
    }

    /**
     * Removes a listener from the events array
     *
     * @param {Object} event Details of the listener to remove from list 
     *
     * @returns {Boolean} Success or failure of event listener removal
     */

    Broadcaster.prototype.removeListener = Broadcaster.prototype.off = function(listener) {
      for(var event in events) {
        if(events.hasOwnProperty(event)) {
          var index = Math.abs(~events[event].listeners.indexOf(listener));
          if(index)
            return events[event].listeners.splice(index - 1, 1);
        }
      }
      return undefined;
    };

    /**
     * Returns a list of the event listeners
     *
     * @param {String} event Name of the event to return list of listeners
     *
     * @returns {Array} 
     */

    Broadcaster.prototype.listeners = function(event) {
      if(typeof event !== 'undefined' && event !== null)
        return events[event].listeners;
    };

    /**
     * Returns a list of all events with active listeners
     *
     * @returns {Array}
     */

    Broadcaster.prototype.events = function() {
      var list = [];
      for(var event in events)
        list.push(event);
      return list;
    };

    /**
     * Sets an events maximum number of listeners
     *
     * @param {String} event Name of the event
     * @param {Number} max The maximum number of listeners an event have
     */

    Broadcaster.prototype.setMaxListeners = function(event, max) {
      if(events[event]) {
        events[event].maxListeners = max;
        return max;
      }
    };

    /**
     * Emit the data to all listeners of the specified event
     *
     * @param {String} event Name of the event
     * @param {String|Number|Array|Object|Boolean} data The data to pass to listener functions
     */

    Broadcaster.prototype.emit = function() {
      if(!events[arguments[0]]) return;
      for(var i = 0, il = events[arguments[0]].listeners.length; i < il; i++)
        if(typeof events[arguments[0]].listeners[i] === 'function')
          events[arguments[0]].listeners[i].apply(this, [].slice.call(arguments, 1));
    };

    return new Broadcaster();
  }())

  if(typeof module !== 'undefined' && module.exports)
    module.exports = broadcaster;
  else if(typeof define === 'function' && define.amd)
    define('broadcaster', function() { return broadcaster });
  else if(typeof provide === 'function')
    provide('broadcaster', broadcaster);
  else
    window.broadcaster = broadcaster;

}())
