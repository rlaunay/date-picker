import React, { useEffect, useState } from 'react';

import classes from './FadeDrop.module.scss';

type FadeDropProps = {
  visible: boolean;
  onChildrenUnmount?: () => void;
}

export const FadeDrop: React.FC<FadeDropProps> = ({ visible, children, onChildrenUnmount }) => {
  const [showChildren, setShowChildren] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowChildren(true)
    } else {
      const timer = setTimeout(() => {
        setShowChildren(false)
        onChildrenUnmount && onChildrenUnmount()
      }, 250)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showChildren, visible])

  return (
    <div className={`${classes.fadeDrop} ${visible ? '' : classes.out}`} >
      {showChildren && children}
    </div>
  )
}