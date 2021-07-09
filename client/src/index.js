import ReactDOM from 'react-dom';
import App from './App';
import ApolloProvider from './ApolloProvider';


//watch 2:16:00 to see how ReactDOM.render
ReactDOM.render( ApolloProvider, document.getElementById('root')
);

// Default
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

