function productSiteCountButton(increase, quantity) {
    if (increase) {
        model.input.productSite.chosenCount++
    }
    else {
        if (model.input.productSite.chosenCount > 0)
            model.input.productSite.chosenCount--
    }
    updateView();
}


function addToCart() {

    if (model.input.productSite.chosenCount > 0 && model.input.productSite.colorId != "" && model.input.productSite.size != "") {
        model.input.shoppingCart.shoppingCartLines.push({
            productId: model.input.productSite.id,
            quantity: model.input.productSite.chosenCount,
            colorId: model.input.productSite.colorId,
            size: model.input.productSite.size,
        });
        model.input.productSite.chosenCount = 0;
        model.input.productSite.colorId = "";
        model.input.productSite.size = "";

        updateView();
    }

    else alert("Du må velge noe innenfor alternativene!")

    
}


function getNewCommentId() {
    let newId
    if (model.data.comments.length == 0)
      newId = 0;
    else
      newId = Math.max(...model.data.comments.map(commentObject =>commentObject.id)) + 1;
    return newId;
  }

  async function submitComment() {
    const userText = model.input.productSite.comment;
    const userEmail = model.input.productSite.email;
    let commentObject = { comment: model.input.productSite.comment, email: model.input.productSite.email, productId: model.input.productSite.id };
    if (userText && userEmail) {
        if (useBackend) {
            await postCommentToSQL(commentObject);
            readFromSqlAndUpdateView(false);
        }

        else {
            commentObject.id = getNewCommentId();
            model.data.comments.push(commentObject);
            updateView();
        }
        

        alert("Kommentar: " + userText + "\nE-post: " + userEmail); // Here, you can replace this with actual form submission logic
        model.input.productSite.comment = "";
        model.input.productSite.email = "";

    } else {
        alert("Vennligst skriv både kommentar og e-post før du sender.");
    }

    
}