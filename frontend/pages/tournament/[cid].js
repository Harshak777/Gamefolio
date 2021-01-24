import { useRouter } from 'next/router'
import Link from 'next/link';
import Layout from "../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';


const tournament = () => {
  const router = useRouter()
  const { cid } = router.query

  const [data, setData] = useState({});
  console.log(cid);
  const [isLoading, setIsLoading] = useState(true);
  const [field, setField] = useState({
    team: '',
    ref: '',
    ingameID1: '',
    ingameID2: ''
  });
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
    const form = {
      cid,
      name: field["team"],
      uid: '1',
      ingame_id: field["ingameID1"]
    }
    console.log(form);
    await axios.post('http://localhost:5000/addparticipant', form)
                .then(res => {
                    console.log(res);
                    alert(res.data.ref);
                })
                .catch(err => {
                    console.log(err);
                });
  }

  const submitWR = async (e) => {
    e.preventDefault();
    const form = {
      cid,
      ref: field["ref"],
      uid: '3',
      ingame_id: field["ingameID2"]
    };
    console.log(form);
    await axios.post('http://localhost:5000/addparticipantwr', form)
                .then(res => {
                    console.log(res);
                    alert(res.request.statusText);
                })
                .catch(err => {
                    console.log(err);
                });
  }

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    field[name] = value;
    setField(field);
  }



if(isLoading)
return <p>{isLoading.toString()}</p>
else{
  return (
    <Layout>
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
          <h2>Already Team</h2>
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
    </Layout>
  );
  }
}

export default tournament;

