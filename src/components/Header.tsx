import { Component } from "react";
import SvgIcon from "des-svg-icons";
import Avatar from "./Avatar";
import { CallParentMethod } from "des-utilities";
import { BindThis } from "des-utilities";
import { NavLink } from "react-router-dom";

export default class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);

    // bind this
    BindThis(this, ["toggleFullScreen", "toggleListDisplay", "clearList"]);
  }

  // toggle fullscreen
  toggleFullScreen = () => {
    // call parent
    CallParentMethod(this, "toggleFullScreen");
  };

  // toggle fullscreen
  toggleListDisplay = () => {
    // call parent
    CallParentMethod(this, "toggleListDisplay");
  };

  // load lists
  clearList = () => {
    // call parent function
    CallParentMethod(this, "clearList");
  };

  render() {
    const user = this.props.user;
    return (
      <>
        <div className="px-6 mx-auto h-auto py-2.5 border white-gray-bg border-gray-200 shadow-md dark:border-gray-700">
          <div className="flex flex-col 2xs:flex-row items-center space-x-3 space-y-4 2xs:space-y-0 justify-center xs:justify-between flex-wrap">
            <div className="flex sm:flex-row 2xs:space-x-3 xs:space-x-6 items-center grow">
              <div
                onClick={this.clearList}
                className="w-5 h-5 light-text cursor-pointer hidden 2xs:inline-flex"
              >
                <SvgIcon type="menu" />
              </div>
              <NavLink to={`/profile/${user.id}`}>
                <Avatar
                  pic={user.image}
                  labelContClass="ml-2 light-gray-text w-[50px] 3xs:w-[80px] xs:w-[130px] sm:w-[180px]"
                  nameClass="truncate"
                  descriptionClass="truncate"
                  description={user.service}
                  name={user.name}
                />
              </NavLink>
            </div>
            <div className="flex items-center space-x-4 flex-wrap 2xs:space-x-0 2xs-flex-nowrap">
              <div
                onClick={this.clearList}
                className="w-5 h-5 light-text cursor-pointer 2xs:hidden"
              >
                <SvgIcon type="menu" />
              </div>
              <div
                className="w-5 cursor-pointer light-text"
                onClick={this.toggleFullScreen}
              >
                {this.props.fullScreen ? (
                  <SvgIcon type="shrink" />
                ) : (
                  <SvgIcon type="expand" />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
