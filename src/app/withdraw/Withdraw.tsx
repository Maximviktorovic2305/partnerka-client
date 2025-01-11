/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import WithdrawsHistoryTabs from '@/components/withdraws/WithdrawsHistoryTabs';
import WithdrawsTabs from '@/components/withdraws/WithdrawsTabs';
import WithdrawTabsStatistics from '@/components/withdraws/WithdrawTabsStatistics';
import { useUserUnautorized } from '@/hooks/useUserUnautorized';
import { useState, useEffect, useRef } from 'react';

const Leads = () => {
  const [activeTab, setActiveTab] = useState('statistics'); // Изменено на 'statistics'
  const [underlineStyle, setUnderlineStyle] = useState({});
  const underlineRef = useRef(null);
  const statisticsRef = useRef(null);
  const withdrawRef = useRef(null);
  const withdrawsHistoryRef = useRef(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <WithdrawTabsStatistics />;
      case 'withdraws':
        return <WithdrawsTabs />;
      case 'withdrawsHistory':
        return <WithdrawsHistoryTabs />;
      default:
        return null;
    }
  };

  useUserUnautorized();

  useEffect(() => {
    const activeRef =
      activeTab === 'statistics'
        ? statisticsRef.current
        : activeTab === 'withdraws'
        ? withdrawRef.current
        : withdrawsHistoryRef.current;

    if (activeRef) {
      setUnderlineStyle({
        // @ts-ignore
        width: activeRef.offsetWidth,
        // @ts-ignore
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [activeTab]);

  return (
    <div className='transition-all duration-300'>
      <div className='text-[30px] font-bold text-blue2 text-left mb-5 ml-6'>Выплаты</div>
      <div className="relative flex items-center justify-start ml-3 text-blue1 text-xl transition-all duration-300">
        <button 
          ref={statisticsRef}
          className={`p-3 transition-all duration-300 ${activeTab === 'statistics' ? 'text-blue1' : 'text-blue2'}`} 
          onClick={() => setActiveTab('statistics')} 
        >
          Статистика
        </button>
        <button 
          ref={withdrawRef} 
          className={`p-3 transition-all duration-300 ${activeTab === 'withdraws' ? 'text-blue1' : 'text-blue2'}`} 
          onClick={() => setActiveTab('withdraws')} 
        >
          Заявки на выплату
        </button>
        <button 
          ref={withdrawsHistoryRef}
          className={`p-3 transition-all duration-300 ${activeTab === 'withdrawsHistory' ? 'text-blue1' : 'text-blue2'}`} 
          onClick={() => setActiveTab('withdrawsHistory')}
        >
          История выплат
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
    </div>
  );
};

export default Leads;
