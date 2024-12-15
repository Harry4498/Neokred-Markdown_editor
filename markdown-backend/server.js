const express = require('express')
const {marked} = require('marked');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

app.post ('/convert', (req, res) => {
    const {markdown} = req.body;
    if (!markdown){
        return res.status (400).send({error: "Please Provide the Markdown Content"})
    }
     const html = marked(markdown);
     res.json({ html });

})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});