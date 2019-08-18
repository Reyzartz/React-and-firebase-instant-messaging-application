import React, { Component } from 'react';
import './ChatView.css'

class ChatView extends Component {
    state = {  }
    componentDidUpdate=()=>{
        const container=document.getElementById("chat-view");
        if(container)
            container.scrollTo(0,container.scrollHeight)
    }
    render() { 
        const {chat,user}=this.props;
        if(chat===undefined){
            return(<main id="chat-view">{null}</main>)
        }
        else{
            return(
            <section className="chat-view" id='chat-view'>
                <header className="chat-view-header">You Conversation with '{chat.users.filter(usr=>usr!==user)}'</header>
                <main className="chat-messages">
                    {
                        chat.messages.map((_msg,_index)=>
                                <div 
                                    className="chat-message"
                                    key={_index} 
                                    style={_msg.sender===user?{alignSelf:"flex-start"}:{alignSelf:"flex-end"}}>
                                    {_msg.message}
                                </div>
                        )
                    }
                </main>
            </section>
            )
        }
    }
}
 
export default ChatView;