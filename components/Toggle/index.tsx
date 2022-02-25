import React from 'react';
type Props = {};

const Toggle = ({ handleClick }: any) => {
  const handClick = () => {
    return handleClick();
  };
  return (
    <div>
      <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" onClick={handClick} />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Toggle;
