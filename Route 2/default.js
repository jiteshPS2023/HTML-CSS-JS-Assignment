
window.onload = (event) => {  
  showHTML('asc');
};
function LoadJson(obj){
  console(obj.length);
}
function showHTML(sortType){     
  fetch('./sample.json')
  .then((response) => response.json())
  .then(function(data){
    if(data.length>0)
    {        
        let gridViewDiv = document.getElementById('gridViewDiv');
        let listViewDiv = document.getElementById('listViewDiv');
        let btnPriceAsc = document.getElementById('btnPriceAsc');
        let btnPriceDesc = document.getElementById('btnPriceDesc');
        
        //Sort data
      if(sortType=="asc")
      {
        btnPriceDesc.classList.remove('active');
        btnPriceAsc.classList.add('active');
        data.sort(function(a, b){
            return a.price - b.price;
        });
      }else if(sortType=="desc")
      {
        btnPriceDesc.classList.add('active');
        btnPriceAsc.classList.remove('active');
        data.sort(function(a, b){
          return b.price - a.price;
        });
      }


        var rawHtml= [];
        rawHtml.push('<div class="row">');
        for(let i=0; i<data.length; i++)
        {    
          let html = `<div class="col-md-3">
          <div class="card">
              <div class="card-body">
                <h5 class="card-title">`+data[i].title+`</h5>
                <p class="card-text">`+data[i].description+`</p>
                <span class="badge bg-secondary mb-2">Price: `+data[i].price+`</span>
                <a href="#" class="btn btn-primary">`+data[i].buttonText+`</a>
              </div>
            </div>
          </div>`;

          rawHtml.push(html);
        }
        rawHtml.push('</div>');

        gridViewDiv.innerHTML = rawHtml.join("");
        listViewDiv.innerHTML = rawHtml.join("").replace(/col-md-3/g, 'col-md-6');
    }
  });
}

function showGrid(){
    var listViewDiv = document.getElementById('listViewDiv');
    var gridViewDiv = document.getElementById('gridViewDiv');

    if(!listViewDiv.classList.contains("d-none"))
    {
      listViewDiv.classList.add("d-none");
    }
    if((gridViewDiv.classList.contains("d-none")))
    {
      gridViewDiv.classList.remove("d-none");
    }
  }

  function showList(){
    var listViewDiv = document.getElementById('listViewDiv');
    var gridViewDiv = document.getElementById('gridViewDiv');

    if(!(gridViewDiv.classList.contains("d-none")))
      {
        gridViewDiv.classList.add("d-none");
      }
      if(listViewDiv.classList.contains("d-none"))
      {
        listViewDiv.classList.remove("d-none");
      }
  }