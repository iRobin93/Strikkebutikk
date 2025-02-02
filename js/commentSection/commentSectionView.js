function updateViewCommentSection() {
    let html = /*HTML*/ `
    <table id="comments-table">
        <thead>
            <tr>
                <th>Kommentar</th>
                <th>Email</th>
                <th>Produkt</th>
                <th>Lest</th> <!-- Column for buttons -->
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
                    <div style="display: flex; gap: 10px;"> <!-- Flexbox to manage button layout -->
                        ${comment.read ? 
                            `<button onclick="deleteComment(${index})">Slett</button>` : 
                            `<button onclick="markAsRead(${index})">Marker som lest</button>`} <!-- Mark as Read button if not read -->
                    </div>
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