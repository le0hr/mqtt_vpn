import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CircleDollarSign, Heart, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [25, 50, 100, 250, 500];

  const impactItems = [
    {
      icon: CircleDollarSign,
      amount: '$25',
      description: 'Covers maintenance for one monitoring station for a month',
    },
    {
      icon: Shield,
      amount: '$100',
      description: 'Provides sensor calibration and quality assurance testing',
    },
    {
      icon: TrendingUp,
      amount: '$250',
      description: 'Funds data analysis and public reporting for one quarter',
    },
  ];

  const benefits = [
    'Your donation is tax-deductible',
    'Regular updates on how your contribution is used',
    'Access to exclusive community events',
    'Recognition in our annual donor report',
  ];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount) {
      alert(`Thank you for your generous donation of $${amount}! This is a demo, so no actual payment will be processed.`);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Support Our Mission</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Your donation helps us monitor air quality and protect public health across New York City
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Your Impact</h2>
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
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Make a Donation</h2>
            
            {/* Preset Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Amount</label>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
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
                Or Enter Custom Amount
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
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Donation Type</label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <Button type="button" variant="outline">
                  One-Time
                </Button>
                <Button type="button" variant="outline">
                  Monthly
                </Button>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleDonate}
              disabled={!selectedAmount && !customAmount}
            >
              <Heart className="size-5 mr-2" />
              Donate Now
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure payment powered by industry-leading encryption
            </p>
          </Card>

          {/* Benefits & Info */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Donor Benefits</h2>
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
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">How We Use Your Donation</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Equipment & Maintenance</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Research & Analysis</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Community Programs</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Operations</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '10%' }} />
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