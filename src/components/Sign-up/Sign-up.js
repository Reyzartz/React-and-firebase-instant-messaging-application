import React, { Component } from 'react';
import './Sign-up.css'
import {Link} from 'react-router-dom';
import firebase from 'firebase';

class Sign_up extends Component {
    state={
        email:null,
        password:null,
        confirmPassword:null,
        signupError:''
    }
    
    render() { 
        const isformvalid=()=>{
            return this.state.password===this.state.confirmPassword;
        }
        const submitSignUp=(e)=>{
            e.preventDefault();
            if(!isformvalid()){
                this.setState({signupError:'Passwords does not Match'});
                return
            }
            else{
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email,this.state.password)
                .then(authRes=>{
                    const userObj={
                        email:authRes.user.email
                    };
                    firebase
                    .firestore()
                    .collection('users')
                    .doc(this.state.email)
                    .set(userObj)
                    .then(
                        () =>{
                            this.props.history.push('/dashboard')
                        },dbError=>{
                            console.log(dbError);
                            this.setState({signupError:"Fail to add user"})
                        }
                    )
                },authError =>{
                    console.log(authError);
                    this.setState({signupError:"Fail to add user"})
                })
            }
                
            }
        const userTyping=(type,e)=>{
                switch(type){
                    case 'email':
                        this.setState({email:e.target.value});
                    break;
                    case 'password':
                        this.setState({password:e.target.value});
                    break;
                    case 'confirmPassword':
                        this.setState({confirmPassword:e.target.value});
                    break;
                    default:
                    break;
                }
            }
        
        return ( 
            <main className="Sign_up_page">
                <div className="Sign_up_form">
                    <h1>Sign up</h1>
                    <form onSubmit={(e)=> submitSignUp(e)}>
                        <label className="input-label">Enter Your Email</label>
                        <br/>
                        <input autoComplete='email' autoFocus onChange={(e)=>userTyping('email',e)} required id="input-email"/>
                        <br/>
                        <label className="input-label">Create a Password</label>
                        <br/>
                        <input type='password' autoFocus onChange={(e)=>userTyping('password',e)} required id="input-password"/>
                        <br/>
                        <label className="input-label">Confirm Your Password</label>
                        <br/>
                        <input type='password' autoFocus onChange={(e)=>userTyping('confirmPassword',e)} required id="input-confirm-password"/>
                        <br/>
                        <input type="submit" id="submit-button" />
                    </form>
                    {   
                        this.state.signupError ? <span>{this.state.signupError}</span> : null 
                    }
                        <span>Already have an Account</span>
                        <br/>
                        <Link to='/login'>Log in</Link>
                </div>    
            </main>
             );
        
    }
}
 
export default Sign_up;