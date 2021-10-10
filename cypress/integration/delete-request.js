/// <reference types ="cypress"/>

describe("Delete request", () => {
    var result;

    it("Delete a post via /posts API", () => {
        //Make an HTTP Request with a specific method.
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/7",
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})