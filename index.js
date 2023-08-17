const  puppeteer =  require("puppeteer");


const browserPath = "/usr/bin/chromium";
const artist_name = "coldplay";
const args =  [ 
    '--disable-gpu', 
    '--disable-setuid-sandbox', 
    '--no-sandbox', 
    '--no-zygote', 
]


async function getArtistImages(browserPath,artist_name){ 

   let browser; 
   const imageSrc = []
   try{
       browser = await puppeteer.launch({
           executablePath: browserPath,
           args: args,
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
       for(const imageHandler of imagesHandler){
          if(i > 10) break;
     
           const src = await page.evaluate((image)=>{
               return image.getAttribute("src");
           },imageHandler) + ".jpg"
           ;
           imageSrc.push(src.replace("avatar170s","900x900"));
          
        }
        console.log("Work Done :)"); 
       
    }
   catch(error){
       console.log(error);
       browser?.close();
       return imageSrc;
   }

    browser?.close();
    return imageSrc;
}


exports.getArtistImages = getArtistImages;

