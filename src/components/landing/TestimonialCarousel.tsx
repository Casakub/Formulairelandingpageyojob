import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { useLandingContent } from '../../hooks/useLandingContent';

// Fallback images from Unsplash (used if no avatar is uploaded)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjQ2MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwY29uZmlkZW50fGVufDF8fHx8MTc2NDI1NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxNjA1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

// Helper function to generate initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to get avatar color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-purple-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function TestimonialCarousel() {
  const { landingContent } = useLandingContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get testimonials from CMS (French version)
  const testimonials = landingContent.fr?.testimonials || [];

  // If no testimonials, don't render anything
  if (testimonials.length === 0) {
    return null;
  }

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

  // Get avatar: uploaded image > fallback image > initials
  const avatarSrc = currentTestimonial.avatar || FALLBACK_IMAGES[currentIndex % FALLBACK_IMAGES.length];
  const showInitials = !currentTestimonial.avatar;

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              {/* Avatar */}
              {showInitials ? (
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(currentTestimonial.name)} ring-2 ring-white/30 flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-2xl">{getInitials(currentTestimonial.name)}</span>
                </div>
              ) : (
                <img
                  src={avatarSrc}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-white/30"
                />
              )}
              
              <div className="flex-1">
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-white/90 mb-4 italic">&quot;{currentTestimonial.quote}&quot;</p>
                
                {/* Author info */}
                <div>
                  <p className="text-white">{currentTestimonial.name}</p>
                  <p className="text-cyan-200 text-sm">
                    {currentTestimonial.role} - Secteur {currentTestimonial.sector}
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
          className="rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}