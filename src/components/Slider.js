import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { showUser, addUser } from '../actions/users';

class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pos: 0
        }
    }

    handlePos(arrow, node) {
        if (node.classList.contains('disabled'))
            return false;
        if (arrow === 'left') {            
            this.setState({pos: this.state.pos === 0 ? this.props.users.length - 4 : this.state.pos - 1});
        } else {
            this.setState({pos: this.state.pos === this.props.users.length - 4 ? 0 : this.state.pos + 1});
        }
    }

    handleNewUser() {
        this.props.store.dispatch(addUser());
        this.setState({pos: this.props.users.length - 4 + 1})
    }

    render() {
        return (
            <div className="wrapper slider-wrap">
                <div className={`arrow-left ${this.state.pos === 0 ? 'disabled' : ''}`} onClick={(event) => this.handlePos('left', event.currentTarget)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44">
                        <path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" fill="#007aff"></path>
                    </svg>
                </div>
                {this.props.users.slice(this.state.pos, this.state.pos + 4).map(
                    user =>
                    <Link key={user.id} className='avatar-slide' to={`/users/${user.id}`} onClick={() => this.props.store.dispatch( showUser(user) )} style={{
                        backgroundImage: `url(${user.avatar})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }} title={user.name + ' ' + user.surname}>
                    </Link>
                )}
                <div className="avatar-slide add-user" title="Add user" onClick={() => this.handleNewUser()}>
                </div>
                <div className={`arrow-right ${this.state.pos === this.props.users.length - 4 ? 'disabled' : ''}`} onClick={(event) => this.handlePos('right', event.currentTarget)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44">
                        <path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" fill="#007aff"></path>
                    </svg>
                </div>
            </div>
        )
    }
}
export default Slider;