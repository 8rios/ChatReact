/**
 * Chat App
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
import Global from "../contexts/Global";

class Mensajes extends React.Component{

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest' 
    });
  }

  boton(timetoken) {
    if(Global.apodo == 'Admin'){
        return (
            <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.deleteMessage(timetoken);
                }}
              >
                <button className="boton" type="submit">Eliminar</button>
              </form>
        );
    }else{
        return null
    }
  };

  render() {
    return (
      <div>
        <ul className="messagelist">
          {this.props.messages.map((m, i) => (
            <li key={i}>
              <div className="cardMensaje">
                <div className="nombre">{m.message.publisher}</div>
                <div className="tiempo">{m.message.timestamp}</div>
                <div className="texto">{m.message.text}</div>

                  {this.boton(m.timetoken)}
                  
              </div>
            </li>
          ))}

          <div style={{float:"left", clear: "both"  }} ref={(el) => { this.messagesEnd = el; }}></div>

        </ul>
        
      </div>
    );
  }

}

export default Mensajes;