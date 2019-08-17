import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

class Login extends Component {
    state={
        email:null,
        password:null,
        loginError:''
    }
    render() { 
        const submitSignUp=(e)=>{
            e.preventDefault();
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(() => {
                this.props.history.push('/dashboard')
            },logErr=>{
                this.setState({loginError:"Error"});
            })
            }
        const userTyping=(type,e)=>{
            switch(type){
                case 'email':
                    this.setState({email:e.target.value});
                break;
                case 'password':
                    this.setState({password:e.target.value});
                break;
                default:
                break;
            }
        }
        return ( 
        <main className="login_page">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={(e)=> submitSignUp(e)}>
                    <label className="input-label">Enter Your Email</label>
                    <br/>
                    <input autoComplete='email' autoFocus onChange={(e)=>userTyping('email',e)} required id="input-email"/>
                    <br/>
                    <label className="input-label">Create a Password</label>
                    <br/>
                    <input type='password' autoFocus onChange={(e)=>userTyping('password',e)} required id="input-password"/>
                    <br/>
                    <input type="submit" id="submit-button" />
                    <br/>
                    {   
                        this.state.loginError ? <div>{this.state.loginError}</div> : null 
                    }
                    <div>Don't have an Account</div>
                    <br/>
                        <Link to='/sign-up'>Sign up</Link>
                </form>
            </div>
        </main>
         );
    }
}
 
export default Login;