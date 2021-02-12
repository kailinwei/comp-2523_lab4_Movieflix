/*
 Authors:
 Your name and student #: Kailin Wei A01237685
 Your Partner's Name and student #:Mai Toyoda
 (Make sure you also specify on the Google Doc)
*/
const { query } = require("express");
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));  //taking content from express-> browser

app.post("/myForm", (req, res) => {     //taking the content from browser->express
  // Add your implementation here 
  const movieName = req.body.movieName.split(",");
  console.log(movieName)  //from myForm.ejs, the movielist in splits
  res.render("pages/index",{movieNames:movieName})
})

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here


  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let queryList = [movie1, movie2]
  let movieName = queryList  
   console.log ( movieName);
	res.render("pages/index", { movieNames: movieName } )

});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let name = req.params.movieNames

  let file = fs.readFileSync('./movieDescriptions.txt', 'utf8' );
    let arr = file.split(/\r?\n/);
    console.log(arr);
    arr.forEach((line)=> {
    if(line.includes(name)){
    console.log(line);
    } 
    });


      res.render("pages/searchResult", { movieDescription: line  } );
    });

	



app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});


