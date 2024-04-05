const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const listing = require("./models/listing.js");
const path = require("path");
const mo = require("method-override");
const ejsmate = require("ejs-mate");
const exp = require("constants");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(mo("_method"));
app.engine("ejs", ejsmate);

main()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}



app.get("/", (req, res) => {
    res.send("root path");
});


//index route
app.get("/listings", async(req, res) => {
    const alllisting = await listing.find({});
    res.render("index.ejs", { alllisting });
});

//new route

app.get("/listings/new", (req, res) => {

    res.render("new.ejs");
});


//show route

app.get("/listings/:id", async(req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("show.ejs", { Listing });
});

//create route

app.post("/listings", async(req, res) => {
    //let {title,description,image,price,loaction,country}=req.body;
    let Listing = req.body.Listing;
    let newListing = new listing(Listing);
    newListing.save();
    console.log(newListing);
    res.redirect("/listings");

});

//edit route

app.get("/listings/:id/edit", async(req, res) => {
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("edit.ejs", { Listing });
});

//update route

app.put("/listings/:id", async(req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.Listing });
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async(req, res) => {
        let { id } = req.params;
        let deltetedlisting = await listing.findByIdAndDelete(id);
        console.log(deltetedlisting);
        res.redirect("/listings");
    })
    // app.get("/testlisting", async(req, res) => {
    //     let samplelisting = new listing({
    //         title: "my new villa",
    //         description: "By the beach",
    //         image: "",
    //         price: 1200,
    //         location: "sangmner,a-nagar",
    //         country: "india",
    //     });
    //     await samplelisting.save();
    //     console.log(samplelisting);
    //     res.send("sucessful");
    // });

app.listen(3000, () => {
    console.log("app listening")
});