

import prince from '../assets/prince.png'
import princeGood from '../assets/prince_good.png'
import princeBad from '../assets/prince_bad.png'
import princeMiddle from '../assets/prince_middle.png'

export function ResultsPage(json) {


    function pickPrince(number) {
        if(number >= 75)
            return princeGood;
        else if(number >= 50)
            return princeMiddle;
        else return princeBad;
    }

    // creates a rating box. needs title, score and a list of data to display
    function RatingBox(name,score, infoList) {
    return <div className='Panel'>


        <img className="panelImg" src={pickPrince(score)}></img>
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


    {RatingBox("Ratebud",json.rateBudData.score, [`Score: ${json.rateBudData.score}`,`Authenticity: ${json.rateBudData.authenticity}`])}

  </div>;
  
}


