import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { showUser } from '../actions/users';
import { addComment } from '../actions/comments';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isValid: false,
        }
    }

    validateForm(node) {
        const nodeForm = node.parentElement.parentElement;
        const title = nodeForm.querySelector('input[name="title"]');
        const mes = nodeForm.querySelector('textarea');
        const phone = nodeForm.querySelector('input[name="phone"]');
        if (title.value.length > 5 && title.value.length <= 80
            && mes.value !== '' && mes.value.length <= 128
            && phone.value !== '' && phone.value.replace(/\D+/g, '').length <= 11 && phone.value.replace(/\D+/g, '').length > 7) {
            this.setState({ isValid: true })
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.users.length) 
            this.props.store.dispatch( showUser(
                nextProps.users.filter(user => user.id === +window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1))[0]
            ) )
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title');
        const phone = formData.get('phone');
        const mes = formData.get('message');

        this.props.store.dispatch( addComment({
            userId: this.props.user.id,
            title: title,
            phone: phone,
            comment: mes,
            author: this.props.user.surname,
            users: this.props.users
        }) )

        event.currentTarget.querySelectorAll('input[type="text"], input[type="tel"], textarea').forEach(
            item =>
            item.value = ''
        )
        this.setState({
            isValid: false
        })
    }

    render () {
        console.log(this.props)
        const curComments = this.props.user ? (this.props.user.comments.length > 5 ? this.props.user.comments.slice(this.props.user.comments.length - 5) : this.props.user.comments) : [];
        return (
            <div className="wrapper user-wrapper">
                <Link to="/" className="back">Вернуться к списку</Link>
                <div className="profile">
                    <div className="profile-image" style={{
                        backgroundImage: `url(${this.props.user.avatar})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                    }}></div>
                    <div className="profile-info">
                        <div className="profile-info-item">{this.props.user.name}</div>
                        <div className="profile-info-item">{this.props.user.surname}</div>
                        <div className="profile-info-item">{this.props.user.position}</div>
                        <div className="profile-info-item">{this.props.user.address}</div>
                    </div>
                </div>
                <div className="comments">
                    {curComments.map(
                        comment =>
                        <div className="comment" key={comment.id}>
                            <div className="title">{comment.title}</div>
                            <div className="message">{comment.comment}</div>
                            <div className="author"><a href={`tel:${comment.phone}`}>{comment.author}</a></div>
                        </div>
                    )}
                    <form className="add-form" onSubmit={(event) => this.handleSubmit(event)} >
                        <div className="form-row">
                            <div className="title">Добавить комментарий</div>
                        </div>
                        <div className="form-row">
                            <input type="text" name="title" placeholder="Заголовок комментария" onBlur={(event) => this.validateForm(event.target)} />
                        </div>
                        <div className="form-row">
                            <textarea placeholder="Ваш комментарий" name="message" onBlur={(event) => this.validateForm(event.target)}></textarea>
                        </div>
                        <div className="form-row">
                            <input type="tel" name="phone" placeholder="Номер телефона" onBlur={(event) => this.validateForm(event.target)} />
                        </div>
                        <div className="form-row">
                            <input type="submit" name="submit" value="Добавить" className={!this.state.isValid ? 'disabled' : ''} disabled={!this.state.isValid} />
                        </div>
                    </form>
                </div>
            </div>
        ) 
    }
}

export default Profile;