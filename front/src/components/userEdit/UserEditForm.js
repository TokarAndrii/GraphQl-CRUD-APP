import React, { Component } from 'react';
import styled from 'styled-components';

const INITIAL_STATE = {
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
    addressCity: "",

}

class UserEditForm extends Component {
    state = { ...INITIAL_STATE }

    handleInput = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;
        const {
            firstName,
            secondName,
            email,
            phone,
            website,
            companyName,
            addressCity,
        } = user;

        if (prevProps.user !== this.props.user) {
            this.setState({
                firstName,
                secondName,
                email,
                phone,
                website,
                companyName,
                addressCity,
            })
        }
    }
    render() {
        const { firstName, secondName, email, phone, website,
            companyName, addressCity } = this.state;
        const { className } = this.props;
        return (
            <div className={className}>
                <form className="form" >
                    <label className="label">
                        <span className="labeltext">First Name:</span>
                        <input type="text" className="input" name="firstName" value={firstName} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Second Name:</span>
                        <input type="text" className="input" name="secondName" value={secondName} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Email:</span>
                        <input type="email" className="input" name="email" value={email} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Phone:</span>
                        <input type="tel" className="input" name="phone" value={phone} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Website:</span>
                        <input type="text" className="input" name="website" value={website} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Company Name:</span>
                        <input type="text" className="input" name="companyName" value={companyName} onChange={this.handleInput}></input>
                    </label>
                    <label className="label">
                        <span className="labeltext">Address City:</span>
                        <input type="text" className="input" name="addressCity" value={addressCity} onChange={this.handleInput}></input>
                    </label>
                    <button className="addUserBtn" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const StyledUserEditForm = styled(UserEditForm)`
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70vw;
}

.label{
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 1 60px;
    width: 700px;
}

.label:last-of-type{
    margin-bottom: 24px;
}


.input{
    padding: 6px;
    width: 70%;
}

.input:active{
    outline: 2px solid blue;
}

.labeltext{
    font-weight: bold;
    margin-right: 12px;
    flex: 0 1 200px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.addUserBtn{
    padding: 8px;
    width: 400px;
}

.addUserBtn:hover{
    outline: 1px solid blue;
}
`


export default StyledUserEditForm;