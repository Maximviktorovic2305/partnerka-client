/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { LeadsTabsContent } from '@/components/leads/tabs/LeadsTabsContent';
import StatisticsTabsContent from '@/components/leads/tabs/StatisticsTabsContent';
import { useGetCurrentPartner } from '@/hooks/useGetCurrentPartner';
import { useUserUnautorized } from '@/hooks/useUserUnautorized';
import { useState, useEffect, useRef } from 'react';

const Leads = () => {
  const partner = useGetCurrentPartner()

  const [activeTab, setActiveTab] = useState('leads');
  const [underlineStyle, setUnderlineStyle] = useState({});
  const underlineRef = useRef(null);
  const leadsRef = useRef(null);
  const statisticsRef = useRef(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return <LeadsTabsContent partner={partner} />;
      case 'statistics':
        return <StatisticsTabsContent partner={partner} />;
      default:
        return null;
    }
  };

  useUserUnautorized()

  useEffect(() => {
    const activeRef = activeTab === 'leads' ? leadsRef.current : statisticsRef.current;

    if (activeRef) {
      setUnderlineStyle({
         // @ts-ignore
        width: activeRef.offsetWidth,
         // @ts-ignore
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [activeTab]);

  if (typeof window === 'undefined') {
    return
  }

  return (
    <section className='transition-all duration-300'>
      <div className="relative flex items-center justify-start ml-3 text-blue1 text-xl transition-all duration-300">
        <button
          ref={leadsRef}
          className={`p-3 transition-all duration-300 ${activeTab === 'leads' ? 'text-blue1' : 'text-blue2'}`}
          onClick={() => setActiveTab('leads')}
        >
          Лиды
        </button>
        <button
          ref={statisticsRef}
          className={`p-3 transition-all duration-300 ${activeTab === 'statistics' ? 'text-blue1' : 'text-blue2'}`}
          onClick={() => setActiveTab('statistics')}
        >
          Статистика
        </button>

        <div
          ref={underlineRef}
          className="absolute h-[3px] bg-blue1 mt-10 transition-all duration-200"
          style={underlineStyle}
        />
      </div>
      <div className="transition-all duration-300">
        {renderContent()}
      </div>
    </section>
  );
};

export default Leads;