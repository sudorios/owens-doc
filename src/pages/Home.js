import FeatureSection from '../components/features';
import HeroSection from '../components/heroSection';
import FooterSection from '../components/footer';
import ContactSection from '../components/contact';

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
