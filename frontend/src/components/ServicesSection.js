import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaClock, FaShieldAlt, FaPhoneAlt, FaWhatsapp, FaCalculator } from 'react-icons/fa';
import { MdTrendingUp, MdVerified, MdSecurity } from 'react-icons/md';

const ServicesSection = () => {
  const services = [
    {
      icon: FaMoneyBillWave,
      title: "Mejor Tasa del Mercado",
      description: "Ofrecemos una tasa del dólar muy por encima del BCV, maximizando el valor de tu transferencia",
      highlight: "Hasta 15% más que el BCV",
      color: "emerald"
    },
    {
      icon: FaClock,
      title: "Transferencias Rápidas",
      description: "Procesamos tu dinero en menos de 24 horas. Rapidez y eficiencia garantizada",
      highlight: "< 24 horas",
      color: "green"
    },
    {
      icon: FaShieldAlt,
      title: "100% Seguro",
      description: "Tus transferencias están completamente protegidas con la más alta seguridad",
      highlight: "Garantía total",
      color: "teal"
    },
    {
      icon: MdVerified,
      title: "Asesoría Personalizada",
      description: "Nuestro equipo experto te guía en cada paso del proceso de transferencia",
      highlight: "Soporte 24/7",
      color: "emerald"
    }
  ];

  const benefits = [
    "🇺🇸 Desde Estados Unidos a Venezuela 🇻🇪",
    "💰 Comisiones más bajas del mercado",
    "📈 Tasa de cambio competitiva",
    "🔒 Operaciones 100% seguras",
    "⚡ Proceso súper rápido",
    "👥 Atención personalizada"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-green-100 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            ¿Por qué elegir 
            <span className="text-emerald-500 block mt-2">GOOD TRANSFER?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Somos la opción más confiable para tus transferencias de dinero entre Estados Unidos y Venezuela
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-${service.color}-500`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlight */}
                  <div className={`bg-gradient-to-r from-${service.color}-100 to-${service.color}-200 text-${service.color}-800 px-4 py-2 rounded-full text-sm font-bold text-center`}>
                    {service.highlight}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500 to-green-600"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold mb-4">
                Ventajas de transferir con nosotros
              </h3>
              <p className="text-xl text-slate-300">
                Descubre por qué miles de clientes confían en Good Transfer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-2xl">{benefit.split(' ')[0]}</span>
                  <span className="text-lg font-medium">{benefit.substring(benefit.indexOf(' ') + 1)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-slate-800 mb-6">
            ¿Listo para hacer tu transferencia?
          </h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Contáctanos ahora y recibe la mejor asesoría para tu transferencia de dinero
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.a
              href="https://wa.me/13478646398"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg"
            >
              <FaWhatsapp className="text-2xl" />
              <span>WhatsApp: +1 (347) 864-6398</span>
            </motion.a>
            
            <motion.a
              href="https://wa.me/13478459923"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg"
            >
              <FaWhatsapp className="text-2xl" />
              <span>+1 (347) 845-5923</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;