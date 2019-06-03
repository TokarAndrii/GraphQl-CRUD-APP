const axios = require('axios');
const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLSchema,
    GraphQLNonNull } = require('graphql');

const GeoType = new GraphQLObjectType({
    name: "geo_type",
    fields: () => ({
        lat: { type: GraphQLString },
        lng: { type: GraphQLString }
    })
});

const AddressType = new GraphQLObjectType({
    name: "address_type",
    fields: () => ({
        street: { type: GraphQLString },
        suite: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        geo: { type: GeoType }
    })
});

const CompanyType = new GraphQLObjectType({
    name: "company_type",
    fields: () => ({
        name: { type: GraphQLString },
        catchPhrase: { type: GraphQLString },
        bs: { type: GraphQLString }
    })
});


const UsersType = new GraphQLObjectType({
    name: "user_type",
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        secondName: { type: GraphQLString },
        email: { type: GraphQLString },
        address: {
            type: AddressType
        },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        company: { type: CompanyType }
    })
});

const mutations = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addUser: {
            type: UsersType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                secondName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: new GraphQLNonNull(GraphQLString) },
                companyName: { type: GraphQLString },
                addressCity: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.post('http://localhost:3000/users',
                    {
                        firstName: args.firstName,
                        secondName: args.secondName,
                        email: args.email,
                        phone: args.phone,
                        website: args.website,
                        company: {
                            name: args.companyName
                        },
                        address: {
                            city: args.addressCity,
                        }
                    })
                    .then(resp => {
                        return resp.data
                    })
            }
        },
        removeUser: {
            type: UsersType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id }) {
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(resp => {
                        console.log('resp at DELETE - ', resp)
                        return resp.data
                    })
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UsersType),
            resolve(parent) {
                return axios.get(`http://localhost:3000/users`)
                    .then(resp => {
                        return resp.data;
                    })
                    .catch(err => {
                        console.log('[err] : ', err);
                        return err;
                    })
            }
        },
        user: {
            type: UsersType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => {
                        return resp.data;
                    })
                    .catch(err => {
                        console.log('[err] : ', err);
                        return err.response;
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: mutations })