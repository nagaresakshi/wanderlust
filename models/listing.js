const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://digital-photography-school.com/is-unsplash-really-an-issue-for-photographers/",
        set: (v) => {
            v === "" ? "https://digital-photography-school.com/is-unsplash-really-an-issue-for-photographers/" : v;
        },
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },

})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;