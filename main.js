const fb = require('fb');
const mongoose = require('fs');
const Twit = require('twit');
var T = new Twit({// Add your keys here :)
    consumer_key:         '**************************',
    consumer_secret:      '*************************************************',
    access_token:         '*************************************************',
    access_token_secret:  '*************************************************',
    timeout_ms:           60*1000,
  })

  var b64content = fs.readFileSync('media/img/noyo.jpg', { encoding: 'base64' });
  var twits = []

  T.post('media/upload', { media_data: b64content }, (err, data, response) => {

    var mediaIdStr = data.media_id_string
    var altText = "This project took from me I thins 30min :)."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, (err, data, response) => {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: '#withTaha he\'s a amazing devloper on Scratch', media_ids: [mediaIdStr] }
  
        T.post('statuses/update', params, function (err, data, response) {
          console.log(JSON.stringify(data,undefined,4))
          var twit = {
            id:data.id,
            createAt: data.created_at,
            msg: data.text.split('https://')[0].trim(),
            picture: data.entities.media[0].media_url_https
          };
          twits.push(twit);
          console.log(twits);
        });
      };
    });
  });