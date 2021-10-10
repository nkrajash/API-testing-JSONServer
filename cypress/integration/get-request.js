/// <reference types ="cypress"/>

describe("Get request" , ()=> {
    var result;
    it("Validate status code of the /posts API" , () => {
        result = cy.request("http://localhost:3000/posts")
        //Make an HTTP Request with a specific method.
        result.its("status").should("equal",200)
    })

    it("Validate /posts API contains the correct keys and values" , () => {
        cy.request({
            method :"GET",
            url:"http://localhost:3000/posts",
            headers : {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)

            expect(body[0]).has.property("title","Example JSON-Server")
            expect(body[0]).has.property("author","Naveen Kumar R")
            expect(body[1]).has.property("author","Sharath Kumar R")
            body.forEach(function(item){
                expect(item).to.have.all.keys("id","title","author")
                cy.log("Author:"+ item["author"] + " & Title:" + item["title"])
            })
        })
    })

})