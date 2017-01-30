/**
 * Created by garusis on 29/01/17.
 */
describe("Index", function () {
    describe("#[GET]/", function () {
        it("should get a 200 OK response", function () {
            return agent
                .get('/')
                .expect(200)
                .then(function (data) {
                })
        })
    })
})
