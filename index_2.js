const axios = require("axios");
const cheerio = require("cheerio");



function test(){
const artistName = "radiohead";

axios.get(`https://last.fm/music/${artistName}`).then(({ data }) => {
    const $ = cheerio.load(data);
    const li = $("li.sidebar-image-list-item");

    for(let i=0;i<10;i++){
        const link = $(li[i]).find("img.sidebar-image-list-image").attr("src");
    }
});


}


async function getArtistImage(artistName){

    let srcArray= [];
    const pages_no = await  getNumberOfImagesPage(artistName);

    for(let i=1; i<=pages_no; i++){

        const { data } = await axios.get(`https://last.fm/music/${artistName}/+images?page=${i}`);
        console.log("page: ",i);
        const $ = cheerio.load(data);
        const images = $("li.image-list-item-wrapper img");

        for(let i=0; i<images.length; i++){
            const image = images[i];
            const src = $(images).attr("src");
            srcArray.push(src);
        }
    }
    console.log(srcArray[srcArray.length - 1]);
    return srcArray;

}


async function getNumberOfImagesPage(artistName){
    const { data } = await axios.get(`https://last.fm/music/${artistName}/+images`);
    const $ = cheerio.load(data);

    const pages = $("li.pagination-page")
    if(pages.length === 0) return 0;

    return (parseInt($(pages[pages.length - 1]).find("a").text().replace(/ /g, "")));
}


getArtistImage("Radiohead");
