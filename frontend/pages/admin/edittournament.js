import axios from 'axios';
import React, { Component } from 'react';
import Router from 'next/router';
import { Container, Row, Col, Jumbotron, Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class editTournament extends Component {
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
            winner: [{ prize: "", position: "" }]


        }
    }
    static async getInitialProps(ctx) {
        const cid=ctx.query.cid
        const result = await axios(
            `http://localhost:5000/fetchcontest/${cid}`
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
            cid:this.state.cid,
            contestName: this.state.contestName,
            overview: this.state.contestoverview,
            reward: this.state.reward,
            organiser: this.state.organiser,
            venue: this.state.venue,
            start: this.state.startdate + " " + this.state.starttime,
            end: this.state.enddate + " " + this.state.endtime,
            gname: this.state.gname,
            gameDay: this.state.gamedate,
        }
        console.log(contest)
        axios.put('http://localhost:5000/updatecontest', contest)
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
          winner: [...prevState.winner, {prize:"", position:""}],
        }));
      }

      

    componentDidMount() {
        
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
       console.log(this.props.data)
            this.setState({ cid: this.props.data.cid });
            this.setState({ contestName: this.props.data.contestName });
            this.setState({ contestoverview: this.props.data.overview });
            this.setState({reward:this.props.data.reward});
            this.setState({organiser:this.props.data.organiser});
            this.setState({venue:this.props.data.venue});
            this.setState({gname:this.props.data.game_id.name});
            let start=this.props.data.start.split(" ")
            this.setState({startdate:this.props.data.start});
            this.setState({starttime:this.props.data.start});
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
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament Name</Label>
                                                <Input type="text" name="contestName" id="contestname" placeholder="Enter the tournament name" value={this.state.contestName} onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament overview</Label>
                                                <Input type="textarea" name="contestoverview" id="contestoverview" placeholder="Enter the tournament overview" value={this.state.contestoverview} onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament organiser</Label>
                                                <Input type="text" name="organiser" id="organiser" placeholder="Enter the organiser" value={this.state.organiser} onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament reward</Label>
                                                <Input type="text" name="reward" id="reward" placeholder="Enter the reward" value={this.state.reward} onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Tournament venue</Label>
                                                <Input type="text" name="venue" id="venue" placeholder="Enter the reward" value={this.state.venue} onChange={this.myChangeHandler} required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleSelect">Select the Game</Label>
                                                <Input type="select" name="gname" id="exampleSelect" onChange={this.myChangeHandler} value={this.state.gname} required>
                                                    <option>select a game</option>
                                                    {this.state.game.map(value => <option>{value.name}</option>)

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
                                                    value={this.state.startdate}
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
                                                    value={this.state.starttime}
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

export default editTournament;