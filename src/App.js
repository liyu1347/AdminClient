import React, {Component} from 'react'
import { message} from 'antd'
import { HashRouter, Switch, Route} from "react-router-dom"

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
                    <Route path="/" component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}