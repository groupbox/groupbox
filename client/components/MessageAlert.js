import React from 'react'

export default class MessageAlert extends React.Component{

    closeMessage(){
        document.getElementById('messagealert').style.display = 'none'
    }

    render(){
        return(
            <span id="messagealert" onClick={this.closeMessage}>
                tffffff {this.props.message}
            </span>
        )
    }
}