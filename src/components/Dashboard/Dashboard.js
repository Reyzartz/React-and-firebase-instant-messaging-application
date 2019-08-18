import React, { Component } from 'react';
import ChatList from '../ChatList/ChatList';
import ChatView from '../ChatView/ChatView';
import ChatTextBox from '../ChatTextBox/ChatTextBox';
import NewChatForm from '../NewChatForm/NewChatFom';
import './Dashboard.css'
const firebase =require('firebase');

class Dashboard extends Component {
    state={
        slectedChat:null,
        newChatFormVisible:false,
        email:null,
        chats:[]
    }
    componentDidMount=()=>{
        firebase
        .auth()
        .onAuthStateChanged(async _usr =>{
            if(!_usr)
            this.props.history.push('/login');
            else{
                await firebase
                .firestore()
                .collection('chats')
                .where('users','array-contains',_usr.email)
                .onSnapshot(async res=>{
                    const chats= res.docs.map(_doc=>_doc.data());
                    await this.setState({
                        email:_usr.email,
                        chats:chats
                    }
                    );
                    console.log(this.state.chats);
                    
                })
                
            }
        })
    }
    render() { 
        const goToChat=async (docKey,msg)=>{
            console.log(docKey);
            
            const userInChat =docKey.split(':');
            const chat=this.state.chats.find(_chat=>userInChat.every(_user=>_chat.users.includes(_user)))
            this.setState({newChatFormVisible:false})
            await slectedChat(this.state.chats.indexOf(chat));
            submitDocMsg(msg);
        }
        const newChatSubmit = async (chtaObj)=>{
            const docKey=buildDocKey(chtaObj.sendTo);
            await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
                receiverHasRead:false,
                users:[this.state.email,chtaObj.sendTo],
                messages:[{
                    message:chtaObj.message,
                    sender:this.state.email
                }]
            })
            this.setState({newChatFormVisible:false});
            slectedChat(this.state.chats.length - 1);
        }
        const slectedChat=async (index)=>{
           await this.setState({slectedChat:index});
           messageRead();
        };
        const newChatBtnClicked=()=>{
           this.setState({newChatFormVisible:true,slectedChat:null})
            
        };
        const signout=()=>firebase.auth().signOut();

        const buildDocKey=(friend)=>[friend,this.state.email].sort().join(':');

        const clickChatWeatherNotSender=(chatIndex)=>
            this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email
        const messageRead = () =>{
            const docKey=buildDocKey(this.state.chats[this.state.slectedChat].users.filter(_usr=>_usr!==this.state.email)[0]);
            if(clickChatWeatherNotSender(this.state.slectedChat)){
                firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({
                    receiverHasRead:true
                })
            }
            else{
                console.log("not the user");
                
            }
        }

        const submitDocMsg=(msg)=>{
            const docKey=buildDocKey(this.state.chats[this.state.slectedChat].users.filter(_usr=>_usr!==this.state.email)[0])
            
            firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages:firebase.firestore.FieldValue.arrayUnion(
                    {
                        sender:this.state.email,
                        message:msg,
                        timeStamp:Date.now()
                    }),
                    receiverHasRead:false
            })
            
        }        
        return ( <div className="dashboard">
            
            <div className="chat-list">
                <ChatList 
                newChatBtnFn={newChatBtnClicked}
                slectChatFn={slectedChat}
                chats={this.state.chats}
                userEmail={this.state.email}
                slectedChatIndex={this.state.slectedChat}
                signout={signout}
                />
                
            </div>
            
                <div className="chats">
                {
                    !this.state.newChatFormVisible?<ChatView
                    user={this.state.email}
                    chat={this.state.chats[this.state.slectedChat]}
                    />
                    :null
                }
                {
                    this.state.slectedChat!=null&&!this.state.newChatFormVisible?
                    <ChatTextBox
                    submitMsgFn={submitDocMsg}/>
                    :null
                }
                {
                    this.state.newChatFormVisible ?
                    <NewChatForm
                    goToChatFn={goToChat}
                    newChatSubmitFn={newChatSubmit}
                    />:null
                }
                </div>
                
            
        </div> );
    }
}
 
export default Dashboard;