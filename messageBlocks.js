const header = (text) => ({
  "type": "header",
  "text": {
    "type": "plain_text",
    "emoji": true,
    text,
  }
});

const intro = (text) => ({
  "type": "section",
  "text": {
    "type": "mrkdwn",
    text,
  }
});

const divider = () => ({
  "type": "divider"
});

const textAndImage = (text, imageUrl, altTextForImage) => ({
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": text,
  },
  "accessory": {
    "type": "image",
    "image_url": imageUrl,
    "alt_text": altTextForImage,
  }
});

module.exports = { divider, header, intro, textAndImage };