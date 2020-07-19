import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { ChatContext } from "../../contexts/ChatContext";
import Mensajes from "../../components/Mensajes";
import { ChatInputForm } from "../../components/ChatInputForm";

const Home = () => {
  const { messages, sendMessage, deleteMessage, connectPubNub } = React.useContext(ChatContext);
  const { userData: user } = useContext(AppContext);

  const setUser = async ({ apiKey, user, token }) => {
    connectPubNub(user);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);

  if (!user) {
    return <Redirect to='/auth' />;
  }

  return (
    <div className="App">
      <Mensajes messages={messages} deleteMessage={deleteMessage}/>
      <ChatInputForm sendMessage={sendMessage} />
    </div>
  );
};
export default Home;