function pushNewPattern(){
    let newId = Math.max(...model.data.pattern.map(patternObject => patternObject.id)) + 1;
    model.data.pattern.push({id: newId, name: model.input.assortment.pattern.name, path: "path"});
    model.input.assortment.pattern.name = "";
    updateView();
}

function removePattern(){
    let element = document.getElementById('pattern0')
    let patternId = 1;
    while(element){
        element = document.getElementById('pattern' + patternId)
        patternId++
        
        if(element.classList.contains('bordered')){
            
            model.data.pattern.findIndex(element.dataset.patternid)
        }
    }
        
    

}

function patternClicked(element){
    let test = document.getElementById('test')


    element.classList.toggle('bordered');
}