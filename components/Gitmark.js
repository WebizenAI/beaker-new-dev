import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Table } from 'pages-ui';

const Gitmark = () => {
  const { t } = useTranslation();
  const [gitmarks, setGitmarks] = useState([]);
  const [newGitmark, setNewGitmark] = useState({ platform: '', commitHash: '', comment: '' });

  useEffect(() => {
    // Fetch existing gitmarks from API or SolidOS pod
    async function fetchGitmarks() {
      try {
        const response = await fetch('/api/gitmarks');
        const data = await response.json();
        setGitmarks(data);
      } catch (error) {
        console.error(t('errorFetchingGitmarks'), error);
      }
    }
    fetchGitmarks();
  }, [t]);

  const handleAddGitmark = async () => {
    try {
      const response = await fetch('/api/gitmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGitmark),
      });
      const data = await response.json();
      setGitmarks([...gitmarks, data]);
      setNewGitmark({ platform: '', commitHash: '', comment: '' });
    } catch (error) {
      console.error(t('errorAddingGitmark'), error);
    }
  };

  return (
    <div aria-label={t('gitmarkManager')}>
      <h1>{t('gitmarkManager')}</h1>

      <div>
        <label htmlFor="platform">{t('platform')}</label>
        <Input
          id="platform"
          value={newGitmark.platform}
          onChange={(e) => setNewGitmark({ ...newGitmark, platform: e.target.value })}
        />

        <label htmlFor="commitHash">{t('commitHash')}</label>
        <Input
          id="commitHash"
          value={newGitmark.commitHash}
          onChange={(e) => setNewGitmark({ ...newGitmark, commitHash: e.target.value })}
        />

        <label htmlFor="comment">{t('comment')}</label>
        <Input
          id="comment"
          value={newGitmark.comment}
          onChange={(e) => setNewGitmark({ ...newGitmark, comment: e.target.value })}
        />

        <Button onClick={handleAddGitmark}>{t('addGitmark')}</Button>
      </div>

      <Table
        aria-label={t('gitmarkTable')}
        data={gitmarks}
        columns={[
          { header: t('platform'), accessor: 'platform' },
          { header: t('commitHash'), accessor: 'commitHash' },
          { header: t('comment'), accessor: 'comment' },
        ]}
      />
    </div>
  );
};

export default Gitmark;
