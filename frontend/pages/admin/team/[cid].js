import { useRouter } from 'next/router'
import Layout from "../../../components/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Router from 'next/router';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'reactstrap';
import { Container, Row, Col, Jumbotron, Card, CardBody, Button } from "reactstrap";


const team = () => {
  const router = useRouter()
  const { cid } = router.query

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (isLoading)
      await axios(
        `${process.env.API}/fetchteam/${cid}`
      ).then(result => {
        const sorteddata = result.data.sort(function (a, b) { return a.tid - b.tid });
        setData(sorteddata)
        setIsLoading(false)
        console.log(sorteddata)
      })
        .catch(err => {
          console.log(err);
        });


  });
if(isLoading)
return(<p>loading</p>)
  return (
    <div className="App">
      <Container style={{ textAlign: "center" }}>
        <Row>
          <Col />
          <Col lg="8">
            <Jumbotron>
              <h3>
                <u>Teams</u>
              </h3>
              <hr />
              <Card>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>

                        <th>teamname</th>
                        <th>username</th>
                        <th>Ingameid</th>
                        <th>referral</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(value =>

                        <tr>
                          <td >{value.team_id.name}</td>
                          <td>{value.user_id.name}</td>
                          <td>{value.ingame_id}</td>
                          <td>{value.team_id.referral}</td>
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
  )


}
export default team;