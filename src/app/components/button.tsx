import { Component, ReactNode } from "react";

export interface ButtonProps {
  onClick?: () => void;
  primary?: boolean;
  children: ReactNode;
}

export class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { onClick, primary = false, children } = this.props;

    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-semibold text-sm transition transform hover:scale-105 ${
          primary
            ? "bg-pink-400 text-white hover:bg-pink-500"
            : "bg-white text-pink-500 border border-pink-300 hover:bg-pink-100"
        }`}
      >
        {children}
      </button>
    );
  }
}