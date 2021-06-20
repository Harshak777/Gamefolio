import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userName, setUserName] = useState('');

  useEffect(async () => {
    console.log("env", process.env.NEXT_PUBLIC_API);
    const temp = {accessToken: localStorage.getItem('accessToken')};
    const name = localStorage.getItem('userName');
    if(name!=null) {
      setUserName(name);
    } else if(temp!=null) {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/jwtverify`, temp)
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
        <div className="header-content">
            <div className="inner">
                <h1 className="cursive">Simple, One Page Design</h1>
                <h4>A free landing page theme with video background</h4>
                <hr/>
                <a href="#video-background" id="toggleVideo" data-toggle="collapse" className="btn btn-primary btn-xl">Toggle Video</a> &nbsp; <a href="#one" className="btn btn-primary btn-xl page-scroll">Get Started</a>
            </div>
        </div>
        
    </div>
    <section id="one" >
        <div className="ocontainer">
            <div className="orow" >
                <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 text-center" id="ocol">
                    {/* <h2 className="margin-top-0 text-primary">Built On The Bootstrap Grid</h2> */}
                    <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="margin-top-0 text-primary">Flexible Layouts</h2>
                    <hr className="primary"/>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
              
                <div className="col-lg-12 col-md-4 text-center">
                    <div className="feature">
                        <i className="icon-lg ion-social-sass wow fadeInUp" data-wow-delay=".2s"></i>
                        <h3>Customizable</h3>
                        <p className="text-muted">Easy to theme and customize with SASS Easy to theme and customize with SASS Easy to theme and customize with SASS</p>
                    </div>
                </div>
                
            </div>
        </div>
                  
                </div>
            </div>
        </div>
    </section>
    <section id="two">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="margin-top-0 text-primary">Flexible Layouts</h2>
                    <hr className="primary"/>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4 text-center">
                    <div className="feature">
                        <i className="icon-lg ion-android-laptop wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>Responsive</h3>
                        <p className="text-muted">Your site looks good everywhere</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 text-center">
                    <div className="feature">
                        <i className="icon-lg ion-social-sass wow fadeInUp" data-wow-delay=".2s"></i>
                        <h3>Customizable</h3>
                        <p className="text-muted">Easy to theme and customize with SASS</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 text-center">
                    <div className="feature">
                        <i className="icon-lg ion-ios-star-outline wow fadeIn" data-wow-delay=".3s"></i>
                        <h3>Consistent</h3>
                        <p className="text-muted">A mature, well-tested, stable codebase</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

   {/* <div classNameName="jumbotron in-can">
      <h1 classNameName="display-3">Hello, Gamer!</h1>
      <p classNameName="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr classNameName="my-4"></hr>
      <p>It uses utility classNameNamees for typography and spacing to space content out within the larger container.</p>
      <p classNameName="lead">
          <a classNameName="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div> */}
    </div>
     
    <footer >
      <div className="footer-copyright text-center py-3">© 2021 Copyright:
    <a href="https://mdbootstrap.com/"> Gamefoliodev.com</a>
  </div>
 

</footer>
  </Layout>
)};

// export async function getServerSideProps() {
//     // console.log(process.env.SERVER);

//     return {
//         props: {

//         }
//     }
// }

export default Home;