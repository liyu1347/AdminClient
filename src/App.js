import React, {Component} from 'react'
import {Button, message} from 'antd'
import {BrowserRouter, HashRouter, Switch, Route} from "react-router-dom"

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
/*应用根组件 */

export default class App extends Component {

    handleClick =() =>{
        message.success('lalala');
    }
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}