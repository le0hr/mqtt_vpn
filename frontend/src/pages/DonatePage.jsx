import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CircleDollarSign, Heart, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function DonatePage() {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time')
  
  const donationAmounts = [1, 2, 5, 10, 20];

  const impactItems = [
    {
      icon: CircleDollarSign,
      amount: '$5',
      description: t('donatePage.impactItems.5'),
    },
    {
      icon: Shield,
      amount: '$10',
      description: t('donatePage.impactItems.10'),
    },
    {
      icon: TrendingUp,
      amount: '$20',
      description: t('donatePage.impactItems.20'),
    },
  ];

  const benefits = [
    t('donatePage.benefits.taxDeductible'),
    t('donatePage.benefits.updates'),
    t('donatePage.benefits.events'),
    t('donatePage.benefits.recognition'),
  ];

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    alert(`Site still in demo, no actual payment will be processed.`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t('donatePage.title')}</h1>
          <p className="text-lg md:text-xl text-gray-600">
            {t('donatePage.subtitle')}
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-8 md:mb-12 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1697665387559-253e7a645e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb25hdGlvbiUyMGNoYXJpdHklMjBoYW5kc3xlbnwxfHx8fDE3NzI1NjI5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Supporting the cause"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Impact Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">{t('donatePage.impactTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {impactItems.map((item) => (
              <Card key={item.amount} className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
                    <item.icon className="size-8 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2 text-center text-green-600">
                  {item.amount}
                </div>
                <p className="text-gray-600 text-center">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Donation Form */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t('donatePage.makeDonation')}</h2>
            
            {/* Preset Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">{t('donatePage.selectAmount')}</label>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    className={selectedAmount === amount ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                {t('donatePage.customAmount')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>

            {/* Donation Type */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Button 
                type="button" 
                variant={donationType === 'one-time' ? 'default' : 'outline'}
                className={donationType === 'one-time' ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                onClick={() => setDonationType('one-time')}
              >
                One-Time
              </Button>
              <Button 
                type="button" 
                variant={donationType === 'monthly' ? 'default' : 'outline'}
                className={donationType === 'monthly' ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                onClick={() => setDonationType('monthly')}
              >
                Monthly
              </Button>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all" 
              size="lg"
              onClick={handleDonate}
              disabled={!selectedAmount && !customAmount}
            >
              <Heart className="size-5 mr-2" />
              {t('donatePage.donate')}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure payment powered by industry-leading encryption
            </p>
          </Card>

          {/* Benefits & Info */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t('donatePage.benefitsTitle')}</h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('donatePage.howWeUse')}</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('donatePage.equipmentMaintenance')}</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('donatePage.researchAnalysis')}</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('donatePage.communityPrograms')}</span>
                    <span className="text-sm font-medium">9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '9%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('donatePage.operations')}</span>
                    <span className="text-sm font-medium">1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '1%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}