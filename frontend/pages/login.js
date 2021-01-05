import React, { Component } from 'react'
import Link from 'next/link';
import Layout from "../components/Layout"

export default class login extends Component {
    render() {

        return (
            <Layout>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group">

                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <Link href="/signup"><a className= "text-primary">Are you a new user?</a></Link>
                    </fieldset>
                </form>
            </Layout>

        )
    }
}
