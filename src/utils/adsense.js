const { google } = require('googleapis');

const getAdUnits = async (accessToken) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const adsense = google.adsense({
        version: 'v1.4',
        auth: oauth2Client,
    });

    try {
        const res = await adsense.adunits.list({
            accountId: 'YOUR_ACCOUNT_ID', // Replace with your AdSense account ID
            adClientId: 'YOUR_AD_CLIENT_ID', // Replace with your AdSense ad client ID
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching ad units:', error);
        throw error;
    }
};

module.exports = { getAdUnits }; 