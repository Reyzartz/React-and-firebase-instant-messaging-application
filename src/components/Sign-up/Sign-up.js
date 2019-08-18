import React, { Component } from 'react';
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
            <main className="form-page">
                <div className="form-form">
                    <h1 className="form-header">Sign up</h1>
                    <form onSubmit={(e)=> submitSignUp(e)}>
                        
                        <input 
                            autoComplete='email' 
                            autoFocus onChange={(e)=>userTyping('email',e)} 
                            required 
                            id="input-email"
                            placeholder="Enter Your Email id"/>
   
                        <input 
                            type='password' 
                            autoFocus 
                            onChange={(e)=>userTyping('password',e)} 
                            required 
                            id="input-password"
                            placeholder="Create a new Password"/>

                        <input 
                            type='password' 
                            autoFocus 
                            onChange={(e)=>userTyping('confirmPassword',e)} 
                            required 
                            id="input-confirm-password"
                            placeholder="Re-enter Your new Password"/>
                        
                        <input 
                            type="submit" 
                            id="submit-button" 
                            className="submit-btn"/>

                            <div className="form-redirect-text">Already have an Account? <Link to='/login'>Log in</Link></div>
                    </form>
                    {   
                        this.state.signupError ? <span>{this.state.signupError}</span> : null 
                    }
                        
                        
                        
                </div>    
            </main>
             );
        
    }
}
 
export default Sign_up;