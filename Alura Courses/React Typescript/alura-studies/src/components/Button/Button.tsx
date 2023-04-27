import React from "react";

import style from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({ onClick, type, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={style.button}
    >
      {children}
    </button>
  )
}
