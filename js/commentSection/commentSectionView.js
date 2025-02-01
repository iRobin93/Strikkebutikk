function updateViewCommentSection(){
    html = /*HTML*/ `
    <table id="comments-table">
            <thead>
            <tr>
                <th>Comment</th>
                <th>Email</th>
                <th>Product</th>
                
            </tr>
            </thead>
            <tbody>
    
    `;


    model.data.comments.forEach(comment =>{


        html += /*HTML*/ `
            <tr>
            <!-- Comments will be injected here -->
            <td>${comment.comment}</td>
            <td>${comment.email}</td>
            <td>${model.data.products[getProductIndexById(comment.productId)].productName}</td>
            </tr>
        `;
    })
    html += /*HTML*/ `
    </tbody>
    </table>
    `;

    
    app.innerHTML += html;

}