# express-power-router
An extreme powerful Express Routing machine

## What is it ?
This module adds the Promise functionality to your express app.
In addition to promise, you can add endpoint configurations so you can intercept the request and do
everything you want.

## Usage
    var PowerRouter = require('express-power-router');
    var powerRouter = new PowerRouter({
        Promise : bluebirdPromise // this is optional, the default is Global NodeJS Promise
    });

    // we are creating an interceptor to log result
    powerRouter.createInterceptor({
        intercepts : parameters => parameters.logResult,
        execute : (parameters, req, res, stack) => {
            return stack.next().then(result => {
                console.log(result);
                return result;
            });
        }
    });

    // now lets create a new router and endpoint
    var router = powerRouter.createRouter('/myController');

    // the third argument will be sent to interceptors
    router.get('/', callback, { logResult : true });

    function callback(request, response) {
        // request and response are from express
        return Promise.resolve({
            result : 'I can return a promise!'
        });
    }

    // lets assume we already have a var app with express app
    app.use(powerRouter); // use plugin the powerRouter to your express app


# Errors

PowerRouter.BadRequestError to throw 400 code
PowerRouter.NotFoundError to throw 404 code

# interceptor parameters
parameters.method -> GET, POST, PUT, DELETE'
parameters.path -> the controller path + endpoint path
aditional parameters are sent by third argument