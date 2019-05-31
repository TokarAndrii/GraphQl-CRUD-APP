const app = require('express')();
const cors = require('cors');
app.use(cors());
const graphqlHTTP = require('express-graphql');
const schema = require('./shema');
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

const PORT = process.env.port || 3003;
app.listen(PORT, () => console.log(`app started at port - ${PORT}`));