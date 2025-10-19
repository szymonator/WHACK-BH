import prince from '../assets/prince.png';

// --- Reusable Component 1: Product Info ---
// Displays the product's image, name, and price. Safely handles missing data.
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

// --- Reusable Component 2: Analysis Results ---
// Displays a list of analysis points. It will not crash.
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

// --- The Main Results Page Component ---
// This now handles all 3 data types from your backend.
export function ResultsPage(json) {

  // We use optional chaining (?.) everywhere to prevent crashes.
  // If `json` is null or a property is missing, it will show 'N/A' instead of breaking.

  // Case 1: The response is from an eBay URL
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

  // Case 2: The response is from an Amazon URL
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

  // Case 3: The response is for a random (non-Amazon/eBay) URL
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

  // Fallback Case: If the type is unknown or the data is malformed
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