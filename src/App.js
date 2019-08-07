import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { createBrowserHistory } from 'history';

import { ReactDadata } from 'react-dadata';
import { Button, Container, Row, Col, Media, Alert, Accordion, Card, Badge, ButtonToolbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { createCompanies } from './actions/companies';

class App extends Component {

  componentWillMount() {
    this.props.fetchData("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party", {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Token 6692478bebb2ef311e5137c8a7f03b26f98aeb72'
      },
      body: JSON.stringify({
        query: 'сбербанк'
      })
    })
  }  

  render() {
    console.log(this.props)
    return (
      <div className="wrapper">
        <ReactDadata token="6692478bebb2ef311e5137c8a7f03b26f98aeb72" query="Москва" placeholder="" />
        <Button>кнопка</Button>
        <Container>
          <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>Media Heading</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
              ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
              tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
              Donec lacinia congue felis in faucibus.
            </p>

            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>Media Heading</h5>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
                  vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                  vulputate fringilla. Donec lacinia congue felis in faucibus.
                </p>
              </Media.Body>
            </Media>
          </Media.Body>
        </Media>
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This example
            text is going to run a bit longer so that you can see how spacing within an
            alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things nice
            and tidy.
          </p>
        </Alert>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Badge pill variant="primary">
          Primary
        </Badge>
        <ButtonToolbar>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="link">Link</Button>
        </ButtonToolbar>
      </div>      
    )
    //const history = createBrowserHistory();
    /*return (      
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="container" >
          <Switch>
            <Route exact path="/">
              <UserList {...this.props} />
            </Route>
            <Route path="/users/:userId" history={history}>
              <Profile {...this.props} />
            </Route>
          </Switch>
          <Slider {...this.props} />      
        </div>
      </BrowserRouter>
    )*/
  }
}

const mapStateToProps = (state) => {
  return {
      error: state.error,
      loading: state.loading,
      companies: state.companies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, params) => dispatch(createCompanies(url, params))
  };
};

App.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
