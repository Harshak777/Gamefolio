import React, { Component } from 'react';
import Link from 'next/link';
import Layout from "../components/Layout";
import axios from 'axios';
import Router from 'next/router';
import { GoogleLogin } from 'react-google-login';
import { Container, Jumbotron, Alert } from "reactstrap";

export default class signup extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            gtoken: '',
            password: '',
            rpassword: '',
            alert: false,
            alertMessage: ""
        }
    }

    componentDidMount() {
        if(localStorage.getItem('accessToken')!=null) {
            Router.push('/contest');
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }



    onChangeRpassword = (e) => {
        this.setState({
            rpassword: e.target.value
        });

        //   const { password, rpassword } = this.state;
        //   if(password === rpassword) {
        //     this.setState({simi: false});
        //   } else if(password !== rpassword) {
        //     this.setState({simi: true});
        //   }


    }



    onSubmit = async (event) => {
        event.preventDefault();
        var re = {
            'capital': /[A-Z]/,
            'digit': /[0-9]/,
            'full': /^[A-Za-z0-9]{7,20}$/
        };

        if (this.state.password !== this.state.rpassword) {
            this.setState({alertMessage: "Passwords do not match", alert: true});
        } else {

            if (re.capital.test(this.state.password) &&
                re.digit.test(this.state.password) &&
                re.full.test(this.state.password)) {
                    const form = {
                        name: this.state.name,
                        password: this.state.password,
                        email: this.state.email
                    };
    
                    axios.post(`${process.env.NEXT_PUBLIC_API}/signup`, form)
                        .then(res => {
                            console.log(res.data);
                            Router.push("/login");
                        })
                        .catch(err => {
                            console.log(err);
                            const message = "Email already exists! Please Login";
                            this.setState({alertMessage: message, alert: true});
                        });
                } else {
                    const message = 'Passwords  Password should contains one Capital letter  , It should be alphanumeric,Length of password should be between range 8 to 14';
                    this.setState({alertMessage: message, alert: true});
                }
        }
    }

    render() {
        const responseGoogle = (response) => {

            console.log(response);
            var res = response.profileObj;
            console.log(res);
            if(res){
                this.setState({
                    name: res.name,
                    email: res.email,
                    gtoken: res.googleId
                })
                const form = {
                    name: this.state.name,
                    gtoken: this.state.gtoken,
                    email: this.state.email,
                    verify: true
                };
    
                axios.post(`${process.env.NEXT_PUBLIC_API}/gsignup`, form)
                    .then(res => {
                        console.log(res);
                        localStorage.setItem('accessToken', res.data.accessToken);
                        Router.push("/contest");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }



        return (
//             <Layout>
//               <Jumbotron fluid>
//                     <Container fluid>
//                         <div className="animate-top">
//                         <div className="col-md-4 offset-md-4 sign-container px-5">
//                             <GoogleLogin
//                                 clientId="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"
//                                 buttonText="Sign Up with Google"
//                                 onSuccess={responseGoogle}
//                                 onFailure={responseGoogle} >
//                             </GoogleLogin>
//                             <hr className="my-4"></hr>
//                             <form onSubmit={this.onSubmit}>
//                                 {this.state.alert && 
//                                     <Alert color="info">
//                                         {this.state.alertMessage}
//                                     </Alert>}
//                                 <fieldset>
//                                     <div className="form-group">
//                                         <label htmlFor="exampleInputEmail1">Email address</label>
//                                         <input type="email" className="form-control bordered-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
//                                             onChange={this.onChangeEmail} required />
//                                         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="exampleInputPassword1">User name</label>
//                                         <input type="username" className="form-control" id="exampleInputPassword1" placeholder="username" value={this.state.name}
//                                             onChange={this.onChangeName} required />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="exampleInputPassword1">Password</label>
//                                         <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}
//                                             onChange={this.onChangePassword} required />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="exampleInputPassword1">Re enter Password</label>
//                                         <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" value={this.state.rpassword}
//                                             onChange={this.onChangeRpassword} required />
//                                         {this.state.simi && <small id="emailHelp" className="form-text text-muted">Password not matched.</small>}
//                                     </div>
//                                     <div className="form-group cust-flex">
//                                         <button type="submit" className="btn btn-primary">Register</button>
//                                         <Link href="/login"><a className="text-primary">Already existing user?</a></Link>
//                                     </div>
//                                 </fieldset>
//                             </form>
//                         </div>
//                         </div>
//                         </Container>
//                 </Jumbotron>
//                 <footer class="page-footer font-small unique-color-dark pt-4">
//       <div class="footer-copyright text-center py-3">© 2021 Copyright:
//     <a href="https://mdbootstrap.com/"> Gamefoliodev.com</a>
//   </div>
 

// </footer>
//             </Layout>

<Layout>
                <div className="bg-gradient-to-r from-gray-900 to-indigo-500 ...">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4 py-14">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-gray-200 border-0">
                                    <div className="rounded-lg mb-0 px-4 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Sign up with
                                            </h6>
                                        </div>
                                        <div className="btn-wrapper text-center">

                                            <GoogleLogin
                                                clientId="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"
                                                buttonText="Google"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle} >
                                            </GoogleLogin>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-gray-500 text-center mb-1 font-bold">
                                            <small>Or sign up with credentials</small>
                                        </div>
                                        <form>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Email"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={this.state.email}
                                                    onChange={this.onChangeEmail} required
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                  User Name
                                                </label>
                                                <input
                                                    type="username"
                                                    className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={this.state.name}
                                            onChange={this.onChangeName} required
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword} required
                                                />
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                  Re enter  Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                    placeholder="Password"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={this.state.rpassword}
                                                    onChange={this.onChangeRPassword} required
                                                />
                                            </div>
                                            

                                            <div className="text-center mt-3">
                                                <button
                                                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    Sign UP
                                                </button>
                                            </div>
                                        </form>
                                        <div className="flex flex-wrap mt-2">
                                

                                            <div className="w-1/2">
                                                <Link href="/login">
                                                    <a

                                                        className="text-gray-900 hover:text-blue-600"
                                                    >
                                                        <small>Already existing user?</small>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
