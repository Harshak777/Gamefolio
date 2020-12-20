const express = require('express');
const bcrypt = require('bcrypt');

const { sequelize,user } = require('./models');
const { signAccessToken } = require('./jwt_helper');

const app = express();
app.use(express.json());


app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await user.create({ name, email, password: hashedPassword });
    const accessToken = await signAccessToken(savedUser.uid);
    return res.json({accessToken});
} catch(err) {
    console.log(err);
    return res.status(500).json(err);
}

});

app.post('/login', async(req, res) => {
    try {
        
        await bcrypt.compare(password, this.password);

    } catch (error) {
        console.log(err);
        return res.status(500).json(err);
    };
});

app.listen({ port: 5000 }, async () => {
    console.log('Server listening on port 5000');
    await sequelize.sync();
    console.log('Database synced!');
});
    
