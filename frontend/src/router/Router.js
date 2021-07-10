import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { authServices } from "../services/"
import Landing from "../views/Landing"
import Login from "../views/Login"
import Psicologos from "../views/Psicologos"
import Register from "../views/Register"
import LandingPsicologo from "../views/LandingPsicologo/LandingPsicologo"
import Contact from "../views/Contact"
import ForgotPassword from "../views/ForgotPassword"
import ValidateCode from "../views/ForgotPassword/ValidateCode/ValidateCode"
import Parent from "../views/Profiles/Parent/Parent"
import Psychologist from "../views/Profiles/Psychologist/Psychologist"
import Admin from "../views/Profiles/Admin/Admin"
import PublicPsychologist from "../views/PublicPsychologist/PublicPsychologist"
import TermsAndConditions from "../views/TermsAndConditions/TermsAndConditions"
import DashboardAdmin from "../views/DashboardAdmin/DashboardAdmin"
import LoginAdmin from "../views/LoginAdmin/LoginAdmin"

const CustomRouter = ({ history }) => {

  const verifyRoute = Component => {
    return authServices.isLoggedIn() ? <Component /> : <Redirect to="/login" />
  }

  const verifyAuth = Component => {
    if(authServices.isLoggedIn()){
      return <Redirect to="/" />
    }
    else{
      return <Component />
    }
  }

  const verifyAdmin = Component => {
    console.log(authServices.getPermissionFromLocalStorage())
    if(!authServices.isLoggedIn() || authServices.getPermissionFromLocalStorage() != "admin"){
      return <Redirect to="/" />
    }
    else{
      return <Component />
    }
  }

  const verifyLoginAdmin = Component => {
    if(!authServices.isLoggedIn()){
      return <Component />
    }
    else if(authServices.getPermissionFromLocalStorage() != "admin"){
      return <Redirect to="/" />
    }
    else{
      return <Redirect to="/admin/dashboard" />
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ () => <Landing/> } />
        <Route exact path="/login" render={ () => verifyAuth(Login) } />
        <Route exact path="/psicologos" render={ () => <Psicologos/> } />
        <Route exact path="/register" render={ () => verifyAuth(Register) } />
        <Route exact path="/landing/psychologist" render={ () => <LandingPsicologo/> } />
        <Route exact path="/contact" render={ () => <Contact/> } />
        <Route exact path="/forgot-password" render={ () => <ForgotPassword/> } />
        <Route exact path="/validate-code" render={ () => <ValidateCode/> } />
        <Route exact path="/parent/:id/profile" render={ () => verifyRoute(Parent) } />
        <Route exact path="/psychologist/:id/profile/private" render={ () => verifyRoute(Psychologist) } />
        <Route exact path="/admin/profile" render={ () => verifyAdmin(Admin) } />
        <Route exact path="/psychologist/:id/profile/public" render={ () => <PublicPsychologist/> } />
        <Route exact path="/tyc" render={ () => <TermsAndConditions/> } />
        <Route exact path="/admin/dashboard" render={ () =>  verifyAdmin(DashboardAdmin) } />
        <Route exact path="/admin/login" render={ () => verifyLoginAdmin(LoginAdmin) } />
      </Switch>
    </Router>
  )
}
export default CustomRouter