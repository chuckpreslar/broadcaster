;(function() {

  var Broadcaster = (function() {

    /* Singleton instance of the Broadcaster */

    var instance, events = {};

    /**
     * Event Broadcaster to be used for interapplication communication
     *
     * @constructor
     */

    function Broadcaster() {
      if(typeof instance !== 'undefined' && instance !== null) 
        return instance;
      if(!(this instanceof Broadcaster))
        return new Broadcaster();
      instance = this;
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
      return this.addListener(event, function wrapper(data) {
        listener(data);
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

    Broadcaster.prototype.removeListener = function(listener) {
      for(var event in events) {
        if(events.hasOwnProperty(event)) {
          for(var i = 0, il = events[event].listeners.length; i < il; i ++) {
            if(listener === events[event].listeners[i]) {
              events[event].listeners.splice(i, 1);
              return true;
            }
          }
        }
      }
      return false;
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
      for(var event in events) {
        list.push(event);
      }
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

    Broadcaster.prototype.emit = function(event, data) {
      if(!events[event]) return;
      for(var i = 0, il = events[event].listeners.length; i < il; i++)
        if(typeof events[event].listeners[i] === 'function')
          events[event].listeners[i](data);
    };

    return Broadcaster;
  }())

  if(typeof module !== 'undefined' && module.exports)
    module.exports = Broadcaster;
  else if(typeof define === 'function' && define.amd)
    define('Broadcaster', function() { return Broadcaster });
  else if(typeof provide === 'function')
    provide('Broadcaster', Broadcaster);
  else
    window.Broadcaster = Broadcaster;

}())
