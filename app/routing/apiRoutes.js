//gets data from the stored friends object
var friends = require("../data/friend.js");

//gets routes to process
module.exports = function(app) {
    // API GET Requests
    // route host:port/api/friends will return the array of friends with their scores
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });


    // API POST Requests
    // Below code handles when a user submits their survey and will compare their
    //results with all the others and will find the friend with the closest answers
    //result will return the best match
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        // declare variables needed
        var last = friends.length;
        friends.push(req.body);
        var total = 0;
        var bestMatchScore = 60;
        bestFriend = 0;
        //this will loop through each friend to determine the closest match
        for (i = 0; i < last; i++) {
            //new total for each friend
            total = 0;
            //loops through each answers and adds to total to get an overall score
            for (j = 0; j < 10; j++) {
                a = Math.abs(friends[i].scores[j] - friends[last].scores[j]);
                total = total + a;
            }
            // before it loops through next friend it will verify if they are the cloest match
            //if best match then save the location
            if (total < bestMatchScore) {
                bestMatchScore = total;
                bestFriend = i;
            }

        }
        //return the best match
        res.json(friends[bestFriend]);
    });
}