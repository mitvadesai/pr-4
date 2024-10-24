const express = require('express');

const port = 8080;

const app = express();

const db = require('./config/db')

app.set ('view engine' , 'ejs');

app.use(express.urlencoded())

const user = require('./models/UserModel');

app.get('/', (req,res) =>{
    user.find({})
    .then((data) =>{
         return res.render('index',{record : data})
    }).catch((err) =>{
        console.log(err);
        return false;
    })
})

app.post('/insertRecord' ,(req,res) =>{
    
    const {name,price,pages,author} = req.body

    user.create({
        name:name,
        price:price,
        pages:pages,
        author:author,
    }).then((data,err) =>{
        if(err){
            console.log(err);
            return false;
        }
        console.log("recod add succesfully");
        return res.redirect('/')
        
    })
});

app.get('/delete' , (req,res) =>{
    let id = req.query.deleteid;

    user.findByIdAndDelete(id)
    .then((data) => {
        console.log("user delete succesfully");
        return res.redirect('/')
    }).catch((err) =>{
        console.log(err);
        return false;
    })
});

app.get('/edit' , (req,res) =>{
    let id = req.query.editid;

    user.findById(id)
    .then((single) =>{
        return res.render('edit' ,{data : single})
    }).catch((err) =>{
        console.log(err);
        return false;
    })
});

app.post('/updateRecord', (req, res) => {
    const { editid, name, price, pages, author } = req.body;

    user.findByIdAndUpdate(editid, {
        name: name,
        price:price,
        pages:pages,
        author:author,
    }).then((data) => {
        console.log("Record updated successfully");
        return res.redirect('/'); // Redirect to the main page or wherever appropriate
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
});

app.listen(port , (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running on :- ${port}`);
})