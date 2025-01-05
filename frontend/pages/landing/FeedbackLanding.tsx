import React from 'react';
import { TestimonialCard } from './TestimonialCard';

export const testimonials = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf695f1095b07d10241a25a4522b7a528851d4e0469a2f72117eddbd739a4e49?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    name: "Chien Ngu",
    role: "AI Researcher",
    content: "Viet has truly transformed the way we approach knowledge management. The ability to seamlessly integrate multiple documents and retrieve key insights in real time has significantly improved our workflow. It's like having a personal research assistant available 24/7!"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c67d47b6b99f709d3cc3a96d5dd17790f9bb8e2a8a245cf66b1c89cfe630c8a3?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    name: "Test 1",
    role: "Product Manager",
    content: "The AI-powered conversation tool in Viet has made it so much easier for our team to collaborate and share knowledge. With the ability to search and extract information from documents quickly, our productivity has soared!"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/812be2301e805fa3a5a65fe85481520ffbd9252cde0d19e77a8b859a8d39a672?placeholderIfAbsent=true&apiKey=6f8a1d6b6ede4dea9ab29771b7b9c7dd",
    name: "Test 2",
    role: "UI/UX Designer",
    content: "As a designer, I'm particularly impressed with the user interface of Viet. The ability to tag and organize information intuitively makes the process of managing and researching knowledge feel effortless. It's a game-changer!"
  }
];

export const FeedbackLanding: React.FC = () => {
  return (
    <div id='feedback' className="bg-[#ffffff] flex flex-col justify-center items-center py-16">
      <div className="flex flex-col justify-center items-center max-w-full w-[1224px]">
        <div className="flex flex-col items-center max-w-full w-[636px]">
          <h2 className="text-6xl font-bold tracking-tighter leading-none text-[#2c2c2c] max-md:max-w-full max-md:text-4xl">
            What our clients say
          </h2>
          <p className="mt-6 text-base leading-6 text-center text-[#4a4a4a] max-md:max-w-full">
            Discover the impact we've made through the voices of our clients. Real stories of success, collaboration, and innovation, highlighting the value we bring to their projects.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 min-h-[235px] max-md:max-w-full">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackLanding;

