import React, { Component } from 'react';
import './ChatTextBox.css'

class ChatTextView extends Component {
    state = { chatText:'' }
    render() { 
        const userTyping=(e)=>{
            e.keyCode===13? submitText():this.setState({chatText:e.target.value})
        }
        const submitText=()=>{
            const validMsg=this.state.chatText.trim()
            if(validMsg)
            this.props.submitMsgFn(validMsg)
            document.getElementById("chat-text-input").value='';
            
        }
        const userClickedInput=()=>{}
        return ( 
        <div className="chat-text-box">
        <input 
        placeholder='Type your text...'
        onFocus={userClickedInput}
        onKeyUp={(e)=>userTyping(e)}
        id="chat-text-input"/>
        <button 
            className="chat-submit-btn"
            onClick={submitText}
        >+</button>
        </div>  
     );
    }
}
 
export default ChatTextView;
