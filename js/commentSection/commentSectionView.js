function updateViewCommentSection() {
    let html = /*HTML*/ `
    <table id="comments-table">
        <thead>
            <tr>
                <th>Comment</th>
                <th>Email</th>
                <th>Product</th>
                <th>Actions</th> <!-- Added actions column for buttons -->
            </tr>
        </thead>
        <tbody>
    `;

    model.data.comments.forEach((comment, index) => {
        html += /*HTML*/ `
            <tr>
                <td>${comment.comment}</td>
                <td>${comment.email}</td>
                <td>${model.data.products[getProductIndexById(comment.productId)].productName}</td>
                <td>
                    ${comment.read ? 
                        `<button onclick="deleteComment(${index})">Delete</button>` : 
                        `<button onclick="markAsRead(${index})">Mark as Read</button>`} <!-- Mark as Read or Delete button -->
                </td>
            </tr>
        `;
    });

    html += /*HTML*/ `
        </tbody>
    </table>
    `;

    app.innerHTML += html;
}

