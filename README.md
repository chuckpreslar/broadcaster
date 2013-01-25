![broadcaster logo](http://img600.imageshack.us/img600/7761/broadcaster.png)

Singleton event emitter for inter-application communication.  Just require to have the same instance across your application.


## Usage

To run the tests:

    $ npm install broadcaster
    $ make test
    $ open http://localhost:3000

And when ready to use:

    $ make build

Ready for usage with [RequireJS](https://github.com/jrburke/requirejs) and [Ender](https://github.com/ender-js/Ender).

```js
var broadcaster = require('broadcaster');

/**
 * Register a listener.
 */

broadcaster.on('some:event', function(a, b, c, d) {
  // Do something because some:event occured.
});

/**
 * Now lets emit an event.
 */

broadcaster.emit('some:event', 1, 2, 3, 4);
```
