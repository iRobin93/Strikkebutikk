function updateViewAssortment(){
    app.innerHTML += /*HTML*/ ` 
        <div class="sortimentText">Sortiment</div>
        <div class="assortmentContainer">
        <div>Garn:</div> 
        <div>Mønster</div>
        
        <div class="assortmentYarn">${model.data.assortment[0].id} </div>
        <div class="assortmentYarn">${model.data.assortment[0].id} </div>
        </div>

        <div class="assortmentContainer2">
        <div class="assortmentInput"> <input type="text"> </div>
        <div> <button>+</button></div>
        <div> <button>-</button></div>
        <div class="assortmentInput"> <input type="text"> </div>
        <div> <button>+</button></div>
        <div> <button>-</button></div>
        </div>
    `;
}