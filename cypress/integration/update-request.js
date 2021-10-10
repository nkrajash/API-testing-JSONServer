/// <reference types ="cypress"/>

describe("Update request", () => {
    var result;

    it("Update an existing post via /posts API", () => {
        //Make an HTTP Request with a specific method.
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/posts/6",
            body: {
                title: "Where can i buy apples?",
                author: "Tom Jones"
            }
        }).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.title).to.eql("Where can i buy apples?")
            expect(response.body.author).to.eql("Tom Jones")
            expect(response.body.id).to.equal(6)
        })
    })
})