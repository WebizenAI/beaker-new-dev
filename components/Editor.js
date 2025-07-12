import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useTranslation } from 'react-i18next';
import './Editor.css'; // Assuming custom styles for the editor

const Editor = ({ initialCode, language, theme, diagnostics }) => {
  const [code, setCode] = useState(initialCode || '');
  const { t } = useTranslation();

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const editorDidMount = (editor, monaco) => {
    console.log(t('editor.loaded'));
    editor.focus();

    // Display diagnostics
    if (diagnostics) {
      diagnostics.forEach(diagnostic => {
        console.log(`Diagnostic: ${diagnostic.message}`);
      });
    }
  };

  return (
    <div className="editor-container" aria-label={t('editor.ariaLabel')} role="textbox">
      <MonacoEditor
        width="100%"
        height="600"
        language={language || 'javascript'}
        theme={theme || 'vs-dark'}
        value={code}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <div className="diagnostics" aria-live="polite">
        {t('editor.diagnosticsPlaceholder')}
      </div>
    </div>
  );
};

export default Editor;
