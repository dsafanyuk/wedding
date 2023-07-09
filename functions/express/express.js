const express = require('express')
const {Router} = express; 

const morgan = require('morgan')
const uuid = require('uuid')
const serverless = require('serverless-http');

morgan.token('id', (req) => { //creating id token
    return req.id
})
const router = Router();
const app = express()
app.use(assignId)
app.use(morgan(':id :method :url :response-time'))
function assignId(req, res, next) {
    const id = uuid.v4()
    req.id = id
    next()
}
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});
router.get('/our-story', function (req, res) {
    res.sendFile(__dirname + '/our-story.html');
});

router.get('/q-a', function (req, res) {
    res.sendFile(__dirname + '/qa.html');
});
router.get('/photos', function (req, res) {
    res.sendFile(__dirname + '/photos.html');
});

router.get('/registry', function (req, res) {
    //redirect to google.com
    res.redirect('https://www.theknot.com/us/david-safanyuk-and-eunike-olivia-sep-2023/registry');
});
router.get('/rsvp', function (req, res) {
    //redirect to google.com
    res.redirect('https://www.theknot.com/us/david-safanyuk-and-eunike-olivia-sep-2023/rsvp');
});
router.get('/us/david-safanyuk-and-eunike-olivia-sep-2023', function (req, res) {
    res.redirect(301, '/')
});

// redirect any path that starts with david-safanyuk-and-eunike-olivia-sep-2023 to a path that omits that string
router.get('/us/david-safanyuk-and-eunike-olivia-sep-2023*', function (req, res) {
    // redirect to the same path but without the david-safanyuk-and-eunike-olivia-sep-2023
    console.log(req.path, req.path.replace('us/david-safanyuk-and-eunike-olivia-sep-2023', ''))
    res.redirect(301, req.path.replace('/us/david-safanyuk-and-eunike-olivia-sep-2023', ''));
});

app.use('/api', router)

module.exports = app;
module.exports.handler = serverless(app);
