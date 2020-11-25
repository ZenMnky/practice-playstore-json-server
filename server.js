const app = require('./app.js');
const PORT = 8000;

// activate server
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})