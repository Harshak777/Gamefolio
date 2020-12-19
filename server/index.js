const express = require('express');
const bcrypt = require('bcrypt');

const { sequelize,user } = require('./models');

const app = express();
app.use(express.json());


app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await user.create({ name, email, password: hashedPassword });

    return res.json(user);
} catch(err) {
    console.log(err);
    return res.status(500).json(err);
}

});

app.listen({ port: 5000 }, async () => {
    console.log('Server listening on port 5000');
    await sequelize.sync({ force: true });
    console.log('Database synced!');
});
    
