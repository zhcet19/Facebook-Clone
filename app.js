var express = require('express') 

var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 

var fs = require('fs'); 
var path = require('path'); 
var passport= require("passport");
var passportLocalMongoose= require("passport-local-mongoose")
var LocalStrategy= require("passport-local");
var User= require("./models/user");
var seedDB = require("./seeds");
var imgModel = require('./models/images');
var flash= require("connect-flash");
var methodOverride = require("method-override");
var app= express();
app.use(express.json());
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect('mongodb://localhost:27017/facebook', {useNewUrlParser: true, useUnifiedTopology: true});
//seedDB();

 

// Set EJS as templating engine  
app.set("view engine", "ejs"); 

app.use(require("express-session")(
	{
		secret:"i am faiz alam",
		resave:false,
		saveUninitialized:false
	}
		
));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});





var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
var upload = multer({ storage: storage }); 
app.get('/',(req,res)=>{
	 res.render("landing")	
		})


app.get('/images',isLoggedIn, (req, res) => { 
    imgModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('app', { items: items }); 
        } 
    }); 
}); 
// Uploading the image 
app.post('/images', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/images'); 
        } 
    }); 
}); 
app.get('/aboutus',(req,res)=>{
	res.render("aboutus")
})

app.get("/images/:id", function(req, res){
   imgModel.findById(req.params.id, function(err,foundImage){
       if(err){
           res.redirect("/images");
       } else {
           res.render("show", {image:foundImage});
       }
   })
});

app.delete("/images/:id", function(req, res){
  
   imgModel.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/images");
       } else {
           res.redirect("/images");
       }
   })
 
});



app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
    req.body.username
	req.body.password
	User.register(new User({username: req.body.username}),req.body.password,function(err,user){
	if(err)
	{
				req.flash("error",err.message)
				 res.render("register");
		}
	passport.authenticate("local")(req,res,function(){
		   req.flash("success" , "welcome to FAKEBOOK " + user.username);
			res.redirect("/");
		});
	});
});




app.get("/login",function(req,res){
	res.render("login");
})
app.post("/login",passport.authenticate("local",{
		successRedirect:"/",
		failureRedirect:"/login"
}),function(req,res){});
app.get("/logout",function(req,res)
	   {
	req.logout();
	req.flash("success","You logged out successfully")
	res.redirect("/");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		{
			return next();
		}
	else{
		req.flash("error","please login first")
		res.redirect("/login");
	}
}

app.listen( 3000, function(){
  console.log("welcome to FAceBook");
});