import React, { Component } from 'react';
import './ChatList.css'

class ChatList extends Component {
    
    render() { 
        const newChat=()=>{
            this.props.newChatBtnFn()
            
        }
        const selectChat=(index)=>{
            this.props.slectChatFn(index);
            
        }
        const userIsSender=(chat)=>(
            chat.messages[chat.messages.length - 1 ].sender===this.props.userEmail
        )
        return ( 
        <main className="chat-list">
            <button
            className="chat-btn"
            onClick={newChat}>
                New Chat
            </button>
            <div className="chat-items">
                {
                    this.props.chats.map((_chat,_index)=>{
                        return(
                            <React.Fragment>
                            <li
                            onClick={()=>selectChat(_index)}
                            className="chat-item">
                                <div className="chat-item-avatar">
                                    {
                                        _chat.users.filter(_user=>_user!==this.props.userEmail)[0][0]
                                    }  
                                </div>
                                <span className="chat-item-text">
                                    {
                                        _chat.users.filter(user=>user!==this.props.userEmail) 
                                    }
                                    <small>
                                    {
                                        _chat.messages[_chat.messages.length - 1].message.substring(0,30)
                                    }
                                    </small>
                                        
                                </span>
                                
                                    {
                                        !_chat.receiverHasRead && !userIsSender(_chat) ?
                                            <i className="chat-item-notification"></i>
                                            :null 
                                    }
                            </li>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <button 
                    className="chat-btn" 
                    onClick={this.props.signout}>
                        Sign Out
                    </button>
        </main>
        );
    }
}
 
export default ChatList;