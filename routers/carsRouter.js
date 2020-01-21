const express = require('express');

const Cars = require('../data/carsModel');

const router = express.Router();
////////////////////////////////////////////
router.post('/', validateCar, (req, res) => {
    const changes = req.body;

    Cars.insert(changes)
        .then(data => {
            console.log(data);
            res.status(201).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'sorry, we ran into an error creating the Car',
            });
        });
});

////////////////////////////////////////////

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Cars.findById(id)
        .then(data => {
            if (data.length != 0) {
                res.status(200).json(data);
            } else {
                return res.status(400).json({
                    errorMessage: "The Car with ID could not be retrieved."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "The Account information could not be retrieved."
            });
        })
});

////////////////////////////////////////////

router.get('/', (req, res) => {
    // read the data from the database
    Cars.find() // return a promise
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: 'The Car information could not be retrieved.',
            });
        });
});

////////////////////////////////////////////

router.delete('/:id', validateCarId, (req, res) => {
    const id = req.params.id;

    Cars.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "The Car could not be removed"
            });
        });
});
////////////////////////////////////////////

router.put('/:id', validateCarId, (req, res) => {
    const changes = req.body;
    Cars.update(req.params.id, changes)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'The car information could not be modified.',
            });
        });
});
////////////////////////////////////////////

//custom middleware

function validateCarId(req, res, next) {
    Cars.findById(req.params.id)
        .then(data => {
            if (data.length == 0) {
                return res.status(400).json({
                    errorMessage: "invalid car id"
                });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                errorMessage: "The car information could not be retrieved."
            });
        })
    next();
}

function validateCar(req, res, next) {
    const changes = req.body;
    if (!changes || !changes.VIN || !changes.make || !changes.model || !changes.mileage) {
        return res.status(400).json({ errorMessage: 'missing required  field' });
    }
    next();
}
module.exports = router;