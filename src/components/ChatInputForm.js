/**
 * Chat App
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';


export const ChatInputForm = ({ sendMessage }) => {

  const [inputValue, setInputValue] = React.useState("");

  return (
    <form className="form"
      onSubmit={e => {
        e.preventDefault();
        sendMessage({ text: inputValue });
        setInputValue("");
      }}
    >
      <input
        placeholder="Escribir un mensaje"
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
        required
      />
      <button className="btnEnviar" type="submit">Enviar</button>
    </form>
  );
};