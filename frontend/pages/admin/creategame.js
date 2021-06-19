import React, { Component } from 'react';
import axios from'axios';

import { Container, Row, Col, Jumbotron, Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Router from 'next/router';

class createGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            overview:"",
            rules:"",
            platform:"PC"
        }
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        console.log(this.state.platform)
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.name);
        const game={
            name:this.state.name,
           rules:this.state.rules,
           platform:this.state.platform,
           overview:this.state.overview
        }
        
        axios.post(`${process.env.API}/creategame`, game)
        .then(res => {
            console.log(res);
            Router.push('/admin/dashboard')
        })
        .catch(err => {
            console.log(err);
        });
    
    }

    render() {
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
                                                <Label for="exampleEmail">Game Name</Label>
                                                <Input type="text" name="name" id="name" placeholder="Enter the game name" onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Game overview</Label>
                                                <Input type="text" name="overview" id="overview" placeholder="Enter the game overview" onChange={this.myChangeHandler} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Game Rule</Label>
                                                <Input type="textarea" name="rules" id="rules" placeholder="Enter the game rules" onChange={this.myChangeHandler} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleSelect">Select the platform </Label>
                                                <Input type="select" name="platform" id="exampleSelect" onChange={this.myChangeHandler} required>
                                                    <option>PC</option>
                                                    <option>XBOX</option>
                                                    <option>PS4/PS5</option>
                                                    <option>Multi Platform</option>

                                                </Input>
                                            </FormGroup>
                                            <Button color="success" type="submit">Submit</Button>
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

export default createGame;