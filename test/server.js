var PowerRouter = require('../'),
    powerRouter = new PowerRouter(),
    BadRequestError = PowerRouter.BadRequestError,
    express = require('express'),
    app = express()

// we are creating an interceptor to log result
powerRouter.createInterceptor({
    intercepts : parameters => parameters.addProperty,
    execute : (parameters, req, res, stack) => {
        return stack.next().then(result => {
            result.anotherResult = 'The result has been changed!';
            return result;
        });
    }
});

// now lets create a new router and endpoint
var router = powerRouter.createRouter('/myController');

router.defaultAction = req => req.defaultActionExecuted = true;

// the third argument will be sent to interceptors
router.get('/', callback, { addProperty : true });
router.get('/customEnd', callbackCustomEnd);
router.get('/throwError', throwError);

function callbackCustomEnd(req, res) {
    res.end('my custom end');
}

function callback() {
    // request and response are from express
    return Promise.resolve({
        result : 'I can return a promise!'
    });
}

function throwError() {
    throw new BadRequestError('My error message');
}

app.use(powerRouter); // use plugin the powerRouter to your express app
app.listen(8876 || process.env.PORT);

module.exports = app;