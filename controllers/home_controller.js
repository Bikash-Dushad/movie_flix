const User = require('../models/user');
const Movies = require('../models/movies');


module.exports.home = async function(req, res) {
    if(req.user){
        let movies = await Movies.find({user: req.user._id}); 
        
        return res.render('home', {
            title : "Movie Lists",
            movies : movies,
        })
    }else{
        return res.render('home', {
            title: "Home"
        });
    }
}

module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}