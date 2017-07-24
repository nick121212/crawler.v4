require('seneca')()
    .add('bar:1', function(msg, done) {
        done(null, { x: 1, v: 100 + msg.v })
    })

// this service handles bar:1 messages 
.use('mesh', { auto: true, pin: 'bar:1' })

.ready(function() {
    var seneca = this

    setInterval(function() {

        // use foo:1, even though location of 
        // service-foo is not configured! 
        seneca.act('foo:1,v:2', (err, res) => {
            console.log(res);
        })
    }, 3000)
})