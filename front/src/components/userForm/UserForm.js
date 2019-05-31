import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import styles from './UserForm.module.css';

const USERS_QUERY = gql`
query UsersQuery{
    users {
        id
        firstName,
        secondName,
        email,
        phone,
        company{
            name
        },
        address{
            city
        }
    }
}
`;

const ADD_USER = gql`
    mutation  AddUser($firstName: String!, $secondName: String!, $email: String!,
        $phone: String!, $website: String!, $companyName: String!, $addressCity: String!){
        addUser(firstName: $firstName, secondName: $secondName,
            email: $email, phone: $phone, website: $website, companyName: $companyName, addressCity: $addressCity ){
            id,
            firstName,
            secondName,
            email,
            phone,
            website, 
            company{
                name
            },
            address{
                city
            },
        }
    }
`;

const INITIAL_STATE = {
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
    addressCity: "",

}

class UserForm extends Component {
    state = { ...INITIAL_STATE }
    handleSubmit = (e, onAdd) => {
        console.log('handleSubmit at UserForm');
        e.preventDefault();
        const { firstName, secondName, email, phone, website, companyName,
            addressCity, } = this.state;
        // onAdd({
        //     firstName, secondName, email, phone, website, companyName,
        //     addressCity,
        // })

        onAdd({ variables: { firstName, secondName, email, phone, website, companyName, addressCity, } })
        this.setState({ ...INITIAL_STATE })
    }

    handleInput = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    render() {
        const { firstName, secondName, email, phone, website, companyName,
            addressCity, } = this.state;
        return (
            <Mutation mutation={ADD_USER} update={(cache, { data: { addUser } }) => {
                const { users } = cache.readQuery({ query: USERS_QUERY });
                cache.writeQuery({
                    query: USERS_QUERY,
                    data: { users: users.concat([addUser]) },
                });
            }}>{
                    (addUser, { loading, error }) => (
                        <>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                            {!loading && !error && (
                                <div>
                                    <h2>User Form</h2>
                                    <form className={styles.form} onSubmit={e => this.handleSubmit(e, addUser)}>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>First Name:</span>
                                            <input type="text" className={styles.input} name="firstName" value={firstName} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Second Name:</span>
                                            <input type="text" className={styles.input} name="secondName" value={secondName} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Email:</span>
                                            <input type="email" className={styles.input} name="email" value={email} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Phone:</span>
                                            <input type="tel" className={styles.input} name="phone" value={phone} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Website:</span>
                                            <input type="text" className={styles.input} name="website" value={website} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Company Name:</span>
                                            <input type="text" className={styles.input} name="companyName" value={companyName} onChange={this.handleInput}></input>
                                        </label>
                                        <label className={styles.label}>
                                            <span className={styles.labeltext}>Address City:</span>
                                            <input type="text" className={styles.input} name="addressCity" value={addressCity} onChange={this.handleInput}></input>
                                        </label>
                                        <button className={styles.addUserBtn} type="submit">Add User</button>
                                    </form>
                                </div>
                            )}
                        </>
                    )
                }</Mutation>
        )
    }

};

export default UserForm;

