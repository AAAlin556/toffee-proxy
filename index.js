const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/stream", async (req, res) => {
    const url = "https://mprod-cdn.toffeelive.com/live/match-2/index.m3u8";
    try {
        const response = await axios.get(url, {
            headers: {
                "Origin": "https://mprod-cdn.toffeelive.com",
                "Referer": "https://mprod-cdn.toffeelive.com/",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36",
                "Cookie": "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9tcHJvZC1jZG4udG9mZmVlbGl2ZS5jb20v:Expires=1741256046:KeyName=prod_live_events:Signature=19MduO764DSL7FuPGRpgsi4i2If7GfBhqian2EBGAWK5hnWuM_uPhuLPvPDjuf2B7f7yHFKGP0ttBWOTigJNAQ"
            },
            responseType: "stream"
        });

        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Error fetching stream");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
