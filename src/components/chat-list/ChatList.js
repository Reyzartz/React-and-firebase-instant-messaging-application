import React, { Component } from 'react';

class ChatList extends Component {
    
    render() { 
        const newChat=()=>{
            console.log("New chat");
            
        }
        const selectChat=(index)=>{
            console.log("chat selected");
            
        }
        return ( 
        <main>
            <button
            className="newchatBtn"
            onClick={newChat}>
            </button>
            <ul>
                {
                    this.props.chats.map((_chat,_index)=>{
                        return(
                            <React.Fragment>
                            <li
                            onClick={()=>selectChat(_index)}
                            className="chatItem"
                            onSelect={console.log("selcted"+_index)}>
                                <b className="listItemAvatar">
                                    {
                                        _chat.users.filter(_user=>_user!==this.props.userEmail)[0].split('')[0]
                                    }:  
                                </b>
                                <span className="listItemText">
                                    {
                                        _chat.users.filter(_user=>_user!==this.props.userEmail) 
                                    }
                                    <small>
                                    <br/>
                                    {
                                        _chat.messages[_chat.messages.length - 1].message.substring(0,30)
                                    }
                                    </small>
                                        
                                </span>
                            </li>
                            <hr/>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </main>
        );
    }
}
 
export default ChatList;