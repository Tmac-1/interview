import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
  withRouter,
  Prompt
} from 'react-router-dom';

// import  { BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useRouteMatch,
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter,
//   Prompt } from './react-router-dom/index';

import UserPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import _404Page from './pages/_404Page';
import RouteComponentPage from './pages/RouteComponentPage';
import WelcomePage from './pages/WelcomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/product/:id" component={Product}/> */}
          <Route path="/product/:id" render={() => <Product />} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

// function Product({match}){
//   function Product(props){
//   const match = useRouteMatch()
//   const {params,url}=match;
// const history = useHistory();
// const location = useLocation();
// // const params = useParams();
// // const {match} = props;
// console.log("match", match); //sy-log
// console.log("history", history); //sy-log
// console.log("location", location); //sy-log
// // console.log("params", params); //sy-log
//   const {id}=params;
//   return(
//     <div>
//       <h1>Search-{id}</h1>
//     </div>
//   )
// }

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { confirm: true };
  }
  render() {
    console.log("Product", this.props); //sy-log
    return (
      <div>
        <h3>Product</h3>
        <Link to="/">go home</Link>
        <Prompt

          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={location => {
            return "Are you sure you want to leave-fun";
          }}
        />
      </div>
    );
  }
}


export default App;
