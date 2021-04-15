import React ,{Component}from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody ,Button} from "reactstrap";

class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className="App">
        <Container style={{textAlign:"center"}}>
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
                      <Container>
                          <Row>
                              <Col>
                              <Button color="primary" href="/admin/createtournament" size="lg">Create Tournament </Button>
                              </Col>
                              </Row>
                              <br/>
                              <Row>
                              <Col>
                              <Button color="primary"  href="/admin/viewtournament"  size="lg"> View Tournament </Button>
                              </Col>
                              </Row>
                              <br/>
                              <Row>
                              <Col>
                              <Button color="primary"  href="/admin/creategame" size="lg"> Create game </Button>
                              </Col>
                              </Row>
                              <br/>
                              <Row>
                              <Col>
                              <Button color="primary"  href="/admin/viewgame"  size="lg">View Game</Button>
                              </Col>
                              </Row>
                              <br/>
                              <Row>
                              <Col>
                              <Button color="primary" href="/admin/addwinner" size="lg">Add winners</Button>
                              </Col>
                          </Row>
                    </Container>
                   
                  </CardBody>
                </Card>
              </Jumbotron>
            </Col>
            <Col />
          </Row>
        </Container>
      </div> );
    }
}
 
export default dashboard;