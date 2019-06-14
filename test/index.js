var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
chai.use(chaiHttp);

///...

describe ("CRUD OPERATIONS", function(){



        it("Should add user to the db", (done) => {

                  const user = {
                      "username": "Kim",
                      "password": "Node JS",

                  }
              chai.request(server)
                  .post("/api/users/signup/")
                  .send(user)
                  .end((err, res) => {
                      res.should.have.status(201);

                  })
          done()
        });

        it ("Should Fecth all the users", (done)=>{
           chai.request(server)
               .get("/api/users/")
               .end((err, result)=>{
                   result.should.have.status(200);

                   done()
               })
       });

        it ("Should Fecth a single user", (done)=>{
           chai.request(server)
               .get("/api/users/7004")
               .end((err, result)=>{
                   result.should.have.status(200);
                   done()
               })
       });


       it ("Should Update Partcular user Only", (done)=>{
         const updatedUser = {
             "username": "Kim",
             "password": "Node JS",

         }
           chai.request(server)
               .put("/api/users/7004/")
               .send(updatedUser)
               .end((err, result)=>{
                   result.should.have.status(204)
                   done()
               })
       });

       it("Should Delete Particular User", (done)=>{
            chai.request(server)
                .delete("/api/users/7004/")
                .end((err, result)=>{
                    result.should.have.status(204)
                    done()
                })
        });


        it("Should add property to the db", (done) => {
          const property = {
              "propertyName": "toyota",
              "propertyType": "vitz",

          }

              chai.request(server)
                  .post("/api/properties/post-property/")
                  .send(property)
                  .end((err, res) => {
                      res.should.have.status(201);

                  })
          done()
        });


       it ("Should Fecth all the properties", (done)=>{
          chai.request(server)
              .get("/api/properties/")
              .end((err, result)=>{
                  result.should.have.status(200);

                  done()
              })
      });

      it ("Should Fecth a single property", (done)=>{
         chai.request(server)
             .get("/api/properties/1936/")
             .end((err, result)=>{
                 result.should.have.status(200);

                 done()
             })
     });

     it ("Should Update Partcular Property Only", (done)=>{
       const updatedProperty = {
           "propertyName": "Kim",
           "propertyType": "Node JS",

       }
         chai.request(server)
             .put("/api/properties/1936/")
             .send(updatedProperty)
             .end((err, result)=>{
                 result.should.have.status(204)
                 done()
             })
     });

     it("Should Delete Particular Property", (done)=>{
          chai.request(server)
              .delete("/api/properties/1936/")
              .end((err, result)=>{
                  result.should.have.status(204)
                  done()
              })
      });
 })
