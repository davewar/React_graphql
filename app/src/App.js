import Booklist from "./components/Booklist";

import { ApolloClient,InMemoryCache, ApolloProvider,HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import AddBook from "./components/AddBook";
import 'bootstrap/dist/css/bootstrap.min.css';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
]);

const client = new ApolloClient({
    link: link,
    // uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
        <div className="container ">
        <h1 className="text-center mt-5">Book List</h1>
        <Booklist />
         </div>
        <AddBook />
       
    </ApolloProvider>
  );
}

export default App;
