module.exports = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_KEY: process.env.SECRET_KEY,
        REGION: process.env.REGION,
        BUCKET_NAME: process.env.BUCKET_NAME,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.UTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
        AUTH0_POST_LOGOUT_REDIRECT_URI: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
        AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET

    }
}