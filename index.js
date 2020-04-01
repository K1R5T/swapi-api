const express = require("express"); //npm i express
const hbs = require("express-handlebars"); // npm i express-handlebars
const path = require("path"); // npm i path
const app = express(); // initialising express
const bodyParser = require("body-parser"); // npm i body-parser
const fetch = require("node-fetch"); // npm i node-fetch
const fs = require("fs");
require("dotenv").config(); // npm i dotenv

// const getAPI = require("./lib/getAPI");

// app.use(express.static(path.join(__dirname + "public")));

// app.engine(
//     ".hbs",
//     hbs({
//         defaultLayout: "layout",
//         extname: ".hbs"
//     })
// );
// app.set("view engine", ".hbs"),

//     app.get("/", async (req, res) => {
//         let people = await getAPI.getStarWars();
//         // multiple exports used
//         let name = people.name

//         res.render("index", {
//             people:{
//                 name
//             }
//         });
//     });


const getAPI = require("./lib/getAPI");

app.use(bodyParser.urlencoded({ extended: false})); // allows us to ignore data types and pass as string
app.use(bodyParser.json()); // parses data as json
app.use(express.static(path.join(__dirname, "public")));

app.engine(
    ".hbs",
    hbs({
        defaultLayout: "layout",
        extname: ".hbs"
    })
);
app.set("view engine", ".hbs"), // using the hbs ext for our template and files

// 4 HTTP methods - **GET POST** PUT DELETE
// PUT = Update information DELETE = deletes

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.post("/", async (req, res) => {
        let person = req.body.person; //name in the form = name
        
        let data = await getAPI.getStarWars(person);
        // console.log(data);
        //multiple exports used
        let name = data.results[0].name;
        let gender = data.results[0].gender;
        let birth_year = data.results[0].birth_year;
        let height = data.results[0].height;
        let skin_color = data.results[0].skin_color;

        // console.log(name)
        

        res.render("index", 
        {data:{
            name,
            gender,
            birth_year,
            height,
            skin_color
        }
        }); // index.hbs inside the views folder as default
    });


app.listen(3005, () => {
    console.log("Server is listening It is always listening..."); //localhost:3000 will say cannot GET/... this means it cannot grab data it needs
});

