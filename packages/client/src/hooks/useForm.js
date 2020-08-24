import { useReducer, useState } from 'react';

const formReducer = INIT_FORM_STATE => (
  state,
  [type, { value, field } = {}],
) => {
  switch (type) {
    case 'update':
      return { ...state, [field]: value };
    case 'reset':
      return { ...INIT_FORM_STATE };
    default:
      throw new Error(`Invalid action ${type}`);
  }
};

export default (INIT_FORM_STATE, { loading } = {}) => {
  let [formLoading, setFormLoading] = [false, () => new Error('Not implement')];
  if (loading) {
    [formLoading, setFormLoading] = useState(false);
  }
  const [formState, dispatch] = useReducer(
    formReducer(INIT_FORM_STATE),
    INIT_FORM_STATE,
  );
  const onFormInputChange = e => {
    const {
      value, id: field, type, checked,
    } = e.target;
    const valueInput = type === 'checkbox' ? checked : value;
    dispatch(['update', { value: valueInput, field }]);
  };
  return {
    formState,
    dispatch,
    onFormInputChange,
    formLoading,
    setFormLoading,
  };
};
