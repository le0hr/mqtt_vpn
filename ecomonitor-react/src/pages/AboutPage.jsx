import { Card } from '../components/ui/card';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { icon: Users, label: 'Active Monitors', value: '150+' },
    { icon: Target, label: 'Data Points/Day', value: '50K+' },
    { icon: Award, label: 'Years Operating', value: '8' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '99.2%' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">About Air Quality Monitor</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Dedicated to providing real-time, accurate air quality data to protect public health
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-8 md:mb-12 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1674307130741-bed3d812b680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBxdWFsaXR5JTIwbW9uaXRvcmluZyUyMHNjaWVudGlzdHN8ZW58MXx8fHwxNzcyNTc0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Air quality monitoring"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <stat.icon className="size-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe everyone deserves to breathe clean air. Our mission is to provide accessible,
              real-time air quality data to communities across New York City, empowering residents to
              make informed decisions about their health and environment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through our network of advanced monitoring stations, we track multiple pollutants including
              particulate matter, nitrogen oxides, carbon monoxide, and ozone levels, providing comprehensive
              insights into the air quality across all five boroughs.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Technology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We deploy state-of-the-art sensors and monitoring equipment that measure air pollutants
              with precision and accuracy. Our technology captures data every minute, ensuring you have
              access to the most current information about air quality in your area.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All data is processed through advanced algorithms and validated by environmental scientists
              to ensure reliability. Our commitment to accuracy and transparency makes us a trusted
              source for air quality information.
            </p>
          </Card>
        </div>

        {/* Team Section */}
        <Card className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our team consists of environmental scientists, data engineers, public health experts, and
            community advocates who are passionate about environmental justice and public health.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Together, we work to ensure that every New Yorker has access to the information they need
            to protect themselves and their families from air pollution.
          </p>
        </Card>
      </div>
    </div>
  );
}