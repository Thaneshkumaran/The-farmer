document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
       e.preventDefault();
       document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
       });
    });
 });
 let currentSlide = 0;
 const slides = document.querySelectorAll('.slide');
 const totalSlides = slides.length;
 
 function showNextSlide() {
    // Hide all slides
    slides.forEach(slide => (slide.style.display = 'none'));
 
    // Show the next slide
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].style.display = 'block';
 }
 
 // Set interval to change images every 3 seconds
 setInterval(showNextSlide, 3000);

 



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'thanesh',   
    password: '123456', 
    database: 'thanesh '  
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Successfully connected to the database.');
});


app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving data to the database.' });
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

