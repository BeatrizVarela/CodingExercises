import React, { ReactNode } from "react";

import style from "./Button.module.scss";

class Button extends React.Component<{
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: ReactNode;
}> {
  render() {
    const { type = "button", onClick } = this.props;
    return (
      <button onClick={onClick} type={type} className={style.button}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
