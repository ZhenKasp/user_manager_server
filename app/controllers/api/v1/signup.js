const User = require('../../../models/User');

signup = (app) => {
  app.post('/api/v1/signup', (req,res) => {
    const email = req.body.email.toLowerCase();
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const hashPass = require('bcryptjs').hashSync(password, 9);
    
    (async () => {
      try {
        const newUser = await User.create({
          email: email,
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: hashPass
        });
        await newUser.save();
        req.login(newUser, (err) => {
          if (err) { console.log(err) }
          res.json({ success: true });
        });
      } catch (e) {
        console.error(e);
        res.json({ success: false, msg: e.errors[0].message }) 
      }  
    })();
  }); 
}

module.exports = signup;