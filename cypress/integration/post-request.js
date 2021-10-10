/// <reference types ="cypress"/>

describe("Post request", () => {
    var result;
    var titleOfPosts = new Array()

    it("Create a new post via /posts API", () => {
        result = cy.request("http://localhost:3000/posts")
        //Make an HTTP Request with a specific method.
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                title: "Want to learn Automation Testing?",
                author: "Sarah Jones"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
            expect(response.body.title).to.eql("Want to learn Automation Testing?")
            expect(response.body.author).to.eql("Sarah Jones")
            //expect(response.body.id).to.equal(11)
        })
        result.its("status").should("equal", 201)
    })

    it("Validate title of latest post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            body.forEach(function (item) {
                titleOfPosts.push(item["title"])
            })
        }).then(() => {
            var latestPost = titleOfPosts[titleOfPosts.length - 1]
            expect(latestPost).to.eq("Want to learn Automation Testing?")
        })
    })
})