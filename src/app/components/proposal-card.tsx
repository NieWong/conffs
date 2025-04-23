import { Component, ReactNode } from "react";
import { Button } from "./button";

interface ProposalCardProps {
  isVisible?: boolean;
  isLoading?: boolean;
  onResponse: (response: "yes" | "no") => void;
}

export default class ProposalCard extends Component<ProposalCardProps> {
  render(): ReactNode {
    const { isVisible = true, isLoading = false, onResponse } = this.props;

    return (
      <div
        className={`bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-md mx-auto text-center z-20
        transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 -translate-y-20"
        }`}
      >
        <h1 className="text-3xl font-bold text-pink-600 mb-4 animate-bounce-in">
          Jiwjiw tei omno baisnara vrgejlulj boloh bolu pls,
          <p
            className="text-pink-400 text-sm animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            you know who XD
          </p>
        </h1>
        <p
          className="mb-6 text-pink-800 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          I want you always to remember me. Will you remember that I existed,
          and that I stood next to you here like this? Norwegian Wood – Haruki
          Murakami
        </p>

        {isLoading ? (
          <div className="text-pink-600 font-semibold mt-6 animate-pulse">
            Sending your response...
          </div>
        ) : (
          <div
            className="flex justify-center space-x-4 animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <Button primary onClick={() => onResponse("yes")}>
              {`Yes yeeeeeeeeeee`}
            </Button>
            <Button onClick={() => onResponse("no")}>no. aww</Button>
          </div>
        )}
      </div>
    );
  }
}
