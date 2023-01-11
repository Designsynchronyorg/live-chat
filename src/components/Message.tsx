import { Component } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

export default class Message extends Component<any, any> {
  constructor(props: any) {
    super(props);

    // set state
    this.state = {
      showAllAvatar: true,
      showMyAvatar: true,
      showFriendAvatar: true,
    };

    // bind this
    this.handleScroll = this.handleScroll.bind(this);
  }

  // detect when user scrolls to message bottom for marking as read
  handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      alert("my bottom");
    }
  };

  render() {
    // const receiver = this.props.user;
    // currently logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    const message = this.props.message;

    type UserType = {
      id?: any;
      image?: any;
      name?: string;
    };

    let type = "";
    let user: UserType = {};

    // check if sender or receiver
    // i am the sender
    if (message.sender.id === loggedInUser.id) {
      user = loggedInUser;
      type = "sender";
      // i am the receiver
    } else {
      user = message.sender;
      type = "receiver";
    }

    // position message based on user type (sender or receiver)
    const position = type === "sender" ? "justify-end" : "justify-start";
    return (
      <div className={"flex " + position}>
        <div onScroll={this.handleScroll} className={"flex w-5/6 " + position}>
          <div className="mt-8 max-w-4/5 sm:max-w-4/6 md:max-w-3/5 rounded-lg ring-2 ring-gray-300 dark:ring-gray-600 shadow-md white-gray-bg white-gray-bg-hover">
            <NavLink to={`/profile/${user.id}`}>
              <Avatar
                labelContClass="ml-4"
                contClass={
                  position +
                  " py-2 px-4 light-gray-bg light-gray-bg-hover rounded-t-lg light-gray-border shadow-lg"
                }
                pic={user.image}
                name={user.name}
              />
            </NavLink>
            <p className="py-4 px-4 leading-loose">{message.message}</p>
          </div>
        </div>
      </div>
    );
  }
}
