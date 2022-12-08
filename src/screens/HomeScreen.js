import React from "react";
import Header from "./../components/Header";
import ShopSection from "../components/Home/ShopSection";
import ContactInfo from "../components/Home/ContactInfo";
import CallToActionSection from "../components/Home/CallToActionSection";
import Footer from "./../components/Footer";

const HomeScreen = ({match}) => {
    window.scrollTo(0, 0);
    const keyword = match.params.keyword
    const pageNumber=match.params.pageNumber
    return (<div>
        <Header/>
        <ShopSection keyword={keyword} pageNumber={pageNumber}/>
        <CallToActionSection/>
        <ContactInfo/>
        <Footer/>
    </div>);
};

export default HomeScreen;
