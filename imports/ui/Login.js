import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            error:''
        }
    }

    onSubmit(e) {
       e.preventDefault();
       let email = this.refs.email.value.trim();
       let password = this.refs.password.value.trim();
       
       Meteor.loginWithPassword({email}, password, (err) => {
           if (err) {
               this.setState({
                   error: err.reason
               });
           } else {
               this.setState({
                   error: ''
               });
           }
       });
    }

    render() {
        return (
            <div class="boxed-view">
            <div class="boxed-view__box">
                <h1>Login to shorten links</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form class="boxed-view__form" onSubmit={this.onSubmit}>
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button class="button">Login</button>
                    </form>

                <Link to="/signup">Don't have an account?</Link>
            </div>

            </div>


        );
    }
}
