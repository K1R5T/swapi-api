const fetch = require("node-fetch");
require("dotenv").config();




const getStarWars = async (person) => {
    const url = `https://swapi.co/api/people/?search=${person}`;
    let data = await fetch(url); // fetched an argument - url ^^^ it's the API url

    // console.log(await data.json());  // converted the response into json data    /// promise rejection warning body already used means data.json used twice

    return await data.json(); // converted the responce into json data

    // fs.writeFileSync("starWarsData.json", JSON.stringify(jsonData)); // two parameters
    // path and the data you want to write to the path
};

getStarWars()

module.exports = {
    getStarWars,
}