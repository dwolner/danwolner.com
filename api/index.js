const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const RSSParser = require('rss-parser')
const cron = require('node-cron')
var csv = require('csv-express')

const db = require('diskdb')
db.connect('./data', ['contactRequests'])

const app = express()

let instaFeed = null
let instaToken = 'IGQVJWdWU3ZAXBqbVRaS2h2ekRESWQ2bGlxSE1XVzFqaXNTQmxpR0FxQ3I4WmFyaVRuaGkxUTlDVlFjTHRYLW1BZAzczOGxiaHVFNXNEMWJEeF9SOGZAQbXdqR3NEOVRrTFo2RlJrVjln'

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/', (req, res) => {
    res.send("api online!")
})

app.get('/listings', (req, res) => {
    axios.post('https://www.compass.com/api/v3/listings/search/list/relations', {
            searchQuery: {
                start: 0,
                num: 24,
                sortOrder: 90,
                listingTypes: [2],
                agentSearch: true,
                saleStatuses: [9, 12],
                geography: 'san_diego',
                listingDetailsAllowPartialMatch: {
                    'Agent Name': {
                        listValues: ['richard elias']
                    }
                },
            },
            relationTypes: [0]
        })
        .then(response => {
            res.send({
                success: true,
                body: response.data
            })
        })
        .catch(error => {
            console.log(error)
            res.send({
                success: false,
                body: error
            })
        })
})

app.get('/newsFeed', (req, res) => {
    let rssURL = 'https://www.simplifyingthemarket.com/en/feed/?a=35238-70afc3829d7f0cdac24400a255ace4ba'
    // let rssURL = 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'
    console.log(rssURL)

    let rssparser = new RSSParser();

    rssparser.parseURL(rssURL, (err, feed) => {
        console.log('NEWS FEED: ')
        console.log(feed)

        if (err) {
            console.log('NEWS FEED ERROR: ')
            console.log(err)

            res.send({
                success: false,
                body: err
            })
        } else {
            res.send({
                success: true,
                body: feed
            })
        }
    })
})

app.get('/nasaFeed', (req, res) => {
    // let rssURL = 'https://www.simplifyingthemarket.com/en/feed/?a=35238-70afc3829d7f0cdac24400a255ace4ba'
    let rssURL = 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'
    console.log(rssURL)

    let rssparser = new RSSParser();

    rssparser.parseURL(rssURL, (err, feed) => {
        console.log('NASA FEED: ')
        console.log(feed)

        if (err) {
            console.log('NASA FEED ERROR: ')
            console.log(err)

            res.send({
                success: false,
                body: err
            })
        } else {
            res.send({
                success: true,
                body: feed
            })
        }
    })
})

app.get('/instaFeed', (req, res) => {
    console.log('instaFeed: ' + instaFeed)

    res.send({
        success: instaFeed ? true : false,
        body: instaFeed
    })
})

app.post('/contact', (req, expressRes) => {
    console.log('contact req: ', req)
    const transporter = nodemailer.createTransport({
        service: 'gmail', //smtp.gmail.com  //in place of service use host...
        secure: false, //true
        port: 25, //465
        auth: {
            user: 'richardeliasbot01@gmail.com',
            pass: ',F4S`#stMbQXt-2q'
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    if (req && req.body && req.body.encodedReq) {
        req.body = JSON.parse(req.body.encodedReq)
    }

    const mailOptions = {
        to: ['richard@richardelias.com', 'xxatticus@gmail.com'],
        from: `${ req.body.email }`,
        subject: `A new lead from RichardElias.com! ${ req.body.name }`,
        text: `A new lead from RichardElias.com! This is a reminder to email ${ req.body.name } (${ req.body.email }) ${ req.body.zip } about their inquiry. Courtesy of your friendly RichardElias.com email bot!`,
        html: `
            <h2>A new lead from RichardElias.com!</h2>
            <p>This is a reminder to email <strong>${ req.body.name }</strong> about their inquiry.</p>

            <p>Name: <strong>${ req.body.name }</strong></p> 
            <p>Email: <strong>${ req.body.email }</strong></p> 
            <p>#: <strong>${ req.body.phone }</strong></p>
            <p>Zip: <strong>${ req.body.zip }</strong></p> 
            ${ req.body.interestedZips ? '<p>Interested Zips: <strong>' + req.body.interestedZips + '</strong></p>' : ''}
            ${ req.body.streetAddress ? '<p>Street Address: <strong>' + req.body.streetAddress + '</strong></p>' : '' }
            ${ req.body.agentID ? '<p>Agent: <strong>' + req.body.agentID + '</strong></p>' : '' }
            <p>Type: <strong>${ req.body.type }</strong></p> 
            ${ req.body.text ? '<p>' + req.body.text + '</p>' : '' }
            <br /><br />
            <p>Courtesy of your friendly RichardElias.com email bot!</p>
        `,
        replyTo: `${ req.body.email }`
    }

    //add req to db
    let emailObj = req.body
    emailObj.timestamp = Date.now()
    console.log('Adding new email: ', emailObj)

    db.contactRequests.save(emailObj)

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.error('there was an error: ', err)
            expressRes.send({
                success: false,
                message: 'there was an error sending the email'
            })
        } else {
            console.log('here is the res: ', res)
            expressRes.send({
                success: true,
                message: 'sent email!',
                body: res
            })
        }
    })
})

app.get('/contactRequestsList', (req, res) => {
    console.log('getting contactRequests')
    let data = db.contactRequests.find()
    console.log(data)

    res.csv(data, true)
    // res.json(db.contactRequests.find())
})

cron.schedule('0 0 */2 * * *', () => {
    console.log('Running Insta Feed Refresh: ' + instaToken)

    axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp,permalink&access_token=${ instaToken }`)
        .then(response => {
            if (response.data) {
                instaFeed = response.data.data
            }
        })
        .catch(error => {
            console.log('Running Insta Feed ERROR: ' + error)
        })
})

cron.schedule('* * 15 * *', () => {
    console.log('Running Insta Token Refresh: ' + instaToken)

    axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${ instaToken }`)
        .then(response => {
            // {
            //     "access_token": "{long-lived-user-access-token}",
            //     "token_type": "bearer",
            //     "expires_in": 5183944 // Number of seconds until token expires
            // }

            if (response.data) instaToken = response.data.access_token
        })
        .catch(error => {
            console.log('Running Insta Token ERROR: ' + error)
        })
})

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))