import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout";
import Head from 'next/head';


// style={{maxWidth: "20rem"}}
export default class contest extends Component {

    constructor() {
        super();

        this.state = {
            contest: [{"cid": 2,"end": "2021-01-24T00:00:00.000Z", "game_id": {"name": "", "platform": ""}}]
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/fetchcontest')
                    .then(res => {
                        console.log(res.data);
                        this.setState({contest: res.data});
                        //Router.push("/");
                    })
                    .catch(err => {
                        console.log(err);
                        alert("No contest Found");
                    });

      
    }

    render() {

        return (
            <Layout>
                {this.state.contest.map(value => (
                        console.log(value.game_id.name),
                <div className="card mb-3" style={{maxWidth: "20rem"}}>
                <h3 className="card-header">{value.contestName}</h3>
                <div className="card-body">
                    <h4 className="card-title">{value.game_id.name}</h4>
                    <h6 className="card-subtitle text-muted">{value.game_id.platform}</h6>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" >
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Start Date: {value.start}</li>
                    <li className="list-group-item">End Date: {value.end}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link btn btn-primary">Register</a>
                </div>
                <div className="card-footer text-muted">
                {console.log(new Date().toLocaleDateString().replaceAll('/',''))}
                {console.log(value.end.slice(0,10).split("-").reverse().join(""))}
                    {value.end > Date.now() && Live}
                </div>
                </div>
                ))}
            </Layout>


        )
    }
}
