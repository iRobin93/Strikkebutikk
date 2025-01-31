async function deleteProduct(id){
    index = getProductIndexById(id);
    if (index >= 0) {
        if (useBackend)
            await deleteProductFromSQL(model.data.products[index].id);
        model.data.products.splice(index, 1)
    }
    
    if (useBackend)
        readFromSqlAndUpdateView(false);
    else
        updateView();

}