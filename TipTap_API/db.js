const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tiptap', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('ddddddddddddddddddd',err.message);
    }else{
        console.log('Successfully connected to mongodb');
    }
});

mongoose.set('useCreateIndex', true);

module.exports = mongoose;