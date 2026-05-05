import FeatureSection from '../components/home/Features';
import HeroSection from '../components/home/HeroSection';
import FooterSection from '../components/layout/Footer';
import ContactSection from '../components/home/Contact';

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeatureSection />
            <ContactSection />
            <FooterSection />
        </>
    );
}
