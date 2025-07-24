import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaWifi, FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { storeFormOffline, getNetworkStatus, showNotification } from '../utils/pwaUtils';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const networkStatus = getNetworkStatus();

    try {
      if (networkStatus.online) {
        // Online: Submit normally
        await axios.post(`${API}/contact`, formData);
        setSubmitStatus('success');
        
        // Show notification if permitted
        showNotification('¡Formulario enviado!', {
          body: 'Nos contactaremos contigo pronto.',
          tag: 'form-success'
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          amount: '',
          message: ''
        });
      } else {
        // Offline: Store for later sync
        const stored = await storeFormOffline({
          ...formData,
          timestamp: new Date().toISOString(),
          offline: true
        });
        
        if (stored) {
          setSubmitStatus('offline');
          setFormData({
            name: '',
            email: '',
            phone: '',
            amount: '',
            message: ''
          });
          
          showNotification('Formulario guardado offline', {
            body: 'Se enviará cuando tengas conexión.',
            tag: 'form-offline'
          });
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Try to store offline as fallback
      const stored = await storeFormOffline({
        ...formData,
        timestamp: new Date().toISOString(),
        offline: true,
        error: error.message
      });
      
      setSubmitStatus(stored ? 'offline' : 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp Principal",
      value: "+1 (347) 864-6398",
      link: "https://wa.me/13478646398",
      color: "green"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp Secundario",
      value: "+1 (347) 845-5923",
      link: "https://wa.me/13478459923",
      color: "emerald"
    },
    {
      icon: FaClock,
      title: "Horario de Atención",
      value: "Lunes a Domingo\n8:00 AM - 8:00 PM EST",
      color: "blue"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Cobertura",
      value: "Estados Unidos → Venezuela",
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-100 to-white" data-section="contact">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Contáctanos
            <span className="text-emerald-500 block mt-2">¡Estamos aquí para ayudarte!</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            No dudes en pedirnos información. Nuestro equipo de expertos está listo para asesorarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Solicita tu Cotización
            </h3>
            <p className="text-slate-600 mb-8">
              Completa el formulario y recibe una cotización personalizada en minutos
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="+1 (xxx) xxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Monto a Transferir (USD) *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Mensaje Adicional
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none"
                  placeholder="Cuéntanos más detalles sobre tu transferencia..."
                ></textarea>
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : submitStatus === 'offline'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <FaCheckCircle className="text-xl" />
                  ) : submitStatus === 'offline' ? (
                    <FaCloudUploadAlt className="text-xl" />
                  ) : (
                    <FaWifi className="text-xl" />
                  )}
                  <span className="font-medium">
                    {submitStatus === 'success' 
                      ? '¡Formulario enviado exitosamente! Te contactaremos pronto.' 
                      : submitStatus === 'offline'
                      ? '📱 Formulario guardado offline. Se enviará automáticamente cuando tengas conexión.'
                      : 'Error al enviar el formulario. Por favor, intenta de nuevo.'}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Información de Contacto
              </h3>
              <p className="text-emerald-100 mb-8 text-lg">
                Múltiples formas de contactarnos para tu comodidad
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className={`flex items-start space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${
                        info.link ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => info.link && window.open(info.link, '_blank')}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{info.title}</h4>
                        <p className="text-emerald-100 whitespace-pre-line">{info.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-slate-800">Contacto Rápido</h4>
              <div className="grid grid-cols-1 gap-4">
                <motion.a
                  href="https://wa.me/13478646398"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>WhatsApp Principal</span>
                </motion.a>
                
                <motion.a
                  href="https://wa.me/13478459923"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>WhatsApp Alternativo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;