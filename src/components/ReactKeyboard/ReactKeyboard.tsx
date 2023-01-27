/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react';
import { changedProps, parseProps } from '../../lib/utils';
import Keyboard from '../Keyboard/Keyboard';
import { SimpleKeyboard, KeyboardReact } from '../../lib/@types';

const ReactKeyboard: typeof KeyboardReact = props => {
  const cssClass = props?.baseClass || 'react-simple-keyboard';
  const initRef = useRef<boolean>();
  const keyboardRef = useRef<SimpleKeyboard>();
  const previousProps = useRef(props);

  useEffect(() => {
    if (window) {
      const parsedProps = parseProps(props);

      if (!initRef.current) {
        initRef.current = true;
        // @ts-ignore
        keyboardRef.current = new Keyboard(`.${cssClass}`, parsedProps);
        parsedProps.keyboardRef && parsedProps.keyboardRef(keyboardRef.current);
      }

      const updatedProps = changedProps(previousProps.current, parsedProps);

      if (updatedProps.length) {
        const keyboard = keyboardRef.current;
        previousProps.current = parsedProps;
        keyboard?.setOptions(parsedProps);
      }
    }
  }, [initRef, cssClass, previousProps, props]);

  return <div className={cssClass} />;
};

export default ReactKeyboard;
