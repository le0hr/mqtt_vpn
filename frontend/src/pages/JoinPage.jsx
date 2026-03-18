import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, Users, Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios'
export function JoinPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({name: '',email: '',phone_number: '',message: '',});

  const benefits = [
    {
      icon: Users,
      title: t('joinPage.benefits.communityImpact.title'),
      description: t('joinPage.benefits.communityImpact.description'),
    },
    {
      icon: Heart,
      title: t('joinPage.benefits.healthAdvocacy.title'),
      description: t('joinPage.benefits.healthAdvocacy.description'),
    },
    {
      icon: Zap,
      title: t('joinPage.benefits.skillDevelopment.title'),
      description: t('joinPage.benefits.skillDevelopment.description'),
    },
  ];

const handleSubmit = async (e) => {
  e.preventDefault(); // 1. Зупиняємо перезавантаження сторінки

  try {
    // 2. Переконайтеся, що URL '/api/join' збігається з маршрутом у вашому FastAPI
    console.log(formData)
    const response = await axios.post('/api/join', formData);
    console.log("Success:", response.data);
    alert(t('joinPage.form.successMessage') || "Дякуємо за заявку!");
    
    // 3. Очищаємо форму після успіху
    setFormData({ name: '', email: '', phone_number: '', message: '' });
    
  } catch (error) {
    console.error("Failed to send data:", error);
    alert("Помилка при відправці. Спробуйте пізніше.");
  }
};

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t('joinPage.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">
            {t('joinPage.subtitle')}
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-8 md:mb-12 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NzI1NzQzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Volunteers working together"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Benefits Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">{t('joinPage.whyVolunteer')}</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <benefit.icon className="size-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Opportunities Section */}
        <Card className="p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t('joinPage.volunteerOpportunities')}</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t('joinPage.opportunities.monitorMaintenance.title')}</h3>
                <p className="text-gray-600">{t('joinPage.opportunities.monitorMaintenance.description')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t('joinPage.opportunities.dataAnalysis.title')}</h3>
                <p className="text-gray-600">{t('joinPage.opportunities.dataAnalysis.description')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t('joinPage.opportunities.communityOutreach.title')}</h3>
                <p className="text-gray-600">{t('joinPage.opportunities.communityOutreach.description')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t('joinPage.opportunities.eventCoordination.title')}</h3>
                <p className="text-gray-600">{t('joinPage.opportunities.eventCoordination.description')}</p>
              </div>
            </div>
          </div>
        </Card>
        {/* Sign Up Form */}
        <Card className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t('joinPage.getInvolved')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('joinPage.form.name')} *
              </label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('joinPage.form.email')} *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                {t('joinPage.form.phone')}
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium mb-2">
                {t('joinPage.form.interest')}
              </label>
              <Textarea
                id="interest"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you're most interested in helping with..."
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
              {t('joinPage.form.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}