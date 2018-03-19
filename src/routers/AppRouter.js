import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory"; //this is gotten from the history dependecy we installed
import ExpanseDashboardPage from "../components/ExpanseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/loginPage"; //this is a name export that is why we add the { LoginPage } like that 
import PrivateRoute from "./PrivateRoute";






//Note all the tag used below are imported above from react-router-dom
//where linking to external page we shld use our normal <a> tag but when linking
//to within our pagewe shld use the <link to = "where we are linking to with the page" /> tag
//below instead of us using the <a href = "/">Go home</a>
//when ever the page we searched for is not found now we use 
//the link tag because it will not allow our whole page to refresh
//when we click the button on like how our not <a> tag does
//when we type in a path on our brower that is not among the route path on 
//our page the switch will help return any rout on our page that do not have 
//a path(which in this case it return the notFoundPage component)
//Note all the imported tag start with a capital letter eg. Link
//the is ativeClassName is a feature of NavLink that helps us to style NavLink when ever it is active


export const history = createHistory();
//the Header tag inside our routes show in every page because it is not under the switch tag
const AppRouter = () => (
    <Router history = {history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpanseDashboardPage} exact={true} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;