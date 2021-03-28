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
    
                    axios.post('http://localhost:5000/signup', form)
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
    
                axios.post('http://localhost:5000/gsignup', form)
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
            <Layout>
              <Jumbotron fluid>
                    <Container fluid>
                        <div className="col-md-4 offset-md-4 sign-container px-5">
                            <GoogleLogin
                                clientId="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"
                                buttonText="Sign Up with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} >
                            </GoogleLogin>
                            <hr className="my-4"></hr>
                            <form onSubmit={this.onSubmit}>
                                {this.state.alert && 
                                    <Alert color="info">
                                        {this.state.alertMessage}
                                    </Alert>}
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control bordered-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
                                            onChange={this.onChangeEmail} required />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">User name</label>
                                        <input type="username" className="form-control" id="exampleInputPassword1" placeholder="username" value={this.state.name}
                                            onChange={this.onChangeName} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}
                                            onChange={this.onChangePassword} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Re enter Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" value={this.state.rpassword}
                                            onChange={this.onChangeRpassword} required />
                                        {this.state.simi && <small id="emailHelp" className="form-text text-muted">Password not matched.</small>}
                                    </div>
                                    <div className="form-group cust-flex">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                        <Link href="/login"><a className="text-primary">Are you a new user?</a></Link>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        </Container>
                </Jumbotron>
            </Layout>
        )
    }
}
