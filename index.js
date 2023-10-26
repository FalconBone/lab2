const express = require('express')
const path = require('path')
const multer  = require('multer')
const upload = multer()

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "static")))

let formData = {
    firstTime: true
}
let emptyKeys = []


app.get('/form', (req, res) => {
    res.sendFile('static/form.html', {root: __dirname})
})
app.get('/data', (req, res) => {
    res.send({formData: formData, emptyKeys: emptyKeys})
    formData.firstTime = false
})
app.post('/form', upload.array(), (req, res) => {
    
    formData = Object.assign(formData, req.body)
    console.log(formData);

    let isEmpty
    emptyKeys = []

    for (let key in formData) {
        if (formData[key] === '' && key !== 'comment') {
            emptyKeys.push(key)
        }
    }

    console.log(emptyKeys);

    if (emptyKeys.length === 0) {
        res.sendFile('static/answer.html', {root: __dirname})
    } else {
        res.sendFile('static/form.html', {root: __dirname})
    }
})

const start = () => {
    try {
        app.listen(5000, () => console.log(`Server start in port 5000`))
    } catch(e){
        console.log(e);
    }
}

start()