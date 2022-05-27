
import { Component } from 'react';
import Message from './Message';
import {DuplicateItems} from 'des-utilities';
import axios from 'axios';
import { BindThis } from 'des-utilities';
import HttpRequest from 'des-http-processor';
import { ProcessHttpMessage } from 'des-http-processor';

export default class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: {},
      refreshList: false,
    }

    // get chat list
    let formUrl = this.props.url + 'get-chats?user_id=' + this.props.user.id;
    let self = this;
    const token = sessionStorage.getItem('token');
    axios.get(formUrl, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(function (response) {
        // add that to the state
        self.setState({
          chats: response.data.data.messages
        })

        // mark unread as read
        self.markAsRead()
      })
      .catch(function (error) {
        // self.processResponse(setSubmitting, error, "error");
      });

    // bind this
    BindThis(this, ['refreshList', 'clearChat', 'scroll', 'markAsRead']);
  }

  // load chats
  clearChat() {
    // call parent function
    this.props.clearChat();
  }

  // set interval
  componentDidMount() {
    this.refreshMessagesList = setInterval(
      () => this.refreshList(),
      5000
    );
  }

  // mark messages as read
  markAsRead() {
    const chats = this.state.chats;
    // identify unread messages
    let array = chats.map((chat) => {
      if (
        // if chat has not been read
        chat.is_read === '0'
        &&
        // and current user is the receiver
        (chat.receiver.id === JSON.parse(sessionStorage.getItem('user')).id)
      ) {
        return chat.id;
      }
    })

    // if current user has unread messages
    if (array.length > 0) {
      let unreadMessages = { messages: array }

      // mark messages as read in the database
      let response = HttpRequest(this.props.url + 'mark-messages-as-read', 'post', unreadMessages, ProcessHttpMessage);
    }
  }

  // clear interval
  componentWillUnmount() {
    clearInterval(this.refreshMessagesList);
  }

  // refresh chat list
  refreshList = () => {
    // get chat list
    let formUrl = this.props.url + 'get-chats?user_id=' + this.props.user.id;
    let self = this;
    const token = sessionStorage.getItem('token');
    axios.get(formUrl, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(function (response) {
        // add that to the state
        self.setState({
          chats: response.data.data.messages
        })

        // mark unread messages as read
        this.markAsRead()
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  // bring unread messages into view or scroll to bottom
  scroll = () => {
    let chatBox = document.getElementById('chatBox');
    console.log(chatBox)
    alert('inside scroll')

    // scroll to unread messages point or bottom of chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  render() {
    return (
      <>
        <div id="chatBox" className="flex flex-col-reverse w-full h-full px-4 md:px-8 py-6 overflow-y-auto">
          {
            this.props.refreshList === true &&
            <>
              {/* // refresh chat box */}
              {this.refreshList()}

              {/* // trigger refreshed hook */}
              {this.props.chatBoxRefreshed()}
            </>
          }
          {
            this.state.chats
              ? <>
                <DuplicateItems items={this.state.chats} structure={Message} structureProps={{ message: 1 }} />


                {/* scroll to last message */}
                {/* {this.scroll()} */}
              </>
              : <p className="text-center text-gray-500">There are no messages yet</p>
          }
        </div>
      </>
    );
  }
}
