import React from 'react';

const Control = ({ bank, lastKey, volume, bankOne, bankTwo }) => {
  const changeBank = () => {
    bank[0] === bankOne ? bank[1](bankTwo) : bank[1](bankOne);
  };
  // const handleDrag = (event) => {
  //   volume[1](volume[0] + 1);
  // };
  return (
    <>
      <section id="controls">
        <p>Power</p>
        <div>
          <div className={`modal ${bank[0]}`} />
        </div>
        <h3>{lastKey[0]}</h3>
        <button className={`${bank[0][0].id}`} onClick={changeBank}>
          Change Bank
        </button>
        <div class="slidecontainer"></div>
      </section>
    </>
  );
};
export default Control;
