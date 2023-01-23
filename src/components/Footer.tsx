import { Component } from "react";
import FormTextArea from "./FormTextArea";
import * as Yup from "yup";
import MyForm from "./Form";
import { BindThis } from "des-utilities";
import { CallParentMethod } from "des-utilities";
// import { MyConfig } from "./MyConfig";
// import 'emoji-mart/css/emoji-mart.css'

let MyConfig: { apiUrl: string } = {
  apiUrl: "",
};

export default class Footer extends Component<any, any> {
  constructor(props: any) {
    super(props);

    BindThis(this, ["refreshList"]);
  }

  // refresh list after message
  refreshList() {
    CallParentMethod(this, "refreshList");
  }

  render() {
    return (
      <>
        <MyForm
          formClass="p-0"
          shouldDisplayPushNotification={false}
          shouldDisplayInlineResponse={false}
          finishSubmitting={this.refreshList}
          formUrl={MyConfig.apiUrl + "send-message"}
          validationSchema={{
            message: Yup.string().required("Please enter your message"),
          }}
          initialValues={{
            message: "",
            receiver_id: this.props.user.id,
          }}
        >
          <label htmlFor="list" className="sr-only">
            Your message
          </label>
          <div className="flex items-center py-1 px-2 bg-gray-50 rounded-lg dark:bg-gray-700 sm:space-x-2">
            <div className="flex flex-col sm:flex-row">
              <button
                type="button"
                className="inline-flex justify-center p-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <FormTextArea
              hasMessage={false}
              rows={1}
              groupClass="grow"
              inputClasses="rounded-lg py-2 px-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              id="message"
              placeholder="Type your message"
              name="message"
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-base-400 rounded-full cursor-pointer hover:text-base-500 hover:bg-white dark:text-gray-400 dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </MyForm>
      </>
    );
  }
}
