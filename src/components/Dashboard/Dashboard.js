import React, { Component } from 'react';
import ChatList from '../chat-list/ChatList';
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
                
                
                
                // .doc('dilkashrahman18@gmail.com:ryandegredo@gmail.com')
                // .get()
                // .then(function(doc) {
                //     if (doc.exists) {
                //         console.log("Document data:", doc.data());
                //     } else {
                //         // doc.data() will be undefined in this case
                //         console.log("No such document!");
                //     }
                // }).catch(function(error) {
                //     console.log("Error getting document:", error);
                // });

                
            }
        })
    }
    render() { 
        const slectedChat=()=>{
            console.log("A chat is selected");            
        };
        const newChatBtnClicked=()=>{
           this.setState({newChatFormVisible:true,slectedChat:null})
            
        };
        return ( <div>
            in DAshboard
            <ChatList 
                newChatBtnFn={newChatBtnClicked}
                slectedChatFn={slectedChat}
                chats={this.state.chats}
                userEmai={this.state.email}
                slectedChatIndex={this.state.slectedChat}/>
        </div> );
    }
}
 
export default Dashboard;