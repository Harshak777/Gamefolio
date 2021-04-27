import { useRouter } from 'next/router'
import Layout from "../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Router from 'next/router';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'reactstrap';

const tournament = () => {
  const router = useRouter()
  const { cid } = router.query

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lgShow, setLgShow] = useState(false);
  const [teamShow, setTeamShow] = useState(false);
  const [field, setField] = useState({
    team: '',
    ref: '',
    ingameID1: '',
    ingameID2: ''
  });

const [userName, setUserName] = useState('');
const [uid, setUid] = useState(0);
const [isRegistered, setIsRegistered] = useState(false);
const [tid, setTid] = useState(0);
const [pid, setPid] = useState(0);
const [teamMem, setTeamMem] = useState([]);

useEffect(async () => {
  const temp = {accessToken: localStorage.getItem('accessToken')};
  const name = localStorage.getItem('userName');
  if(name!=null) {
    setUserName(name);
  } else if(temp!=null) {
    await axios.post('http://localhost:5000/jwtverify', temp)
                .then(res => {
                    setUserName(res.data.decoded.name);
                    localStorage.setItem('userName', res.data.decoded.name);
                    setUid(res.data.decoded.uid);
                })
                .catch(err => {
                    console.log(err);
                });
  }
});

useEffect(async () => {
  const temp = {accessToken: localStorage.getItem('accessToken')};
    await axios.post('http://localhost:5000/jwtverify', temp)
                .then(res => {
                  if(res.data!=null)
                    setUid(res.data.decoded.uid);
                    console.log("Finishd calling");
                    getTeamID();
                })
                .catch(err => {
                    console.log(err);
                });
});
              
const getTeamID = async () => {
  const temp1 = {
    uid,
    cid
  }
  await axios.post('http://localhost:5000/getTeamId', temp1)
              .then(res => {
                  if(res.data!=null)
                  setTid(res.data.tid);
                  setPid(res.data.pid);
              })
              .catch(err => {
                  console.log(err);
              });

};

