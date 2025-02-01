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
    // Remove the comment from the data array
    if(useBackend)
        deleteCommentFromSQL(model.data.comments[index].id);
    model.data.comments.splice(index, 1);

    // Call updateView again to re-render the updated table
    updateView();
}
