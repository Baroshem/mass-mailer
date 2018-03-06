var BulkEmailBot = require('bulkemailbot');
var schedule = require('node-schedule');
var NewRecord = require('./models/newrecord');
let textTemplate = require('./text.js');
require('events').EventEmitter.defaultMaxListeners = 1500;

//Your credentials
  email = 'yourmail@gmail.com',
  password = 'password',
  service = 'Gmail',
  name = 'YourName',
  user = new BulkEmailBot(name, email, service, password);

//Create a message template with personalised attributes
var messageTemplate = {
  subject: 'Mass mailing inquiry',
  template: textTemplate
};

//Use csv file to get recipients with email address and name
function Send(){
user.bulkSend('./recipients.csv', messageTemplate, function(err, data){
  if(err) {
  console.log(err);
  }
  else {
    //Log succesful messages to recipients
    console.log('Message sent to', data.envelope.to);
    //Create a new record
    var db = new NewRecord({
      email: data.envelope.to
    })
    //Save records to database
      db.save(function(err){
      if (err) throw err;
      });
  }
});
}

//Set schedule: second (0 - 59), minute (0 - 59), hour (0 - 23), day of month (1 - 31), month (1 - 12), day of week (0 - 7) (0 or 7 is Sun).
// "*" means that message will be sent immediately.
 var j = schedule.scheduleJob('* * * * * *', () => {
   Send();
 });
