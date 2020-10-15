const PromiseM = require('../lib');

test('executor resolved', (done) => {
    let promise = new PromiseM((resolve, reject) => {
        setTimeout(function () {
            resolve(1);
            //reject(1)
        }, 100);
    });

    promise.then(
        (value) => {
            console.log('onResolved:', value);
            try {
                expect(value).toBe(1);
                done();
            }catch(e){
                done(e);
            }
        },
        (reason) => {
            // console.log('onRejected:', reason);
        },
    );
});
