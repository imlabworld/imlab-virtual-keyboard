import * as React from 'react';
import './css/App.css';
import KeyboardHangul from '../lib/components/KeyboardHangul';

const App = () => {
  const [input, setInput] = React.useState('안녕하세요');

  return (
    <>
      <p>{input}</p>
      <KeyboardHangul defaultText={input} getText={setInput} />
    </>
  );
};

export default App;
