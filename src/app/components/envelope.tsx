import { Component, ReactNode } from "react";

interface EnvelopeProps {
  onClick: () => void;
  recipientName?: string;
  senderName?: string;
}

interface EnvelopeState {
  animationStage: "closed" | "opening" | "flap-open" | "letter-rising" | "letter-out" | "complete";
  hovering: boolean;
}

export default class Envelope extends Component<EnvelopeProps, EnvelopeState> {
  constructor(props: EnvelopeProps) {
    super(props);
    this.state = {
      animationStage: "closed",
      hovering: false,
    };
  }

  handleClick = () => {
    const { animationStage } = this.state;
    if (animationStage !== "closed") return;

    this.setState({ animationStage: "opening" });

    setTimeout(() => this.setState({ animationStage: "flap-open" }), 400);
    setTimeout(() => this.setState({ animationStage: "letter-rising" }), 800);
    setTimeout(() => this.setState({ animationStage: "letter-out" }), 1300);
    setTimeout(() => this.setState({ animationStage: "complete" }), 1800);

    setTimeout(() => {
      this.props.onClick();
    }, 1600);
  };

  handleMouseEnter = () => {
    if (this.state.animationStage === "closed") {
      this.setState({ hovering: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ hovering: false });
  };

  render(): ReactNode {
    const { animationStage, hovering } = this.state;
    const { recipientName = "For You", senderName = "Suke" } = this.props;

    return (
      <div
        className="flex items-center justify-center relative"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          onClick={this.handleClick}
          className={`cursor-pointer relative z-10 w-80 h-64 transition-transform duration-700 ease-in-out ${
            animationStage === "complete" ? "opacity-0 scale-75" : hovering ? "scale-105" : "scale-100"
          }`}
        >
          <div className="absolute -top-1 right-10 w-16 h-16 z-30">
            <div className="w-full h-full border-2 border-pink-400 border-dashed rounded-md flex items-center justify-center p-1">
              <div className="text-red-500 text-2xl">❤️</div>
            </div>
          </div>

          {animationStage === "closed" && (
            <div className="absolute -top-10 left-10 text-lg font-medium text-pink-800">
              From: {senderName}
            </div>
          )}

          <div className="absolute top-0 left-0 w-full h-[80px] overflow-visible">
            <div
              className={`w-0 h-0 mx-auto
                border-l-[160px] border-r-[160px] border-b-[80px]
                border-l-transparent border-r-transparent border-b-pink-400
                transition-transform duration-700 ease-in-out origin-bottom
                ${
                  animationStage === "opening"
                    ? "rotate-[20deg]"
                    : animationStage === "flap-open" || animationStage === "letter-rising" || animationStage === "letter-out"
                    ? "rotate-[160deg]"
                    : ""
                }`}
            >
              {animationStage === "closed" && (
                <>
                  <div className="absolute top-[30px] left-1/2 -translate-x-1/2 text-center">
                    <div className="text-2xl font-bold text-pink-700">{recipientName}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-48 bg-pink-300 rounded-b-md shadow-md overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-pink-500 rounded-full"></div>
              <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-pink-500 rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-pink-200 opacity-30" />
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[90%] h-[85%] bg-white rounded shadow-inner transition-all duration-1000 ease-out
              ${
                animationStage === "closed" || animationStage === "opening"
                  ? "bottom-[-80%]"
                  : animationStage === "flap-open"
                  ? "bottom-[-40%]"
                  : animationStage === "letter-rising"
                  ? "bottom-[-10%]"
                  : animationStage === "letter-out"
                  ? "bottom-[150%] scale-125"
                  : "bottom-[200%] scale-150 opacity-0"
              }`}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-red-500 text-2xl">❤️</div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-0 h-0 border-r-[40px] border-b-[40px] border-r-transparent border-b-pink-300" />
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-b-[40px] border-l-transparent border-b-pink-300" />
          <div className="absolute bottom-0 left-0 w-full h-0">
            <div className="w-0 h-0 mx-auto border-l-[32px] border-r-[32px] border-t-[16px] border-l-transparent border-r-transparent border-t-pink-300" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white rounded-t-md" />
        </div>

        <div
          className={`absolute z-0 w-64 h-6 bg-black opacity-10 rounded-full blur-md transition-all duration-1000 ease-in-out ${
            animationStage === "complete" ? "opacity-0" : hovering ? "w-72 opacity-15" : ""
          }`}
        />
      </div>
    );
  }
}
