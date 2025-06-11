import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const ContactAgentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real application, you'd send this data to a backend.
    console.log('Contact form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Contact Agent</h3>
      <div className="space-y-4">
        <FormField
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormField
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormField
          isTextArea
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default ContactAgentForm;