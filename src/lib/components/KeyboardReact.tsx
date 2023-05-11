import * as React from 'react';
import SimpleKeyboard from './Keyboard';
import { parseProps, changedProps } from '../services/UtilitiesReact';
import 'simple-keyboard/build/css/index.css';
import { KeyboardReactInterface } from '../interfaces';

const KeyboardReact = (props: KeyboardReactInterface['options']) => {
  const cssClass = props.baseClass || 'react-simple-keyboard';
  const initRef = React.useRef<null | boolean>(null);
  const targetElemRef = React.useRef<null | HTMLDivElement>(null);
  const keyboardRef = React.useRef<null | KeyboardReactInterface>(null);
  const previousProps = React.useRef(props);

  React.useEffect(() => {
    const parsedProps = parseProps(props) as any;

    /**
     * Initialize simple-keyboard
     */
    if (!initRef.current) {
      initRef.current = true;

      parsedProps.debug && console.log('ReactSimpleKeyboard: Init');

      const targetElem = targetElemRef.current as HTMLDivElement;

      const targetClass = `.${cssClass} ${props.id}`;

      keyboardRef.current = new SimpleKeyboard(
        targetElem || targetClass,
        parsedProps,
      ) as KeyboardReactInterface;

      parsedProps.keyboardRef && parsedProps.keyboardRef(keyboardRef.current);
      keyboardRef.current.setInput(props.defaultValue);
    }

    const updatedProps = changedProps(previousProps.current, parsedProps);

    /**
     * Only trigger render if props changed
     */
    if (updatedProps.length) {
      const keyboard = keyboardRef.current;
      previousProps.current = parsedProps;
      keyboard?.setOptions(parsedProps);
      parsedProps.debug &&
        console.log(
          'ReactSimpleKeyboard - setOptions called due to updated props:',
          updatedProps,
        );
    }
  }, [initRef, cssClass, previousProps, props]);

  return <div className={cssClass} ref={targetElemRef} />;
};

export default KeyboardReact;
