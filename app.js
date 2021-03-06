const express = require('express'); // web server
const morgan = require('morgan'); // server log
const cors = require('cors'); // config cors
const helmet = require('helmet'); // header security configs

// instantiate app
const app = express();

// bind middleware
app.use(morgan('common'));
app.use(cors());
app.use(helmet());

// access data
const playApps = require('./playstore.js');

// setup app endpoint
app.get('/apps', (req, res) => {
    // Step 1 - get query parameters
    const { sort, genres } = req.query;
    
    // Step 2 - Validate parameters
    // & Step 3 - If !Valid, respond
    if(sort){
        if(sort === 'rating' || sort === 'app'){
            //do nothing
        } else {
            return res
                .status(400)
                .send(`sort key must be either 'app' or 'rating'`)
        }
    }

    if(sort === ''){
        return res
        .status(400)
        .send(`Sort must have a value if it is included in the query. Value options: 'app' or 'rating'`)
    }
    
    if(genres){
        let genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
        if (!genreOptions.includes(genres)){
            return res
                .status(400)
                .send(`Genres must be one of the following: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'`);
        }
    }

    if(genres === ''){
        return res
        .status(400)
        .send(`Genres must contain a value if included in the query`);
    }

    // Step 4 & 5 - If Valid, process; Construct Response
    let results = playApps;

    if(genres){
        results = results.filter(app => app['Genres'].includes(genres))
    }
    
    if(sort){
        results.sort((a,b) => {
            if(sort === 'app'){
                if(a['App'] > b['App']){
                    return 1
                } else if(a['App'] < b['App']){
                    return -1
                } else {
                    return 0
                }
            }
            else if(sort === 'rating'){
                if(a['Rating'] > b['Rating']){
                    return 1
                } else if(a['Rating'] < b['Rating']){
                    return -1
                } else {
                    return 0
                }
            }
        
        })
    }

    
    // Step 6 - Respond


    return res.json(results)
})

module.exports = app;