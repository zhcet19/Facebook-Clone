var mongoose = require('mongoose'); 
  
var imageSchema = new mongoose.Schema({ 
    name: String, 
    desc: String, 
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } ,
	
	created: {type: Date,default: Date.now}
}); 

module.exports = new mongoose.model('Image', imageSchema); 
