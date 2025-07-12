import React, { useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const I18n = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div aria-label={t('language_selection')}>
      <h2>{t('select_language')}</h2>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label={t('language_dropdown')}
      >
        <option value="en">English</option>
        <option value="it">Italian</option>
        <option value="nl">Dutch</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="zh">Mandarin</option>
        <option value="hi">Hindi</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="bn">Bengali</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="pt">Portuguese</option>
        <option value="qu">Quechua</option>
      </select>
    </div>
  );
};

export default I18n;
