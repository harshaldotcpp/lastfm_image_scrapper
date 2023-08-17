const axios = require("axios");
const cheerio = require("cheerio");




async function getArtistImages(artistName,count){

    let srcArray= [];

    try{
    const pages_no = await  getNumberOfImagesPage(artistName);

    loop1:
    for(let i=1; i<=pages_no; i++){

        const { data } = await axios.get(`https://last.fm/music/${artistName}/+images?page=${i}`);
        const $ = cheerio.load(data);
        const images = $("li.image-list-item-wrapper img");

        loop2:
        for(let i=0; i<images.length; i++){
            if(count === i) break loop1;
            const image = images[i];
            let src = $(image).attr("src")
            src = src.replace("avatar170s/","");
            srcArray.push(src);
        }
    }

    } catch(e){
        console.log(e);
        return srcArray;
    }
    return srcArray;

}


async function getNumberOfImagesPage(artistName){
    const { data } = await axios.get(`https://last.fm/music/${artistName}/+images`);
    const $ = cheerio.load(data);

    const pages = $("li.pagination-page")
    if(pages.length === 0) return 1;

    return (parseInt($(pages[pages.length - 1]).find("a").text().replace(/ /g, "")));
}


exports.getArtistImages = getArtistImages;


