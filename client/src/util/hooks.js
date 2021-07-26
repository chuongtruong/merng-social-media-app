//this file to handle form
//we need to seperate this into a different component as many other components need to use the same code


import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {

    const [values, setValues] = useState(initialState);
    
      // handle Input Change
      const onChange = (event) => {
        // event.target:  <input placeholder=​"Username" name=​"username" type=​"text" value=​"s">​
    
        console.log("event", event);
        console.log("event.target", event.target);
        setValues({ ...values, [event.target.name]: event.target.value });
      };

      const onSubmit = (e) => {
          e.preventDefault();
          callback();
      }

      return {
          onChange,
          onSubmit,
          values
      }
} 