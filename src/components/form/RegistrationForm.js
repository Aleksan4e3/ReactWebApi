import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../../constants';

class RegistrationForm extends React.Component {
    state = {
        id: 0,
        name: '',
        document: '',
        email: '',
        phone: ''
    }
    componentDidMount() {
        if (this.props.user) {
            const { id, name, document, email, phone } = this.props.user;
            this.setState({ id, name, document, email, phone });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                document: this.state.document,
                email: this.state.email,
                phone: this.state.phone
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                document: this.state.document,
                email: this.state.email,
                phone: this.state.phone
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" name="name" value={this.state.name ? this.state.name : ''} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Document:</Label>
                <Input type="text" name="document" value={this.state.document ? this.state.document : ''} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" name="email" value={this.state.email ? this.state.email : ''} onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone:</Label>
                <Input type="text" name="phone" value={this.state.phone ? this.state.phone : ''} onChange={this.onChange}
                    placeholder="+1 999-999-9999" />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}

export default RegistrationForm;