const User = require ('../models/userModel');
const asyncHandler = require ('express-async-handler');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const {
  requestPasswordReset,
  resetPassword,
} = require ('../service/auth.service');
const {log} = require ('handlebars');

const currentUser = asyncHandler (async (req, res) => {
  res.json (req.user);
});

const login = asyncHandler (async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    res.status (400);
    throw new Error ('All fields are mandatory!');
  }
  const user = await User.findOne ({username});
  //compare password with hashedpassword

  if (user && (await bcrypt.compare (password, user.password))) {
    const accessToken = jwt.sign (
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          role: user.role,
          adminauth: user.adminauth,
          userauth: user.userauth,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1h'}
    );
    res.status (200).json ({accessToken});
  } else {
    res.status (401);
    throw new Error ('email or password is not valid');
  }
});

const adduser = asyncHandler (async (req, res) => {
  const {username, email, password, role, adminauth, userauth} = req.body;

  if (!username || !email || !password) {
    res.status (400);
    throw new Error ('All fields are mandatory');
  }

  const userAvailable = await User.findOne ({email});
  if (userAvailable) {
    res.status (400);
    throw new Error ('User already registered!');
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash (password, 10);

  const user = await User.create ({
    username,
    email,
    password: hashedPassword,
    role,
    adminauth,
    userauth,
  });

  if (user) {
    res.status (201).json ({_id: user.id, email: user.email});
  } else {
    res.status (400);
    throw new Error ('User data is not valid');
  }
  res.json ({message: 'Register the user'});
});

const register = asyncHandler (async (req, res) => {
  const {username, email, password} = req.body;
  if (!username || !email || !password) {
    res.status (400);
    throw new Error ('All fields are mandatory');
  }
  const userAvailable = await User.findOne ({email});
  if (userAvailable) {
    res.status (400);
    throw new Error ('User already registered!');
  }
  //Hash Password
  const hashedPassword = await bcrypt.hash (password, 10);
  const user = await User.create ({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status (201).json ({_id: user.id, email: user.email});
  } else {
    res.status (400);
    throw new Error ('User data is not valid');
  }
  res.json ({message: 'Register the user'});
});

const getallusers = asyncHandler (async (req, res) => {
  try {
    const users = await User.find ();
    res.send (users);
  } catch (error) {
    return res.status (400).json (error);
  }
});

const deleteuser = asyncHandler (async (req, res) => {
  try {
    await User.findOneAndDelete ({_id: req.body.userid});

    res.send ('User deleted successfully');
  } catch (error) {
    return res.status (400).json (error);
  }
});

const edituser = asyncHandler (async (req, res) => {
  try {
    const user = await User.findOne ({_id: req.body._id});
    user.username = req.body.username;
    user.password = req.body.password;
    user.role = req.body.role;
    user.adminauth = req.body.adminauth;
    user.userauth = req.body.userauth;
    await user.save ();
    res.send ('User details updated successfully');
  } catch (error) {
    return res.status (400).json (error);
  }
});

const resetPasswordRequestController = asyncHandler (async (req, res) => {
  try {
    const requestPasswordResetService = await requestPasswordReset (
      req.body.email
    );
    return res.json (requestPasswordResetService);
  } catch (error) {
    return res.status (400).json (error);
  }
});

const resetPasswordController = async (req, res) => {
  const resetPasswordService = await resetPassword (
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json (resetPasswordService);
};

const googleLogin = asyncHandler (async (req, res) => {
  try {
    const {token, secret} = req.body;
    let decodedData = jwt.decode (token, secret);
    let email = decodedData.email;

    const user = await User.findOne ({email});
    // ### ckecks if no user exists - if not it will create a new user in the database - otherwise it will skip this command
    if (!user) {
      let decodedData = jwt.decode (token, secret);
      const email = decodedData.email;
      const name = decodedData.name;
      const hashedPassword = await bcrypt.hash ('1234', 10);
      const user1 = await User.create ({
        username: name,
        email: email,
        userauth: true,
        password: hashedPassword,
      });

      const accessToken = jwt.sign (
        {
          user: {
            username: name,
            email: email,
            role: 'user',
            userauth: 'true',
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
      );

      return res.json (accessToken);
    }

    // ### checks if user exists and if yes it will do the login in and send the auth token to the frontend
    if (user) {
      let decodedData = jwt.decode (token, secret);
      const email = decodedData.email;
      const name = decodedData.name;
      const accessToken = jwt.sign (
        {
          user: {
            username: name,
            email: email,
            role: 'user',
            userauth: true,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
      );
      return res.json (accessToken);
    }

  } catch (error) {
    return res.status (400).json (error);
  }
});

const facebookLogin = asyncHandler (async (req, res) => {
  try {
    const {userfacebook} = req.body;
    let email = userfacebook.email;
    const user = await User.findOne ({email});

    if (!user) {
      const hashedPassword = await bcrypt.hash ('1234', 10);
      
      const user1 = await User.create ({
        username: userfacebook.name,
        email: userfacebook.email,
        userauth: true,
        password: hashedPassword,
      });

      const accessToken = jwt.sign (
        {
          user: {
            username: userfacebook.name,
            email: userfacebook.email,
            role: 'user',
            userauth: true,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
      );

      return res.json (accessToken);
    }

    // ### checks if user exists and if yes it will do the login in and send the auth token to the frontend
    if (user) {
  
      const accessToken = jwt.sign (
        {
          user: {
            username: userfacebook.name,
            email: userfacebook.email,
            role: 'user',
            userauth: true,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
      );

      return res.json (accessToken);
    }

    return res.json (decodedData);
  } catch (error) {
    return res.status (400).json (error);
  }
});

module.exports = {
  currentUser,
  login,
  register,
  getallusers,
  deleteuser,
  adduser,
  edituser,
  resetPasswordRequestController,
  resetPasswordController,
  googleLogin,
  facebookLogin
};
