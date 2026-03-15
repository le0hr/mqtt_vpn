import { Card } from '../components/ui/card';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();
  // add statistic fetching
  const stats = [
    { icon: Users, label: t('aboutPage.stats.activeMonitors'), value: 'placeholder' },
    { icon: Target, label: t('aboutPage.stats.dataPoints'), value: 'placeholder' },
    { icon: Award, label: t('aboutPage.stats.yearsOperating'), value: 'placeholder' },
    { icon: TrendingUp, label: t('aboutPage.stats.accuracyRate'), value: 'placeholder'},
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t('aboutPage.heroTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-600">
            {t('aboutPage.heroDescription')}
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
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('aboutPage.missionTitle')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('aboutPage.missionText1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('aboutPage.missionText2')}
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('aboutPage.technologyTitle')}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('aboutPage.technologyText1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('aboutPage.technologyText2')}
            </p>
          </Card>
        </div>

        {/* Team Section */}
        <Card className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('aboutPage.teamTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('aboutPage.teamText1')}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutPage.teamText2')}
          </p>
        </Card>
      </div>
    </div>
  );
}