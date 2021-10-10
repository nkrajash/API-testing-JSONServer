/// <reference types ="cypress"/>

describe("Post request", () => {
    var result;
    var titleOfPosts = new Array()
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1)

    it("Create a new post via /posts API", () => {
        result = cy.request("http://localhost:3000/posts")
        //Make an HTTP Request with a specific method.
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                title: randomTitle,
                author: "Sarah Jones"
            }
        }).then(response => {
            expect(response.status).to.eql(201)
            expect(response.body.title).to.eql(randomTitle)
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
            expect(latestPost).to.eq(randomTitle)
        })
    })
})