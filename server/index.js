const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const crypto = require('crypto');
const { sequelize,game,contest,user,team ,participant} = require('./models');

const { signAccessToken, verifyAccessToken } = require('./jwt_helper');


const app = express();
app.use(express.json());
app.use(cors());

//creating game
app.post('/creategame', async(req, res) => {
    const { name, rules, platform,overview } = req.body;


try{
   const insertinggameDetails= await game.create({ name, rules, platform,overview });

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
            const accessToken = await signAccessToken(savedUser.uid, savedUser.name);
            return res.json({accessToken});

        } else {
            return res.status(400).json('Error: Email already exists');
        }

    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }

});

app.post('/jwtverify', async(req,res) => {
    const { accessToken } = req.body;
    try {

        var decoded = await verifyAccessToken(accessToken);
        return res.json({decoded});
        
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
            const accessToken = await signAccessToken(guser.uid, guser.name);
            return res.json({accessToken});

        } else {
            const accessToken = await signAccessToken(users.uid, users.name);
            return res.json({accessToken});
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }

});



//creating contest

app.post('/createcontest',async(req,res) => {
    const{contestName,organiser,reward,venue,start,end,gname,overview,gameday}=req.body;
    try {
        const gameid=await game.findOne({where: {name:gname}});
        const contestdetails=await contest.create({contestName,organiser,reward,overview,gameday,venue,start,end,gid:gameid.gid});
        return res.json(contestdetails);
    } catch (error) {
     console.log(error);
    return res.status(500).json(error);
    }
});

//fetching contest

app.get('/fetchcontests' ,async(req,res)=>{
    try {
        const allcontest= await  contest.findAll({
            include: [{model: game, as: 'game_id'}]
        });
        return res.json(allcontest);
    } catch (error) {
        console.log(error);
    return res.status(500).json(error);
    }
    // game.findAll({
    //     include: [{model: contest, as: 'game_id'}]
    // }).then(function (result) {
    //     console.log(JSON.stringify(result));
    // });
    
})

//fetching game

app.get('/fetchcontest/:cid' ,async(req,res)=>{
    const cid=req.params.cid;
    console.log(cid);
    try {
        const gettinggameDetails= await contest.findOne({where : {cid}, include: [{model: game, as: 'game_id'}]});
        return res.json(gettinggameDetails);
    } catch (error) {
        console.log(error);
    return res.status(500).json(error);
    }
})

app.get('/fetchteam/:cid' ,async(req,res)=>{
    const cid=req.params.cid;
    console.log(cid);
    try {
        const gettingteamDetails= await participant.findAll({where : {cid}, include: [{model: team, as: 'team_id'},{model: user, as: 'user_id',attributes:["name"]}]});
        return res.json(gettingteamDetails);
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
            { attributes: ['password', 'uid'] }
        );
        
        if(users != null) {
            await bcrypt.compare(password, users.password, async (err, result) => {
                if(result) {
                    const accessToken = await signAccessToken(users.uid, users.name);
                    return res.status(200).json({status: 'User found', accessToken});
                } else {
                    return res.status(500).json({err: 'Email/ Password entered is not correct'});
                }
            });
        } else {
            return res.status(500).json({err: 'Email/ Password entered is not correct'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Could not connect with the server"});
    };
});

//Forgot Password


app.post('/forgot-password', async(req, res) => {
    const {email} = req.body;
    try {   
        const users = await user.findOne(
            {
            where: {email}
            }
        );
        
        if(users != null) {
            return res.status(200).json({status: 'An Email has been sent to your registered email'});
        } else {
            return res.status(500).json({err: 'Email not found'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({err: "Could not connect with the server"});
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
    const {cid,uid,ingame_id,name} = req.body;
    var referral= crypto.randomBytes(4).toString('hex');
    referral="#"+referral;

    console.log(referral);
   
    try {
        const teamdetails = await team.create({ name, referral });
        console.log(teamdetails.dataValues.tid);
        // return res.json(teamdetails);
        const tid = teamdetails.dataValues.tid;
        console.log(tid);

        const participantdetails = await participant.create({ cid,tid,uid,ingame_id });   
        return res.json({ref: teamdetails.dataValues.referral});    
 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        
    }

});

app.post('/getTeamId', async(req, res) => {
    const {cid, uid} = req.body;

    try {
        const participantdetails = await participant.findOne(
            {
            where: {cid: cid, uid: uid}
            }
        );
        return res.json(participantdetails.dataValues.tid);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.post('/getTeamMembers', async(req, res) => {
    const {cid, tid} = req.body;

    try {
        const participantdetails = await participant.findAll(
            {
            where: {cid: cid, tid: tid},
            include: [{model: team, as: 'team_id'},{model: user, as: 'user_id',attributes:["name"]}]
            }
        );
        return res.json(participantdetails);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.post('/addparticipantwr',async(req , res ) => {
    const {cid,uid,ingame_id, ref} = req.body;
   
    try {
        const teamId = await team.findOne(
            {
            where: {referral: ref}
            },
            { attributes: ['tid'] }
        );

        const participantdetails = await participant.create({ cid,tid: teamId.tid,uid,ingame_id });   
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

app.get('/fetchgames', async(req, res) => {
    try {
        const allgame = await game.findAll()

        return res.json(allgame);
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
    
