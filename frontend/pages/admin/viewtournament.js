import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col, Jumbotron, Card, CardBody, Button } from "reactstrap";
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link'
class viewTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      isloading: true,
    }
  }
  componentDidMount() {
    axios.get(`${process.env.NEXT_PUBLIC_API}/fetchcontests`)
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

  deleteContest = (cid) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API}/deletecontest/${cid}`)
      .then(res => {
        Router.push('admin/dashboard')
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
        <Container>
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
                      <th>reward</th>
                     
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Game date</th>
                      <th>gamename</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.game.map(value =>

                      <tr>
                        <td >{value.contestName}</td>
                        <td>{value.organiser}</td>
                        <td>{value.reward}</td>
                        
                        <td>{value.start}</td>
                        <td>{value.end}</td>
                        <td>{value.gameDay}</td>
                        <td>{value.game_id.name}</td>
                        <td><Button type="button" color="primary" onClick={() => {
                          Router.push(`/admin/team/${value.cid}`)
                        }}>View Teams</Button></td>
                        <td><Link href={{
                          pathname: "/admin/edittournament",
                          query: { cid: value.cid }
                        }}> Edit tournament</Link></td>
                        <td><Button type="button" color="primary" onClick={() => {
                          this.deleteContest(value.cid)
                        }}>Delete team</Button></td>
                        <td><Link href={{
                          pathname: "/admin/editwinner",
                          query: { cid: value.cid }
                        }}> Add Winner</Link></td>
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