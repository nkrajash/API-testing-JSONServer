/// <reference types ="cypress"/>

describe("Post, Get, Delete request", () => {

    let comment = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1)
    let uniquePostId = Math.floor(Math.random() * 1000 + 1)
    let postId 
    let lastId 
    let bodyString 
    let len

    it("Create a new comment", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/comments",
            body: {
                body: comment,
                postId: uniquePostId
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
    })

    it("Update the existing comment", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/comments/2",
            body: {
                body: "Where can i buy apples?",
                postId: 2
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })

    it("Locate and assert the new comment", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/comments",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let responseBody = JSON.parse(JSON.stringify(response.body));
            postId = responseBody[responseBody.length -1].postId
            bodyString = responseBody[responseBody.length -1].body
            lastId = responseBody[responseBody.length -1].id
            expect(bodyString).to.eq(comment)
            expect(postId).to.eq(uniquePostId)
            len = responseBody.length
        })
        
    })

    
    it("Delete the comment", () => {
        cy.log("length=" + len)
        //Delete the last comment
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/comments/" + len,
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
    
})