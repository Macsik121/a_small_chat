class Chat extends React.Component {
    constructor() {
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.writeMessage = this.writeMessage.bind(this);
        window.onkeyup = function(e) {
            const input = document.getElementById('send-message');
            if (e.keyCode == 13) {
                input.focus();
            } else if (e.keyCode == 27) {
                input.blur();
            }
        };
        this.state = {
            chatMessages: []
        };
    }
    componentDidMount() {
        this.loadMessages();
    }
    async loadMessages() {
        const query = `
            query {
                messages {
                    text
                    myMessage
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({query})
        });

        const result = await res.json();
        this.setState({chatMessages: result.data.messages});
    }
    async writeMessage(messageText) {
        const mutation = `
            mutation {
                addMessage(message: {
                    text: "${messageText}"
                    myMessage: ${true}
                }) {
                    text
                    myMessage
                }
            }
        `;

        const sendMessage = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query: mutation})
        });

        this.loadMessages();
    }
    sendMessage(e) {
        if (e.charCode == 13) {
            console.log(e.target.value);
            if (e.target.value.length > 0) {
                this.writeMessage(e.target.value);
                e.target.value = '';
            } else if (e.target.value.length <= 0) {
                return;
            }
        }
    }
    render() {
        const messages = this.state.chatMessages.map(message => {
            if (message.myMessage) {
                return <div className="my-msg msg"><span className="wrap">{message.text}</span></div>
            } else if (message.myMessage == false) {
                return <div className="someone-elses-msg msg"><span className="wrap">{message.text}</span></div>
            }
            return <div>There was an error</div>
        })
        return (
            <div className="chat">
                <div className="input-field col s6 chatting">
                    <input name="send-message" onKeyPress={this.sendMessage} id="send-message" type="text" className="send-message" />
                    <label htmlFor="send-message">Send message</label>
                </div>
                <div className="chatBody">
                    <div className="container">
                        {messages}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Chat />,
    document.getElementById('content')
);