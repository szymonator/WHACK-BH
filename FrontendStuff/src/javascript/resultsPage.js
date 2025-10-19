import prince from '../assets/prince.png';


function ProductInfoPanel({ name, picture, price }) {
  return (
    <div className='Panel'>
      <span>
        <img className="panelImg" src={picture || prince} alt={name || 'Product'} />
        <h2>
          Name: {name || 'Name not found'}
        </h2>
        <p>
          {price || 'Price not found'}
        </p>
      </span>
    </div>
  );
}


function RatingBox({ name, infoList }) {
  if (!infoList || !Array.isArray(infoList)) {
    return null; 
  }
  return (
    <div className='Panel'>
        <h2>{name}</h2>
        <div>
            {infoList.map((dataString, index) => (
                <p key={index}>{dataString}</p>
            ))}
        </div>
    </div>
  );
}

export function ResultsPage(json) {


  // The response is from an eBay URL
  if (json?.type === 'ebay') {
    const ebayScraperData = [
      `Overall Review Sentiment: ${json.ebayScraperAnalysis?.commentResult || 'N/A'}`,
      `Authenticity: ${json.ebayScraperAnalysis?.authenticity || 'N/A'}`
    ];

    return (
      <div className='PanelList'>
        <h2>Here's what we found out for this eBay item.</h2>
        <ProductInfoPanel 
          name={json.productName}
          picture={json.productPicture}
          price={json.productPrice}
        />
        <RatingBox name="Ebay Scraper Analysis" infoList={ebayScraperData} />
      </div>
    );
  }

  // The response is from an Amazon URL
  else if (json?.type === 'amazon') {
    const rateBudData = [
        `Score: ${json.rateBudData?.score || 'N/A'}`,
        `Authenticity: ${json.rateBudData?.authenticity || 'N/A'}`,
        `Recommendation: ${json.rateBudData?.['recommended?'] || 'N/A'}`,
        `Number of Reviews Analyzed: ${json.rateBudData?.numOfReviews || 'N/A'}`
    ];

    return (
        <div className='PanelList'>
            <h2>Here's what we found out for this Amazon item.</h2>
            <ProductInfoPanel 
              name={json.productName}
              picture={json.productPicture}
              price={json.productPrice}
            />
            <RatingBox name="RateBud Analysis" infoList={rateBudData} />
        </div>
    );
  }

  // The response is for a random URL
  else if (json?.type === 'random') {
    const scamAdviserData = [
        `Trust Score: ${json.scamAdviserScore || 'N/A'}`
    ];
    
    return (
        <div className='PanelList'>
            <h2>Here's what we found out for this website.</h2>
            <RatingBox name="Scam Adviser Analysis" infoList={scamAdviserData} />
        </div>
    );
  }

  // Fallback Case
  else {
    return (
        <div className='PanelList'>
            <h2>Sorry, something went wrong.</h2>
            <p>We couldn't analyze this URL. The data received was in an unexpected format.</p>
            <pre style={{textAlign: 'left', background: '#333', padding: '1em', borderRadius: '8px', fontSize: '12px'}}>
              {JSON.stringify(json, null, 2)}
            </pre>
        </div>
    );
  }
}