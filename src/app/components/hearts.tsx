import { Component, ReactNode } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export class Heart {
  top: number;
  left: number;
  duration: number;
  delay: number;

  constructor() {
    this.top = Math.random() * 100;
    this.left = Math.random() * 100;
    this.duration = 3 + Math.random() * 3;
    this.delay = Math.random() * 3;
  }
}

export class H_Animation extends Component<{ heart: Heart; index: number }> {
  render(): ReactNode {
    const { heart, index } = this.props;

    return (
      <div
        key={index}
        className="absolute text-pink-300 animate-float"
        style={{
          top: `${heart.top}%`,
          left: `${heart.left}%`,
          animation: `float ${heart.duration}s ease-in-out infinite`,
          animationDelay: `${heart.delay}s`,
        }}
      >
        <HeartIcon className="h-6 w-6" />
      </div>
    );
  }
}

export class HeartFactory {
  static createHearts(count: number): Heart[] {
    return Array.from({ length: count }, () => new Heart());
  }
}