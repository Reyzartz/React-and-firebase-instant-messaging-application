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
        <main className="form-page">
            <div className="form-form">
                <h1 className="form-header">Sign in</h1>
                <form onSubmit={(e)=> submitSignUp(e)}>
                    
                    <input autoComplete='email' 
                        autoFocus onChange={(e)=>userTyping('email',e)}
                        placeholder="Enter Your Email id" 
                        required 
                        id="input-email"/>

                    <input type='password' 
                        autoFocus onChange={(e)=>userTyping('password',e)} 
                        required id="input-password"
                        placeholder="Enter Your Password"/>
                    
                    <input 
                        type="submit" 
                        className="submit-btn"/>
                    
                    {   
                        this.state.loginError ? <div>{this.state.loginError}</div> : null 
                    }
                    <div className="form-redirect-text">Don't have an Account? <Link to='/sign-up'>Sign up</Link> </div>
                    
                </form>
            </div>
        </main>
         );
    }
}
 
export default Login;