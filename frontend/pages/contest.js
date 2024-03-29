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
            userName: ''
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
                <div className="flex-container">
                {/* <div className="sidebar">
                <Nav vertical className="list-unstyled pb-3">
                                    <NavItem style={{ fontSize: "150%", color: "white" }}>
                                        <NavLink style={{ color: "white" }} href="#"><BsController />  Games</NavLink>
                                    </NavItem>
                                    <NavItem style={{ fontSize: "150%" }}>
                                        <NavLink style={{ color: "white" }} href="#"><BsFillPersonFill />   Players</NavLink>
                                    </NavItem>
                                    <Dropdown style={{ fontSize: "150%" }} nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle nav caret style={{ color: "white" }}>
                                            <BsTrophy />   Tournament
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={this.All}> All</DropdownItem>
                                            <DropdownItem onClick={this.live}> Live</DropdownItem>
                                            <DropdownItem onClick={this.upcoming}> Upcoming</DropdownItem>
                                            <DropdownItem onClick={this.pervious}> Pervious</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Nav>
                </div> */}
                {/* <div class="container">
                     <div class="row">

        <div class="col-12">
            <div class="card-deck">
                
                <div class="card">
                    <img src="https://i.imgur.com/A8eQsll.jpg" class="card-img-top img-adjusted"/>
                    
                    {this.state.contest.map(value => (
                        <div class="card-body">
                        <h5 class="card-title">{value.contestName}</h5>
                        <h6 class="card-subtitle" className="mb-2 text-muted">{value.game_id.name}</h6>
                        <p class="card-text">End date : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(value.end))} <br /> Reward : {value.reward}.</p>
                    <Button type="button" color="primary" onClick={() => {
                        Router.push(`/tournament/${value.cid}`)
                    }}>Register</Button>
                    </div>
                    ))}
                    
                    
                </div>
                <div class="card">
                    <img src="//placehold.it/600" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="card">
                    <img src="//placehold.it/600x400" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="card">
                    <img src="//placehold.it/600" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="w-100 py-2"></div>
                next row
                <div class="card">
                    <img src="//placehold.it/800x400" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="card">
                    <img src="//placehold.it/600" class="card-img-top img-adjusted"/>
                    <div class="card-body"></div>
                </div>
                <div class="card">
                    <img src="//placehold.it/600" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="card">
                    <img src="//placehold.it/600" class="card-img-top img-adjusted"/>
                    <div class="card-body">...</div>
                </div>
                <div class="w-100 py-2"></div>
                
            </div>
        </div>
    </div>
</div> */}
                
                 <Container fluid>
                    <Row>
                        <Col md={2}>
                        <div className="animate-right">
                            <div>
                                <hr />
                                <Nav vertical className="list-unstyled pb-3">
                                    <NavItem style={{ fontSize: "150%", color: "white" }}>
                                        <NavLink style={{ color: "white" }} href="#"><BsController />  Games</NavLink>
                                    </NavItem>
                                    <NavItem style={{ fontSize: "150%" }}>
                                        <NavLink style={{ color: "white" }} href="#"><BsFillPersonFill />   Players</NavLink>
                                    </NavItem>
                                    <Dropdown style={{ fontSize: "150%" }} nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle nav caret style={{ color: "white" }}>
                                            <BsTrophy />   Tournament
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={this.All}> All</DropdownItem>
                                            <DropdownItem onClick={this.live}> Live</DropdownItem>
                                            <DropdownItem onClick={this.upcoming}> Upcoming</DropdownItem>
                                            <DropdownItem onClick={this.pervious}> Pervious</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Nav>
                                <hr />
                            </div>
                            </div>
                        </Col>
                       
                        <Col md={10}>
                        <div className="animate-bottom">
                        <div style={{ paddingTop: "2rem" }}>
                            <CardColumns>
                                {this.state.contest.map(value => (
                                    <Card>
                                        <CardImg top width="100%" src="./pubg.png" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle tag="h5">{value.contestName}</CardTitle>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">{value.game_id.name}</CardSubtitle>
                                            <CardText>End date : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.parse(value.end))} <br /> Reward : {value.reward}.</CardText>
                                            <Button type="button" color="primary" onClick={() => {
                                                Router.push(`/tournament/${value.cid}`)
                                            }}>Register</Button>
                                        </CardBody>
                                    </Card>

                                ))}
                            </CardColumns>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </Container> 
                </div>
  <footer >
      <div class="footer-copyright text-center py-3">© 2021 Copyright:
    <a href="https://mdbootstrap.com/"> Gamefoliodev.com</a>
  </div>
 

</footer>
            </Layout>
            

        )
    }
}