useEffect(() => {

  const fetchTeamData = async () => {
    const temp = {
      cid,
      tid
    }
    await axios.post('http://localhost:5000/getTeamMembers', temp)
                .then(res => {
                  console.log('Fetching Team Data');
                  setTeamMem(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
  }

  if(tid != null || 0) {   
    fetchTeamData();
  }

}, [tid]);

  useEffect(() => {

    const fetchdata = async () => {
      const result = await axios(
        `http://localhost:5000/fetchcontest/${cid}`
      );
      setData(result.data);
      console.log(result.data);
      if(result.data==null)
      setIsLoading(true);
      else
      setIsLoading(false);
    }
    fetchdata();

  }, [cid]);

  const submit  = async (e) => {
    e.preventDefault();
    var uid;
    const temp = {accessToken: localStorage.getItem('accessToken')}
    await axios.post('http://localhost:5000/jwtverify', temp)
                .then(res => {
                    console.log(res.data.decoded.uid);
                    uid=res.data.decoded.uid;
                })
                .catch(err => {
                    console.log(err);
                });
     
    const form = {
      cid,
      name: field["team"],
      uid: uid,
      ingame_id: field["ingameID1"]
    }
    console.log(form);
    await axios.post('http://localhost:5000/addparticipant', form)
                .then(res => {
                    console.log(res);
                    alert(res.data.ref);
                    setLgShow(false);
                })
                .catch(err => {
                    console.log(err);
                });
  }

  const submitWR = async (e) => {
    e.preventDefault();
    var uid;
    const temp = {accessToken: localStorage.getItem('accessToken')}
    await axios.post('http://localhost:5000/jwtverify', temp)
                .then(res => {
                    console.log(res.data.decoded.uid);
                    uid=res.data.decoded.uid;
                })
                .catch(err => {
                    console.log(err);
                }); 

    const form = {
      cid,
      ref: field["ref"],
      uid: uid,
      ingame_id: field["ingameID2"]
    };
    console.log(form);
    await axios.post('http://localhost:5000/addparticipantwr', form)
                .then(res => {
                    console.log(res);
                    alert(res.request.statusText);
                    setLgShow(false);
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message);
                    setLgShow(false);
                });
  }

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    field[name] = value;
    setField(field);
  }

  function registerHelper() {
    if(localStorage.getItem('accessToken') == null) {
      alert('Please Login to register');
      Router.push("/login");
    } else {
      setLgShow(true);
    }
  }

  function teamHelper() {
      setTeamShow(true);
  }

async function leaveTeamHelper() {
  const form = {
    pid,
    tid
  };

  await axios.post('http://localhost:5000/leave-team', form)
              .then(res => {
                  console.log(res);
                  alert("You left the team");
                  setTeamShow(false);
              })
              .catch(err => {
                  console.log(err);
              });
}

function TeamDetails() {
  if(teamMem.length != 0) {
    console.log("if");
    console.log("inside", teamMem);
    return  (
      <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Ingame Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMem.map((teamMate) => (
                      <tr>
                        <td>{teamMate.user_id.name}</td>
                        <td>{teamMate.ingame_id}</td>
                      </tr>
                  ))
                    }
                </tbody>
              </table>    
  )            
  } else {
    console.log("else");
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Ingame Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You dont have a team</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table> 
    )
  }
}

  function Example() {  
    return (
      <> 

        {Date.parse(data.end) >= Date.now() ? (tid == null || 0 ? <div className="m-btn btn-success" color="primary" onClick={registerHelper} ><span>Join Now</span></div> : <div className="m-btn btn-success" color="primary" onClick={teamHelper} ><span>Show Team</span></div>):<div hidden></div>}

       

        <Modal  size="lg"show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton >
            <Modal.Title id="example-modal-sizes-title-lg">Create/Join Team</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2>New Team</h2>
                  <small id="emailHelp" className="form-text text-muted">Create a New team</small>
                <form method="POST" onSubmit={submit}>
                  <div className="form-group">
                    <label>Team Name</label>
                    <input type="text" className="form-control" id="teamName" placeholder="Enter your Team name" name="team" onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Ingame ID</label>
                    <input type="text" className="form-control" id="ingameID" placeholder="Ingame ID" name="ingameID1" onChange={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary">Create</button>
                </form>
                </div>
                <div className="col">
                <h2>Join Team</h2>
                <small id="emailHelp" className="form-text text-muted">Join your team with your team referal code</small>
                <form method="POST" onSubmit={submitWR}>
                  <div className="form-group">
                    <label >Referal code</label>
                    <input type="text" className="form-control" id="referalCode" placeholder="Enter Referal Code" name="ref" onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label >Ingame ID</label>
                    <input type="text" className="form-control" id="ingameID" placeholder="Ingame ID" name="ingameID2" onChange={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary">Join</button>
                </form>
                </div>
              </div>
            </div>
          </Modal.Body>        
        </Modal>
        <Modal  size="lg"show={teamShow} onHide={() => setTeamShow(false)} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton >
            <Modal.Title id="example-modal-sizes-title-lg">Team Info</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className="container">
              Team Members:
                  <TeamDetails />
                  <div className="btn btn-danger" onClick={leaveTeamHelper} ><span>Leave Team</span></div>
            </div>
          </Modal.Body>        
        </Modal>
      </>
    );
  }

if(isLoading)
return <p>{isLoading.toString()}</p>
else{
  return (
    <Layout login={userName}>
      <main>
      <div id="myDiv" className="animate-bottom">
      <div id="profile-upper">
    <div id="profile-banner-image">
        <img src="https://wallpaperaccess.com/full/3626476.jpg" alt="Banner image"/>
    </div>
    <div id="profile-d">
        <div id="profile-pic">
            <img src="data:image/png;base64,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"/>    
        </div>
        <div id="u-name">{data.contestName}</div>
        <div className="tb" id="m-btns">
            <div className="td">
              
                <Example/>
            </div>
           
        </div>
    
      
    </div>
  


    </div>
    </div>
    <div id="main-content">
    <div className="tb">
        <div className="td" id="l-col">                   
            <div className="l-cnt">
                <div className="cnt-label">
                    
                    <span id="spi">Overview</span>
                    
                </div>
                <div id="i-box">
                    <div id="u-occ"><a href="#go">Game Overview</a></div>
                    <div id="u-occ"><a href="#co">Contest Overview</a></div>
                    <div id="u-occ"><a href="#rules">Rules</a></div>
                    <div id="u-occ"><a href="#prizes">Prizes</a></div>
                    <div id="u-occ"><a href="#winners">Winners</a></div>

                </div>
            </div>
           
        </div>
        <div className="animate-right">
        <div className="td" id="m-col">
            <div className="m-mrg" id="p-tabs">

                <div className="tb">
                    <div className="td">
                        <div className="tb" id="p-tabs-m">
                            <div className="td  "><div id="title">Registered:2000</div></div>
                            <div className="td "><div id="title">Team Size:4-5</div></div>
                            <div className="td "><div id="title"><div>Start Date</div>{new Intl.DateTimeFormat('en-US', {  month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(data.start))}</div></div>
                            <div className="td "><div id="title"><div>End Date</div> {new Intl.DateTimeFormat('en-US', {  month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(data.end))}</div></div>
                            <div className="td "><div id="title"><div>Game day</div> Apr 07 12:00 PM </div></div>
                        </div>
                    </div>
                 
                </div>
               
            </div>
           
            <div className="post">
                            <div className="tb">
                              <div className="Overview">
                                <div className="Game_Overview" id="go">
                                  <h5>Game Overview</h5>
                                  <span id="ovr">PlayerUnknown's Battlegrounds (PUBG) is an online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole.</span>
                                </div>
                                <div className="Contest_Overview" id="co">
                                  <h5>Contest Overview</h5>
                                  <span id="ovr">Contest conducted by {data.organiser}.</span>

                                </div>
                              </div>
                              
                              <div className="Rules" id="rules">
                                <h5>Rules</h5>
                                
                                <span id="ovr">{data.game_id.rules}</span>
                                

                              </div>
                              
                              <div className="Prizes" id="prizes">
                                <h5>Prizes</h5>
                                <span id="ovr">{data.reward}</span>

                              </div>
                              <div className="Winners" id="winners">
                                <h5>Winners</h5>
                                <span id="ovr">Not yet declared</span>

                              </div>
                                
                            </div>
                            </div>
        </div>
        </div>
                            
                        
                    
        

        </div>
        </div>
    </main> 
       
    </Layout>
  );
  }
}

export default tournament;

