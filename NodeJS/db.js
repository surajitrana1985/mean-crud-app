const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudDB', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    } else {
        console.log('Error in coonecting MongoDB : ' + JSON.stringify(err, undefined, 4));
    }
});

module.exports = mongoose;