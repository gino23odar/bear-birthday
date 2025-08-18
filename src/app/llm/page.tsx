import Header from '@/components/Header';
import LLMPlayground from '@/components/LLMPlayground';
import Footer from '@/components/Footer';

export default function LLMPage() {
  return (
    <main className="min-h-screen pt-16">
      <Header />
      <LLMPlayground />
      <Footer />
    </main>
  );
}

