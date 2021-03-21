import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout";
import Head from 'next/head';
import { useRouter } from 'next/router'



// style={{maxWidth: "20rem"}}
export default class contest extends Component {

    constructor() {
        super();

        this.state = {
            contest: [{ "cid": 1, "game_id": { gid: 1, name: "", rules: "", platform: "" } }],

        };
    };

    

    componentWillMount() {
        axios.get('http://localhost:5000/fetchcontests')
            .then(res => {
                this.setState({ contest: res.data });
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
                    <div class="card mb-3" style={{ maxWidth: "20rem" }}>
                        <h3 class="card-header">{value.contestName}</h3>
                        <div class="card-body">
                            <h5 class="card-title">{value.game_id.name}</h5>
                            <h6 class="card-subtitle text-muted">organiser:{value.organiser}</h6>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" >
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                        </svg>
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Start date: {value.start}</li>
                            <li class="list-group-item">End date : {value.end}</li>
                            <li class="list-group-item">Reward : {value.reward}</li>
                        </ul>
                        <div class="card-body">
                            <button type="button" class="btn btn-primary"  onClick={() => {
        Router.push(`/tournament/${value.cid}`)
      }}>Register</button>
      {/* <Link href={`/tournament/[cid]`} as="/tournament/1">
      <a>
     Register
     </a>
      </Link> */}
     


                        </div>
                        <div class="card-footer text-muted">
                            <p class="text-success"><strong>Live</strong></p>
                        </div>
                    </div>
                ))}
            </Layout>


        )
    }
}
