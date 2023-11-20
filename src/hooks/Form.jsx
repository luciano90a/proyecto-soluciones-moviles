import React, { useState } from 'react';

export const useForm = (initState) => {
  const [state, setState] = useState(initState);

  const onChange = (value, field) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};

// Ejemplo de uso:
// const { form, onChange } = useForm({ /* initialState */ });
// Luego puedes usar form y onChange en tu componente.
