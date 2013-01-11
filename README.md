![broadcaster logo](http://img96.imageshack.us/img96/7761/broadcaster.png)

Singleton event emitter for inter-application communication.  Just require and instantiate to have the same instance across your application.


## Usage

To run the tests:

    $ npm install broadcaster
    $ make test
    $ open http://localhost:3000

And when ready to use:

    $ make build

Ready for usage with [RequireJS](https://github.com/jrburke/requirejs) and [Ender](https://github.com/ender-js/Ender).

```js
var emitter = require('broadcaster'); 
```
