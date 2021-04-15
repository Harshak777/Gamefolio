import axios from 'axios';
import React, { Component } from 'react';
import Router from 'next/router';
import { Container, Row, Col, Jumbotron, Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class createTournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game:[],
            isloading:true,
            contestname:"",
            contestoverview:"",
            reward:"",
            organiser:"",
            venue:"",
            startdate:"",
            starttime:"",
            enddate:"",
            endtime:"",
            gamedate:"",
            gname:""

            
        }
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        console.log(this.state.startdate)
    }
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.startdate+ " "+this.state.starttime)
        const contest={
            contestName:this.state.contestname,
            overview:this.state.contestoverview,
            reward:this.state.reward,
            organiser:this.state.organiser,
            venue:this.state.venue,
            start: this.state.startdate+ " "+this.state.starttime,
            end: this.state.enddate+ " "+this.state.endtime,
            gname:this.state.gname
        }
        console.log(contest)
        axios.post('http://localhost:5000/createcontest', contest)
        .then(res => {
            console.log(res);
            Router.push('/admin/dashboard')
        })
        .catch(err => {
            console.log(err);
        });
    
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/fetchgames')
            .then(res => {
                this.setState({ game: res.data });
              
                //Router.push("/");
                console.log(this.state.game)
                this.setState({ isloading: false })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        if(this.state.isloading)
        return(<h1>Loading</h1>)
        return (
            

            <div className="App">
                <Container style={{ textAlign: "center" }}>
                    <Row>
                        <Col />
                        <Col lg="8">
                            <Jumbotron>
                                <h3>
                                    <u>DASHBOARD</u>
                                </h3>
                                <hr />
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament Name</Label>
                                                <Input type="text" name="contestname" id="contestname" placeholder="Enter the tournament name" onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament overview</Label>
                                                <Input type="textarea" name="contestoverview" id="contestoverview" placeholder="Enter the tournament overview" onChange={this.myChangeHandler} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament organiser</Label>
                                                <Input type="text" name="organiser" id="organiser" placeholder="Enter the organiser" onChange={this.myChangeHandler} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament reward</Label>
                                                <Input type="text" name="reward" id="reward" placeholder="Enter the reward" onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament venue</Label>
                                                <Input type="text" name="venue" id="venue" placeholder="Enter the reward" onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleSelect">Select the Game</Label>
                                                <Input type="select" name="gname" id="exampleSelect" onChange={this.myChangeHandler} required>
                                                <option>select a game</option>
                                                    {this.state.game.map(value=><option>{value.name}</option>)
                                                   
                                                    }

                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleDate">Start Date</Label>
                                                <Input
                                                    type="date"
                                                    name="startdate"
                                                    id="exampleDate"
                                                    placeholder=" Start date placeholder"
                                                    required
                                                    onChange={this.myChangeHandler}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleTime">Start Time</Label>
                                                <Input
                                                    type="time"
                                                    name="starttime"
                                                    id="exampleTime"
                                                    placeholder="Start time placeholder"
                                                    required
                                                    onChange={this.myChangeHandler}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleDate">End Date</Label>
                                                <Input
                                                    type="date"
                                                    name="enddate"
                                                    id="exampleDate"
                                                    placeholder=" End date placeholder"
                                                    required
                                                    onChange={this.myChangeHandler}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleTime">End Time</Label>
                                                <Input
                                                    type="time"
                                                    name="endtime"
                                                    id="exampleTime"
                                                    placeholder=" End time placeholder"
                                                    required
                                                    onChange={this.myChangeHandler}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleDate">Game Date</Label>
                                                <Input
                                                    type="date"
                                                    name="gamedate"
                                                    id="exampleDate"
                                                    placeholder=" End date placeholder"
                                                    required
                                                    onChange={this.myChangeHandler}
                                                />
                                            </FormGroup>
                                            <Button color="success"type="submit">Submit</Button>
                                        </Form>

                                    </CardBody>
                                </Card>
                            </Jumbotron>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default createTournament;