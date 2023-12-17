const express =require("express");
const mongoose =require("mongoose");
const port=3001;
const app= express();
const cors =require("cors");
app.use(express.urlencoded({
  extended:true
}));
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://ganesh:Ganu123@cluster0.h721f7t.mongodb.net/your-database-name?retryWrites=true&w=majority").then(()=>{
  console.log("conneted to mongo")
});

const timerSchema = new mongoose.Schema({
  eventName:String,
  eventDate:String,
  eventTime:String,
  color:String,
});
const Timer = mongoose.model("Timer",timerSchema);
app.route("/timers")
  .get((req, res) => {
    Timer.find({})
      .exec() // Use exec() to execute the query
      .then((timers) => {
        res.json(timers);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    const timer = new Timer({
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      color: req.body.color,
    });

    timer.save()
      .then(() => {
        console.log("Timer Saved");
        res.sendStatus(201); // Send a status code indicating successful creation
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  app.delete("/timer", (req, res) => {
    const { eventName, eventDate, eventTime, color } = req.body;
  
    Timer.deleteOne({ eventName, eventDate, eventTime, color })
      .exec() // Use exec() to execute the query
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
   

app.listen(port,(req,res)=>{
  console.log("Server has Successfully started on Port 3001");
})
