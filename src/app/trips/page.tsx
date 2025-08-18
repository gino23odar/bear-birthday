import Header from '@/components/Header';
import Trips from '@/components/Trips';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Trips - Birthday Bear',
  description: 'Capture and share your travel memories and adventures',
};

export default function TripsPage() {
  return (
    <main className="min-h-screen pt-16">
      <Header />
      <Trips />
      <Footer />
    </main>
  );
}
