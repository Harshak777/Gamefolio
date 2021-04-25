import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userName, setUserName] = useState('');

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
                  })
                  .catch(err => {
                      console.log(err);
                  });
    }
  });

  return(
  <Layout login={userName}>
  <div className="animate-bottom">
   <div className="jumbotron in-can">
      <h1 className="display-3">Hello, Gamer!</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr className="my-4"></hr>
      <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
      <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>
    </div>
  </Layout>
)};

export default Home;