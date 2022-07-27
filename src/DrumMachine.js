import React from 'react';

const DrumMachine = ({ bank, setLastKey }) => {
  const playClick = ({ target }) => {
    let pad = document.getElementById(target.name);
    if (!pad.ended) pad.load();
    pad.play();
    bank[0].forEach((item) => {
      if (pad.id === item.keyCode) setLastKey(item.id);
    });
    target.blur();
  };
  return (
    <>
      <section className="drumStyle">
        {bank[0].map((item, idx) => (
          <div key={idx}>
            <audio id={item.keyCode} src={item.url} />
            <button
              id={item.keyTrigger.toLowerCase()}
              name={item.keyCode}
              onClick={playClick}
              className="padStyle"
            >
              {item.keyTrigger}
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default DrumMachine;
