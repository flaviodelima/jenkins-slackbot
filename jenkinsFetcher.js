async function fetchJennkinsData(){
  //mock implementation that uses json exported from http://{jenkins_location}/blue/rest/organizations/jenkins/pipelines/
  const json_response = require('./json_response_from_jenkins.json')
  return json_response;
}

async function pipelinesData(){
  const pipelines = await fetchJennkinsData();
  
  const pipelinesData = [];
  pipelines.forEach(pipeline =>{
    const {fullDisplayName, fullName, weatherScore, latestRun} = pipeline;
    const {durationInMillis, estimatedDurationInMillis, state, changeSet} = latestRun|| {};
    //const {author.fullName, msg, url} = changeSet[0];
  
    pipelinesData.push({
      fullDisplayName,
      fullName,
      weatherScore,
      latestRun: {
        durationInMillis,
        estimatedDurationInMillis,
        state,
        changeSet
      }
    })
  })

  return pipelinesData;
}

module.exports = {pipelinesData}