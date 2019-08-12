import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Row, Col, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { createCompanies, activateCompany, showManagers, addManager } from './actions/companies';
import { createError, deleteError } from './actions/error';

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
    this.props.showManagers(company);
  }

  handleSubmit(event, companyId) {
    event.preventDefault();
    if (this.validateForm(event.target)) {
      console.log('isValid');

      const formData = new FormData(event.target);
      const name = formData.get('name'),
        surname = formData.get('surname'),
        patronymic = formData.get('patronymic'),
        passport = formData.get('passport'),
        issue = formData.get('issue'),
        issueDate = new Date(formData.get('issue_date')),
        bornDate = new Date(formData.get('born_date')),
        inn = formData.get('inn');
      
      this.props.addManager(companyId, {
        name: `${surname} ${name} ${patronymic}`,
        passport: passport,
        issue: issue,
        issueDate: issueDate,
        bornDate: bornDate,
        inn: inn
      });
    }
  }

  validateForm(form) {
    const formData = new FormData(form);
    const name = formData.get('name'),
      surname = formData.get('surname'),
      patronymic = formData.get('patronymic'),
      passport = formData.get('passport'),
      issue = formData.get('issue'),
      issueDate = new Date(formData.get('issue_date')),
      bornDate = new Date(formData.get('born_date')),
      inn = formData.get('inn');

    if (name === '' || surname === '' || patronymic === '' || passport === '' || issue === '' || issueDate === '' || bornDate === '' || inn === '') {
      this.props.createError('Все поля обязательны для заполнения');
      return false;
    } else {

      if (passport.length !== 11) {
        this.props.createError('Некорректно заполенно поле серии и номера паспорта');
        return false;
      } else if (inn.length !== 12) {
        this.props.createError('Поле ИНН должно содержать не менее 12 цифр');
        return false;
      } else if (issueDate > new Date() || bornDate > issueDate) {
        this.props.createError('Некорректно заполенно поле даты выдачи паспорта');
        return false;
      } else if (bornDate > new Date()) {
        this.props.createError('Некорректно заполенно поле даты рождения');
        return false;
      } else if ( ((new Date()).getFullYear() - bornDate.getFullYear()) < 18 
          || (((new Date()).getFullYear() - bornDate.getFullYear()) === 18 && ((new Date()).getMonth() - bornDate.getMonth() < 0 )) 
          || (((new Date()).getFullYear() - bornDate.getFullYear()) === 18 && ((new Date()).getMonth() - bornDate.getMonth()) === 0 && ((new Date()).getDate() - bornDate.getDate() < 0) ) ) {
        this.props.createError('Учредитель не можеть быть несовершеннолетним');
        return false;
      }

      this.props.deleteError();
      return true;
    }
  }

  handleFio(node) {
    node.value = node.value.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
    node.value = node.value ? node.value[0].toUpperCase() + node.value.slice(1).toLowerCase() : '';
  }

  handlePassportNumber(node) {
    if (node.value.length < 4)
      node.value = [...node.value.slice(0,4).replace(/[^0-9]/gim,'')].join('');
    else if (node.value.length === 4)
      node.value = [...node.value.slice(0,4).replace(/[^0-9]/gim,''), ' '].join('');
    else
      node.value = [...node.value.slice(0,4).replace(/[^0-9]/gim,''), ' ', ...node.value.slice(5, 11).replace(/[^0-9]/gim,'')].join('');    
  }

  handlePassportIssue(node) {
    node.value = node.value.replace(/[!@#~`$%^&";:?*\/\\\[\]\|\{\}.,_\+\=-]/g, '')
  }

  handlePassportDate(node) {
    //console.log(node.value)
  }

  handleBornDate(node) {
    //console.log(node.value)
  }

  handleInn(node) {
    node.value = node.value.replace(/[^0-9]/gim,'').slice(0,12);
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
                <Col xs lg="6">
                  <Button variant="light" onClick={event => this.handleCompany(event, company)}>{company.value}</Button>
                </Col>
              </Row>
            )}
          </Container>
          {this.props.company ?
          <React.Fragment>
            <Container className="personal">
              <h2>Учредители</h2>
              {this.props.managers.length ? 
                <React.Fragment>
                  {this.props.managers.map(
                    (manager, index) =>
                    <Container key={index}>
                      <Row>
                        <Col xs lg="6">
                          {manager.name}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs lg="6">
                          Серия номер паспорта: {manager.passport}
                        </Col>
                        <Col xs lg="6">
                          Кем выдан: {manager.issue}
                        </Col>
                        <Col xs lg="6">
                          Дата выдачи: {(new Date(manager.issueDate)).toLocaleDateString()}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs lg="2">
                          Дата рождения: {(new Date(manager.bornDate)).toLocaleDateString()}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs lg="6">
                          ИНН: {manager.inn}
                        </Col>
                      </Row>
                    </Container>
                  )}
                </React.Fragment> : <p>В компании нет информации об учредителях</p>}
            </Container>
            <Container className="personal">
              <Row>
                <Col xs lg="6">
                  <h2>Добавить информамцию о учередителях</h2>              
                  <Form onSubmit={(event) => this.handleSubmit(event, this.props.company.data.hid)}>
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
                      <Form.Text className="text-muted">
                        Даты выдачи
                      </Form.Text>
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
                </Col>
              </Row>
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
      company: state.company,
      managers: state.managers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, params) => dispatch(createCompanies(url, params)),
    activateCompany: (company) => dispatch(activateCompany(company)),
    createError: (error, info) => dispatch(createError(error, info)),
    deleteError: () => dispatch(deleteError()),
    showManagers: (company) => dispatch(showManagers(company)),
    addManager: (companyId, manager) => dispatch(addManager(companyId, manager))
  };
};

App.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
