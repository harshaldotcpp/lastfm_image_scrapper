const lastFm = require("./index");


lastFm.getArtistImages("slowdive",5).then(srcArray=>{
    console.log(srcArray);
});