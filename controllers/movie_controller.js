const Movie = require('../models/movies')

//creating new movie 
module.exports.addMovie = async (req, res)=>{
    try {
        const existingMovie = await Movie.findOne({
            title: req.body.title,
            user: req.user._id,
        }).populate();
        console.log(existingMovie)
    
        if(existingMovie){
            console.log("movie already exists")
            return res.redirect('/')
        }else{
            const newMovie = await Movie.create({
                title: req.body.title,
                desc : req.body.desc,
                releaseYear: req.body.releaseYear,
                genre : req.body.genre,
                user: req.user._id,
            })
            req.flash("success", "Movie Created Successfully");
            return res.redirect("/");
        }
    } catch (error) {
        console.log("Error in creating habit: ", error);
        return res.redirect("/");
    }
}

module.exports.toggleWatched = async function(req, res) {
    try {
        let movie = await Movie.findById(req.params.id);
        if (movie) {
            movie.watched = !movie.watched;
            await movie.save();
            return res.redirect('back');
        } else {
            console.error('Movie not found');
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in toggling watched status:', err);
        return res.redirect('back');
    }
}

module.exports.rateAndReview = async function(req, res) {
    try {
        let movie = await Movie.findById(req.params.id);
        if (movie && movie.watched) {
            movie.rating = req.body.rating;
            movie.review = req.body.review;
            await movie.save();
            return res.redirect('back');
        } else {
            console.error('Movie not found or not watched');
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in rating and reviewing movie:', err);
        return res.redirect('back');
    }
}

module.exports.editPage = async (req, res) => {
    try {
      const movieId = req.params.id;
      if (!movieId) {
        req.flash("error", "Movie not found");
        return res.redirect('back');
      }
  
      // Find the movie by ID and pass it to the edit view
      const movie = await Movie.findById(movieId);
      if (!movie) {
        req.flash("error", "Movie not found");
        return res.redirect('back');
      }
  
      res.render('edit', { movie });
    } catch (error) {
      console.log("Error in rendering edit page:", error);
      req.flash("error", "Error rendering edit page");
      return res.redirect("back");
    }
  }

//Edit the movie
module.exports.editMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      if (!movieId) {
        console.log("Movie not found");
        req.flash("error", "Movie not found");
        return res.redirect('back');
      }
  
      // Find the movie by ID and update its details
      await Movie.findByIdAndUpdate(movieId, {
        title: req.body.title,
        desc: req.body.desc,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        rating: req.body.rating,
        review: req.body.review
      });
  
      req.flash("success", "Movie updated successfully");
      return res.redirect('/'); // Redirect to home or movie list page
    } catch (error) {
      console.log("Error in updating movie:", error);
      req.flash("error", "Error updating movie");
      return res.redirect("back");
    }
  }


module.exports.deleteMovie = async (req, res) => {
    try {
        const movieId = req.query.id;
        const user = req.user._id
        if (!movieId) {
            console.log("Movie not found");
            return res.redirect('back');
        }

        // Find and delete the movie
        await Movie.deleteOne({_id:movieId, user: user});
        req.flash("success", "Movie deleted successfully");
        return res.redirect('back');
    } catch (error) {
        console.log("Error in deleting movie:", error);
        req.flash("error", "Error deleting movie");
        return res.redirect("back");
    }
}
