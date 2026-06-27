const express = require("express");
const session = require("express-session");
const crypto = require("crypto");

const PORT = process.env.PORT || 5173;
const HYDRA_INT_URL = process.env.HYDRA_PUBLIC_URL || "http://hydra:4444";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  console.warn("[test-app] SESSION_SECRET not set, using random (sessions lost on restart)");
}
const sessionSecret = SESSION_SECRET || crypto.randomBytes(32).toString("hex");

const app = express();

app.use(express.static("public"));

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  }),
);

function base64URLEncode(buf) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest();
}

app.get("/login", (req, res) => {
  const clientId = req.query.client_id;
  const redirectUri = req.query.redirect_uri;
  const hydraBrowserUrl = req.query.hydra_browser_url;

  if (!clientId || !redirectUri || !hydraBrowserUrl) {
    return res.redirect("/?error=" + encodeURIComponent("Client ID, Redirect URI, and Hydra Browser URL are required"));
  }

  req.session.oauthConfig = {
    client_id: clientId,
    client_secret: req.query.client_secret || "",
    redirect_uri: redirectUri,
    hydra_browser_url: hydraBrowserUrl,
  };

  const codeVerifier = base64URLEncode(crypto.randomBytes(32));
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  req.session.codeVerifier = codeVerifier;

  const state = base64URLEncode(crypto.randomBytes(16));
  req.session.oauthState = state;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    scope: "openid profile email",
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  res.redirect(302, `${hydraBrowserUrl}/oauth2/auth?${params}`);
});

app.get("/callback", async (req, res) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    return res.redirect(
      `/?error=${encodeURIComponent(`OAuth2 error: ${error} — ${error_description || ""}`)}`,
    );
  }

  if (!code) {
    return res.redirect("/?error=Missing authorization code");
  }

  if (state && state !== req.session.oauthState) {
    return res.redirect("/?error=State mismatch (CSRF detected)");
  }

  const cfg = req.session.oauthConfig;
  if (!cfg) {
    return res.redirect("/?error=No OAuth2 config in session");
  }

  const codeVerifier = req.session.codeVerifier;

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: cfg.redirect_uri,
      client_id: cfg.client_id,
      code_verifier: codeVerifier,
    });

    const headers = { "Content-Type": "application/x-www-form-urlencoded" };

    if (cfg.client_secret) {
      const basic = Buffer.from(`${cfg.client_id}:${cfg.client_secret}`).toString("base64");
      headers["Authorization"] = `Basic ${basic}`;
    }

    const tokenResponse = await fetch(`${HYDRA_INT_URL}/oauth2/token`, {
      method: "POST",
      headers,
      body,
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.redirect(
        `/?error=${encodeURIComponent(`Token exchange failed: ${JSON.stringify(tokens)}`)}`,
      );
    }

    const idToken = tokens.id_token;
    let user = {};
    if (idToken) {
      const payload = idToken.split(".")[1];
      user = JSON.parse(Buffer.from(payload, "base64").toString());
    }

    req.session.tokens = tokens;
    req.session.user = user;
    req.session.codeVerifier = null;
    req.session.oauthState = null;

    res.redirect(302, "/");
  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent(`Error: ${err.message}`)}`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(302, "/");
});

app.get("/api/session", (req, res) => {
  res.json({
    user: req.session.user || null,
    tokens: req.session.tokens || null,
    config: req.session.oauthConfig || null,
  });
});

app.listen(PORT, () => {
  console.log(`[test-app] STORM ID test app on http://localhost:${PORT}`);
  console.log(`[test-app] Hydra server URL: ${HYDRA_INT_URL}`);
  console.log(`[test-app] Configure your OAuth2 client on the web interface`);
});
