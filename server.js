const express = require('express')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'client/build')))


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})