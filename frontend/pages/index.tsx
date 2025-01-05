import React, {useState, useEffect} from "react";
import NavbarLanding from "./landing/NavbarLanding";
import HeroLanding from "./landing/HeroLanding";
import { FeatureLanding } from "./landing/FeatureLanding";
import { FeaturePreviewLanding } from "./landing/FeaturePreviewLanding";
import { FeedbackLanding } from "./landing/FeedbackLanding";
import { FooterLanding } from "./landing/FooterLanding";
import SignInForm from "@/components/global/SignInForm";
const LandingPage: React.FC = () => {
    const [isOpenSignIn, setIsOpenSign] = useState<boolean>(false)
    const handleToggleSignIn = () => setIsOpenSign(!isOpenSignIn)


    return (
        <div className="w-full bg-cover h-screen bg-[url('/img/bg-white.jpg')] scroll-smooth">
            <NavbarLanding openLogin={handleToggleSignIn}/>
            <HeroLanding openLogin={handleToggleSignIn}/>
            <FeatureLanding />
            <FeaturePreviewLanding />
            <FeedbackLanding />
            <FooterLanding />
             <SignInForm isOpen={isOpenSignIn} closeForm={handleToggleSignIn}/>

        </div>
    )
}


export default LandingPage