// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data', 'characters.json');

// Helper function to read JSON data
const readJSON = () => {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

// Helper function to write JSON data
const writeJSON = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), 'utf-8');
};

// Route to get all characters
app.get('/api/characters', (req, res) => {
    const characters = readJSON();
    res.json(characters);
});

// Route to get a character by ID
app.get('/api/characters/:id', (req, res) => {
    const characters = readJSON();
    const character = characters.find(c => c.id === parseInt(req.params.id));
    if (!character) return res.status(404).send('Character not found');
    res.json(character);
});

// Route to add a new character
app.post('/api/characters', (req, res) => {
    const characters = readJSON();
    const newCharacter = {
        id: characters.length + 1,
        name: req.body.name,
        firstAppearance: req.body.firstAppearance
    };
    characters.push(newCharacter);
    writeJSON(characters);
    res.status(201).json(newCharacter);
});

// Route to update a character by ID
app.put('/api/characters/:id', (req, res) => {
    const characters = readJSON();
    const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex === -1) return res.status(404).send('Character not found');

    const updatedCharacter = {
        id: parseInt(req.params.id),
        name: req.body.name,
        firstAppearance: req.body.firstAppearance
    };
    characters[characterIndex] = updatedCharacter;
    writeJSON(characters);
    res.json(updatedCharacter);
});

// Route to delete a character by ID
app.delete('/api/characters/:id', (req, res) => {
    const characters = readJSON();
    const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex === -1) return res.status(404).send('Character not found');

    characters.splice(characterIndex, 1);
    writeJSON(characters);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Disney API running at http://localhost:${port}`);
});

