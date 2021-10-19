import { useState, useEffect } from 'react';
import RecordCard from './RecordCard';
import { fetchData } from '../helpers';

const url = 'codingtest/api/v1/festivals';

const RecordList = () => {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
  }

  const transformData = (data) => {
    // If server response returns something other than an Array, return
    if (!Array.isArray(data)) return null;

    const bandsFlat = [];
    data.forEach(({ name: festival, bands }) => {
      bands.forEach(({ name: bandName, recordLabel }) => {
        const bandIndex = bandsFlat.findIndex(band => band.name === bandName);
        // Fallback values for record label and festival names
        const labelName = recordLabel || 'Label Unavailable';
        const festName = festival || 'Festival Unavailable';

        // If band doesn't exist in the array yet, create it
        if (bandIndex < 0) {
          return bandsFlat.push({
            name: bandName,
            labels: [labelName],
            festivals: [festName],
          });
        }

        // Band does exist in array, push label and festival
        bandsFlat[bandIndex]['labels'].push(labelName);
        bandsFlat[bandIndex]['festivals'].push(festName);
      });
    });

    // Array.reduce to group by label and sort array
    const final = bandsFlat.reduce((groupedBands, band) => {
      band['labels'].forEach(label => {
        if (!groupedBands[label]) groupedBands[label] = []
        groupedBands[label].push({
          bandName: band.name,
          festivals: band.festivals.sort(),
        });
        groupedBands[label].sort((a, b) => a.bandName.localeCompare(b.bandName));
      });
      return groupedBands;
    }, {});

    return final;
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