import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color, children, onClick }: ButtonProps) => (
  <StyledButton color={color} onClick={onClick} className="m-2">
    {children}
  </StyledButton>
);
