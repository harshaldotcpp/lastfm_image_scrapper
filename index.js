const  puppeteer =  require("puppeteer");


const browserPath = "/usr/bin/chromium";
const artist_name = "daft punk";


async function getArtistImages(browserPath,artist_name){ 
   let browser; 
   try{
       browser = await puppeteer.launch({
           executablePath: browserPath,
           args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ],
           headless: true,
           defaultViewport: false,
    
       }); 
       
       const page = await browser.newPage();
       console.log("browser launched...")
        
       await page.goto(`https://last.fm/music/${artist_name}`,{
           waitUntil: ['load', 'domcontentloaded']
        }); 
        console.log("page opened..."); 
        
        
      
       const imagesHandler = await page.$$(".sidebar-image-list-image");
       let i = 1;
       const imageSrc = []
       for(const imageHandler of imagesHandler){
          if(i > 10) break;
     
           imageSrc.push(await page.evaluate((image)=>{
               return image.getAttribute("src");
           },imageHandler) + ".jpg");
          
       }
       
      
       console.log("Work Done :)"); 
       
       browser.close();
       return imageSrc;
     
     
    }
   catch(error){
       console.log(error);
       process.exit();
   }
 
}


//getArtistImages(browserPath,artist_name);
exports.getArtistImages = getArtistImages;