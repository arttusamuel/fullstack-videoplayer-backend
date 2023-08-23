
const PORT = 3001
const http = require('http')
const express = require('express')
//new additions to try to scrape web info
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

//Running the server on port 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
console.log("Page updated..")})

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

scrapeWeb(url).then(news => console.log(news))
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
app.get('/', (req, res) => {
    res.send('<h1> This is the root of the web application backend</h1>')
})
//setting up data api content
app.get('/api/videodata', (req, res) => {
    res.json(videodata)
    console.log(videodata)
})
//example of another data api content
app.get('/api/else', (req, res) => {
    res.send('something else')
})
