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
  <Layout login={userName} >
  <div className="animate-bottom" id="gfmain" >
  <div id="first" style={{ backgroundImage: "url(./bg.jpg)" }}>
        <div class="header-content">
            <div class="inner">
                <h1 class="cursive">Simple, One Page Design</h1>
                <h4>A free landing page theme with video background</h4>
                <hr/>
                <a href="#video-background" id="toggleVideo" data-toggle="collapse" class="btn btn-primary btn-xl">Toggle Video</a> &nbsp; <a href="#one" class="btn btn-primary btn-xl page-scroll">Get Started</a>
            </div>
        </div>
        
    </div>
    <section id="one" >
        <div class="ocontainer">
            <div class="orow" >
                <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 text-center" id="ocol">
                    {/* <h2 class="margin-top-0 text-primary">Built On The Bootstrap Grid</h2> */}
                    <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="margin-top-0 text-primary">Flexible Layouts</h2>
                    <hr class="primary"/>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
              
                <div class="col-lg-12 col-md-4 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-social-sass wow fadeInUp" data-wow-delay=".2s"></i>
                        <h3>Customizable</h3>
                        <p class="text-muted">Easy to theme and customize with SASS Easy to theme and customize with SASS Easy to theme and customize with SASS</p>
                    </div>
                </div>
                
            </div>
        </div>
                  
                </div>
            </div>
        </div>
    </section>
    <section id="two">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="margin-top-0 text-primary">Flexible Layouts</h2>
                    <hr class="primary"/>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-4 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-android-laptop wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>Responsive</h3>
                        <p class="text-muted">Your site looks good everywhere</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-social-sass wow fadeInUp" data-wow-delay=".2s"></i>
                        <h3>Customizable</h3>
                        <p class="text-muted">Easy to theme and customize with SASS</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 text-center">
                    <div class="feature">
                        <i class="icon-lg ion-ios-star-outline wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>Consistent</h3>
                        <p class="text-muted">A mature, well-tested, stable codebase</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

   {/* <div className="jumbotron in-can">
      <h1 className="display-3">Hello, Gamer!</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr className="my-4"></hr>
      <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
      <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div> */}
    </div>
     
    <footer >
      <div class="footer-copyright text-center py-3">© 2021 Copyright:
    <a href="https://mdbootstrap.com/"> Gamefoliodev.com</a>
  </div>
 

</footer>
  </Layout>
)};

export default Home;