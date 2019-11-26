import React from 'react'
// import Box from "@material-ui/core/Box"
import Message from '../components/Message'

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// let messagesContainer = []

export default class MessagesContainer extends React.Component {

    constructor(props) {
        super(props)
        this.scrollRefContainer = React.createRef()
        // this.state = {
        //     messages: this.props.messages
        // }
    }

    getMessage = message => {
        return sleep(1000).then(v => message)
    }

    messageLoop = async _ => {
        for (let i = 0; i < this.props.messages.length; i++) {
            const message = this.props.messages[i]
            const renderMessage = await this.getMessage(message)
            const htmlMessage = document.createElement("h4")
                  htmlMessage.className = 'message'
                  htmlMessage.innerText = renderMessage
            document.querySelector('.messages-container').append(htmlMessage)
            this.scrollRefContainer.current.scrollTop = 99999999999999999999
        }
    }

    // componentDidUpdate() {
    //     this.scrollRefContainer.current.scrollTop = 99999999999999999999
    // }

    render() {
        this.messageLoop()
        return (
          <div className="messages-container" ref={this.scrollRefContainer}>
          </div>
        )
    }
}