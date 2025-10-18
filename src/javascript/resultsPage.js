export function ResultsPage(json) {
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


    <div className='Panel'>


      <img className="panelImg" src={json.productPicture}></img>
      <h2>
        RateBud
      </h2>
      <p>
        Score: {json.rateBudData.score} <br></br>
        Authenicity: {json.rateBudData.authenticity}
      </p>

    </div>

  </div>;
}
