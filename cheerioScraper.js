const cheerio = require('cheerio')
const axios = require('axios')

// Cheerio scraper for a 'static' web page or HTML // Could be a component of its own

const url = 'https://www.iltalehti.fi'
const cheerioScraper = async (page) => {
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
const cheeriodata = cheerioScraper(url)

module.exports = {cheeriodata}
