import React, { useEffect, useRef, useState } from 'react';

import classes from './FadeUp.module.scss';

const VISIBLE = 1; // L'élément est visible
const HIDDEN = 2; // L'élément est masqué
const ENTERING = 3; // L'élément est animé en entrée
const LEAVING = 4; // L'élément est animé en sortie

type FadeUpProps = {
  visible: boolean;
  duration?: number;
}

export const FadeUp: React.FC<FadeUpProps> = ({ visible, duration = 250, children }) => {
  const childRef = useRef(children);
  const [state, setState] = useState(
    visible ? VISIBLE : HIDDEN
  );

  if (visible) {
    childRef.current = children;
  }

  useEffect(() => {
    if (!visible) {
      setState(LEAVING);
    } else {
      setState((s) => (s === HIDDEN ? ENTERING : VISIBLE));
    }
  }, [visible]);

  useEffect(() => {
    if (state === LEAVING) {
      const timer = setTimeout(() => {
        setState(HIDDEN);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    } else if (state === ENTERING) {
      document.body.offsetHeight; // force repaint
      setState(VISIBLE);
    }
  }, [state]);

  if (state === HIDDEN) {
    return null;
  }

  let className = `${classes.fadeUp}`;
  if (state === ENTERING) {
    className = `${classes.fadeUp} ${classes.entering}`;
  }
  if (state === VISIBLE) {
    className = `${classes.fadeUp} ${classes.open}`;
  }

  return <div className={className}>{childRef.current}</div>;
}