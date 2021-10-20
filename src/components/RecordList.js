import { useState, useEffect } from 'react';
import RecordCard from './RecordCard';
import { fetchData, transformData } from '../helpers';

const url = 'codingtest/api/v1/festivals';

const RecordList = () => {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
  }

  useEffect(() => {
    fetchData(url).then(response => {
      if (response.status === 'success') {
        const transformedData = transformData(response.data);
        setData(transformedData);
      }
      else {
        console.error(response.error);
      }
    })
  }, [refresh]);

  const renderCardList = (labelData) => {
    const recordLabels = Object.entries(labelData).sort((a, b) => a[0].localeCompare(b[0]));

    return (
      <div className={'record-list'}>
        {recordLabels.map(recordLabel => <RecordCard key={recordLabel[0]} recordLabel={recordLabel} />)}
      </div>
    );
  }

  return data ? renderCardList(data) : <h2>There was an error loading this content, <a href={'/'} onClick={handleRefresh}>click here to retry.</a></h2>
}

export default RecordList;