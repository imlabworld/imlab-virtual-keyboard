/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import 'hangul-virtual-keyboard/build/css/index.css';
import { useEffect, useRef } from 'react';
import { changedProps, parseProps } from '../../lib/utils';
import Keyboard from '../Keyboard/Keyboard';

const ReactKeyboard = props => {
  const cssClass = props.baseClass || 'react-simple-keyboard';
  const initRef = useRef();
  const keyboardRef = useRef();
  const previousProps = useRef(props);

  useEffect(() => {
    if (window) {
      const parsedProps = parseProps(props);

      if (!initRef.current) {
        initRef.current = true;
        keyboardRef.current = new Keyboard(`.${cssClass}`, parsedProps);
        parsedProps.keyboardRef && parsedProps.keyboardRef(keyboardRef.current);
      }

      const updatedProps = changedProps(previousProps.current, parsedProps);

      if (updatedProps.length) {
        const keyboard = keyboardRef.current;
        previousProps.current = parsedProps;
        keyboard.setOptions(parsedProps);
      }
    }
  }, [initRef, cssClass, previousProps, props]);

  return <div className={cssClass} />;
};

export default ReactKeyboard;
