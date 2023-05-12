import { useRef, useState } from 'react';
import ReactKeyboard from './ReactKeyboard/ReactKeyboard';
import Hangul from 'hangul-js';
import { KeyboardOptions, KeyboardReactInterface } from 'lib/@types';

let buttonArray: Array<string> = [];
let inputText = '';

interface CustomKeyboardOptions extends KeyboardOptions {
  getText: (text: string) => void;
  language?: string;
  defaultText?: string;
}

const Keyboard = ({
  defaultText,
  getText,
  layout,
  language: languageProp,
  layoutName: layoutNameProp,
  display,
  debug,
}: CustomKeyboardOptions) => {
  const [input, setInput] = useState<string>(defaultText ?? '');

  const [layoutName, setLayoutName] = useState<string>(
    layoutNameProp ?? 'default',
  );
  const [language, setLanguage] = useState<string>(languageProp ?? 'default');
  const keyboard = useRef<KeyboardReactInterface | null>(null);

  const onChange = (syllable: string) => {
    setInput(syllable);
  };

  const handleShiftButton = () => {
    setLayoutName(layoutName === 'default' ? 'shift' : 'default');
  };

  const handleLanguageButton = () => {
    setLanguage(language === 'default' ? 'english' : 'default');
  };

  const onKeyPress = (button: string) => {
    if (defaultText) {
      buttonArray = [...input.split('')];
    }

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

    getText(inputText);

    if (button === '{shift}') handleShiftButton();
    if (button === '{language}') handleLanguageButton();
  };

  const defaultDisplay = {
    '{bksp}': '←',
    '{shift}': 'Shift',
    '{language}': '한/영',
    '{enter}': 'Enter',
    '{space}': ' ',
    '{tab}': 'Tab',
  };

  const defaultLayout = {
    english: {
      default: [
        '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        'q w e r t y u i o p',
        'a s d f g h j k l {enter}',
        '{shift} z x c v b n m {language}',
        '.com @ {space}',
      ],
      shift: [
        '1 2 3 4 5 6 7 8 9 0 _ + {bksp}',
        'Q W E R T Y U I O P ',
        'A S D F G H J K L {enter}',
        '{shift} Z X C V B N M {language}',
        '.com @ {space}',
      ],
    },
    korean: {
      default: [
        '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ',
        'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ {enter}',
        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {language}',
        '.com @ {space}',
      ],
      shift: [
        '1 2 3 4 5 6 7 8 9 0 _ + {bksp}',
        'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ',
        'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ {enter}',
        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {language}',
        '.com @ {space}',
      ],
    },
  };

  return (
    <ReactKeyboard
      defaultValue={defaultText}
      keyboardRef={(r: any) => (keyboard.current = r)}
      onChange={onChange}
      onKeyPress={onKeyPress}
      layout={layout || defaultLayout}
      display={display || defaultDisplay}
      layoutName={layoutName}
      language={language}
      debug={debug} // debug mode
    />
  );
};

export default Keyboard;
