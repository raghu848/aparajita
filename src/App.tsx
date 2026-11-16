import React, { useEffect, useState } from 'react';
import { initLenis } from './utils/lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionReveal } from './components/CollectionReveal';
import { CraftSection } from './components/CraftSection';
import { SignatureLook } from './components/SignatureLook';
import { HorizontalLookbook } from './components/HorizontalLookbook';
import { BrandStory } from './components/BrandStory';
import { CoutureFilm } from './components/CoutureFilm';
import { EditorialGallery } from './components/EditorialGallery';
import { DetailsSection } from './components/DetailsSection';
import { FinalStatement } from './components/FinalStatement';
import { AppointmentSection } from './components/AppointmentSection';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-charcoal-noir text-ivory overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
      {/* Luxury Magnetic Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Floating Translucent Editorial Navbar */}
      <Navbar onOpenAppointment={() => setAppointmentModalOpen(true)} />

      {/* Main Continuous Fashion Storytelling Canvas */}
      <main className="relative w-full">
        {/* Section 01: Hero - Cinematic Fashion Opening */}
        <Hero />

        {/* Section 02: The Collection Reveal - Pinned Full-Screen Editorial Frames */}
        <CollectionReveal onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Section 03: Craftsmanship & Fabric ("From Thread to Couture") */}
        <CraftSection />

        {/* Section 04: The Signature Look - Centerpiece Garment & Hotspots */}
        <SignatureLook />

        {/* Section 05: Horizontal Collection Experience (Vertical Scroll -> Horizontal Panorama) */}
        <HorizontalLookbook onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Section 06: Brand Story ("Rooted in Tradition. Designed for Now.") */}
        <BrandStory />

        {/* Section 07: Couture Film Moment (Cinematic Runway Film Experience) */}
        <CoutureFilm />

        {/* Section 08: Editorial Lookbook Folio (Asymmetric Magazine Composition) */}
        <EditorialGallery onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Section 09: Couture Details & Micro-Inspection */}
        <DetailsSection />

        {/* Section 10: Final Fashion Statement ("Wear The Art.") */}
        <FinalStatement onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* Section 11: Appointment & Salon Consultation */}
        <AppointmentSection onOpenAppointment={() => setAppointmentModalOpen(true)} />
      </main>

      {/* Floating Concierge WhatsApp Action */}
      <WhatsAppButton />

      {/* Footer Colophon */}
      <Footer />

      {/* Private Salon Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </div>
  );
};

export default App;
