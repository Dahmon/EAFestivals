const RecordCard = ({ recordLabel }) => {
  const [label, bands] = recordLabel;

  return (
    <div className={'label-card'}>
      <h2>{label}</h2>
      {bands.map(band => {
        const {bandName, festivals} = band;

        return (
          <div key={bandName} className={'label-card__band'}>
            <h3>{bandName} featured at:</h3>
            <ul>
              {festivals.map(festival => <li key={festival}><i>{festival}</i></li>)}
            </ul>
          </div>
        );
      })}
    </div>
  )
}

export default RecordCard;