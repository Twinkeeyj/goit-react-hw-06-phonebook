import React from 'react';

import { CSSTransition } from 'react-transition-group';
import '../../index.css';

const AnswerError = ({ isVisible }) => {
  return (
    <CSSTransition
      in={isVisible}
      timeout={250}
      classNames="answer"
      unmountOnExit
    >
      <div className="answerContainer">
        <p>Contact already declared</p>
      </div>
    </CSSTransition>
  );
};

export default AnswerError;
