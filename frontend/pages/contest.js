import React, { Component } from 'react'
import axios from 'axios';
import Router from 'next/router';
import Layout from "../components/Layout";
import {
    Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardColumns
} from 'reactstrap';
import { BsController, BsFillPersonFill, BsTrophy } from "react-icons/bs"

export default class contest extends Component {

    constructor() {
        super();

        this.state = {
            contest: [],
            contests: [],
            dropdownOpen: false,
            isloading: true,
            userName: '',
            openTab:1
        };
    };

    async componentDidMount() {
        const temp = {"accessToken": localStorage.getItem('accessToken')};
        const name = localStorage.getItem('userName');
        
        if(name!=null) {
            this.setState({userName: name});
        } else if(temp!=null) {
            try {
                
                await axios.post(`${process.env.NEXT_PUBLIC_API}/jwtverify`, temp)
                            .then(res => {
                                this.setState({userName: res.data.decoded.name});
                                localStorage.setItem('userName', res.data.decoded.name);
                            })
                            .catch(err => {
                                console.log(err);
                            });
            } catch (error) {
                console.error(error);
            }
        }

        axios.get(`${process.env.NEXT_PUBLIC_API}/fetchcontests`)
            .then(res => {
                this.setState({ contest: res.data });
                this.setState({ contests: res.data });
                //Router.push("/");
                this.setState({ isloading: false })
            })
            .catch(err => {
                console.log(err);
                alert("No contest Found");
            });
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    live = () => {

        var content = this.state.contests.filter((value) => { return Date.parse(value.start) <= Date.now() && Date.parse(value.end) >= Date.now() })
        console.log(content);
        this.setState({ contest: content })
    }

    upcoming = () => {

        var content = this.state.contests.filter((value) => { return Date.parse(value.start) > Date.now() })
        console.log(content);
        this.setState({ contest: content })
    }

    pervious = () => {

        var content = this.state.contests.filter((value) => { return Date.parse(value.end) < Date.now() })
        console.log(content);
        this.setState({ contest: content })
    }
    All = () => {

        this.setState({ contest: this.state.contests })
    }

    render() {
        if (this.state.isloading) {
            return (<div class="loader"></div>)
        }
        return (

            <Layout login={this.state.userName}>
       <div class="text-gray-400 bg-gray-900 body-font w-full">
 
    <div class="flex flex-col text-center w-full py-10">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Master Cleanse Reliac Heirloom</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.</p>
    </div>
    <div class=" bg-gray-900  ">
    <div class="container  flex justify-center items-center sm:w-full">
        <div class="relative">
            <div class="absolute top-4 left-3">        <svg class="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg></div> <input type="text" class="h-10 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Search anything..."/>
            <div class="absolute top-0 right-0"> <button class="h-10 w-20 text-white rounded-lg bg-indigo-600 hover:bg-indigo-700">Search</button> </div>
        </div>
    </div>
    <div className="flex flex-wrap py-5 justify-center">
        <div className="lg:w-1/2 md:w-2/3">
    <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (this.state.openTab === 1
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  this.setState({openTab:1})
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
               LIVE
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (this.state.openTab === 2
                    ?"text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  this.setState({openTab:2})
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                UPCOMING
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (this.state.openTab === 3
                    ?"text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  this.setState({openTab:3})
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
               PERVIOUS
              </a>
            </li>
          </ul>
</div>
<div class="container px-10 py-5 mx-auto">
    <div class="flex flex-wrap -m-4">
    {this.state.contest.map(value => (
      <div class="p-4 md:w-1/4">
        <div class="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
          <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog"/>
          <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{value.game_id.name}</h2>
            <h1 class="title-font text-lg font-medium text-white mb-3">{value.contestName}</h1>
            <p class="leading-relaxed mb-3">End date : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(value.end))} <br /> Reward : {value.reward}</p>
            <div class="flex items-center flex-wrap ">
              <button class="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0" onClick={() => { Router.push(`/tournament/${value.cid}`)}}>Register
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
              </button>
              <span class="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span class="  text-gray-500 inline-flex items-center leading-none text-sm">
              
                  <p class="text-green-400">Live</p>
              </span>
            </div>
          </div>
        </div>
      </div>
        ))}
  </div>
  </div>
  </div>
  </div>
 
</div>
            </Layout>
            

        )
    }
}
