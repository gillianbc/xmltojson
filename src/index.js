var fs = require('fs'),
    parseString = require('xml2js').parseString;
var Builder = require('xml2js').Builder;
var util = require('util');

fs.readFile('sample.xml', 'utf-8', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results    
    console.log(data);
    // we then pass the data to our method here
    parseString(data, function(err, result){
        if(err) console.log(err);
        // here we log the results of our xml string conversion
        console.log(JSON.stringify(result)); 
        

        console.log(util.inspect(result, {showHidden: false, depth: null}))

        

        // edit the first node’s weight and set it to 99
        result.root.graph[0].node[0].weight = "99";

        console.log(util.inspect(result, false, null, true /* enable colors */))

        // create a new builder object and then convert
        // our json back to xml.
        var builder = new Builder();
        var xml = builder.buildObject(result);
        
        fs.writeFile('edited-test.xml', xml, function(err, data){
            if (err) console.log(err);
            
            console.log("successfully written our update xml to file");
        })
    });
});  