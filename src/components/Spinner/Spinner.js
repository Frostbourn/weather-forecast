import React from "react";
import image from "../../assets/svgs/spinner.svg";
import styled from "styled-components";

const SpinnerImage = styled.img`
  padding: 1em;
  width: 30px;
  height: auto;
`;

const Spinner = () => {
  return (
    <>
      <SpinnerImage src={image} alt="Spinner" />
    </>
  );
};

export default Spinner;
