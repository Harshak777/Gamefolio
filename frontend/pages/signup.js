import React, { Component } from 'react'
import Layout from "../components/Layout"

export default class signup extends Component {
    render() {
        return (
        <Layout>
            <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="g-signin2"  data-theme="dark"></div>
                            <hr className="my-4"></hr>
                            <form>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">User name</label>
                                        <input type="username" className="form-control" id="exampleInputPassword1" placeholder="username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Re enter Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                                    </div>
                                    <div className="form-group">

                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </fieldset>
                            </form>
                    </div>
                </div>
        </Layout>
        )
    }
}
