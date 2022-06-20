const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const reader = async () => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'users.json'));
        return data.toString() ? JSON.parse(data.toString()) : [];
    } catch (e) {
        console.error(e);
    }
};

const writer = async (data) => {
    try {
        await fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
};

app.delete('/deleteUser/:userId', async (req, res) => {
    let users = await reader();
    const {userId} = req.params;
    users = users.filter(user => user._id !== +userId);

    await writer(users);

    res.json(`Id: ${userId}`);
});


app.listen(6666, () => {
    console.log('pipi');
});