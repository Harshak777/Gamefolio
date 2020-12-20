const express = require('express');
const bcrypt = require('bcrypt');

const { sequelize,game,contest,users } = require('./models');
const { signAccessToken } = require('./jwt_helper');


const app = express();
app.use(express.json());

//creating game
app.post('/creategame', async(req, res) => {
    const { name, rules, platform } = req.body;


try{
   const insertinggameDetails= await game.create({ name, rules, platform });

    return res.json(insertinggameDetails);

} catch(err) {
    console.log(err);
    return res.status(500).json(err);
}

});
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



//creating contest
app.post('/createcontest',async(req,res) => {
    const{contestName,organiser,reward,venue,start,end,gname}=req.body;
    try {
        const gameid=await game.findOne({where: {name:gname}});
        const contestdetails=await contest.create({contestName,organiser,reward,venue,start,end,gid:gameid.gid});
        return res.json(contestdetails);
    } catch (error) {
     console.log(error);
    return res.status(500).json(error);
    }
});

//fetching contest

app.get('/fetchcontest' ,async(req,res)=>{
    try {
        const allcontest= await contest.findAll();
        return res.json(allcontest);
    } catch (error) {
        console.log(error);
    return res.status(500).json(error);
    }
})

//fetching game
app.get('/fetchgame/:gid' ,async(req,res)=>{
    const gid=req.params.gid;
    try {
        const gettinggameDetails= await game.findOne({where : {gid}});
        return res.json(gettinggameDetails);
    } catch (error) {
        console.log(error);
    return res.status(500).json(error);
    }
})


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
    
