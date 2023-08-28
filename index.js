const PORT = 4000
const http = require('http')
const express = require('express')
const cheerioScraper = require('./cheerioScraper')
const url = require('./cheerioScraper')
const axios = require('axios')

//new additions to try to scrape web info
const app = express()

//Running the server on port 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
console.log("Page updated..")})

<<<<<<< HEAD
//new data scraped from YOUTUBE
//Only logs into console --> need an async await arrow function to be stored 

const url = 'https://www.iltalehti.fi/'

const scrapeWeb = async (page) => {
    try {
    const response = await axios.get(page)
    const html = response.data
    const $ = cheerio.load(html)
    const news = []

    $('.full-article', html).each(function(){
        const url = $(this).find('a').attr('href')
        const title = $(this).find('.front-title').text()
        const time = $(this).find('.category-time').find('time').text()
        
        news.push([
            title,
            url,
            time
        ])
    })
    return news
    }catch (err){
        console.log(err)
    }     
}

const data = await scrapeWeb(url)
console.log(data)


console.log('Website data should be here: ')



//videodata example
let videodata = [
    {
      id: 1,
      content: "HTML is easy and fun",
      date: "2022-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-01-10T19:20:14.298Z",
      important: true
    }
  ]
//Root heading
=======
// *** ROUTES *** //  ROUTES Could be a component on its own
>>>>>>> 3576a89c6b78bf0640be3fd2e0a5cbcdbf9efd77
app.get('/', (req, res) => {
    res.send('<h1> Web Scraper </h1>')
})

//setting up data to api/newsdata ** TOIMII NYT **
app.get('/api/newsdata', async (req, res) => {
    const data = await cheerioScraper.cheeriodata
    console.log('app.get api/newsdata käsiteltiin')
    res.json(data)
})
//example of another data api content
app.get('/api/else', (req, res) => {
    res.send('something else')
})
