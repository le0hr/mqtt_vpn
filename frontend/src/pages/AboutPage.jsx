import { Card } from '../components/ui/card';
import { Target, Users, Award, Github, Mail, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();
  // TODO: 
  // add statistic fetching
  const stats = [
    { icon: Users, label: t('aboutPage.stats.activeMonitors'), value: '1' },
    { icon: Target, label: t('aboutPage.stats.dataPoints'), value: '0' },
    { icon: Award, label: t('aboutPage.stats.yearsOperating'), value: '0' },
    // { icon: TrendingUp, label: t('aboutPage.stats.accuracyRate'), value: 'unmeasured'},
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
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className="p-6 text-center flex flex-col items-center justify-center min-w-[200px] flex-1 max-w-[350px]"
            >
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
        <Card className="p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t('aboutPage.teamTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('aboutPage.teamText1')}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutPage.teamText2')}
          </p>
        </Card>
         {/* Social Media Card */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-xl md:text-2xl font-bold mb-2">{t('joinPage.social.title')}</h2>
              <p className="text-gray-600">{t('joinPage.social.description')}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              {[
                { Icon: Mail, label: t('joinPage.social.gmail'), href: "mailto:lev.hrabovij@email.com" },
                { Icon: Instagram, label: t('joinPage.social.instagram'), href: "https://www.instagram.com/1evhr/" },
                { Icon: Github, label: t('joinPage.social.github'), href: "https://github.com/le0hr" },
              ].map(({ Icon, label, href }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  <Icon className="size-5 shrink-0" /> 
                  <span className="whitespace-nowrap">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );


}