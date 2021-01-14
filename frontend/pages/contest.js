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
            contest: [{"cid": 2}]
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
                        
                <div class="card mb-3" style={{maxWidth: "20rem"}}>
                <h3 class="card-header">{value.contestName}</h3>
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <h6 class="card-subtitle text-muted">Support card subtitle</h6>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" >
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
                <div class="card-footer text-muted">
                    2 days ago
                </div>
                </div>
                ))}
            </Layout>


        )
    }
}
