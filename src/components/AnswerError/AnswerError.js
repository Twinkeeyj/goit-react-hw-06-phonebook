import React from "react";
import PropTypes from "prop-types";

const AnswerError = ({ answer }) => <div className="answerContainer">{answer}</div>;

AnswerError.propTypes = {
  answer: PropTypes.string.isRequired,
};
export default AnswerError;