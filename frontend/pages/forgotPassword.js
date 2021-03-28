import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Layout from "../components/Layout";
import { Button } from 'react-bootstrap';
import { Container, Jumbotron, Alert  } from "reactstrap";

export default class forgetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            alert: false,
            alertMessage: ''
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const form = {
            email: this.state.email
        };

        axios.post('http://localhost:5000/forgot-password', form)
            .then(res => {
                console.log(res.data);
                    this.setState({alertMessage: res.data.status, alert: true});
            })
            .catch(err => {
                if(err.response == null) {
                    this.setState({alertMessage: "Could not connect with the server", alert: true});
                } else {
                    this.setState({alertMessage: err.response.data.err, alert: true});
                }
            });

    }
    render() {
        return (
            <Layout>
                <div>
                    <Jumbotron fluid>
                        <Container fluid>
                            <div className="col-md-4 offset-md-4 login-container px-5">
                                <form onSubmit={this.onSubmit}>
                                    {this.state.alert && <Alert color="info">
                                        {this.state.alertMessage}
                                    </Alert>}
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Enter your registered Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} required />
                                        </div>
                                        <div className="form-group">
                                            <Button variant="success" type="submit">Login</Button>
                                        </div>
                                        <Link href="/login"><a className="text-primary">Remembered Your Password?</a></Link>
                                    </fieldset>
                                </form>
                            </div>
                        </Container>
                    </Jumbotron>
                </div>
            </Layout>
        )
    }
}
