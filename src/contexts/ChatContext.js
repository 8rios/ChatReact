import React from "react";
import PubNub from "pubnub";
import Global from "./Global";

const channelName = "demo-chat";

export const ChatContext = React.createContext();

export class ChatContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      publisher:''
    };
  }



  componentWillUnmount() {
    this.PubNub.unsubscribeAll();
  }

  connectPubNub = (user) =>{
    this.PubNub = new PubNub({
      publishKey: 'pub-c-80f17274-f550-4d0e-9c11-e37f4f4e2622',
      subscribeKey: 'sub-c-75777506-c969-11ea-b6ae-d6b39d8ad52f',
      uuid: user,
    });
    this.setState({
      publisher: user
    });
    Global.apodo = user;
    this.addListener();
    this.PubNub.subscribe({ channels: [channelName] });
    this.fetchMessages();
    window.addEventListener("beforeunload", this.PubNub.unsubscribeAll);

    this.countdown = setInterval(this.timer, 5000);
  }

  timer = () => {
    this.fetchMessages();
  }

  

  addListener = () => {

    this.PubNub.addListener({
      status: event => {
        if (event.category === "PNConnectedCategory") {
          // console.log("Connected!", event);
        }
      },
      message: (message) => {
        const publishTimetoken = message.timetoken;
        const publisher = message.publisher;

        this.setState(prevState => ({
          messages: [...prevState.messages, { ...message, publisher, publishTimetoken }]
        }));
      }
    });
  };

  fetchMessages = message => {
    this.PubNub.fetchMessages(
      {
          channels: [channelName],
          count: 100
      },
      (status, response) => {
        var msgs = response.channels;
        if(!msgs['demo-chat']) return

          this.setState(prevState => ({
            messages: msgs['demo-chat']
          }));
      }
    );
  };

  sendMessage = message => {
    this.PubNub.publish(
      {
        channel: channelName,
        message: { ...message, timestamp: new Date().toLocaleString(), publisher:this.state.publisher }
      },
      status => {
        if (status.error) {
          console.log("Error while publishing a message!", status);
        }
      }
    );
  };

  deleteMessage = timetoken => {
    var ini = Number(timetoken) + 1000;
    var end = Number(timetoken) - 1000;
    console.log("tkn: ", ini);

    this.PubNub.deleteMessages(
      {
        channel: channelName,
        start: ini,
        end: end
      },
      status => {
        if (status.error) {
          console.log("Error while deleted a message!", status);
          return;
        }else{
          console.log("Message deleted!", status);
          this.fetchMessages();
        }
      }
    );
  };

  render() {
    return (
      <ChatContext.Provider
        value={{ 
          messages: this.state.messages, 
          connectPubNub: this.connectPubNub, 
          sendMessage: this.sendMessage, 
          deleteMessage: this.deleteMessage
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}
