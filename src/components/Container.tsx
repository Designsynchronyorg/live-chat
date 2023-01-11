import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CallParentMethod } from "des-utilities";
import { BindThis } from "des-utilities";

interface PropType {}
interface StateType {
  refreshList: any;
}

export default class Container extends Component<any, StateType> {
  constructor(props: string) {
    super(props);

    // set state
    this.state = {
      refreshList: false,
    };

    // bind this
    BindThis(this, [
      "toggleFullScreen",
      "toggleListDisplay",
      "clearList",
      "refreshListTrigger",
      "listBoxRefreshed",
      "refreshList",
    ]);
  }

  // toggle fullscreen
  toggleFullScreen = () => {
    // call parent
    CallParentMethod(this, "toggleFullScreen");
  };

  // toggle list display
  toggleListDisplay = () => {
    // call parent
    CallParentMethod(this, "toggleListDisplay");
  };

  // clear list
  clearList = () => {
    // call parent function
    CallParentMethod(this, "clearList");
  };

  // clear list
  refreshListTrigger = () => {
    // set state that triggers refresh list
    this.setState({
      refreshList: true,
    });
  };

  listBoxRefreshed() {
    // set state that triggers refresh list
    this.setState({
      refreshList: false,
    });
  }

  render() {
    return (
      <div className="flex flex-col h-screen w-full">
        <div>
          <Header
            clearList={this.clearList}
            toggleListDisplay={this.toggleListDisplay}
            fullScreen={this.props.fullScreen}
            toggleFullScreen={this.toggleFullScreen}
            user={this.props.user}
          />
        </div>
        {/* <div className="overflow-y-auto grow darker-gray-bg">
          <listBoxContent
            listBoxRefreshed={this.listBoxRefreshed}
            refreshList={this.state.refreshList}
            user={this.props.user}
          />
        </div> */}
        <div>
          <Footer
            refreshList={this.refreshListTrigger}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}
