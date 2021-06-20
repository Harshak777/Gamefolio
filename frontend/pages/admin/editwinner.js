import axios from 'axios';
import React, { Component } from 'react';
import Router from 'next/router';
import { Container, Row, Col, Jumbotron, Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class editWinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [],
            isloading: true,
            cid:"",
            contestName: "",
            contestoverview: "",
            reward: "",
            organiser: "",
            venue: "",
            startdate: "",
            starttime: "",
            enddate: "",
            endtime: "",
            gamedate: "",
            gname: "",
            winner: [{ prize: "", position: "" ,tid:""}]


        }
    }
    static async getInitialProps(ctx) {
        const cid=ctx.query.cid
        const result = await axios(
            `${process.env.NEXT_PUBLIC_API}/fetchwinner/${cid}`
          );
          console.log(result)

        return { data: result.data }
    }
  
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        console.log(this.state.startdate)
    }
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.startdate + " " + this.state.starttime)
        const contest = {
          winners:this.state.winner
        }
        console.log(contest)
        axios.put(`${process.env.NEXT_PUBLIC_API}/updatewinner`, contest)
            .then(res => {
                console.log(res);
                Router.push('/admin/dashboard')
            })
            .catch(err => {
                console.log(err);
            });

    }

    Handlerwinner = (e) => {
    
          let winner = [...this.state.winner]
          winner[e.target.dataset.id][e.target.name] = e.target.value
          this.setState({ winner }, () => console.log(this.state.winner))
        
      }

      addwinner = (e) => {
        this.setState((prevState) => ({
          winner: [...prevState.winner, {prize:"", position:"",tid:""}],
        }));
      }

      

    componentDidMount() {
       console.log(this.props.data)
           this.setState({winner:this.props.data})
           this.setState({isloading:false})
    }
    render() {
        
        if (this.state.isloading)
            return (<h1>Loading</h1>)
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
                                        <Button onClick={this.addwinner}>Add prize</Button>
                                            {
                                                this.state.winner.map((val, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <FormGroup>
                                                                <Label for="exampleDate">Position</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="position"
                                                                    id="position"
                                                                    data-id={idx}
                                                                    placeholder="Enter the position"
                                                                    value={val.position}
                                                                    required
                                                                    onChange={this.Handlerwinner}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleDate">Prize</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="prize"
                                                                    id="prize"
                                                                    data-id={idx}
                                                                    value={val.prize}
                                                                    placeholder="Enter the prize"
                                                                    required
                                                                    onChange={this.Handlerwinner}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="exampleDate">Team Id</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="tid"
                                                                    id="tid"
                                                                    data-id={idx}
                                                                    value={val.tid}
                                                                    placeholder="Enter the teamid"
                                                                    required
                                                                    onChange={this.Handlerwinner}
                                                                />
                                                            </FormGroup>


                                                        </div>
                                                    )
                                                })
                                            }
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

export default editWinner;