let pact = require('@pact-foundation/pact-node');

var myArgs = process.argv.slice(2);

let options = {
  pactFilesOrDirs: [`consumers/${myArgs[0]}/pacts`],
  pactBroker: 'http://localhost:9292',
  consumerVersion: myArgs[1],
  tags: ['latest']
};

pact.publishPacts(options).then(function () {
  console.log("Pacts successfully published!");
});
