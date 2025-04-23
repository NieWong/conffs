"use client";
import { Component, ReactNode } from "react";
import { H_Animation, Heart, HeartFactory } from "./components/hearts";
import Envelope from "./components/envelope";
import ProposalCard from "./components/proposal-card";
import confetti from "canvas-confetti";

interface DatingProposalState {
  hearts: Heart[];
  opened: boolean;
  showProposal: boolean;
  passwordInput: string;
  passwordError: boolean;
  gifResponse: "none" | "yes" | "no";
  isLoading: boolean;
}

class DatingProposal extends Component<{}, DatingProposalState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hearts: [],
      opened: false,
      showProposal: false,
      passwordInput: "",
      passwordError: false,
      gifResponse: "none",
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.setState({
      hearts: HeartFactory.createHearts(20),
    });
  }

  fireCelebration = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 200);
  };

  openEnvelope = () => {
    this.setState({ opened: true });

    setTimeout(() => {
      this.setState({ showProposal: true });
    }, 300);
  };

  handleResponse = async (response: "yes" | "no") => {
    this.setState({ isLoading: true });

    try {
      const res = await fetch("/api/node-mailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "ab.sukhee@gmail.com",
          subject:
            response === "yes" ? "Someone said YES!" : "Someone said no...",
          text:
            response === "yes"
              ? "Time to shine ✨"
              : "i'm sad but, you're still awesome. hha",
        }),
      });

      if (response === "yes") {
        this.fireCelebration();
      
        setTimeout(() => {
          this.setState({
            gifResponse: response,
            isLoading: false,
          });
        }, 800);
      } else {
        this.setState({
          gifResponse: response,
          isLoading: false,
        });
      }
      
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Something went wrong while sending. Try again maybe?");
      this.setState({ isLoading: false });
    }
  };

  render(): ReactNode {
    const { hearts, opened, showProposal, gifResponse, isLoading } = this.state;

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
        {hearts.map((heart, i) => (
          <H_Animation heart={heart} index={i} key={i} />
        ))}

        {!opened ? (
          <Envelope onClick={this.openEnvelope} />
        ) : (
          <div
            className={`animate-float-up ${
              showProposal ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            {isLoading ? (
              <div className="text-pink-500 text-xl font-semibold flex items-center justify-center">
                <div className="mr-2">Sending</div>
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "100ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  ></div>
                </div>
              </div>
            ) : gifResponse !== "none" ? (
              <img
                src={
                  gifResponse === "yes"
                    ? "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDJmdmhhM3dlcDBld25rZmkwMHZ2cTljdGtkNWpxejN5dGxnYnR1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13G7hmmFr9yuxG/giphy.gif"
                    : "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3p1ZmsyN2dpdDRjb25xcHpqanZyM2VranE4dWttNmw0M3lnc2x6NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7SF5scGB2AFrgsXP63/giphy.gif"
                }
                alt={gifResponse === "yes" ? "Happy" : "Sad"}
                className="w-64 md:w-72 mx-auto rounded-lg shadow-lg animate-fade-in"
              />
            ) : (
              <ProposalCard
                isVisible
                onResponse={this.handleResponse}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default function Home() {
  return <DatingProposal />;
}
