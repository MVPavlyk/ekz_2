const express = require('express');

const filmService = require('./file.service');

const app = express();

app.delete('/deleteUser/:userId', async (req, res) => {
    let users = await filmService.reader();

    const {userId} = req.params;

    const oneUser = users.find(user => user._id === +userId);

    users = users.filter(user => user._id !== +userId);

    await filmService.writer(users);

    res.json(`Name: ${oneUser.name}`);
});


app.listen(6666, () => {
    console.log('Praciue');
});