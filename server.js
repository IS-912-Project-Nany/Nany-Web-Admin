const express = require('express');
const path = require('path');

const app = express();

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(__dirname + '/dist/admin')); 
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/admin/index.html'));
});

app.listen(process.env.PORT || 5000);