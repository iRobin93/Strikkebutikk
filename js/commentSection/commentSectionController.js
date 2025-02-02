function markAsRead(index) {
    // Mark the comment as read
    model.data.comments[index].read = true;

    // Call updateViewCommentSection again to re-render the updated table
    updateView();
}

function markAsRead(index) {
    // Mark the comment as read
    model.data.comments[index].read = true;
    if (useBackend)
        putCommentInSQL(model.data.comments[index].id);
    // Call updateView again to re-render the updated table
    updateView();
}

function deleteComment(index) {
    // Ask for confirmation before deletion
    const confirmed = confirm('Er du sikker på at du vil slette kommentaren?'); // 'Are you sure you want to delete the comment?'
    
    if (confirmed) {
        // Proceed with deletion if confirmed
        if (useBackend) {
            deleteCommentFromSQL(model.data.comments[index].id);
        }
        model.data.comments.splice(index, 1);  // Remove the comment from the data array
        updateView();  // Re-render the table with the updated data
    }
}
