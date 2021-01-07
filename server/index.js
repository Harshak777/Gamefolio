const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const crypto = require('crypto');
const { sequelize,game,contest,user,team ,participant} = require('./models');

const { signAccessToken } = require('./jwt_helper');


const app = express();
app.use(express.json());
app.use(cors());

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

//signup

app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    try{
        const users = await user.findOne(
            {
            where: {email}
            }
        );

        if(users === null) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const savedUser = await user.create({ name, email, password: hashedPassword });
            const accessToken = await signAccessToken(savedUser.uid);
            return res.json({accessToken});

        } else {
            return res.status(400).json('Error: Email already exists');
        }

    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }

});

app.post('/gsignup', async(req, res) => {
    console.log(req.body);
    const { name, email, gtoken, verify} = req.body;
    try{
        const users = await user.findOne(
            {
            where: {gtoken}
            }
        );
        if(users === null) {

            const guser = await user.create({ name, email,gtoken, verify });
            const accessToken = await signAccessToken(guser.uid);
            return res.json({accessToken});

        } else {
            const accessToken = await signAccessToken(users.uid);
            return res.json({accessToken});
        }
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

//login
app.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        
        const users = await user.findOne(
            {
            where: {email}
            },
            { attributes: ['password'] }
        );

        await bcrypt.compare(password, users.password, (err, result) => {
            if(result) {
                return res.status(200).json('User found');
            } else {
                console.log(users);
                return res.json({err: 'Email/ Password entered is not correct'});
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({err: 'Email entered is not correct'});
    };
});



//creating team

app.post('/createteam',async(req , res ) => {
    const { name} = req.body;
  var referral= crypto.randomBytes(8).toString('hex');
     referral="#"+referral;
    try {
        const teamdetails = await team.create({ name, referral });   
        return res.json(teamdetails);    
 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }

});


//adding participant
app.post('/addparticipant',async(req , res ) => {
    const {cid,tid,uid} = req.body;
   
    try {
        const participantdetails = await participant.create({ cid,tid,uid });   
        return res.json(participantdetails);    
 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }

});


//adding winner
app.post('/addwinner',async(req , res ) => {
    const {tid,cid,position} = req.body;
   
    try {
        const winnerdetails = await participant.create({tid,cid,position});   
        return res.json(winnerdetails);    
 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }

});





app.get('/users', async(req, res) => {
    try {
        const allUsers = await user.findAll()

        return res.json(allUsers);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
})


//server port
app.listen({ port: 5000 }, async () => {
    console.log('Server listening on port 5000');
    // await sequelize.sync({ force: true })
    await sequelize.authenticate();

    console.log('Database synced!');
});
    
