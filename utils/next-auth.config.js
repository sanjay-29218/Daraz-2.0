// next-auth.config.js
module.exports = {
    providers: [
      {
        provider: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    ],
  };
  