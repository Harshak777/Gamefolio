import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout";
import { GoogleLogin } from 'react-google-login';
import { Button } from 'react-bootstrap';

export default class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''

        }
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

    onSubmit = async (event) => {
        event.preventDefault();

        const form = {
            password: this.state.password,
            email: this.state.email
        };

        axios.post('http://localhost:5000/login', form)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "User found") {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    Router.push("/contest");
                } else
                    alert('Email/ Password entered is not correct');
            })
            .catch(err => {
                console.log(err);
            });

    }
    render() {
        const responseGoogle = (response) => {

            console.log(response);
            var res = response.profileObj;
            console.log(res);
            if(res) {
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
                <div className="bg-img">
                    <div className="row m-0 log-in">
                        <div className="col-md-4 offset-md-4 login-container px-5">
                            <GoogleLogin
                                clientId="960527555483-09f7mgtkag4eva0n62dl6j6051fp9079.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle} >
                            </GoogleLogin>
                            <hr className="my-4"></hr>
                            <form onSubmit={this.onSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} required />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}
                                            onChange={this.onChangePassword} required />
                                    </div>
                                    <div className="form-group">

                                        <Button variant="success" type="submit">Login</Button>
                                    </div>
                                    <Link href="/signup"><a className="text-primary">Are you a new user?</a></Link>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>

        )
    }
}
