import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Dubois',
    position: 'Directrice RH',
    company: 'BTP Solutions',
    content: 'YOJOB nous a permis de recruter 15 maçons polonais en moins de 3 semaines. Un service impeccable et un accompagnement administratif complet.',
    image: 'https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjQ2MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Laurent',
    position: 'CEO',
    company: 'LogiTech Industries',
    content: 'Grâce à YOJOB, nous avons trouvé des profils techniques impossibles à recruter en France. Leur réseau européen est un véritable atout concurrentiel.',
    image: 'https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwY29uZmlkZW50fGVufDF8fHx8MTc2NDI1NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophie Martin',
    position: 'Responsable Opérations',
    company: 'Vignobles du Sud',
    content: 'Pour nos vendanges, YOJOB mobilise chaque année des équipes portugaises et espagnoles. Fiabilité et professionnalisme au rendez-vous !',
    image: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxNjA1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex-1">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{currentTestimonial.content}"</p>
                <div>
                  <p className="text-white">{currentTestimonial.name}</p>
                  <p className="text-cyan-200 text-sm">
                    {currentTestimonial.position} - {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
