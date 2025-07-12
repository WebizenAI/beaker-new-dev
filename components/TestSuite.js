import React from 'react';
import i18next from 'i18next';

const TestSuite = ({ testResults }) => {
  return (
    <div aria-label={i18next.t('testSuite.ariaLabel')} role="table">
      <h1>{i18next.t('testSuite.title')}</h1>
      <table>
        <thead>
          <tr>
            <th>{i18next.t('testSuite.testName')}</th>
            <th>{i18next.t('testSuite.status')}</th>
            <th>{i18next.t('testSuite.duration')}</th>
            <th>{i18next.t('testSuite.error')}</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result, index) => (
            <tr key={index} aria-label={i18next.t('testSuite.rowAriaLabel', { testName: result.testName })} role="row">
              <td role="cell">{result.testName}</td>
              <td role="cell">{result.status}</td>
              <td role="cell">{result.duration}</td>
              <td role="cell">{result.error || i18next.t('testSuite.noError')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div aria-label={i18next.t('testSuite.i18nResultsAriaLabel')} role="region">
        <h2>{i18next.t('testSuite.i18nResultsTitle')}</h2>
        {testResults.filter(result => result.testName.includes('i18n')).map((i18nResult, index) => (
          <div key={index} aria-label={i18next.t('testSuite.i18nResultAriaLabel', { testName: i18nResult.testName })}>
            <p>{i18next.t('testSuite.testName')}: {i18nResult.testName}</p>
            <p>{i18next.t('testSuite.status')}: {i18nResult.status}</p>
            <p>{i18next.t('testSuite.duration')}: {i18nResult.duration}</p>
            <p>{i18next.t('testSuite.error')}: {i18nResult.error || i18next.t('testSuite.noError')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSuite;
