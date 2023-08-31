const puppeteer = require('puppeteer');

// autoscroll function declaration
const autoScroll = async (page) => {
    while (true){
    previousHeight = await page.evaluate('document.body.scrollHeight')
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    await page.waitForFunction('document.body.scrollHeight' > {previousHeight})
    await new Promise((resolve) => setTimeout(resolve, 1000))
}}

// puppeteer function declaration
const puppet = async (link) => {
    console.log('launching browser with puppeteer...')
    const browser = await puppeteer.launch({
        headless: false, //avaa välilehden näkyville
        args: [`--window-size=1920,1080`],
        defaultViewport: {
          width:640,
          height:1080
        }
  
    })

    //opening the page
    const page = await  browser.newPage()
    await page.goto(link)
    await page.click('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > div.VtwTSb > form:nth-child(2) > div > div > button');//rejects all cookies
    await autoScroll(page)
  
    try{
        await page.waitForSelector('#contents')
        let count = 0
        const videoElements = await page.$$('#contents')
        
        //for loop works when running first time
        for (const element of videoElements){
            await page.waitForSelector('#video-title-link')
            count = count+1
            const title = await element.$eval('#video-title-link', title => title.innerText)
            console.log(title)
            const href = await element.$eval('#video-title-link', title => title.href)
            console.log(href)
            console.log(count)
        }
            
    }catch (e){
        console.log("Error while navigating page ", e)
    }


    //await page.close()
    }

// Sivu ja screenshot latautuu 
// Cookies kyselyn ohitus --TOIMII--
// Video-otsikot ja linkit ovat id tagilla -- 80% elementeistä löytyy--
// Tarvitsee ladata sivun kaikki videot tai käyttää "scroll" toimintoa --EI TOIMINNASSA --//

// module exports the function and can be used in index.js
module.exports = {puppet, autoScroll}