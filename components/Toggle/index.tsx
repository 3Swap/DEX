import React from 'react';
type Props = {};

const Toggle = (props: Props) => {
  return (
    <div>
      <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Toggle;
