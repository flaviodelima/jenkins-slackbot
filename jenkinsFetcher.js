const axios = require('axios')
require('dotenv').config();

async function fetchJennkinsData(){
  const JenkinsURL = process.env.JENKINS_URL + '/blue/rest/organizations/jenkins/pipelines/'
  console.log(JenkinsURL)
  const jenkinsResponse = await axios.get(JenkinsURL, {
    auth: {
      username: process.env.JENKINS_USER,
      password: process.env.JENKINS_PASSWORD
    }
  })
  return jenkinsResponse.data
}

async function pipelinesData(){
  const pipelines = await fetchJennkinsData();
  
  const data = [];
  pipelines.forEach(pipeline =>{
    const {fullDisplayName, fullName, weatherScore, latestRun} = pipeline;
    const {durationInMillis, estimatedDurationInMillis, state, changeSet} = latestRun|| {};
    //const {author.fullName, msg, url} = changeSet[0];
  
    data.push({
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

  return data;
}

module.exports = {pipelinesData}