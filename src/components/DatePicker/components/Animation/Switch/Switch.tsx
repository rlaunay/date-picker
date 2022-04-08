import React, { useEffect, useState } from 'react';

import classes from './Switch.module.scss';

type SwitchProps = {
  isOpen: boolean;
  firstElemet: React.ReactNode;
  secondElement: React.ReactNode;
  duration?: number;
}
const VISIBLE = 1; // L'élément est visible
const HIDDEN = 2; // L'élément est masqué
const ENTERING = 3; // L'élément est animé en entrée
const LEAVING = 4; // L'élément est animé en sortie

export const Switch: React.FC<SwitchProps> = ({ isOpen, firstElemet, secondElement, duration = 125 }) => {
  const [stateFirst, setStateFirst] = useState(isOpen ? HIDDEN : VISIBLE);
  const [stateSecond, setStateSecond] = useState(isOpen ? VISIBLE : HIDDEN);

  useEffect(() => {
    if (isOpen && stateFirst !== HIDDEN) {
      setStateFirst(LEAVING);
      setStateSecond(ENTERING);
    } else if (!isOpen && stateSecond !== HIDDEN) {
      setStateFirst(ENTERING);
      setStateSecond(LEAVING);
    }
  }, [isOpen]);

  useEffect(() => {
    if (stateFirst === LEAVING) {
      const timer = setTimeout(() => {
        setStateSecond(VISIBLE);
        setStateFirst(HIDDEN);
      }, duration);

      return () => clearTimeout(timer)
    }
  }, [stateFirst]);

  useEffect(() => {
    if (stateSecond === LEAVING) {
      const timer = setTimeout(() => {
        setStateSecond(HIDDEN);
        setStateFirst(VISIBLE);
      }, duration);

      return () => clearTimeout(timer)
    }
  }, [stateSecond]);

  let classFirst = `${classes.switch}`;
  let classSecond = `${classes.switch}`;
  if (stateFirst === VISIBLE || stateSecond === VISIBLE) {
    classFirst = `${classes.switch} ${classes.open}`;
    classSecond = `${classes.switch} ${classes.open}`;
  }

  if (stateFirst === ENTERING) {
    classFirst = `${classes.switch} ${classes.down}`;
  }
  if (stateSecond === ENTERING) {
    classSecond = `${classes.switch} ${classes.up}`;
  }

  const firstHidden = stateFirst === HIDDEN;
  const secondHidden = stateSecond === HIDDEN;

  return (
    <>
      {firstHidden ? null : <div className={classFirst} >{firstElemet}</div>}
      {secondHidden ? null : <div className={classSecond} >{secondElement}</div>}
    </>
  )
}