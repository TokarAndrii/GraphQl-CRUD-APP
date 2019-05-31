import { Query } from 'react-apollo';
import React from 'react';
import { gql } from "apollo-boost";
import styles from './Userlist.module.css';

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


const Userlist = () => (
    <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.td}>Id</th>
                            <th className={styles.td}>First Name</th>
                            <th className={styles.td}>Last Name</th>
                            <th className={styles.td}>Email</th>
                            <th className={styles.td}>Phone</th>
                            <th className={styles.td}>Company</th>
                            <th className={styles.td}>Address City</th>
                            <th className={styles.td}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(({ id, firstName, secondName, email, phone, company = {}, address = {} }) => {
                            return (
                                <tr key={id}>
                                    <td className={styles.td}>{id}</td>
                                    <td className={styles.td}>{firstName}</td>
                                    <td className={styles.td}>{secondName}</td>
                                    <td className={styles.td}>{email}</td>
                                    <td className={styles.td}>{phone}</td>
                                    <td className={styles.td}>{company ? company.name : <b>Not Set</b>}</td>
                                    <td className={styles.td}>{address ? address.city : <b>Not Set</b>}</td>
                                    <td className={styles.td}><button className={styles.deleteBtn}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
        }}
    </Query>

);


export default Userlist;