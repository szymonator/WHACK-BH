

import prince from '../assets/prince.png'
import princeGood from '../assets/prince_good.png'
import princeBad from '../assets/prince_bad.png'
import princeMiddle from '../assets/prince_middle.png'

export function ResultsPage(json) {

    // creates a rating box. needs title, score and a list of data to display
    function RatingBox(name, infoList) {
      return <div className='Panel'>
          <h2>
              {name}
          </h2>
          <p>
              {infoList.map((dataString => <p> {dataString} <br></br></p>)  )}
          </p>
      </div>;
}




  return <div className='PanelList'>

    <h2> Heres what we found out.</h2>

    <div className='Panel'>

      <span>
        <img className="panelImg" src={json.productPicture}></img>
        <h2>
          Name: {json.productName}

        </h2>
        <p>
          {json.productPrice}
        </p>
        <a href={json.productLink}>
          product Link
        </a>
      </span>
    </div>


    {/* {RatingBox("Ratebud",json.rateBudData.score, [`Score: ${json.rateBudData.score}`,`Authenticity: ${json.rateBudData.authenticity}`])} */}
    {RatingBox("Ebay Scraper", json.ebayScraperAnalysis.commentResult, [`Overall Review Sentiment: ${json.ebayScraperAnalysis.commentResult}` ,`Authenticity: ${json.ebayScraperAnalysis.authenticity}`]
    )}
  </div>;
  
}


