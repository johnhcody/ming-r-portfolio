import auth0 from '../../utils/auth0';

export default async function me(req, res) {
    debugger
    try {
        await auth0.handleProfile(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}