import prince from '../assets/prince.png'
import princeGood from '../assets/prince_good.png'
import princeBad from '../assets/prince_bad.png'
import princeMiddle from '../assets/prince_middle.png'

// Reusable component for displaying analysis panels.
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

// The main ResultsPage component.
export function ResultsPage(json) {

  // Case 1: The response is from an eBay URL
  if (json.type === 'ebay') {
    const ebayScraperData = [
      `Overall Review Sentiment: ${json.ebayScraperAnalysis?.commentResult || 'N/A'}`,
      `Authenticity: ${json.ebayScraperAnalysis?.authenticity || 'N/A'}`
    ];

    return (
      <div className='PanelList'>
        <h2>Here's what we found out for this eBay item.</h2>
        
        <div className='Panel'>
            <span>
                <img className="panelImg" src={json.productPicture} alt={json.productName} />
                <h2>
                    Name: {json.productName || 'Name not found'}
                </h2>
                <p>
                    {json.productPrice || 'Price not found'}
                </p>
            </span>
        </div>

        <RatingBox name="Ebay Scraper Analysis" infoList={ebayScraperData} />
      </div>
    );
  }

  // Case 2: The response is from an Amazon URL (Updated)
  else if (json.type === 'amazon') {
    // --- THIS IS THE UPDATED PART ---
    // Prepare an array with all the new data fields.
    // We use bracket notation ['recommended?'] to access the key with a special character.
    const rateBudData = [
        `Score: ${json.rateBudData?.score || 'N/A'}`,
        `Authenticity: ${json.rateBudData?.authenticity || 'N/A'}`,
        `Recommendation: ${json.rateBudData?.['recommended?'] || 'N/A'}`,
        `Number of Reviews Analyzed: ${json.rateBudData?.numOfReviews || 'N/A'}`
    ];

    return (
        <div className='PanelList'>
            <h2>Here's what we found out for this Amazon item.</h2>
            <RatingBox name="RateBud Analysis" infoList={rateBudData} />
        </div>
    );
  }

  // Case 3: The response is for a random (non-Amazon/eBay) URL
  else if (json.type === 'random') {
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

  // Fallback Case: If the type is unknown or missing
  else {
    return (
        <div className='PanelList'>
            <h2>Sorry, something went wrong.</h2>
            <p>We couldn't analyze this URL. The data received was in an unexpected format.</p>
        </div>
    );
  }
}