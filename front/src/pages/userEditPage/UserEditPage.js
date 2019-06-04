import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import UserEditForm from '../../components/userEdit/UserEditForm';
import routes from '../../configs/routes';
import styled from 'styled-components';

const USER_QUERY = gql`
query UserQuery($id: String!){
    user(id: $id) {
        id
        firstName,
        secondName,
        email,
        website,
        phone,
        photo,
        company{
            name
        },
        address{
            city
        }
    }
}
`;


class UserEditPage extends Component {
    render() {
        const { className } = this.props;
        const id = `${this.props.match.params.id}`;
        return (
            <Query query={USER_QUERY} variables={{ id }}>
                {({ data }) => {
                    return (
                        <div className={className}>
                            <div className="wrapper">
                                <Link to={routes.INDEX}>Home</Link>
                                <UserEditForm {...data} {...this.props}></UserEditForm>
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}




const StyledUserEditPage = styled(UserEditPage)`
.wrapper{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

a {
    text-decoration: none;
    color: black;
    cursor: pointer;
    padding: 8px 32px;
    outline: 1px solid black;
    margin-top: 24px;
}

a:hover{
    outline: 1px solid blue;
}
`


export default StyledUserEditPage;