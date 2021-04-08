var mongoose = require("mongoose");
var imgModel = require("./models/images");

 
//var data = [
//  {
//       name: "Cloud's Rest", 
//       img: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
 //       desc: "Situated in western Ghats this gives us the view of river narmada flowing"
 //  },
 //   {
 //       name: "Desert Mesa", 
 //       img: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
 //       desc: "This region is drier but u would not feel discomfort here as this campground is air conditionered..."
 //   },
  //  {
  //      name: "Canyon Floor", 
  //      img: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
  //    desc: "Situated in the dry region of Alpes ,this campground is equipped with all neccesities... "
 //   }
//]
 
function seedDB(){
   //Remove all campgrounds
   imgModel.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed blogs!");
        imgModel.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                imgModel.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a image");
                        //create a comment
                       // Comment.create(
                        //    {
                        //        text: "This place is great, but I wish there was internet",
                        //        author: "Homer"
                         //   }, function(err, comment){
                         //       if(err){
                          //          console.log(err);
                          //      } else {
                           //         campground.comments.push(comment);
                            //    campground.save();
                           //         console.log("Created new comment");
                           //     }
                          //  });
                    }
                });
            });
        });
    }); 

}
 
module.exports = seedDB;







