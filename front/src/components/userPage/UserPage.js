import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../configs/routes'

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


class UserPage extends Component {
    render() {
        const { className } = this.props;
        const id = `${this.props.match.params.id}`;
        return (
            <Query query={USER_QUERY} variables={{ id }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className={className}>
                                <div className="wrapper">
                                    <Link to={routes.INDEX}>Home</Link>
                                    <h1>{data.user.firstName} {data.user.secondName}</h1>
                                    {data.user.photo && (<img width="500" src={data.user.photo} alt="user_photo"></img>)}
                                    {!data.user.photo && (<img width="500" src="https://via.placeholder.com/300" alt="user_photo"></img>)}
                                    <p className="rowText"><b>ID: </b><span>{data.user.id}</span></p>
                                    <p className="rowText"><b>Email: </b><span>{data.user.email}</span></p>
                                    <p className="rowText"><b>Phone: </b><span>{data.user.phone}</span></p>
                                <p className="rowText"><b>Company: </b><span>{data.user.company.name}</span></p>
                                <p className="rowText"><b>City: </b><span>{data.user.address.city}</span></p>
                                    <p className="rowText"><b>Website: </b><span>{data.user.website}</span></p>
                                    </div>
                                </div>                                    
            
                                                                                            
            )                                                                
            
                    
        }          
   

    }
            </Query >
        )
    }
};

const StyledUserPage = styled(UserPage)`
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

.rowText{
    padding: 6px;
    width: 50%;
    display:flex;
    justify-content: space-between;
    align-items: center;
}


span{
    flex: 1 1 300px;
}
`


export default StyledUserPage;