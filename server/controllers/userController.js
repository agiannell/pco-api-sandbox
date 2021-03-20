const querystring = require('querystring'),
    axios = require('axios'),
    { PCO_CLIENT_ID, PCO_SECRET, PCO_REDIRECT_URI } = process.env

module.exports = {
    pcoLogin: (req, res) => {
        res.redirect('https://api.planningcenteronline.com/oauth/authorize?' +
            querystring.stringify({
                client_id: PCO_CLIENT_ID,
                redirect_uri: PCO_REDIRECT_URI,
                response_type: 'code',
                scope: 'giving people services'
            }))
    },
    pcoCallback: (req, res) => {
        const { code } = req.query,
            authObj = {
                grant_type: 'authorization_code',
                code: code,
                client_id: PCO_CLIENT_ID,
                client_secret: PCO_SECRET,
                redirect_uri: PCO_REDIRECT_URI
            };

        axios.post('https://api.planningcenteronline.com/oauth/token', authObj)
            .then(token => {
                console.log(token.data)
                const tokens = {
                    accessToken: token.data.access_token,
                    refreshToken: token.data.refresh_token
                }
                req.session.tokens = tokens
                res.redirect('http://localhost:3000/')
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },
    getTokens: (req, res) => {
        res.status(200).send(req.session.tokens)
    }
}