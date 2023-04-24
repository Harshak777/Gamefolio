import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { GoogleLogin } from 'react-google-login';
import { Button } from 'react-bootstrap';
import { Container, Jumbotron, Alert } from "reactstrap";

export default class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            alert: false,
            alertMessage: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('accessToken') != null) {
            Router.push('/contest');
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

        axios.post(`${process.env.NEXT_PUBLIC_API}/login`, form)
            .then(res => {
                console.log(res);
                if (res.data.status == "User found") {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    Router.push("/contest");
                }
                else
                    this.setState({ alert: true });
            })
            .catch(err => {
                if (err.response == null) {
                    this.setState({ alertMessage: "Could not connect with the server", alert: true });
                } else {
                    this.setState({ alertMessage: err.response.data.err, alert: true });
                }
            });

    }
    render() {
        const responseGoogle = (response) => {

            console.log(response);
            var res = response.profileObj;
            console.log(res);
            if (res) {
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
            <Layout>
                <div className="bg-gradient-to-r from-gray-900 to-indigo-500 ...">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4 py-14">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-gray-200 border-0">
                                    <div className="rounded-lg mb-0 px-4 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">
                                                Sign in with
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
                                            <small>Or sign in with credentials</small>
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
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-gray-800 ml-1 w-3 h-3"
                                                        style={{ transition: "all .15s ease" }}
                                                       
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                                        Remember me
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="text-center mt-3">
                                                <button
                                                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </form>
                                        <div className="flex flex-wrap mt-2">
                                            <div className="w-1/2">
                                                <a
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    className="text-gray-900 hover:text-blue-600"
                                                >
                                                    <small>Forgot password?</small>
                                                </a>
                                            </div>

                                            <div className="w-1/2 text-right">
                                                <Link href="/signup">
                                                    <a

                                                        className="text-gray-900 hover:text-blue-600"
                                                    >
                                                        <small>Create new account</small>
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
