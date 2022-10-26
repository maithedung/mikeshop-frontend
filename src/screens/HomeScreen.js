import React from "react";
import Header from "./../components/Header";
import ShopSection from "../components/HomeComponents/ShopSection";
import ContactInfo from "../components/HomeComponents/ContactInfo";
import CallToActionSection from "../components/HomeComponents/CallToActionSection";
import Footer from "./../components/Footer";

const HomeScreen = ({match}) => {
    window.scrollTo(0, 0);
    const keyword = match.params.keyword
    const pagenumber=match.params.pagenumber
    return (<div>
        <Header/>
        <ShopSection keyword={keyword} pagenumber={pagenumber}/>
        <CallToActionSection/>
        <ContactInfo/>
        <Footer/>
    </div>);
};

export default HomeScreen;
