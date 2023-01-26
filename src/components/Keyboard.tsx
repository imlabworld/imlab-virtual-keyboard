/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Hangul from 'hangul-js';
import { useRef, useState } from 'react';
import { KeyboardReactInterface } from 'react-simple-keyboard';
import ReactKeyboard from './ReactKeyboard/ReactKeyboard';

const buttonArray: Array<string> = [];
let inputText = '';

type Props = {
  layout?: {
    english: {
      default: string[];
      shift: string[];
    };
    korean: {
      default: string[];
      shift: string[];
    };
  };
};

const Keyboard = ({ layout }: Props) => {
  const [input, setInput] = useState<string>();
  const [layoutName, setLayoutName] = useState<string>('default');
  const [language, setLanguage] = useState<string>('default');
  const [buttonTheme, setButtonTheme] = useState([]);
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

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    const text = event.target.value;
    setInput(event.target.value);
    if (keyboard?.current) keyboard?.current?.setInput(text);
  };

  const displayName = {
    '{bksp}': '←',
    '{shift}': 'Shift',
    '{language}': '한/영',
    '{enter}': 'Enter',
    '{space}': ' ',
    '{tab}': 'Tab',
  };

  return (
    <div>
      <input value={inputText} onChange={onChangeInput} />
      <ReactKeyboard
        stateToIgnore={input}
        // @ts-ignore
        keyboardRef={r => (keyboard.current = r)}
        onChange={onChange}
        onKeyPress={onKeyPress}
        layout={
          layout || {
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
          }
        }
        layoutName={layoutName}
        language={language}
        buttonTheme={buttonTheme}
        display={displayName}
        physicalKeyboardHighlight
        syncInstanceInputs
        tabCharOnTab={false} // tab 시 간격 처리
        newLineOnEnter={false} // enter 시 줄 바꿈
        // maxLength={12} // 최대 길이 제한
        debug={false} // debug mode
      />
    </div>
  );
};

export default Keyboard;
