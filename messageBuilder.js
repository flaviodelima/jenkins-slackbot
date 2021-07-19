const {divider, header, textAndImage} = require('./messageBlocks')


function bodyText(durationInMillis, estimatedDurationInMillis) {
	const progressPorcentage = durationInMillis/ estimatedDurationInMillis;
	const roundPorcentage = Math.floor(progressPorcentage*100);
	const blackSquares = Math.floor(progressPorcentage*10);
	const progressBar = '⬛'.repeat(blackSquares)+'⬜'.repeat(10-blackSquares);

	const durationInSeconds = durationInMillis*1000;
	const estimatedDurationInSeconds = estimatedDurationInMillis *1000;

	const text ="batatinha";
	//const text = `*progress* \n ${progressBar} *${roundPorcentage}* \n` + 
	//	`${durationInSeconds}s of `
	//console.log(textAndImage)

	return text;
}

function batatinha(){

	return "asdf"
}

async function buildMessage(pipelines){
  message = [];
  pipelines.forEach(pipeline=> {
    //pipeline = pipelines[0];
    const {fullDisplayName, weatherScore, latestRun} = pipeline;
    const {durationInMillis, estimatedDurationInMillis, state, changeSet} = latestRun|| {};
    
		//const text = bodyText(durationInMillis, estimatedDurationInMillis);
		//console.log(text)
		//console.log(text)

    message = [...message,
      header(fullDisplayName),
			textAndImage('bodyText', "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg", "altTextForImage"),
      divider(),
    ];
    //console.log(message);
  })
  return message;

}
module.exports = { buildMessage };
