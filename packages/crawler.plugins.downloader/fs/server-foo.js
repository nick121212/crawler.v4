require('seneca')()
    .add('foo:1', function(msg, done) {
        done(null, { x: 1, v: 100 + msg.v })
    })

// this service handles foo:1 messages 
.use('mesh', { auto: true, pin: 'foo:1' })

.ready(function() {
    var seneca = this

    setInterval(function() {

        // use bar:1, even though location of 
        // service-bar is not configured! 
        seneca.act('bar:1,v:2', (err, res) => {
            console.log(res);
        })
    }, 3000)
})