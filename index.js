// require express, cors, body-parser
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: process.env.api_key,
})
const openai = new OpenAIApi(config);

app.use(cors({
    origin: "*",
}));

app.use(bodyParser.json());

// chatgpt api endpoint
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 1024,
        temperature: 0,
        prompt: prompt,
    })
    res.json({ response: completion.data.choices[0].text });
});

app.get('/', (req, res) => {
    res.send('Construction page is ready to build your sweet home')
});

// listening port
app.listen(port, () => {
    console.log('Constructor is listening', port);
})