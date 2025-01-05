import * as React from "react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c3c88e40becb3c31dd97eb7ce707f10b6af6bfe8fec43eeb6d25df3a79dd08f6?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    title: "Easy Sharing",
    description: "Share your work with others using simple links."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d66d219ef10e2b7b7785c1edf5e86fb3ac1aba0c643125a7bda71c4840913ba?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    title: "Collaborative Projects",
    description: "Work together with your team on shared projects."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9fa2989c15c1d73ae5d488ed262115f7c8fb87578f7b2a5bddd8da09a3626857?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    title: "AI-Powered Insights",
    description: "Leverage collective intelligence with AI assistance."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cdd7b4e68086ecff6fea2610b33d9692477b480f74b73849096254d52ef9b4c?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    title: "Knowledge Exchange",
    description: "Learn from others and contribute your expertise."
  },
  
];

export function FeatureLanding() {
  return (
    <div id="feature" className="bg-[#ffffff] flex flex-col justify-center items-center py-16">
      <div className="flex flex-col justify-center items-center max-w-full w-[1224px]">
        <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
          <div className="self-stretch my-auto text-6xl font-bold tracking-tighter bg-clip-text text-slate-800 leading-[64px] w-[800px] max-md:max-w-full max-md:text-4xl max-md:leading-[51px]">
            Powerful features to help you manage all your Knowledge
          </div>
          <div className="self-stretch my-auto text-base leading-6 text-slate-700 w-[302px]">
          Built right into your workspace, Viet is ready to brainstorm, summarize, help you write, and find what you're looking for.
          </div>
        </div>
        <div className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="items-center flex flex-wrap gap-9 justify-center max-md:max-w-full">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
         
        </div>
      </div>
    </div>
  );
}