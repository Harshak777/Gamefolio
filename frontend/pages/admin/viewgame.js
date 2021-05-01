import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col, Jumbotron, Card, CardBody ,Button} from "reactstrap";

import axios from 'axios';
class viewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            game:[]
        }
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
        return ( 
            <div className="App">
            <Container style={{textAlign:"center"}}>
              <Row>
                <Col />
                <Col lg="8">
                  <Jumbotron>
                    <h3>
                      <u>GAMES</u>
                    </h3>
                    <hr />
                    <Card>
                      <CardBody>
                      <Table bordered>
            <thead>
              <tr>
                
                <th>Gamename</th>
                <th>Rules</th>
                <th>Overview</th>
                <th>Platform</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {this.state.game.map(value=>

            <tr>
          <td >{value.name}</td>
          <td>{value.rules}</td>
          <td>{value.overview}</td>
          <td>{value.platform}</td>
        </tr>)}
        </tbody>
        </Table>
                       
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
 
export default viewGame;