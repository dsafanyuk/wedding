const express = require('express')
const morgan = require('morgan')
const uuid = require('uuid')
const port = 3000
morgan.token('id', (req) => { //creating id token
    return req.id
})

const app = express()
app.use(express.static('.'))
app.use(assignId)
app.use(morgan(':id :method :url :response-time'))
function assignId(req, res, next) {
    const id = uuid.v4()
    req.id = id
    next()
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});
app.get('/our-story', function (req, res) {
    res.sendFile(__dirname + '/our-story.html');
});

app.get('/q-a', function (req, res) {
    res.sendFile(__dirname + '/qa.html');
});
app.get('/photos', function (req, res) {
    res.sendFile(__dirname + '/photos.html');
});

app.get('/registry', function (req, res) {
    //redirect to google.com
    res.redirect('https://www.theknot.com/us/david-safanyuk-and-eunike-olivia-sep-2023/registry');
});
app.get('/rsvp', function (req, res) {
    //redirect to google.com
    res.redirect('https://www.theknot.com/us/david-safanyuk-and-eunike-olivia-sep-2023/rsvp');
});
app.get('/us/david-safanyuk-and-eunike-olivia-sep-2023', function (req, res) {
    res.redirect(301, '/')
});

// redirect any path that starts with david-safanyuk-and-eunike-olivia-sep-2023 to a path that omits that string
app.get('/us/david-safanyuk-and-eunike-olivia-sep-2023*', function (req, res) {
    // redirect to the same path but without the david-safanyuk-and-eunike-olivia-sep-2023
    console.log(req.path, req.path.replace('us/david-safanyuk-and-eunike-olivia-sep-2023', ''))
    res.redirect(301, req.path.replace('/us/david-safanyuk-and-eunike-olivia-sep-2023', ''));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});