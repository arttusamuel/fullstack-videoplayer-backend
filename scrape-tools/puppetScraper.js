const puppeteer = require('puppeteer');

// puppeteer käyttöönotto
const puppet = async (link) => {
    console.log('launching browser with puppeteer...')
    const browser = await puppeteer.launch({
        headless: false //avaa välilehden näkyville
    })

    const page = await  browser.newPage()
    await page.goto(link)
    await page.click('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > div.VtwTSb > form:nth-child(2) > div > div > button');//rejects all cookies
    
  
    try{
        await page.waitForSelector('#contents')

        const videoElements = await page.$$('#contents')
        
        for (const element of videoElements){
            const title = await element.$eval('#video-title-link', title => title.innerText)
            console.log(title)
            const href = await element.$eval('#video-title-link', title => title.href)
            console.log(href)
        }
            
    }catch (e){
        console.log(e, " is the error")
    }


    //await page.close()
    }

// Sivu ja screenshot latautuu 
// Cookies kyselyn ohitus --TOIMII--
// Video-otsikot ovat <h3> tagilla, elementit löytyvät-> --EI TOIMINNASSA --
// <a id="video-title-link" jossa href=url --EI TOIMINNASSA --
// Tarvitsee ladata sivun kaikki videot tai käyttää "scroll" toimintoa --EI TOIMINNASSA --//

// module exports the function and can be used in index.js
module.exports = {puppet}