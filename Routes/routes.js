var express = require('express');

var notes = require('../storeData/storingData');

var routes = express.Router();

routes.get('', (req, res, next) => {
    var allUsers = notes.getAll();
    console.log("AllUsers : ", allUsers.length);
    res.status(200).json({
        success: true,
        total: allUsers.length
    });
});


routes.post('', (req, res, next) => {
    var note = notes.addNote(req.body.email, req.body.feedback, req.body.notification);
    if (note === 'Subscribed successfully') {
        res.status(200).json({
            success: true,
            message: 'Thanks for your feedback!!'
        });
    } else {
        res.status(208).json({
            success: false,
            message: 'Email Already Exist!!!'
        });
    }

});

module.exports = routes;