
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

//new data scrape function for ILTALEHTI *** TOIMII *** 
const url = 'https://www.iltalehti.fi'
const scrapeWeb = async (page) => {
    try {
    const response = await axios.get(page)
    const html = response.data
    const $ = cheerio.load(html)
    const news = []

    $('.full-article', html).each(function(){
        const page = (url)+$(this).find('a').attr('href')
        const title = $(this).find('.front-title').text()
        const time = $(this).find('.category-time').find('time').text()
        
        news.push({
            'title': title,
            'url': page,
            'time': time
        })
    })
    return news
    }catch (err){
        console.log(err)
    }     
}


//Root heading
app.get('/', (req, res) => {
    res.send('<h1> This is the root of the web application backend</h1>')
})
//setting up data to api/newsdata ** TOIMII NYT **
app.get('/api/newsdata', async (req, res) => {
    const data = await scrapeWeb(url)
    console.log('app.get api/newsdata käsiteltiin')
    res.json(data)
})
//example of another data api content
app.get('/api/else', (req, res) => {
    res.send('something else')
})
