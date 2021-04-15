import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col, Jumbotron, Card, CardBody ,Button} from "reactstrap";
import Router from 'next/router';
import axios from 'axios';
class viewTournament extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            game:[],
            isloading: true,
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:5000/fetchcontests')
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
        if (this.state.isloading) {
            return (<h1>loading</h1>)
        }
        return ( 
            <div className="App">
            <Container style={{textAlign:"center"}}>
              <Row>
                <Col />
                <Col lg="15">
                  <Jumbotron>
                    <h3>
                      <u>Tournament</u>
                    </h3>
                    <hr />
                  
                      <Table bordered>
            <thead>
              <tr>
                
                <th>Contestname</th>
                <th>organiser</th>
                <th>Overview</th>
                <th>reward</th>
                <th>venue</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Game date</th>
                <th>gamename</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {this.state.game.map(value=>

            <tr>
          <td >{value.contestName}</td>
          <td>{value.organiser}</td>
          <td>{value.overview}</td>
          <td>{value.reward}</td>
          <td>{value.venue}</td>
          <td>{value.start}</td>
          <td>{value.end}</td>
          <td>{value.gameDay}</td>
          <td>{value.game_id.name}</td>
          <td><Button type="button" color="primary" onClick={() => {
                                                    Router.push(`/admin/team/${value.cid}`)
                                                }}>View Teams</Button></td>
        </tr>)}
        </tbody>
        </Table>
                       
                     
                  </Jumbotron>
                </Col>
                <Col />
              </Row>
            </Container>
          </div> 
        
       
                  );
    }
}
 
export default viewTournament;