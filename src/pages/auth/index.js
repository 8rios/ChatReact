import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts';
import { Redirect } from 'react-router-dom';

const useInput = (props, labelText) => {
  const [value, setValue] = useState('');
  const input = (
    <>
      <label className='text-xs text-gray-700 font-bold'>{labelText}</label>
      <input
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
      />
    </>
  );
  return [value, input];
};

const Auth = () => {
  const { setUserData } = useContext(AppContext);
  const [authComplete, setAuthComplete] = useState(false);
  

  const [apodo, apodoInput] = useInput(
    { type: 'text', placeholder: 'Apodo' },
    'Apodo '
  );

  const handleSubmit = async e => {
    e.preventDefault();

    if(apodo == ''){
      return;
    }

    const payload = {
      user: apodo
    };

    setUserData(payload);
    setAuthComplete(true);
  };

  return authComplete ? (
    <Redirect to='/' />
    ) : (
      <div className='login'>

        <div className=''>
          <h2 className=''>
            Login Prueba Chat
          </h2>
        </div>

        <div className='forminits-'>
          <form className='' onSubmit={handleSubmit}>
            <div>{apodoInput}</div>
            <div className='mt-4 flex justify-center'>
              <button className='botonlogin'>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Auth;