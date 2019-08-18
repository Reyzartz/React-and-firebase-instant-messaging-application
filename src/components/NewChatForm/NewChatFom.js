import React, { Component } from 'react';
import firebase from 'firebase'

class NewChat extends Component {
    state = { 
        username:null,
        message:null
     }
    render() { 
        const userTyping=(type,e)=>{
            switch(type){
                case'username':
                    this.setState({username:e.target.value})
                break;
                case'message':
                    this.setState({message:e.target.value})
                break;
                default:
                break;
            }
        }
        const submitNewChat =async (e)=>{
            e.preventDefault();
            
            const UserExists= await userExists();
            if(UserExists){
                const ChatExists=await chatExists();
                ChatExists ? goToChat():createChat();
                console.log(ChatExists);
            }
            
        }
        const createChat=()=>{
            this.props.newChatSubmitFn({
                sendTo:this.state.username,
                message:this.state.message
            })
        }
        const goToChat=()=>this.props.goToChatFn(buildDocKey(),this.state.message);
        const buildDocKey=()=>(
            [firebase.auth().currentUser.email,this.state.username].sort().join(':')
        )
        const chatExists = async ()=>{
            const docKey= buildDocKey();
            const chat =await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .get();
            return chat.exists;
        }
        const userExists = async ()=>{
            const userSnapShot = await firebase
            .firestore()
            .collection('users')
            .get();
            const exist =userSnapShot.docs
            .map(_doc=>(_doc.data().email))
            .includes(this.state.username);

            return exist
        }
        return ( <div className="form-page">
            
            <div className="form-form">
                <h1 className="form-header">Send A Message</h1>
                <form  onSubmit={(e)=>submitNewChat(e)}>
                
                <input 
                    autoComplete='email' 
                    autoFocus 
                    onChange={(e)=>userTyping('username',e)} 
                    required 
                    id="input-email"
                    placeholder="Enter Your Friend's Email ID"/>

                <input 
                    onChange={(e)=>userTyping('message',e)} 
                    required 
                    id="new-chat-message"
                    placeholder="Enter Your Message"/>
                <input 
                    type="submit" 
                    value="Sumbit"
                    className="submit-btn"
                />
            </form>
                </div>
            
        </div> );
    }
}
 
export default NewChat;