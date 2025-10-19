import prince from '../assets/prince.png'
import princeGood from '../assets/prince_good.png'
import princeBad from '../assets/prince_bad.png'
import princeMiddle from '../assets/prince_middle.png'

// A React component to display a single rating panel.
// It takes 'props' as an argument, which is an object containing 'name' and 'infoList'.
function RatingBox({ name, infoList }) {
  // We add a check here to be 100% crash-proof.
  if (!infoList) {
    return null; // Don't render anything if the data isn't there
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

// The main ResultsPage component. It receives the 'json' data as a prop.
export function ResultsPage(json) {

  // Prepare the data array for the RatingBox component.
  // This is a safe way to handle potentially missing data.
  const ebayScraperData = [
    `Overall Review Sentiment: ${json?.ebayScraperAnalysis?.commentResult || 'N/A'}`,
    `Authenticity: ${json?.ebayScraperAnalysis?.authenticity || 'N/A'}`
  ];

  return (
    <div className='PanelList'>
      <h2>Here's what we found out.</h2>

      <div className='Panel'>
          <span>
              <img className="panelImg" src={json.productPicture} alt={json.productName} />
              <h2>
                  Name: {json.productName}
              </h2>
              <p>
                  {json.productPrice}
              </p>
              <a href={json.productLink} target="_blank" rel="noopener noreferrer">
                  Product Link
              </a>
          </span>
      </div>

      {/* --- THIS IS THE CRITICAL FIX --- */}
      {/* We are now rendering the RatingBox component using proper JSX syntax. */}
      {/* We pass the 'name' and 'infoList' as props, like HTML attributes. */}
      <RatingBox name="Ebay Scraper Analysis" infoList={ebayScraperData} />

    </div>
  );
}