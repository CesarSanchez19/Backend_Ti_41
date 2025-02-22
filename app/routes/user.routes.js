import express from "express";

export class UserRoutes {
  iniUserRouter(app = express.application) {
    app.get("/hello", (req, res) => {
      res.send("Hello World!");
    });

    app.get("/h1", (req, res) => {
      res.send(
        '<p>Hola<p/><img src = "https://comodosslstore.com/blog/wp-content/uploads/2024/01/website-page-found-error-robot-character-broken-chatbot-mascot-disabled-site-technical-work_502272-1888.jpg">'
      );
    });

    app.get("/bye", (req, res) => {
      res.status(404).send("not found");
    });

    app.post('/user-data', (req, res) => {
      const { user, password } = req.body;
      console.log('Json Object:', req.body);
      console.log(user, password);
      
      res.status(200).send(`Hello ${user}, you are awesome`); 
    })    
  }
}
