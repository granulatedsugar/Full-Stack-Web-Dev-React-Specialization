// Assignment #4 Finals!
const express = require('express');
const bodParser = require('body-parser'); // Deprecated
const mongoose = require('../authenticate');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(express.json()); // Updated parser


//-------------------------------------/
//---------- FAVORITE ROUTER START ----/
//-------------------------------------/
favoriteRouter.route('/')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

// GET Request
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .populate('user')
    .populate('dishes')
    .exec((err, favorites) => {
        if (err) return next(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    });

})

// POST Request
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorite) => {
        if (err) return next(err);
        if (!favorite) {
            Favorites.create({ user: req.user._id })
            .then((favorite) => {
                for (i = 0; i < req.body.length; i++)
                    if (favorite.dishes.indexOf(req.body[i]._id) > 0) 
                        favorite.dishes.push(req.body[i]);
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })      
                })
                .catch((err) => {
                    return next(err);
                });
                
            })
            .catch((err) => {
                return next(err);
            })
        }
        else {
            for (i = 0; i < req.body.length; i++)
                if (favorite.dishes.indexOf(req.body[i]._id) < 0)
                    favorite.dishes.push(req.body[i]);
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
                })
                .catch((err) => {
                    return next(err);
                });
        }
    });
})

// PUT Request
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favorites');
})

// DELETE Request
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({ user: req.user._id }, (err, resp) => {
        if (err) return next(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    });
});
//-------------------------------------/
//---------- FAVORITE ROUTER END ------/
//-------------------------------------/


//-------------------------------------/
//--- FAVORITE/DishID ROUTER START ----/
//-------------------------------------/
favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

// GET Request
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        // If there are no favorites
        if (!favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favorites": favorites});
        }
        else {
            // If favorites doesnt exist in list of favorites
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "favorites": favorites});
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": true, "favorites": favorites});
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

// POST Request
.post(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {
        Favorites.findOne({ user: req.user._id }, (err, favorite) => {
            if (err) return next(err);

            if (!favorite) {
                Favorites.create({ user: req.user._id })
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
                    .catch((err) => {
                        return next(err);
                    });
                })
                .catch((err) => {
                    return next(err);
                })
            }
            else {
                if (favorite.dishes.indexOf(req.params.dishId) < 0) {
                    favorite.dishes.push({ "_id": req.params.dishId });
                    favorite.save()
                    .then((favorite) => {
                        Favorites.findById(favorite._id)
                        .populate('user')
                        .populate('dishes')
                        .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                        })
                    })
                    .catch((err) => {
                        return next(err);
                    })
                }
                else {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'text-plain');
                    res.end('Dish ' + req.params.dishId + ' already added!');
                }
            }
        });
    })

// PUT Request
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation is not supported on /favorites/' + req.params.dishId);
})

// DELETE Request
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id}, (err, favorite) => {
        if (err) return next(err);

        console.log(favorite);
        var index = favorite.dishes.indexOf(req.params.dishId);
        if ( index >= 0) {
            favorite.dishes.splice(index, 1);
            favorite.save()
            .then((favorite) => {
                Favotires.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite) => {
                    console.log('Favorite Dish Deleted!', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            })
            .catch((err) => {
                return next(err);
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Dish ' + req.params._id + ' not in your favorites');
        }
    });
        
});
//-------------------------------------/
//--- FAVORITE/DishID ROUTER END ------/
//-------------------------------------/

module.exports = favoriteRouter;