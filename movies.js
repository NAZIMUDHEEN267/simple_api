
const express = require("express");
const router = express.Router();

const movies = [
    {id: 102, movie: "Fast and the Furious", release: 2010, rating: 3.3},
    {id: 103, movie: "Avengers", release: 2011, rating: 2},
    {id: 104, movie: "Spiderman", release: 2012, rating: 9}
]

router.get('/:id', (req, res) => { 
    const movieReq = movies.filter(movie => {
        if(req.params.id == movie.id) {
            return movie
        } 
    })
    if(movieReq.length == 1) {
        res.send(movieReq[0]);
    } 
})

router.post('/', (req, res) => {
    if(typeof req.body.movie === "string" 
        && req.body.release.toString().match(/^[0-9]{4}$/)
        && req.body.rating.toString().match(/^[0-9]\.[0-9]$/)) {
            const newId = movies[movies.length - 1].id + 1;
            movies.push({
                id: newId,
                movie: req.body.movie,
                release: req.body.release,
                rating: req.body.rating
            });
            res.json({message: "completed", movies});
        } else {
            res.send({message: "something went wrong"})
        }
})

router.put("/:id", (req, res) => { 
   
    const index = movies.map(movie => {
        return movie.id;
    }).indexOf(parseInt(req.params.id));

    if(index === -1) {
        movies.push({
            id: req.params.id,
            movie: req.body.movie,
            release: req.body.release,
            rating: req.body.rating
        })
        res.json({Added: movies[movies.length - 1]})
    } else {
        movies[index] = {
            id: req.params.id,
            movie: req.body.movie,
            release: req.body.release,
            rating: req.body.rating
        }
        res.json({updated: movies[index]})
    }

 })

 router.delete("/:id", (req, res) => {
    for(let i=0; i<movies.length; i++) {
        if(req.params.id == movies[i].id) {
            movies.splice(i, 1);
        } 
    }

    res.json({message: "deleted", movies})
 })

 module.exports = router;