exports.fetchData = async (fetchUrl) => {
  try {
    const res = await fetch(fetchUrl);
    if (res.ok) {
      const data = await res.json();
      return {
        status: 'success',
        data,
      };
    }

    throw new Error(res.statusText);
  }
  catch (error) {
    return {
      status: 'error',
      error,
    };
  }
};

exports.transformData = (data) => {
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
      if (!bandsFlat[bandIndex]['labels'].includes(labelName)) bandsFlat[bandIndex]['labels'].push(labelName);
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

  console.log(final)

  return final;
}