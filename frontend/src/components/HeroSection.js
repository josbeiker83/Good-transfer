import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaArrowRight, FaCoins } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import 'aos/dist/aos.css';
import AOS from 'aos';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const slides = [
    {
      title: "GOOD TRANSFER",
      subtitle: "Asesoría personalizada",
      description: "Transfiere con nosotros de USA 🇺🇸 a Venezuela 🇻🇪 con un excelente bajo porcentaje de comisión y una atractiva tasa del $ en bolívares muy por encima del BCV",
      cta: "¡CONTÁCTANOS AHORA!",
      image: "https://images.unsplash.com/photo-1598665070070-82eaf00ad214?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtb25leSUyMHRyYW5zZmVyfGVufDB8fHxncmVlbnwxNzUzMzIyNzM2fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "TRANSFERENCIAS RÁPIDAS",
      subtitle: "Seguridad garantizada",
      description: "¡Transfiere con nosotros y verás el valor de tu dinero! 💪 Procesamos tu transferencia en menos de 24 horas con total seguridad.",
      cta: "SOLICITA TU COTIZACIÓN",
      image: "https://images.unsplash.com/photo-1579217994791-32a37cb55ce6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxtb25leSUyMHRyYW5zZmVyfGVufDB8fHxncmVlbnwxNzUzMzIyNzM2fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "ASESORÍA EXPERTA",
      subtitle: "Soporte personalizado",
      description: "Nuestro equipo te brinda asesoría completa para que tengas la mejor experiencia en tus transferencias. ¡No dudes en pedirnos información!",
      cta: "HABLA CON UN ASESOR",
      image: "https://images.unsplash.com/photo-1587100605132-43f48db991a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZXJ2aWNlc3xlbnwwfHx8Z3JlZW58MTc1MzMyMjc0M3ww&ixlib=rb-4.1.0&q=85"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-emerald-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-300 rounded-full animate-pulse"></div>
      </div>

      {/* Sliding Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2 text-white z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold"
              >
                <span className="text-white">GOOD</span>
                <br />
                <span className="text-emerald-400 text-6xl lg:text-8xl font-black">
                  TRANSFER
                </span>
              </motion.h1>

              {/* Subtitle with Icon */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <MdVerified className="text-white text-xl" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-emerald-400">
                  {slides[currentSlide].subtitle}
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl leading-relaxed text-gray-200 max-w-lg"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* Benefits Highlight */}
              <motion.div 
                variants={itemVariants}
                className="bg-emerald-500 text-white p-4 rounded-lg flex items-center space-x-3 max-w-md"
              >
                <MdVerified className="text-2xl" />
                <span className="font-bold text-lg">
                  ¡Transfiere con nosotros y verás el valor de tu dinero! 💪
                </span>
              </motion.div>

              {/* CTA Button */}
              <motion.button 
                variants={itemVariants}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{slides[currentSlide].cta}</span>
                <FaArrowRight className="animate-bounce" />
              </motion.button>

              {/* Contact Info */}
              <motion.div 
                variants={itemVariants}
                className="space-y-3"
              >
                <p className="text-gray-300 font-medium">¡No dudes en pedirnos información!</p>
                <div className="flex flex-col space-y-2">
                  <a 
                    href="https://wa.me/13478646398" 
                    className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span className="font-bold text-lg">Ws: +1 (347) 864-6398</span>
                  </a>
                  <a 
                    href="https://wa.me/13478459923" 
                    className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <FaWhatsapp className="text-2xl" />
                    <span className="font-bold text-lg">+1 (347) 845-5923</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Money Stack Visual */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl transform rotate-3 animate-pulse shadow-2xl"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl transform -rotate-2 animate-bounce shadow-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg">
                  <img 
                    src={slides[currentSlide].image} 
                    alt="Money Transfer"
                    className="w-full h-full object-cover rounded-2xl opacity-80"
                  />
                </div>
                
                {/* Floating Coins */}
                <motion.div 
                  className="absolute -top-5 -right-5 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaCoins className="text-yellow-800 text-2xl" />
                </motion.div>

                <motion.div 
                  className="absolute -bottom-5 -left-5 bg-emerald-400 w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
                  animate={{ 
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white font-bold text-xl">$</span>
                </motion.div>

                <motion.div 
                  className="absolute top-1/2 -left-8 bg-green-400 w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
                  animate={{ 
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span className="text-white font-bold">💰</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button 
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            ←
          </button>
          
          <div className="flex space-x-2 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-emerald-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;