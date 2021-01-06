import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout"

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
                console.log(res);
                if (res.data == "User found")
                    Router.push("/");
                else
                    alert('Email/ Password entered is not correct');
            })
            .catch(err => {
                console.log(err);
            });

    }
    render() {

        return (
            <Layout>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
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

                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <Link href="/signup"><a className="text-primary">Are you a new user?</a></Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </Layout>

        )
    }
}
