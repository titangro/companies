import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Row, Col, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { createCompanies, activateCompany } from './actions/companies';

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
  
  handleCompany(event, company) {
    Array.from(event.target.parentElement.parentElement.parentElement.querySelectorAll('button')).forEach(
      item =>
      item.classList.remove('active')
    );
    event.target.classList.add('active');
    this.props.activateCompany(company);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (this.validateForm(formData)) {
      console.log('isValid')
    }
  }

  validateForm(form) {
    console.log(form);
  }

  handleFio(node) {
    node.value = node.value.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
    node.value = node.value ? node.value[0].toUpperCase() + node.value.slice(1).toLowerCase() : '';
  }

  handlePassportNumber(node) {
    console.log(node.value.length)
    if (node.value.replace(/[^\d]/g,'').length > 10)
      node.value = node.value.slice(0, 10);
    if (node.value.length === 4)
      return node.value += ' ';
    node.value = node.value.replace(/[^\d ]/g,'');
  }

  handlePassportIssue(node) {

  }

  handlePassportDate(node) {

  }

  handleBornDate(node) {

  }

  handleInn(node) {

  }

  render() {
    console.log(this.props)
    return (
      <div className="wrapper">
        {this.props.companies.length ? <React.Fragment>
          <Container className="choice">
            <h1>Выберите компанию</h1>
            {this.props.companies.map(
              company =>
              <Row key={company.data.inn}>
                <Col xs lg="2">
                  <Button variant="light" onClick={event => this.handleCompany(event, company)}>{company.value}</Button>
                </Col>
              </Row>
            )}
          </Container>
          {this.props.company ?
          <React.Fragment>
            <Container className="personal">
              <h2>Учредители</h2>
              {this.props.company.managers ? 
                <React.Fragment>
                  {this.props.company.managers.map(
                    (manager, index) =>
                    <Container key={index}>
                      <Row>
                        <Col xs lg="2">
                          {manager.name}
                        </Col>
                      </Row>
                      <Row>
                        <p>Папорт</p>
                        <Col xs lg="2">
                          Серия номер: {manager.passport}
                        </Col>
                        <Col xs lg="2">
                          Кем выдан: {manager.passportIssue}
                        </Col>
                        <Col xs lg="2">
                          Дата выдачи: {manager.passprotIssueDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs lg="2">
                          Дата рождения: {manager.bornDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs lg="2">
                          ИНН: {manager.inn}
                        </Col>
                      </Row>
                    </Container>
                  )}
                </React.Fragment> : <p>В компании нет информации об учредителях</p>}
            </Container>
            <Container className="personal">
              <h2>Добавить информамцию о учередителях</h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicCompany">
                  <Form.Label>Компания</Form.Label>
                  <Form.Control type="text" name="company" placeholder="Ваша компания" value={this.props.company.value} onChange={() => {}} />
                  <Form.Text className="text-muted">
                    Выбранная компания
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                  <Form.Label>Фамилия Имя Отчество</Form.Label>
                  <Form.Control type="text" name="surname" placeholder="Фамилия" onChange={(event) => this.handleFio(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Control type="text" name="name" placeholder="Имя" onChange={(event) => this.handleFio(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPatronymic">
                  <Form.Control type="text" name="patronymic" placeholder="Отчество" onChange={(event) => this.handleFio(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassport">
                  <Form.Label>Паспортные данные</Form.Label>
                  <Form.Control type="text" name="passport" placeholder="Серия и номер" onChange={(event) => this.handlePassportNumber(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassportIssue">
                  <Form.Control type="text" name="issue" placeholder="Кем выдан" onChange={(event) => this.handlePassportIssue(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassportDateIssue">
                  <Form.Control type="date" name="issue_date" placeholder="Даты выдачи" onChange={(event) => this.handlePassportDate(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassport">
                  <Form.Label>Дата рождения</Form.Label>
                  <Form.Control type="date" name="born_date" placeholder="" onChange={(event) => this.handleBornDate(event.target)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassport">
                  <Form.Label>ИНН</Form.Label>
                  <Form.Control type="text" name="inn" placeholder="" onChange={(event) => this.handleInn(event.target)} />
                </Form.Group>
                
                <Form.Group controlId="formBasicError">
                  <Form.Control.Feedback type="invalid" style={{display: this.props.error ? 'block' : 'none'}}>
                    {this.props.error}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Добавить учредителя
                </Button>
              </Form>
            </Container>
          </React.Fragment> : ''}
        </React.Fragment> : ''}
      </div>      
    )
  }
}

const mapStateToProps = (state) => {
  return {
      error: state.error,
      loading: state.loading,
      companies: state.companies,
      company: state.company
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, params) => dispatch(createCompanies(url, params)),
    activateCompany: (company) => dispatch(activateCompany(company))
  };
};

App.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
