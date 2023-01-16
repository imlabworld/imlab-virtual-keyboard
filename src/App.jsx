/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import * as Hangul from 'hangul-js';
import KeyboardReact from 'KeyboardReact.jsx';
import { useRef, useState } from 'react';
import 'react-simple-keyboard/build/css/index.css';

const buttonArray = [];
let inputText = '';

const App = () => {
  const [input, setInput] = useState();
  const [layout, setLayout] = useState('default');
  const [language, setLanguage] = useState('default');
  const [buttonTheme, setButtonTheme] = useState([]);
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
  };

  const handleShiftButton = () => {
    setLayout(layout === 'default' ? 'shift' : 'default');
  };

  const handleLanguageButton = () => {
    setLanguage(language === 'default' ? 'english' : 'default');
  };

  const onKeyPress = button => {
    if (
      ![
        '{shift}',
        '{language}',
        '{enter}',
        '{bksp}',
        '{space}',
        '{tab}',
      ].includes(button)
    ) {
      buttonArray.push(button);
    }
    if (button === '{bksp}') {
      buttonArray.pop();
    }
    if (button === '{space}') {
      buttonArray.push(' ');
    }
    if (button === '{tab}') {
      buttonArray.push('  ');
    }

    inputText = Hangul.assemble(buttonArray);

    if (button === '{shift}') handleShiftButton();
    if (button === '{language}') handleLanguageButton();
  };

  const onChangeInput = event => {
    const input = event.target.value;

    setInput(event.target.value);
    if (keyboard?.current) keyboard?.current?.setInput(input);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen gap-8">
      <div className="flex flex-col gap-8 items-center justify-center w-[50vw] h-screen">
        <input
          className="w-full h-12 border-2 border-black"
          value={inputText}
          onChange={onChangeInput}
        />
        <KeyboardReact
          stateToIgnore={input}
          keyboardRef={r => (keyboard.current = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layoutName={layout}
          language={language}
          buttonTheme={buttonTheme}
          newLineOnEnter
          physicalKeyboardHighlight
          debug
        />
      </div>
    </section>
  );
};

export default App;
