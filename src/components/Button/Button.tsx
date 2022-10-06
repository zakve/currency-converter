import styled from "styled-components";

type StyledButtonProps = {
    primary?: boolean;
};

const Button = styled.button<StyledButtonProps>`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  `

export default Button