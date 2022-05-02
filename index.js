const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://instagram.com/instagram');
  
  const imgList = await page.evaluate(() => {
    //Toda essa função será executada no browser

    // Vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img');

    //Transformar o NodeList em array
    const imgArray = [...nodeList];

    //Transformar os nodes (elementos html)  em objetos js
    const imgList = imgArray.map(({src}) => ({
        src
    }));

    //colocar para fora da função
    return imgList;
    });

    //escrever dados num arquivo local
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2 ), err => {
        if(err) throw new Error('something went wrong');

        console.log('Well done!')
    });

  await browser.close();
})();