import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Table } from 'reactstrap';
import { BsController, BsFillPersonFill, BsTrophy } from "react-icons/bs"
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [uid, setUid] = useState(0);
  const [dashboard, setDashboard] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    const temp = {accessToken: localStorage.getItem('accessToken')};
  
    if(temp!=null) {
      await axios.post(`${process.env.API}/jwtverify`, temp)
                  .then(res => {
                      setUserName(res.data.decoded.name);
                      localStorage.setItem('userName', res.data.decoded.name);
                      console.log(res.data)
                      setUid(res.data.decoded.uid);
                      getProfileDetails();
                  })
                  .catch(err => {
                      console.log(err);
                  });
    }
  },[uid]);

  const getProfileDetails = async () => {
    console.log("uid:",uid);

    const temp1 = {
      uid: uid
    }
    
    await axios.post(`${process.env.API}/fetch-profile`, temp1)
                .then(res => {
                    if(res.data!=null)
                    console.log(res.data);
                    setDashboard(res.data.participantdetails);
                    setProfile(res.data.users)
                })
                .catch(err => {
                    console.log(err);
                });
  };

  function DisplayDashboard() {
      console.log("length" ,dashboard.length)
    if(dashboard.length != 0) {
        return  (
            <Table>
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Team Name</th>
                            <th>Ingame Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboard.map((db) => (
                    <tr>
                        <td>{db.contest_id.contestName}</td>
                        <td>{db.team_id.name}</td>
                        <td>{db.ingame_id}</td>
                    </tr>
                        ))
                    }
                    </tbody>
                </Table>
        )
    } else {
        return (
            <h1>You haven't registered in any Contest yet</h1>
        )
    }
  }

  function ProfileDisplay() {
      if(profile != null) {
          return (

            <Nav vertical className="list-unstyled pb-3">
                <NavItem style={{ fontSize: "150%", color: "white" }}>
                    <NavLink style={{ color: "white" }} href="#"><BsController />  {profile.name}</NavLink>
                </NavItem>
                <NavItem style={{ fontSize: "150%" }}>
                    <NavLink style={{ color: "white" }} href="#"><BsFillPersonFill />   {profile.email}</NavLink>
                </NavItem>
            </Nav>

          )
      } else {
          return (<h4>HI</h4>)
      }
  }

  return(
  <Layout login={userName}>
    <div className="animate-bottom" id="gfmain">
        <ProfileDisplay />

        <DisplayDashboard />
    </div>
     
    <footer >
      <div class="footer-copyright text-center py-3">© 2021 Copyright:
    <a href="https://mdbootstrap.com/"> Gamefoliodev.com</a>
  </div>
 

</footer>
  </Layout>
)};

export default Dashboard;