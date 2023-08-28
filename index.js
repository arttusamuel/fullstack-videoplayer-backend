const PORT = 4000
const http = require('http')
const express = require('express')
const cheerioScraper = require('./scrape-tools/cheerioScraper')
const url = require('./scrape-tools/cheerioScraper')
const axios = require('axios')
const puppetScraper = require('./scrape-tools/puppetScraper')

//new additions to try to scrape web info
const app = express()

//Running the server on port 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
console.log("Page updated..")})

puppetScraper.puppet("https://youtube.com/@Ard3z/videos")
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
