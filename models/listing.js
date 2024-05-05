

const mongoose = require("mongoose");
const { ref } = require("joi");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{ type:String ,
         required:true},
    description: String,
    // image : 
    //  {
    //   type : String, 
    // default : "https://imgs.search.brave.com/VItBchAdXLyCNRWv7zkPlFEjrVlpCEoFLjokF-DXIEs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E5Lzc2/LzZlL2E5NzY2ZTgw/YTRjMTA3YWI5ODY5/NTZiOTNjZDg4ZTZi/LmpwZw",
    // set:(v) => v === " " ? "https://imgs.search.brave.com/VItBchAdXLyCNRWv7zkPlFEjrVlpCEoFLjokF-DXIEs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E5Lzc2/LzZlL2E5NzY2ZTgw/YTRjMTA3YWI5ODY5/NTZiOTNjZDg4ZTZi/LmpwZw" : v ,
    // },
    image: {
       url : String,
       filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner:{
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    geometry :{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

// Define the model based on the schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
