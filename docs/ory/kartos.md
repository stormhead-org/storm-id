Introduction to Ory Kratos for Ory Network

Ory Kratos Identities is an API-first identity and user management system built on top of the widely deployed open-source Ory Kratos following cloud architecture best practices. It implements mechanisms that allow handling core use cases that the majority of modern software applications have to deal with:

    Self-service login and registration: Allow end-users to create and sign in to accounts using username/email and password combinations, social sign-in ("Sign in with Google, GitHub"), passwordless flows, and others.
    Multi-factor authentication (MFA/2FA): Support protocols such as TOTP (RFC 6238 and IETF RFC 4226 - better known as Google Authenticator)
    Account verification: Verify that an email address, phone number, or physical address actually belongs to the user.
    Account recovery: Allow users to recover access to their account using "Forgot Password" flows or security codes.
    Profile and account management: Use secure flows to update passwords, personal details, email addresses, and linked social profiles.
    Admin APIs: Import, update, and delete user accounts.

tip

Ory Identities calls user accounts "identities". The terms "user accounts", "users", and "identities" are used interchangeably in the Ory documentation. Read more here to learn more about identities in Ory.

Identity is a hard problem that Ory Identities solves in a unique way. Ory values security, flexibility, and integration with cloud technology such as Kubernetes the most:

    Ory Identities doesn't ship an HTML Rendering Engine. You can use the Ory Account Experience available in Ory Network or build your own UI in the language and framework you feel most comfortable with.
    The workflow engine allows you to fully customize your users' experience. Whether you want users to activate their accounts after registration, or have a multi-step (progressive) registration process - it's all possible!
    One identity schema doesn't fit all - you may have customers that need a billing address, have multiple email addresses, or internal support staff that's assigned to a cost center. You can accommodate the different data models using JSON Schema and make the system work for you - not the other way around.

Ory Identities isn't just about features - it's about security, reliability, and speed. As a cornerstone of Ory Network, Ory Identities runs in a managed cloud environment and gives you a production-ready solution to securely manage users and authentication flows.

When hosted on premise, Ory Identities stands out from other solutions because it runs on any operating system such as Linux, macOS, or Windows, and on most processors such as i386, amd64, or ARM. The compiled binary has no system or library or file dependencies and can be run as a single, static binary on top of, for example, a raw Linux kernel. Ory Identities self-hosted scales horizontally without effort. The only external dependency is an RDBMS - we support SQLite, PostgreSQL, MySQL, CockroachDB. You will not need memcached, etcd, or a similar system to scale.

Ory believes in a strong separation of concerns, which is a guiding principle in the design of each Ory project. As such, Ory software is built to solve a specific problem well and offload adjacent issues such as a user interfaces to other applications.
Features
Cookie-based security

Enhance browser security with anti-CSRF cookies, protect against common attack vectors such as XSS and CSRF, and maintain that session states securely. Read more about it here
Native and browser APIs

Integrate seamlessly with mobile or native apps and web browsers using robust APIs. Read more about it here.
Self-service flows

Registration, login, logout, multi-factor authentication, settings, verification, and recovery. Read more about it here.
Authentication methods

Passwords, passwordless code, Passkeys, social sign-in, multi-factor authentication. Read more about it here.
Identity schema

Customize and extend user data models to fit application-specific needs. Read more about it here.
Identity management

Manage user identities with CRUD (Create, Read, Update, Delete) operations. Read more about it here.
Session management

Control user sessions, including lifespan, refresh, and revocation. Read more about it here.
User interface

Build custom user interfaces for authentication and profile management using Ory SDKs and REST APIs to match your applications design. Read more about it here.
Send emails & SMS

Email and SMS notifications for verification, recovery, and multi-factor authentication. Customize SMPT/HTTP and SMS server and templates. Read more about it here.
Benefits

Ory Identities offers several key benefits that make it an ideal solution for managing user identities, authentication, and access control. By leveraging Ory Identities, you can:

Accelerate development Hit the ground running with a comprehensive user management system that supports a wide range of authentication methods and identity management features. Ory Identities adheres to industry standards, allowing you to streamline authentication across apps and services and focus on your core business.

Ensure compliance: Ory Identities is designed to meet the latest security standards and regulatory requirements such as GDPR, simplifying the process of ensuring compliance. It helps you address legal and industry-specific data protection mandates effectively.

Own your user experience: Ory Identities allows you to use a custom UI that matches the exact branding and flow you need to improve user experience.

Scale to millions: Built on a cloud-native architecture, Ory Identities scales effortlessly to accommodate growing user bases, whether you're managing thousands or millions of users. Its flexible design ensures consistent performance and reliability as your needs evolve.

Mitigate Security Risks: With a security-first approach Ory Identities minimizes attack surface. It safeguards user data and prevents unauthorized access and malicious attacks, providing robust protection for both users and data.
Usecases

    B2C (Business-to-Consumer): Provide seamless registration, login, and profile management for customers using your apps and services directly. This includes social logins, passwordless options, and robust account recovery mechanisms.
    B2B (Business-to-Business): Create secure logins and access controls for partner organizations or client companies to manage their accounts, view orders, and interact with your services. Enable streamlined authentication for employees of partner organizations, allowing them to access your B2B applications using their company credentials.
    Workforce: Onboard new employees, manage user accounts, roles, and identities within your organization's systems. Multi-factor authentication (MFA) and breached password protection for added security
    Enterprise: Consolidate user accounts and identities across multi-tenant brands, applications and systems. Use Ory Identities to streamline user onboarding, offboarding, and permission management. Seamlessly connect with existing enterprise identity providers and other 3rd party systems.

Next steps

Read more about the Ory Identities security model and try out one of the Ory Network Identities quickstart guides for your framework or programming language to learn how to add login and registration to your app in minutes.

Configure Ory

This guide shows how to set up the necessary dependencies and configurations to integrate Ory's identity management features into your application.
Prerequisites

Before starting, ensure you have:

    An Ory network account
    Your Ory project id
    Your development environment set up with your framework of choice

First, install the Ory SDK for your framework:

    Express (JS)
    Go

npm install @ory/client-fetch --save

Set up local development with Ory Tunnel

For local development, you'll need to use Ory Tunnel to connect your local application with Ory's APIs:

    macOS
    Linux

# Install Ory CLI using Homebrew
brew install ory/tap/cli

# Verify installation
ory help

After installing the CLI, start the tunnel to connect your local application with Ory's APIs:

# Start the tunnel (replace with your project id)
ory tunnel --project $PROJECT_ID http://localhost:3000

tip

To learn more about the Ory Tunnel, read the dedicated section of the Ory CLI documentation.
Configure the SDK

Configure your SDK to use the URL:

    Express (JS)
    Next.js
    Go

import { Configuration, FrontendApi } from "@ory/client-fetch"

export const baseUrl = process.env.ORY_SDK_URL || "http://localhost:4000"

export const ory = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
  }),
)

For local development, set the ORY_SDK_URL environment variable to the local tunnel URL:

export ORY_SDK_URL=http://localhost:4000

For production environments, set the ORY_SDK_URL environment variable to the production URL:

export ORY_SDK_URL=https://$PROJECT_SLUG.projects.ory.sh

Cookie-based security model

Ory Identities supports both mobile (native) and browser applications. Because of the broad capabilities browsers offer, they pose a higher security risk than native applications. To shield your users from those risks, Ory Identities implements special browser APIs which use additional security measures such as anti-CSRF cookies.

Although it is an uncommon approach that might require a shift in thinking, it's implemented so that you don't have to worry about refreshing tokens or deciding whether to store them in localStorage or document.cookies.

Instead, you can devote all your focus and time to developing great software for your users, while Ory takes care of the security by giving you the best-in-class protection from all common browser attack vectors, such as Cross-site scripting (XSS) or Cross-site request forgery (CSRF).
Access to your domain

To manage HTTP cookies, Ory APIs must be exposed on the same domain as your application. If you don't fulfill this requirement, HTTP Cookies are ignored by the browser, which prevents the Ory Identities from functioning properly.

Ory exposes the APIs at https://$PROJECT_SLUG.projects.oryapis.com. To manage session information, Ory Identities must be able to set the domain in HTTP Cookies to the same domain as the application that consumes its APIs. For example:

    When working with an application that runs on http://localhost:3000 for local development, Ory must be able to set domain=localhost in the HTTP cookie.

Ory offers SDKs for certain deployment options such as Vercel which mirror Ory's APIs without the need of running another process.

    When working with an application that runs on https://app.example.org, Ory must be able to set domain=example.org in the HTTP cookie.
    Some multi-tenant providers like Heroku (<your-slug>.herokuapp.com) or Vercel (<your-slug>.vercel.app) expose many apps under the same domain. These domains are listed in Public Suffix Domain List. For these domains it is not possible to set a cookie on the root domain (cookie=herokuapp.com) but only on the subdomain (cookie=your-slug.herokuapp.com).

What about local development?

When developing locally, your application typically either runs on localhost or on a local custom domain such as app.local. However, your Ory Network project runs on your slug URL https://$PROJECT_SLUG.projects.oryapis.com. The Ory APIs can't set cookies on a different domain than the one they are running on.

The solution is to tunnel the Ory APIs on a port on your local machine, which allows cookies to be set on the same domain as the application is running.

Read more in the Ory Tunnel documentation.
note

Ory Tunnel should be used for development only. Do not use Ory Tunnel in a production environment!
HTTP cookies

HTTP cookies are a central part of the unique security model in Ory.

Whenever the client that consumes Ory APIs is a browser, the system uses HTTP cookies to store session states and protect against attack vectors such as CSRF.

Ory issues HTTP cookies with the following flags for the highest level of security:

    secure: The cookie is only sent over HTTPS connection to protect against man-in-the-middle attacks.
    httpOnly: The cookie is not available to JavaScript code to protect against XSS.
    sameSite=Strict: The cookie can only be requested from the same origin to protect against CSRF attacks.

HTTP cookie domains

When the server sets a cookie, it defines the domain the cookie is valid for:

Set-Cookie: <name>=<value>; domain=<domain>

At Ory, this value defaults to the domain of your project (<project>.projects.oryapis.com). The browser only accepts cookies from the same domain.

If you make a request to https://www.my-evil-app.com and the server responds with

Set-Cookie: google_session=1234; domain=google.com

the browser rejects the cookie. The same happens when you make a request in the browser. The browsers sends cookies only to a matching domain. When the browser makes a request to https://www.my-evil-app.com, it never sends cookies set for google.com.

How does a browser decide whether to accept or reject a cookie?

    A cookie set with Set-Cookie: <name>=<value>; domain=example.org will be sent in requests to example.org and all subdomains of example.org (for examplewww.example.org, api.example.org).
    A cookie set with Set-Cookie: <name>=<value>; domain=api.example.org will be sent to api.example.org and its subdomains (for example service.api.example.org) but not to example.org or not-api.example.org.
    Cookies ignore the port number, which is important in local development. A cookie set with Set-Cookie: <name>=<value>; domain=example.org:1234 will be sent to https://example.org:443, http://example.org:80, and http://api.example.org:1234.

Cross-Origin HTTP cookies

When working with Single Page Apps (SPA), you often fetch data from servers using AJAX requests. There are two types of cross-origin AJAX requests:

    On the same top-level domain: the browser address bar is https://www.example.org and the AJAX request goes to https://api.example.org/api/....
    Across different top-level domains: the browser address bar is https://www.example.org and the AJAX request goes to https://api-example.com/....

What requirements must be met for these requests to work?
Same top-level domain

These requests are allowed only if the server at api.example.org:

    responds with the appropriate CORS headers
    the JavaScript XHR request is made with credentials: 'include'

Setting withCredentials to true can be done in the Ory JavaScript / TypeScript SDK:

import { FrontendApi, Configuration } from "@ory/client"

const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      // Ensures we send cookies in the CORS requests.
      withCredentials: true,
    },
  }),
)

or using the Browser's Fetch API:

fetch("https://ory.your-custom-domain.com/", {
  credentials: "include",
})

Cross top-level domain

Sending cookies across different top-level domains is a practice that gets used less frequently nowadays to improve data privacy.

This practice was abused for user tracking and targeted advertising. Some browsers deprecated cross-domain cookies, while others are planning to do so in the near future.

Notable mentions are:

    Safari
    Chrome
    Firefox

What about JSON Web Tokens?

To learn how Ory Identities supports JSON Web Tokens (JWTs) to manage sessions read the Session mangagement documentation.

To learn how to use Session to JWT, read the Session to JWT documentation.
Can I use OAuth 2.0 / OpenID Connect?

Ory is fully compliant with OAuth 2.0 and OpenID Connect. If you are interested to use OAuth 2.0 / OpenID Connect for advanced use cases, check out Ory OAuth 2.0 and OpenID documentation.
tip

You probably do not need OAuth2 / OpenID Connect covers common misconceptions about OAuth2 and OpenID Connect and is worth a read if you are unsure whether OAuth2 is the right fit for you.

At Ory, we believe that OAuth 2.0 and OpenID Connect isn't a one-size-fits-all solution. In fact, we think that you probably don't need to use such complicated protocols at all! We recommend using Ory OAuth2 & OpenID for targeted use cases only, such as providing third-party integration with your application (for example, in the form of the familiar "Sign in with [PROVIDER_NAME]" button).
What about access tokens / refresh tokens?

You can generate access and refresh tokens using Ory OAuth2 & OpenID. We do not recommend using access and refresh tokens for session management! Visit Why you probably do not need OAuth2 / OpenID Connect to read more about it.

Browser vs. native apps

Ory Identities supports both mobile (native) and browser applications. Because of the broad capabilities browsers offer, they pose a higher security risk than native applications. To shield your users from those risks, Ory Identities implements special browser APIs which use additional security measures such as anti-CSRF cookies.
Browser apps

Browser apps use the https://$PROJECT_SLUG.projects.oryapis.com/self-service/{flow-type}/browser endpoint to initialize flows such as sign in, registration, profile changes, and so on. When using this endpoint, Ory will set anti CSRF cookies.

When a user signs in successfully, Ory will issue an Ory Session Cookie. Calling ory.toSession() will return the same session but does not require any additional calls when used in client-side browser apps (for example React, Vue, Angular).
Native apps

Native apps use the https://$PROJECT_SLUG.projects.oryapis.com/self-service/{flow-type}/api endpoint to initialize flows such as sign in, registration, profile changes, and so on. When using this endpoint, no CSRF cookies will be issued by Ory.

Additionally, Ory issues an Ory Session Token instead of an Ory Session Cookie. This token is equivalent to the session cookie and returns the same session response when calling ory.toSession({ xSessionToken: "{session-token}" }).

Because it is very dangerous to use native app endpoints in a browser context, Ory prevents you from using these APIs in the browser.


Browser redirects and flow completion

This document covers browser redirects for Server Side Applications (Node.js, PHP, Golang etc.) and how to configure them.
Allow list

Set dynamic redirects using the ?return_to= query parameter on self-service flows. For example: a user opens a sharable link to go to https://myapp.com/posts. This URL requires the user to have an active session and redirects the user back to the login page. To return the user back to the original URL, append ?return_to=https://myapp.com/posts when starting the self-service login flow:

curl -X GET 'http://<your-project>.projects.oryapis.com/self-service/login/browser?return_to=...'

When the login flow starts in a browser with a return_to URL set, return_to will be set. For API clients such as AJAX visit this section.

The allow list prevents Open Redirect Attacks by just allowing certain domains, or paths on a domain. As in the example below https://sub.domain.myapp.com/only/path needs to match the sub-domain and path. Other redirects using myapp.com will fail. Redirects using https://anotherapp.com will succeed on any path.

Browser Redirects Allow List
Redirect flows

The Ory Network has a total of six flows, Login, Registration, Verification, Recovery, Settings and Logout which can be configured to redirect back to any URL. A common use case would be to redirect the user to your application home screen after a logout or to a specific URL on a sub-domain after a settings password update.

By default, the flows always redirect to the Ory Account Experience pages.
Login, registration, and settings

The Login and Registration flows have three fields (all optional):

    Default Redirect URL domain or path relative to your application URL
    Post-Password Redirect URL
    Post-OIDC Redirect URL

selfservice:
  flows:
    login:
      after:
        default_browser_return_url: https://this-is-overridden-by-password/
        password:
          # redirect after successful login or registration with `password` method
          default_browser_return_url: https://end-up-here-after-login-with-password/
        oidc:
          # redirect after successful login or registration with `OIDC` method
          default_browser_return_url: https://end-up-here-after-login-with-oidc/
    registration:
      after:
        default_browser_return_url: https://end-up-here-after-registration/
    # password:
    # ...

The Settings flow has three fields (all optional):

    Default Redirect URL domain or path relative to your application URL
    Post-Password Redirect URL
    Post-Profile Redirect URL

selfservice:
  flows:
    settings:
      after:
        default_browser_return_url: https://this-is-overridden-by-password/
        password:
          # redirect after successfully updating the password in settings
          default_browser_return_url: https://end-up-here-after-login-with-password/
        profile:
          # redirect after successfully updating the username or email in settings
          default_browser_return_url: https://end-up-here-after-login-with-password/

The Default Redirect URL is used when Ory isn't sure where to redirect. It’s a good idea for this to be your default app URL, for example / or the dashboard. Use sub-conditions to control where users are redirected after registration, login, and other self-service flows.

When setting the Post-Login Redirect as an fully qualified domain name (FQDN such as https://domain.example/login it will overwrite the Default Redirect URL. As a path it will replace the Default Redirect URL path, for example /login will alter https://domain.example/default/path to https://domain.example/login. This works the same for all other Post- flows and sub-conditions.

On sub-conditions such as After Password or After Profile an FQDN or a path can be set. All the relative URLs will be updated with their respective base URL. As shown in the example below, the Post-Login Redirect URL is a path. This means the base URL will be the Default Redirect URL (https://myapp.com). This will set the Post-Login Redirect URL to https://myapp.com/after/login and the Post-Password Redirect URL to https://myapp.com/after/login/password.

Browser Redirects Url Management

In the example below, the Post-Login Redirect URL is a FQDN. This will set the Post-Login Redirect URL to https://myapp.com/after/login and the Post-Password Redirect URL to https://myapp.com/after/login/password.

Browser Redirects URL Management Transformed
Verification, recovery, and logout
tip

The Post-Recovery redirect isn't supported and will automatically redirect the user to the Settings UI URL. Use the Post-Settings redirect for Post-Recovery flows.

Each of these flows has a single field, the Default Redirect URL. As with Login, Registration, and Settings configurations, the Default Redirect URL can be an FQDN or a path.

Browser Redirects URL Management Transformed
Reset and update flows

Update or delete a redirect by either changing the current redirects value or deleting the entry and clicking the Update button. Reset all flows at once with the Reset Flows button which will prompt a confirmation box. Resetting all flows will reset all the fields back to the default value which is the Ory Account Experience.

Updates to flows will take effect on new flows. It will have no effect on old flows that haven't expired yet.

Browser Redirects URL Reset All
Troubleshooting
API clients

The browser redirects work just for regular browser requests.
If you are using an API Client, for example AJAX, redirect the user to the right endpoint in the application:

          .then((res) => {
            router.push('/<your-route>')
          })

Invalid URL

The allow list and any of the post-flow redirects require a valid URL with a scheme (HTTP or HTTPS). An example of a valid URL is https://www.google.com.

Browser Redirects URL Error Message

Browser Redirects URL Error Message Flows
Domain denied

It's not possible to set the any Ory-owned domain as redirect URL.

Browser Redirects URL Error Message
Read more

For a deeper dive into the background of browser redirects, read this document

Overview

Ory Actions are an extensibility mechanism provided by the Ory Network that allows you to integrate with third-party services:

    CRM platforms, such as Mailchimp or HubSpot
    Payment gateways, such as Stripe
    Business analytics tools, such as Google Analytics, Mixpanel, or Segment
    Integration platforms, such as Zapier or IFTT

With Ory Actions, you can define custom business logic and automate the behavior of the system in response to events that occur in your Ory-powered applications. You can write Actions in any programming language and trigger them through events such as user registration, or users resetting their passwords. This gives you a flexible way to extend the capabilities of Ory Network, integrate with other services to streamline your workflows, and improve the overall experience of your users.

Ory Actions is a feature supported by two of the Ory services:

    Ory Identities: Execute actions in response to user-related events such as login, registration, account recovery, account verification, or user settings update.
    Ory OAuth2 and OpenID Connect: Execute actions in response to refreshing OAuth 2.0 Access Tokens.

Actions in Ory Identities

Ory Identities is an identity management solution that supports actions for user-related events: login, registration, account recovery, account verification, or user settings update.
Actions triggered after events

    Login actions allow you to automate behavior in response to users logging in to your application. For example, you can use Ory Actions to update user information in your database or send welcome emails to users that log in for the first time.
    Registration actions allow you to automate behavior in response to users registering in your application. For example, you can use Ory Actions to automatically create a user account in your database or add the user to your mailing list.
    Account recovery actions allow you to automate behavior in response to users initiating the account recovery process. For example, you can use Ory Actions to send a password reset email to the user or update user information in your database.
    Verification actions allow you to automate behavior in response to users verifying their accounts. For example, you can use Ory Actions to update user information in your database or send welcome emails to users who verified their accounts.
    Settings actions allow you to automate behavior in response to users updating their account settings. For example, you can use Ory Actions to update user information in your database or send confirmation or summary emails to users.

Actions triggered before events

You can use Ory Actions before events such as user login, registration, triggering account recovery or verification, and updating account settings.

For example, you can enforce invite-only registration in your application by triggering an action that checks if certain criteria are met before the registration flow starts. This can be useful for controlling the number of users that have access to your application and ensuring that only authorized users can register.

You can also use Ory Actions to add additional security checks when users initiate login, registration, account recovery or verification, and settings update flows. For example, you can create logic that checks the IP address of the user to ensure that the request is coming from a trusted location or to verify that the user's email address is associated with a valid domain.

By using Ory Actions you can have a high degree of control over the flow of events in your application and improve the overall security and user experience.
Action triggers

Ory Identities supports the following action triggers:

    before login: The hook runs when the user starts the login flow.
    after login: The hook runs when the user is successfully authenticated, before the system issues an Ory Session.
    before registration: The hook runs when a registration flow starts.
    after registration: The hook runs when a user successfully registers in the system.
    before recovery: The hook runs when the user starts the recovery flow.
    after recovery: The hook runs when the user successfully recovers their password.
    before settings: The hook runs when the user starts the account settings flow.
    after settings: The hook runs when the user successfully changes their account settings.
    before verification: The hook runs when the user starts the verification flow.
    after verification: The hook runs when the user verifies their account.

Triggers based on authentication methods

You can further customize the behavior of the system by defining what action to trigger based on the authentication method used to sign in, register, and update user settings.

For example, when a user signs in with a password, you can use Ory Actions to send a welcome email to the user or update user information in your database. When a user signs in using OIDC, you can use Ory Actions to enrich your CRM with data from the social sign-in provider.
Authentication method	Description
password	Sign-in and sign-up with username/email and password combo.
oidc	Sign-in and sign-up through OIDC-compliant OAuth2 identity providers.
totp	MFA Sign-in with a TOTP code from apps such as Google Authenticator.
webauthn	MFA Sign-in with WebAuthn-compatible factors (FaceID, YubiKey) or paswordless sign-up and sign-in.
lookup_secret	MFA Sign-in with recovery codes.
Available actions

There are 4 actions you can use to extend self-service user flows. The web_hook action allows you to trigger any custom, external logic.
info

Some actions can only be used for specific flows and methods.
Action	Description	Details
session	Signs in the user immediately after they create an account.	For use only with the after registration flow. To use it, you must define secrets for secret rotation.
revoke_active_sessions	Revokes all other active sessions of the user on successful login.	For use only with the login flow.
require_verified_address	Allows users to sign in only when they verified their email address.	For use only with the after login flow, password method only.
web_hook	Allows to trigger external and custom logic. Can be used with all flows and methods except error and logout.	Requires providing webhook configuration. This is the only action type available for the after settings flow. See an example of using webhooks here.
Trigger precedence

The graph below shows when triggers happen.

    Ory executes the before actions when the user starts a flow.
    Ory executes the after actions when the user submits or completes the flow.
    When an authentication method specifies actions, it overrides the default actions for the flow.

on submit

on submit

on submit

on submit

on submit

Before login

Login

After login

Before registration

Registration

After registration

Settings

After settings

Before settings

Recovery

After recovery

Before recovery

Verification

After verification

Before verification

On password login

On social/OIDC login

On WebAuthn login

On password registration

On social/oidc registration

On WebAuthn passwordless registration

On password change

On profile data change

With the following configuration, hook_3 is executed when the user logs in with a password, hook_2 is executed when the user logs in with any other method, for example through social sign-in, and hook_1 is executed for all login flows when the user starts the flow.
ory get identity-config --format yaml

selfservice:
  flows:
    login: # Defines for which flow triggers the action.
      before: # When the user starts the flow
        hooks:
          - hook: hook_1 # Specifies which hook is triggered.
      after: # When the user submits the flow
        hooks:
          - hook: hook_2 # is executed for all authentication methods except password
        password:
          hooks:
            - hook: hook_3 # is executed only for password method

Actions in Ory OAuth2 & OpenID Connect

Read OAuth2 webhooks to learn more about Actions in Ory OAuth2 & OpenID Connect.

Two-step registration

Identity traits are data associated with an identity that can be modified by the user. The traits are configured through the identity schema.

With unified registration - formerly called one-step legacy registration - the identity traits will be repeated for each authentication strategy. For example the identity traits will be repeated for the password, the code via email, and the passkey method. For this reason unified registration is recommended for use cases where you have only one or two authentication methods enabled.

With a profile-first registration - formerly called two-step registration - the user is prompted for the identity traits in the first step, and asked to choose a credential method for authentication next. This results in a more stream-lined user experience when you have more than two authentication methods enabled.

To disable the one-step unified registration, Go to Project settings → Advanced in the Ory Console and disable Enable unified sign up.

Identifier first authentication

Identifier first authentication first requests the user's identifier such as an email or username before prompting for a password or other authentication methods.
note

Identifier first authentication is required when using B2B Organization login.

This guide explains how to enable and use identifier first authentication in Ory Network and self-hosted Ory Kratos.
Ory Network

To enable it:

        Log in to the Ory Console.
        Select your project.
        Navigate to Branding → Theming in the Ory Console.
        Disable "Use legacy Hosted UI".
        Test the flow in your application by navigating to the login page.

To revert, follow the same steps, enable "Use legacy Hosted UI", and click "Reset to Account Experience" on the Branding → UI URLs in the Ory Console.
Self-hosted Ory Kratos

For Ory Enterprise License and Ory Apache 2.0 License users, set the following configuration in your kratos.yaml config file:
kratos-config.yaml

selfservice:
  flows:
    login:
      style: identifier_first

To disable this feature, set style to unified.
Account enumeration mitigation

Account enumeration mitigation prevents malicious actors from being able to identify if a user exists or not.

By default, Ory does not prevent account enumeration in the identifier first authentication flow. This improves user experience as the user quickly knows if they have an account with the chosen identifier (email / username) or not. To enable account enumeration, use the Ory CLI patch command

ory patch identity-config --project <project-id> --add '/security/account_enumeration/mitigate=true'

or if you use a config file, add the following to your kratos.yaml config file:
kratos-config.yaml

security:
  account_enumeration:
    mitigate: true

Display login hint for duplicate identifiers
info

Login hints are enabled by default for newly created Ory Network Projects.

When users attempt to sign up with an identifier (username, email address etc.) which has previously been registered, they will be presented an error explaining that an identity is already created for that identifier.

If you have a number of different sign-in methods configured (say username and password plus one or more social sign-in providers), its common for users users to not remember with which provider they initially signed up. This can lead to errors when attempting to log in with the wrong method.

To address this, Ory Identities provides "login hints." Login hints provide a message what authentication method is available for the users identifier when they choose a method for which an identity already exists.

To enable login hints edit your Ory Identities configuration directly or use the following CLI command:

ory list workspaces # to get the workspace id
ory list projects --workspace <workspace-id> # to get the project id

ory patch project --project <project-id> --workspace <workspace-id> \
  --replace '/services/identity/config/selfservice/flows/registration/login_hints=true'

Ory Account Experience with login hint

This behavior improves the sign-in experience for your users, but comes at the cost of exposing information about which sign-in mehods a particular account identifier has associated with it.

Disable this feature if account enumeration attacks are a risk factor in your threat model.

Login and registration webhooks and actions
Customize login and registration behavior

You can customize login and registration flows using Ory Actions. This includes calling external services or logic with webhooks and triggering logic that is built-in to Ory, such requiring a verified email address to sign in.
Trigger external logic with webhooks

Make webhook calls to third-party service providers when users sign up or sign in:

    Mailchimp
    Segment
    Hubspot
    Other webhook targets

Control who registers with additional validation

Use Ory Actions to add extra validation that allows you to control exactly who can sign up. For example, you can prevent users from signing up when:

    their email domain doesn't match a certain value - this way you can allow only users from certain organizations to sign up.
    their IP address isn't allowed. This way you can prevent user registrations from locales where you don't provide services.
    they used an invalid invite code or invite password to sign up. This way you can ensure that newly registered users don't get access to expired content or functionality.

Use flow-interrupting webhooks to add this validation to sign-up and registration flows.

Read the Flow-interrupting webhooks documentation to learn more.
Revoke previously issued sessions at login

You can revoke all of the user's active session when they log in to your system. This allows the users to have only one active session, and ensures that they access your services from one point of entry (a device, a browser) at a time.

To enable this behavior, use the Ory CLI.

Run this command to revoke all active sessions of the user after every login:

ory patch identity-config {project_id} \
  --add '/selfservice/flows/login/after/hooks=[{"hook": "revoke_active_sessions"}]'

To use this feature only for specific methods, run this command:

ory patch identity-config {project_id} \
  --add '/selfservice/flows/login/after/password/hooks=[{"hook": "revoke_active_sessions"}]' \
  --add '/selfservice/flows/login/after/oidc/hooks=[{"hook": "revoke_active_sessions"}]' \
  --add '/selfservice/flows/login/after/webauthn/hooks=[{"hook": "revoke_active_sessions"}]'

Disable session revocation

Follow these steps to disable session revocation on login:

    List all configured hooks for the after login method:

    ory get identity-config {project_id} \
      --format=jsonpath='selfservice.flows.login.after'

    Check the JSON output and identify the array index of the revoke_active_sessions hook:

    {
      hooks: [
        {
          hook: "some_other_hook", // The index of this hook is '0'.
        },
        {
          hook: "revoke_active_sessions", // The index of this hook is '1'.
        },
      ],
      oidc: {
        hooks: [],
      },
      password: {
        hooks: [],
      },
      webauthn: {
        hooks: [],
      },
    }

    Remove the hook by passing the hook index in the command:

    ory patch identity-config {project_id} \
      --remove '/selfservice/flows/login/after/hooks/1'

Allow login only with verified email

To allow only the users with a verified email to sign in, follow these steps:

    Go to Authentication → Account verification in the Ory Console.
    Toggle Require Verified Address for Login to switch on the feature.

info

Ory doesn't recommend requiring a verified email to sign in. If you want to encourage users to verify their addresses, show a banner and limit functionality for unverified accounts. This approach helps improve signup conversion.
First sign in without verification

If sessions are issued after registration, users will be signed in after registration, but will need to verify their email address before they can sign in using other devices or browsers and get more active sessions as a result.
Log in users after registration

When you enable this behavior, users get a session after they sign up. This means that they don't have to sign in with their newly created account to get access to your services, but instead can access all the features immediately.

    Go to Authentication → General in the Ory Console.
    Toggle Sign In After Registration.

Address verification

Go to address verification for more details.

Code submissions limit

A code is sent to a user controlled address (for example an email address) in some flows such as verification, recovery, registration, etc. When the correct code is then submitted by the user, the flow advances. If the wrong code is submitted too many times, the flow fails.

It is important to find a balance between allowing a user to submit a wrong code multiple times, due for example to typos, and not too many times, to prevent an attacker from brute-forcing the code.

To that end, the numeric limit can be configured. The default is 5. To prevent misconfiguration, this number is required to be between 1 and 255. We recommend a rather small number for security reasons, probably under 10. Organizations with strict security policies might set this number to 2 or 3.

    Ory Console

To change the limit, go to Ory Console → Authentication -> General -> Maximum number of code submissions, enter the desired number, and click the Save button.

    Ory CLI

    Download the Ory Identities config from your project and save it to a file:

    ## List all available workspaces
    ory list workspaces

    ## List all available projects
    ory list projects --workspace <workspace-id>

    ## Get config
    ory get identity-config --project <project-id> --workspace <workspace-id> --format yaml > identity-config.yaml

    Update the configuration value to the desired value:
    config.yml

    config:
        selfservice:
            methods:
                code:
                    max_submissions: 3

    Update the Ory Identities configuration using the file you worked with:

    ory update identity-config --project <project-id> --workspace <workspace-id> --file identity-config.yaml

Create identities

The goal of this flow is to create an identity and provide the end user with a way of signing in and setting their password (or any other type of credential) for future logins. To achieve this, create the identity and set its traits and schema:

    Ory Network

curl --request POST -sL \
  --header "Authorization: Bearer ory_pat_xRKLsFEOUFQFVBjd6o3FQDifaLYhabGd" \
  --header "Content-Type: application/json" \
  --data '{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs@example.org"
  }
}' https://playground.projects.oryapis.com/admin/identities

The server response contains the created identity:

{
  "id": "e01b5f2f-6afc-4194-8578-4cebcf69a4d5",
  "schema_id": "preset://email",
  "schema_url": "https://playground.projects.oryapis.com/schemas/cHJlc2V0Oi8vZW1haWw",
  "state": "active",
  "state_changed_at": "2022-02-24T13:38:05.27510048Z",
  "traits": {
    "email": "docs@example.org"
  },
  "verifiable_addresses": [
    {
      "id": "c6cea2a7-f419-42fe-a610-456bea02aab5",
      "value": "docs@example.org",
      "verified": false,
      "via": "email",
      "status": "pending",
      "created_at": "2022-02-24T13:38:05.28581Z",
      "updated_at": "2022-02-24T13:38:05.28581Z"
    }
  ],
  "recovery_addresses": [
    {
      "id": "21ff90e1-a9a9-491e-8194-774172420989",
      "value": "docs@example.org",
      "via": "email",
      "created_at": "2022-02-24T13:38:05.29565Z",
      "updated_at": "2022-02-24T13:38:05.29565Z"
    }
  ],
  "created_at": "2022-02-24T13:38:05.27892Z",
  "updated_at": "2022-02-24T13:38:05.27892Z"
}

Keep in mind that you can change the schema_id to reflect the schema you want to use for this identity. Similarly, the trait key/values depend on your schema as well. The command shown does not create a password or any other type of credential for the identity.

Import identities

Ory allows you to import identities from any other system. To import identities, you use the same endpoint as for creating identities. The main difference between creating and importing identities is that when you import identities, you must provide the credentials field.
Importing verified addresses

Use the verifiable_addresses field to import a verified address like an email address.
danger

You must ensure that address verification is enabled and that the verifiable_address is present in the identity's traits. If the identity traits do not have the address set as the "verified address" type, the imported values will be deleted on the next identity update.

This is a sample payload for importing an identity with a verified address:

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-verify@example.org"
  },
  "verifiable_addresses": [
    {
      "value": "docs-verify@example.org",
      "verified": true,
      "via": "email",
      "status": "completed"
    }
  ]
}

Test the above example with a cURL command:

    Ory Network

curl --request POST -sL \
  --header "Authorization: Bearer ory_pat_xRKLsFEOUFQFVBjd6o3FQDifaLYhabGd" \
  --header "Content-Type: application/json" \
  --data '{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-verify@example.org"
  },
  "verifiable_addresses": [
    {
      "value": "docs-verify@example.org",
      "verified": true,
      "via": "email",
      "status": "completed"
    }
  ]
}' https://$PROJECT_SLUG.projects.oryapis.com/admin/identities

The API response contains the created identity:

{
  "id": "880052ae-d32c-4b56-b82d-0dc711080910",
  "schema_id": "preset://email",
  "schema_url": "https://$PROJECT_SLUG.projects.oryapis.com/schemas/cHJlc2V0Oi8vZW1haWw",
  "state": "active",
  "state_changed_at": "2022-02-24T15:33:17.845589803Z",
  "traits": {
    "email": "docs-verify@example.org"
  },
  "verifiable_addresses": [
    {
      "id": "c3f67b59-ab58-410b-971a-06b80f38468a",
      "value": "docs-verify@example.org",
      "verified": true,
      "via": "email",
      "status": "completed",
      "created_at": "2022-02-24T15:33:17.848941Z",
      "updated_at": "2022-02-24T15:33:17.848941Z"
    }
  ],
  "recovery_addresses": [
    {
      "id": "819b53bf-79e3-452e-8a9b-0323ec9d193c",
      "value": "docs-verify@example.org",
      "via": "email",
      "created_at": "2022-02-24T15:33:17.849758Z",
      "updated_at": "2022-02-24T15:33:17.849758Z"
    }
  ],
  "created_at": "2022-02-24T15:33:17.848475Z",
  "updated_at": "2022-02-24T15:33:17.848475Z"
}

Importing recovery addresses

It is possible to import a list of recovery_addresses - similar to verifiable_addresses. It is better to let the identity schema handle setting the appropriate fields since there is no status to set for this address type.

We don't recommend setting these fields as they will be overwritten by other self-service flows. For more information on account recovery read the account recovery documentation.
Importing credentials

Ory supports importing credentials for identities including passwords, social sign-in connections, TOTP, WebAuthn, and passkeys.
Clear text password

To import a clear text password, provide the password in the JSON payload.
danger

Password imports don't use any password validation. Users have to update their password according to the policy themselves using self-service flows.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-cleartext@example.org"
  },
  "credentials": {
    "password": {
      "config": {
        "password": "the-password"
      }
    }
  }
}

The password the-password will then be hashed according to the configured password hashing algorithm and stored in the database. The identity will be able to sign in using docs-cleartext@example.org and the-password as credentials.

When importing clear text passwords, the process may be slower than expected because each password must be hashed during the import process. If you are batch importing more than 20 clear text passwords, please hash the passwords before importing them to avoid timeouts.
Hashed passwords

To import a hashed password, provide the hashed password in the JSON payload.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-hash@example.org"
  },
  "credentials": {
    "password": {
      "config": {
        "hashed_password": "$2a$10$ZsCsoVQ3xfBG/K2z2XpBf.tm90GZmtOqtqWcB5.pYd5Eq8y7RlDyq"
      }
    }
  }
}

The value of the hashed password is different depending on the algorithm used. The following algorithms are supported:

    BCrypt
    Argon2
    MD5
    SHA
    SSHA, SSHA256, SSHA512
    PBKDF2
    SCrypt
    Firebase SCrypt
    crypt(3)
    HMAC

Ory Identities can hash passwords by BCrypt and can compare stored BCrypt hash and migrate if configured hasher (hashers.algorithm) isn't BCrypt.

BCrypt format is described here.
Password migration using a web hook

If you want to import users, but do not have access to the hashed password, or the hashed password is in a format that Ory Identities does not support, you can use a web hook to migrate the password.

The web hook will be called when the user logs in, and will receive the user's identifier and password. If the web hook returns successfully, the user will be logged in and the hashed password will be stored.

The following steps are necessary to set up password migration using a web hook:

    Import an identity with an empty password hash and use_password_migration_hook set to true

    Bulk-import all your users with an empty password hash and use_password_migration_hook set:

    {
      "schema_id": "preset://email",
      "traits": {
        "email": "pw-migration@example.org"
      },
      "credentials": {
        "password": {
          "config": {
            "hashed_password": "",
            "use_password_migration_hook": true
          }
        }
      }
    }

    Configure a password migration web hook
        Ory Console
        Ory CLI

    a. Go to your project in the Ory Console.

    b. Click Authentication in the top navigation bar.

    c. Click Actions & Webhooks in the left sidebar.

    d. Click Create new Action.

    e. In the Action Base Details dialog, fill in the following fields:

        Flow — Select Password Migration. The execution phase and method fields are hidden because the migration hook runs at login time automatically, outside of the standard flow lifecycle.

        URL — Enter the URL of your password migration webhook endpoint, for example https://example.org/migrate-password.

        Method — Select the HTTP method your endpoint expects, for example POST.

        Action HTTP body — The body is pre-filled with a Jsonnet template that maps ctx.identifier and ctx.password to the request payload. You can customize it. See the webhook documentation for all available context fields.

    Action Base Details dialog with Password Migration flow selected

    f. Click Next to proceed to the Action authentication step. Select the authentication type for your webhook endpoint. Ory supports None, Basic (username and password), and Key (API key in a header or cookie). See the webhook authentication documentation for details on each option.
    warning

    Leaving your webhook endpoint unauthenticated exposes it to unauthorized access. Secure your endpoint with strong authentication to protect sensitive credentials passed during migration.

    Action authentication dialog

    g. Click Save action. The new Password Migration action appears in the actions table.

    Actions &amp; Webhooks page showing the Password Migration action

    Implement the password migration web hook

    If a user logs in and the identifier points to an identity that has use_password_migration_hook set to true, Ory Identities will call the configured web hook URL. The body of the request will be mapped using the provided JSONNet snippet, or default to this payload when no body snippet is configured:

    {
      "identifier": "pw-migration@example.org",
      "password": "the-password"
    }

    To verify that an identity is pending migration in the Ory Console:

    a. Go to your project in the Ory Console.

    b. Click User management in the top navigation bar.

    c. Click Users & identities in the left sidebar.

    d. Find the identity you want to review and click its row to open the details.

    e. In the Basic Information section, under Credential Identifiers, the identity shows a Migration pending badge if the user hasn't logged in and completed the password migration yet.

    Identity detail page showing the Migration pending badge

    The web hook can then check the identifier and password against the legacy system. If the password matches, the web hook must respond with a 200 OK status code and the following payload:

    {
      "status": "password_match"
    }

    After a successful response, the identity will be updated with the hashed password and the user will be logged in. The password migration hook will not be called again for this identity.

    If the password does not match, the webhook should return 403 Forbidden, to indicate to the user that the password did not match.

    Any other response will be treated as an unexpected error, and the user will not be logged in.

Social sign-in connections

When importing social sign-in connections, the provider field is the social sign-in provider ID you set in your social sign-in configuration. The subject ID must be the ID of the user on the given platform. Usually, this is the sub claim of the OpenID Connect ID Token provider such as Google.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-oidc@example.org"
  },
  "credentials": {
    "oidc": {
      "config": {
        "providers": [
          {
            "provider": "github",
            "subject": "12345"
          },
          {
            "provider": "google",
            "subject": "12345"
          }
        ]
      }
    }
  }
}

Importing social sign-in connections with email

If the previous system didn't record the immutable user/subject ID but only the connection's email address, Ory provides a way to automatically link the email address with the social sign-in provider. However, the email address must be available for this process.

For more details, refer to the automatic account linking documentation.
SAML connections

When importing SAML connections, the provider field is the SAML provider ID you set in your SAML configuration. The subject ID must be the ID of the user on the given platform. The subject should not be an email, but a fixed user ID that never changes.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-oidc@example.org"
  },
  "credentials": {
    "saml": {
      "config": {
        "providers": [
          {
            "provider": "okta",
            "subject": "12345"
          },
          {
            "provider": "one-login",
            "subject": "12345"
          }
        ]
      }
    }
  }
}

TOTP credentials

To import an identity with an existing TOTP (time-based one-time password) credential, provide the TOTP secret as an otpauth:// URL following the Google Authenticator Key URI format.

This allows users to continue using their existing authenticator app without re-enrollment.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-totp@example.org"
  },
  "credentials": {
    "totp": {
      "config": {
        "totp_url": "otpauth://totp/MyApp:docs-totp@example.org?secret=JBSWY3DPEHPK3PXP&issuer=MyApp"
      }
    }
  }
}

The totp_url must be a valid otpauth:// URL. The URL contains the shared secret, issuer, and account name:

otpauth://totp/{Issuer}:{AccountName}?secret={SECRET}&issuer={Issuer}

    secret (required): Base32-encoded shared secret.
    issuer (required): Service or company name.
    digits (optional): Number of digits, default is 6.
    period (optional): Time step in seconds, default is 30.
    algorithm (optional): Hash algorithm (SHA1, SHA256, SHA512), default is SHA1.

Each identity supports one TOTP credential. Importing a new TOTP credential replaces the previous one.
Passkey credentials

To import an identity with existing passkey credentials, provide the WebAuthn credential data including the credential ID, public key, and authenticator metadata. All binary fields must be base64-encoded.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-passkey@example.org"
  },
  "credentials": {
    "passkey": {
      "config": {
        "user_handle": "dXNlci1oYW5kbGUtMQ==",
        "credentials": [
          {
            "id": "Y3JlZGVudGlhbC1pZC0x",
            "public_key": "cHVibGljLWtleS0x",
            "attestation_type": "none",
            "display_name": "Work Laptop",
            "is_passwordless": true,
            "authenticator": {
              "aaguid": "YWFndWlkLTE=",
              "sign_count": 0,
              "clone_warning": false
            }
          }
        ]
      }
    }
  }
}

Each credential requires the following fields:

    id (base64, required): The credential ID assigned during registration.
    public_key (base64, required): The COSE-encoded public key from the authenticator.
    attestation_type (string, required): The attestation type. Use "none" if the original attestation is not available.
    authenticator.aaguid (base64, required): The Authenticator Attestation GUID identifying the authenticator model.
    authenticator.sign_count (integer, required): The signature counter from the last authentication.
    authenticator.clone_warning (boolean, required): Set to true if the credential may have been cloned.
    user_handle (base64, required on create): The WebAuthn user handle. Must be unique per identity.

Optional fields include display_name, is_passwordless, added_at, flags (user_present, user_verified, backup_eligible, backup_state), and transport ("usb", "nfc", "ble", "internal").

An identity can have multiple passkey credentials. When updating an identity, existing credentials with the same id are updated in place and new credentials are appended.
warning

Passkeys are bound to a relying party (RP) ID, typically your domain. If the RP ID changes during migration, existing passkeys will not work. Make sure the RP ID in your Ory configuration matches the one used when the passkeys were originally registered.
WebAuthn credentials

WebAuthn credentials used for second-factor authentication (FIDO2 security keys) use the same format as passkeys. Use the webauthn key instead of passkey:

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-webauthn@example.org"
  },
  "credentials": {
    "webauthn": {
      "config": {
        "user_handle": "dXNlci1oYW5kbGUtMQ==",
        "credentials": [
          {
            "id": "Y3JlZGVudGlhbC1pZC0x",
            "public_key": "cHVibGljLWtleS0x",
            "attestation_type": "none",
            "display_name": "YubiKey",
            "is_passwordless": false,
            "authenticator": {
              "aaguid": "YWFndWlkLTE=",
              "sign_count": 10,
              "clone_warning": false
            }
          }
        ]
      }
    }
  }
}

Set is_passwordless to false for second-factor WebAuthn credentials and true for passkeys.
Organization-specific SAML and OIDC connections

When importing SAML or OIDC connections that are only available for certain organizations (for example email@companyname.com), you can use the organization field to specify the organization that the user belongs to.

{
  "schema_id": "preset://email",
  "traits": {
    "email": "docs-oidc@example.org"
  },
  "organization": "9ed50339-d6b9-47ef-9610-194773f3bfbf",
  "credentials": {
    "saml": {
      "config": {
        "providers": [
          {
            "provider": "okta",
            "subject": "12345",
            "organization": "9ed50339-d6b9-47ef-9610-194773f3bfbf"
          }
        ]
      }
    },
    "oidc": {
      "config": {
        "providers": [
          {
            "provider": "github",
            "subject": "12345",
            "organization": "9ed50339-d6b9-47ef-9610-194773f3bfbf"
          }
        ]
      }
    }
  }
}

Bulk import identities from other providers

To import multiple identities into Ory Identities, use the Identity Import API.
Limits

The Identity Import API enforces limits which are documented in the API reference.

    Avoid importing large batches with plaintext passwords, as they can cause timeouts.
    If you need to import more identities, split the import into multiple requests.

Request format

The endpoint accepts a JSON array of identities, each of which must have a create property that holds the identity that should be created. Optionally, you can specify a patch_id property which must be a UUID to be returned in the response. This can be used to correlate the response with the patch.

The following example shows how to import two identities. It will create two identities with the email addresses foo@example.com and bar@example.com and the passwords foopassword and barpassword respectively.

curl --location --request PATCH 'https://${YOUR_PROJECT_SLUG}.projects.oryapis.com/admin/identities' \
--header 'Authorization: Bearer ${YOUR_ORY_ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "identities": [
        {
            "patch_id": "6086b0a8-d851-5431-91b4-b6e5e39dc88b",
            "create": {
                "credentials": {
                    "password": {
                        "config": {
                            "password": "foopassword"
                        }
                    }
                },
                "state": "active",
                "traits": {
                    "email": "foo@example.com"
                },
                "schema_id": "preset://email"
            }
        },
        {
            "patch_id": "d554dc00-49ce-5381-9bdc-79637dec85a2",
            "create": {
                "credentials": {
                    "password": {
                        "config": {
                            "password": "barpassword"
                        }
                    }
                },
                "state": "active",
                "traits": {
                    "email": "bar@example.com"
                },
                "schema_id": "preset://email"
            }
        }
    ]
}'

Successful response

If at least one identity is successfully imported, the API responds with HTTP 200 OK. The response contains an array of results per identity. Each entry includes the corresponding patch_id to correlate the response with the request.

{
  "identities": [
    {
      "action": "create",
      "patch_id": "6086b0a8-d851-5431-91b4-b6e5e39dc88b",
      "identity": "55f93ea4-09ff-4273-8b88-082cc70d6d44"
    },
    {
      "action": "create",
      "patch_id": "d554dc00-49ce-5381-9bdc-79637dec85a2",
      "identity": "f70c9b29-4790-4330-90dc-920db16a4b85"
    }
  ]
}

Errors during bulk import

Failure to import an identity will not do not affect the entire bulk import. In the response, "action": "error" indicates that the identity with the corresponding patch_id could not be imported. The patch_id can be set on each identity passed to PATCH /admin/identities. The error object contains more details about why the import failed.

Example with both successful and failed imports:

{
  "identities": [
    {
      "action": "create",
      "identity": "0d0ed560-43ce-42a9-bd40-aafe921c3af1",
      "patch_id": "6086b0a8-d851-5431-91b4-b6e5e39dc88b"
    },
    {
      "action": "error",
      "patch_id": "d554dc00-49ce-5381-9bdc-79637dec85a2",
      "error": {
        "code": 400,
        "status": "Bad Request",
        "reason": "The request was malformed or contained invalid parameters",
        "message": "The request was malformed or contained invalid parameters"
      }
    },
    {
      "action": "error",
      "patch_id": "1634f1e9-8419-5a54-8191-2260c8aaea31",
      "error": {
        "code": 409,
        "status": "Conflict",
        "reason": "This identity conflicts with another identity that already exists.",
        "message": "The resource could not be created due to a conflict"
      }
    },
    {
      "action": "create",
      "identity": "b8651770-be8d-460b-b86f-679c4ba50264",
      "patch_id": "eade6651-9311-5624-8afd-e4a3e05e0c4a"
    }
  ]
}

If no identity is imported, the response will return one of the following errors:

    400 Bad Request – The request payload is invalid or improperly formatted.
    409 Conflict – Duplicate identities or conflicting data detected.

Troubleshooting 504 Gateway Timeout

    Reduce the batch size
    Avoid duplicate identities
    Pre-hash passwords using BCrypt

If issues persist, contact support.

Identity state

The identity state determines whether an identity is active or not with the following states:

    active - The identity can use self-service flows such as sign-in.
    inactive - The identity can't use self-service flows.

When an inactive identity tries to sign in, the server responds with a UI error.
Change identity state using the SDK

Use the SDK to activate and de-activate identities:

    JavaScript

// Copyright © 2026 Ory Corp

import { Configuration, IdentityApi } from "@ory/client"
import { JsonPatchOpEnum } from "@ory/client/api"

const identity = new IdentityApi(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function setState(
  identityId: string,
  state: "active" | "inactive",
) {
  return await identity
    .patchIdentity({
      id: identityId,
      jsonPatch: [
        {
          op: JsonPatchOpEnum.Replace,
          value: state,
          path: "/state",
        },
      ],
    })
    .then(({ data }) => data)
}

    Go

// Copyright © 2026 Ory Corp

package identity

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/client-go"
)

var oryAuthed = context.WithValue(context.Background(), ory.ContextAccessToken, os.Getenv("ORY_API_KEY"))

func setState(identityId string, state string) (err error) {
	cfg := ory.NewConfiguration()
	cfg.Servers = ory.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}
	apiClient := ory.NewAPIClient(cfg)

	_, _, err = apiClient.IdentityApi.
		PatchIdentity(oryAuthed, identityId).
		JsonPatch([]ory.JsonPatch{{Op: "replace", Path: "/state", Value: state}}).Execute()
	return err
}



Invite users

If your application must be accessible only to a hand-picked group of specific individuals, and you don't want to make registration publicly available, you can send invitations to selected users.

The process of inviting users to an Ory-powered application follows these steps:

    You create a basic user account for the user you want to invite. You use their email address as the account identifier.
    You trigger account recovery for the user account you created.
    You get the recovery link from the API response and send it to the user's email address.
    The user performs account recovery which forces them to define new credentials.
    The user gets a fully functional account with the credentials they defined.

Procedure

Send these API calls to the Admin API to create a new user account and create a recovery link. Admin API calls don't trigger Ory Actions.
tip

You need an API Key to call these endpoints. Read Authorization with API Keys to learn more.

    Create a new user account:

    curl --request POST -sL \
      --header "Authorization: Bearer {ORY_API_KEY}" \
      --header "Content-Type: application/json" \
      --data '{
      "schema_id": "preset://email",
      "traits": {
         "email": "$USER_EMAIL_ADDRESS"
        }
      }' https://{project-slug}.projects.oryapis.com/admin/identities

    info

    The schema_id property must point to the schema set in your project. To get the schema name, look for default_schema_id in your Ory Identities configuration. Read the Ory CLI documentation to learn how to get your Ory Identities configuration and save it to a file.

    Get the ID of the created account from the API response:

    {
       "id":"$ACCOUNT_ID",
       "credentials":{
          "password":{
             "type":"password",
             "identifiers":[
                "$USER_EMAIL_ADDRESS"
             ],
             "version":0,
             "created_at":"2023-02-17T14:16:06.8591Z",
             "updated_at":"2023-02-17T14:16:06.8591Z"
          },
          // ...

    Use the account ID to get the recovery link for that account.
    note

    Use the expires_in property to set the appropriate expiry time for the recovery link. If the user you want to invite doesn't access the link before it expires, you must generate a new recovery link.

    curl --request POST -sL \
       --header "Authorization: Bearer {ORY_API_KEY}" \
       --header "Content-Type: application/json" \
       --data '{
       "expires_in": "12h",
       "identity_id": "$ACCOUNT_ID"
       }' https://{project-slug}.projects.oryapis.com/admin/recovery/link

    tip

    Add a return_to query parameter to control where the user lands after they set their credentials. The target URL must be allow-listed in selfservice.allowed_return_urls (see Browser redirects).

    curl --request POST -sL \
       --header "Authorization: Bearer {ORY_API_KEY}" \
       --header "Content-Type: application/json" \
       --data '{
       "expires_in": "12h",
       "identity_id": "$ACCOUNT_ID"
       }' 'https://{project-slug}.projects.oryapis.com/admin/recovery/link?return_to=https://your-app.example.com/welcome'

    Ory Identities carries return_to onto the recovery flow and then the settings flow, so your custom UI can also read it to brand a first-time invitation differently from a regular password reset — for example by setting return_to=https://your-app.example.com/welcome?source=invitation and reading source from the flow.

    Copy the recovery link from the API response and send it to the user:

    {
      "recovery_link": "https://{project-slug}.projects.oryapis.com/self-service/recovery?flow=b6c81504-dc8e-4786-b849-ac292bc9f317&token=VjKUKGU7J4YAonC5b5q1hDySJjWGh3qf",
      "expires_at": "2023-02-18T02:16:47.286385565Z"
    }

    tip

    When you develop locally with Ory Tunnel, replace the project slug domain in the recovery link with your Ory Tunnel URL (for example http://localhost:4000). If you don't do this, clicking the link causes a CORS error. Read CSRF troubleshooting for more details.


Administrative account recovery

You can initiate account recovery for users using the admin API endpoints. You can initiate the flow even for users that don't have a recovery address configured.
note

If the recovery flow initiated through the admin API expires, users without a recovery address can't start the flow again by themselves.

Read this document to learn more about the account recovery flow.
One-time codes

    Ory Network API
    Go SDK

Send a request to the Admin API of your project. This operation requires an API Key.

curl --request POST -sL \
  --header "Authorization: Bearer ORY_API_KEY" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
  "expires_in": "12h",
  "identity_id": "e01b5f2f-6afc-4194-8578-4cebcf69a4d5"
}' https://$PROJECT_SLUG.projects.oryapis.com/admin/recovery/code

tip

Read Authorization with API Keys to learn more about API Keys in the Ory Network.
Response

The response contains a recovery_link with the flow ID and a recovery_code. To recover the account, the user must access the link and enter the recovery code in the form available at the link.

{
  "recovery_link": "/ui/recovery?flow=79686c66-e427-4c1b-861e-083572f97964",
  "recovery_code": "76453943",
  "expires_at": "2022-10-25T03:09:37.60684766Z"
}

After successfully recovering their account, users can connect to a social sign-in provider or create a new password.
Magic links

To create the account recovery link, use:

    Ory Network API
    Go SDK

Send a request to the Admin API of your project. This operation requires an API Key.

curl --request POST -sL \
   --header "Authorization: Bearer {ORY_API_KEY}" \
   --header "Content-Type: application/json" \
   --data '{
   "expires_in": "12h",
   "identity_id": "$ACCOUNT_ID"
   }' https://$PROJECT_SLUG.projects.oryapis.com/admin/recovery/link

tip

Read Authorization with API Keys to learn more about API Keys in the Ory Network.
Response

The response contains a recovery_link with the flow ID and a random token. The user must access the link to recover the account. Upon accessing the link, the user can connect to a social sign-in provider or set up a new password.

{
  "recovery_link": "https://playground.projects.oryapis.com/self-service/recovery?flow=81c55cec-76fd-4907-bddf-cc112e835698&token=yM9nAZpPIjwccKh9qHRh8OfywZSRcr6q",
  "expires_at": "2022-02-25T03:09:37.60684766Z"
}

It is currently not possible to send the recovery link directly to a user's email, this feature is tracked as #595.

    Go SDK

package main

import (
	"context"
	"fmt"
	"io"

	ory "github.com/ory/client-go"
)

func main() {
	client := ory.NewAPIClient(&ory.Configuration{
		Servers: ory.ServerConfigurations{{
			URL: "https://$PROJECT_SLUG.projects.oryapis.com",
		}},
		DefaultHeader: map[string]string{
			"Authorization": "Bearer ORY_API_KEY", // API Key for your Ory Network project
		},
	})

	link, res, err := client.FrontendApi.AdminCreateSelfServiceRecoveryLink(context.Background()).
		AdminCreateSelfServiceRecoveryLinkBody(*ory.NewAdminCreateSelfServiceRecoveryLinkBody("YOUR_INDENTITY_ID")).
		Execute()

	if err != nil {
		body, _ := io.ReadAll(res.Body)
		fmt.Printf("could not create recovery link %v: %v", err.Error(), string(body))
		panic(err)
	}

	fmt.Printf("Use link: %s\n", link.RecoveryLink)
}

tip

This code requires an API Key. Read Authorization with API Keys to learn more about API Keys in the Ory Network.
Response

The response contains a recovery_link with the flow ID and a random token. The user must access the link to recover the account. Upon accessing the link, the user can connect to a social sign-in provider or set up a new password.

{
  "recovery_link": "https://playground.projects.oryapis.com/self-service/recovery?flow=81c55cec-76fd-4907-bddf-cc112e835698&token=yM9nAZpPIjwccKh9qHRh8OfywZSRcr6q",
  "expires_at": "2022-02-25T03:09:37.60684766Z"
}

It is currently not possible to send the recovery link directly to a user's email, this feature is tracked as #595.

Export identities

Ory Identities allows you to export identities including their hashed credentials using the include_credential attribute on the getIdentity method:

package pkg

import (
	ory "github.com/ory/client-go"
)

func main() {
  conf := ory.NewConfiguration()
  conf.Servers = ory.ServerConfigurations{{URL: "https://{your-slug}.projects.oryapis.com"}}

  identity, res, err := client.IdentityApi.GetIdentity(ctx, created.Id).IncludeCredential([]string{"password"}).Execute()
  // ...
}

SCIM API reference
Need help?

    New to Ory? Talk to the team about features and plans.
    Already a customer? Open a support ticket.

This page is a reference for the Ory Network SCIM server API. It describes the base URL and authentication, every available endpoint with example requests and responses, the supported resource schemas, pagination and filtering, and the error model.

For a conceptual overview, how SCIM relates to organizations, auto-linking, and data mapping, see the SCIM overview.

The Ory Network SCIM server implements SCIM 2.0 as defined in RFC 7643 (schemas) and RFC 7644 (protocol), with cursor-based pagination from RFC 9865.
Base URL

Each SCIM client has its own base URL. The client ID you choose when configuring the SCIM client is part of the URL:

https://<project-slug>.projects.oryapis.com/scim/<client-id>/v2

The exact URL is shown in the Ory Console when you create or edit a SCIM client. All endpoint paths below are relative to this base URL — for example, POST /Users means POST https://<project-slug>.projects.oryapis.com/scim/<client-id>/v2/Users.

The server returns Content-Type: application/scim+json on every response. Send the same content type on requests that have a body.
Authentication

Every request must include an Authorization header that matches the Authorization header secret configured on the SCIM client. The server compares the header against the configured secret using a constant-time comparison.

Authorization: Bearer <your-secret>

When comparing, the server trims surrounding whitespace and strips a single leading, case-insensitive Bearer prefix. This means that if your configured secret is s3cr3t, both of the following are accepted:

    Authorization: Bearer s3cr3t
    Authorization: s3cr3t

info

Some identity providers (for example Microsoft Entra) ask you to enter the token without the Bearer prefix and add it themselves. Because only one Bearer prefix is stripped, configure the secret without a Bearer prefix to avoid double-prefixing. See the provider guides for provider-specific instructions.

Authentication errors:
Condition	Status	detail
No Authorization header	401	no authorization header found
Header does not match the secret	401	invalid authorization header
note

ServiceProviderConfig advertises oauthbearertoken as the authentication scheme — a bearer token in the Authorization header. The token is the SCIM client's configured Authorization header secret, which is a static shared secret rather than an OAuth-issued token.
Service discovery

These read-only endpoints let SCIM clients and conformance tools discover the server's capabilities. They do not require a resource ID.
Method	Path	Description
GET	/ServiceProviderConfig	Server capabilities (patch, filter, pagination, auth)
GET	/ResourceTypes	List of supported resource types (User, Group)
GET	/ResourceTypes/{id}	A single resource type, where id is User or Group
GET	/Schemas	List of supported schemas (User, Group, Enterprise User)
GET	/Schemas/{id}	A single schema, where id is the schema URN
GET /ServiceProviderConfig

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig"],
  "documentationUri": "https://www.ory.com/docs/kratos/manage-identities/scim",
  "patch": { "supported": true },
  "bulk": { "supported": false },
  "filter": { "supported": true, "maxResults": 1000 },
  "changePassword": { "supported": true },
  "sort": { "supported": false },
  "etag": { "supported": false },
  "pagination": {
    "cursor": true,
    "index": true,
    "defaultPaginationMethod": "index",
    "defaultPageSize": 100,
    "maxPageSize": 1000,
    "cursorTimeout": 3600
  },
  "authenticationSchemes": [
    {
      "type": "oauthbearertoken",
      "name": "OAuth Bearer Token",
      "description": "Authentication using a bearer token in the Authorization HTTP header.",
      "specUri": "https://datatracker.ietf.org/doc/html/rfc6750",
      "documentationUri": "https://www.ory.com/docs/kratos/manage-identities/scim#configure-a-scim-client"
    }
  ],
  "meta": { "resourceType": "ServiceProviderConfig" }
}

Users
Method	Path	Description	Success status
GET	/Users	List or search users	200
POST	/Users	Create a user	201
GET	/Users/{id}	Retrieve a user by ID	200
PUT	/Users/{id}	Replace a user (full update)	200
PATCH	/Users/{id}	Partially update a user (PatchOp)	200
DELETE	/Users/{id}	Delete a user (deletes the identity)	204

The {id} is the Ory identity ID (a UUID), returned as id when the user is created.
Create a user

POST /Users
Content-Type: application/scim+json
Authorization: Bearer <your-secret>

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "externalId": "ext-123",
  "userName": "bjensen@example.com",
  "name": { "givenName": "Barbara", "familyName": "Jensen" },
  "emails": [{ "value": "bjensen@example.com", "primary": true, "type": "work" }],
  "active": true
}

On success the server responds with 201 Created and the full user resource:

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
  "externalId": "ext-123",
  "userName": "bjensen@example.com",
  "name": { "givenName": "Barbara", "familyName": "Jensen" },
  "active": true,
  "emails": [{ "value": "bjensen@example.com", "primary": true, "type": "work" }],
  "meta": {
    "resourceType": "User",
    "created": "2026-06-15T10:00:00Z",
    "lastModified": "2026-06-15T10:00:00Z"
  }
}

How the incoming attributes are applied to the Ory identity is controlled by the client's data mapping. The password attribute, if present, is stored as a password credential and is never returned in any response.

If the user already exists, the create may succeed as an update (auto-linking) or fail with a 409 conflict. See How SCIM relates to organizations and Errors.
Retrieve a user

GET /Users/9f8e7d6c-5b4a-3210-fedc-ba9876543210

Returns 200 OK and the user resource shown above.
List users

GET /Users?startIndex=1&count=20

Returns a ListResponse envelope. See Pagination for the offset and cursor variants and Filtering for the filter query parameter.

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "totalResults": 42,
  "startIndex": 1,
  "itemsPerPage": 20,
  "Resources": [
    { "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"], "id": "...", "userName": "bjensen@example.com", "active": true }
  ]
}

Replace a user

PUT /Users/{id} replaces the user with the supplied representation, so send the full resource. Attributes you omit are reset to their defaults — for example, omitting active re-enables the user. The password is the exception: it is changed only when you include it. Use PATCH for partial updates.
Update a user (PATCH)

PATCH /Users/{id} applies a SCIM PatchOp with add, replace, and remove operations:

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [
    { "op": "replace", "path": "active", "value": false },
    { "op": "replace", "path": "name.givenName", "value": "Babs" }
  ]
}

    Schema-qualified attribute paths are accepted, for example urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:department. Paths that reference an unsupported schema return 400.
    A remove operation without a path returns 400 with scimType: noTarget.
    Operations against read-only attributes (such as id, groups, or meta) are ignored.

Delete a user

DELETE /Users/{id} returns 204 No Content and permanently deletes the underlying Ory identity. To disable a user without deleting it, set active to false instead. See Deprovisioning identities.
User resource schema

Ory Network supports the standard SCIM user resource schema as defined in RFC 7643, Section 4.1. The following attributes are supported:
Name	Type	Remarks
id	UUID	Read-only, this is the identity ID.
externalId	string	Optional, an ID set by the SCIM client. Filterable (case-sensitive).
userName	string	Required, unique identifier for the user. Typically used as the login identifier. Filterable.
name	object	Contains sub-attributes formatted, familyName, givenName, middleName, honorificPrefix, and honorificSuffix.
displayName	string	
nickName	string	
profileUrl	string	
title	string	
userType	string	
preferredLanguage	string	
locale	string	
timezone	string	If set, must be a valid time zone.
active	bool	Whether the user can log in. If omitted on create or replace, defaults to true. Set to false to deactivate the user; deactivated users cannot log in.
password	string	If set, the user can log in with this password. The password is never returned in any SCIM response.
emails	array	List of email addresses. Each email can have a value (string), display (string), primary (boolean), and type (string). At most one primary=true email can be set.
phoneNumbers	array	List of phone numbers. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
ims	array	List of instant messaging accounts. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
photos	array	List of photos. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
addresses	array	List of addresses. Each address can have formatted, streetAddress, locality, region, postalCode, country, and type.
groups	array	Read-only, a list of groups the user is a direct member of. Each entry has value, display, and type. To modify, set the members property on the Groups resource.
entitlements	array	List of entitlements. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
roles	array	List of roles. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
x509Certificates	array	List of X.509 certificates. Each entry can have value, display, primary, and type. At most one primary=true entry can be set.
Enterprise User extension

The server supports the SCIM Enterprise User extension (RFC 7643, Section 4.3), identified by the schema URN urn:ietf:params:scim:schemas:extension:enterprise:2.0:User. When present, the extension is returned as a top-level object keyed by the URN, and the URN is added to the resource's schemas array:

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User", "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
  "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
  "userName": "bjensen@example.com",
  "active": true,
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    "employeeNumber": "701984",
    "costCenter": "4130",
    "organization": "Universal Studios",
    "division": "Theme Park",
    "department": "Tour Operations",
    "manager": { "value": "<manager-identity-id>", "displayName": "John Smith" }
  }
}

Name	Type	Remarks
employeeNumber	string	Filterable.
costCenter	string	
organization	string	A free-form string attribute; unrelated to the Ory organization the SCIM client is bound to.
division	string	
department	string	
manager	object	value is the manager's identity ID. manager.displayName is read-only and is only resolved if the manager identity is in the same organization.
Groups
Method	Path	Description	Success status
GET	/Groups	List or search groups	200
POST	/Groups	Create a group	201
GET	/Groups/{id}	Retrieve a group by ID	200
PUT	/Groups/{id}	Replace a group (full update)	200
PATCH	/Groups/{id}	Partially update a group (PatchOp)	200
DELETE	/Groups/{id}	Delete a group	204
Create a group

POST /Groups
Content-Type: application/scim+json
Authorization: Bearer <your-secret>

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "externalId": "ext-grp-1",
  "displayName": "Engineering",
  "members": [
    { "value": "<identity-id>", "type": "User" },
    { "value": "<group-id>", "type": "Group" }
  ]
}

Returns 201 Created with the group resource:

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "id": "a1b2c3d4-...",
  "externalId": "ext-grp-1",
  "displayName": "Engineering",
  "members": [
    { "value": "<identity-id>", "display": "bjensen@example.com", "type": "User" },
    { "value": "<group-id>", "display": "Backend", "type": "Group" }
  ],
  "meta": {
    "resourceType": "Group",
    "created": "2026-06-15T10:00:00Z",
    "lastModified": "2026-06-15T10:00:00Z"
  }
}

Group memberships

Group memberships are managed through the members attribute on the Groups resource. Each member entry has:

    value: an identity ID when type is "User", or a group ID when type is "Group" (nested sub-groups are supported).
    type: "User" or "Group".
    display: read-only, the member's userName (for users) or group name (for groups).

The groups attribute on a user resource reflects only the user's direct memberships and is read-only.

To change memberships incrementally, use PATCH /Groups/{id} with add and remove operations targeting the members path. A remove without a path returns 400 noTarget rather than removing all members.
Group resource schema

Ory Network supports the standard SCIM group resource schema as defined in RFC 7643, Section 4.2:
Name	Type	Remarks
id	UUID	Read-only, this is the group ID.
externalId	string	Optional, an ID set by the SCIM client. If set, it must be unique within the organization. Filterable.
displayName	string	Required, the name of the group. Filterable.
members	array	List of members. Each member has value, display (read-only), and type ("User" or "Group"). See above.
Pagination

The list endpoints (GET /Users and GET /Groups) support two mutually exclusive pagination methods: cursor-based and offset-based. Offset-based is used by default; cursor-based is used when a cursor query parameter is present.
tip

Prefer cursor-based pagination. It is significantly faster on large directories and has no upper bound, whereas offset-based pagination caps startIndex at 5000 and count at 1000. Use offset-based pagination only for small result sets or a quick first page.
Cursor-based pagination (recommended)

For anything beyond a small first page, use keyset (cursor) pagination as defined in RFC 9865. It is faster on large directories and has no upper bound. Start by passing cursor with an empty value (or a known cursor), then follow nextCursor from each response until it is no longer returned:

GET /Users?count=20&cursor=

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "itemsPerPage": 20,
  "nextCursor": "<opaque-cursor>",
  "Resources": []
}

    Results are ordered by id.
    Cursors are opaque, stateless tokens that expire after one hour (cursorTimeout in ServiceProviderConfig). An expired cursor returns 400 with scimType: expiredCursor; an invalid cursor returns 400 with scimType: invalidCursor. In both cases, restart pagination from the first page.
    nextCursor is omitted on the last page.
    totalResults is not returned on cursor pages.

Offset-based pagination (default)

Offset-based pagination uses the standard SCIM startIndex (1-based) and count query parameters. It is the default when no cursor parameter is present, but it is capped — use cursor-based pagination for large directories.
Parameter	Default	Limit
startIndex	1	must be ≤ 5000
count	100	must be ≤ 1000

startIndex or count above the limit returns 400 with scimType: tooMany. A count of 0 returns only totalResults with no Resources array. Offset responses always include totalResults (including 0):

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "totalResults": 42,
  "startIndex": 1,
  "itemsPerPage": 20,
  "Resources": []
}

Filtering

The list endpoints accept a filter query parameter. Only the eq (equals) operator is supported, and only on indexed attributes:
Resource	Filterable attributes
Users	userName, externalId, employeeNumber, groups.value (a group UUID)
Groups	displayName, externalId

GET /Users?filter=userName eq "bjensen@example.com"

    externalId filtering is case-sensitive.
    Filtering on any other attribute returns 400 with scimType: invalidFilter ("not indexed").
    Other operators (ne, co, sw, ew, pr, gt, and so on) are not supported.
    A filter may reference a supported schema URN prefix; references to unsupported schemas return 400.
    The filter query string is limited to 1024 bytes.

Filtering users by group

A user's groups.value is a group ID, so you can list the users that belong to a specific group by filtering /Users on groups.value with that group's ID:

GET /Users?filter=groups.value eq "<group-id>"

    The filter value must be a valid group UUID; otherwise the request returns 400 with scimType: invalidFilter and the detail The filter value for groups.value must be a valid UUID.
    Only direct members are matched. A user who belongs to the group only through a nested sub-group is not returned — query those sub-groups separately.
    This is the inverse of reading a group's members list (GET /Groups/{id}). It is the efficient way to enumerate a group's users, and it pairs well with cursor-based pagination for large groups.

Attribute selection

The attributes and excludedAttributes query parameters control which attributes are returned. Only one of the two may be set in a single request; setting both returns 400.
Errors

Errors are returned with an appropriate HTTP status code and a SCIM error body (RFC 7644, Section 3.12). Note that as per spec status is a string:

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "status": "409",
  "scimType": "uniqueness",
  "detail": "Could not create user: identity already exists in another scope"
}

scimType and detail are present only when applicable. Common error cases:
Status	scimType	When it happens
400	invalidSyntax	The request body could not be decoded, or a resource failed validation (for example a missing userName, an invalid time zone, or more than one primary entry).
400	invalidValue	A value is malformed, for example a group member value that is not a valid UUID, or a member type other than "User" or "Group".
400	invalidFilter	The filter is malformed, references a non-indexed attribute, or references an unsupported schema.
400	invalidPath	A PATCH path is invalid or references an unsupported attribute.
400	noTarget	A PATCH remove (or replace with no matching element) has no target path.
400	tooMany	startIndex exceeds 5000 or count exceeds 1000.
400	invalidCursor / expiredCursor	The pagination cursor is invalid or has expired. Restart pagination from the first page.
401	—	The Authorization header is missing or does not match the configured secret.
404	—	The SCIM client, user, group, schema, or resource type does not exist — including when the resource belongs to a different organization.
409	uniqueness	A conflicting resource already exists. For users this includes a duplicate userName/email and the cross-organization case (see below). For groups this includes a duplicate externalId.
413	—	The request body exceeds the 16 MiB limit.
500	—	An internal error occurred, for example the data mapping script failed to fetch or evaluate, or a database write failed.

The most common conflict integrators encounter is provisioning a user who already exists in a different organization, which returns:

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "status": "409",
  "scimType": "uniqueness",
  "detail": "Could not create user: identity already exists in another scope"
}

See How SCIM relates to organizations for why this happens and how to resolve it.
Supported features

The server advertises its capabilities through GET /ServiceProviderConfig. At a glance:
Feature	Supported	Notes
PATCH	Yes	RFC 7644 PatchOp with add, replace, remove.
Filtering	Yes	eq operator only, on indexed attributes (see Filtering).
Change password	Yes	Through the password attribute.
Pagination (offset)	Yes	startIndex / count.
Pagination (cursor)	Yes	cursor / nextCursor, RFC 9865.
Enterprise User extension	Yes	RFC 7643 §4.3.
Sorting	No	sortBy / sortOrder are not supported.
ETag / versioning	No	
Bulk operations	No	No /Bulk endpoint.
/Me endpoint	No	


Set up SCIM provisioning from Microsoft Entra

This page guides you through setting up SCIM provisioning from Microsoft Entra to Ory Network.
Create a SCIM App in MS Entra

From the Azure admin dashboard, navigate to Microsoft Entra ID > Enterprise applications and create a new application by clicking on Create your own application.

Create enterprise application

In the app screen, select Provisioning.

Create enterprise application

Next, select Create configuration.

Create enterprise application
Set up provisioning

In the provision configuration screen, enter the SCIM server URL from your Ory Network SCIM server, and for the API token, excluding the Bearer prefix, enter the SCIM token you created in the Ory Network.

For example, if in Ory Network you've set the token to Bearer secret, enter secret in the API token field.

Click on Test Connection to verify the connection. If successful, you should see a success message.

Create enterprise application
Configure assignments

Next, provision users through SCIM by clicking on Provision on demand, and enter a user name into the search box. Click on the user to start the provisioning process. If successful, you should see a success message.

Create enterprise application
Verify provisioning

After completing the assignment, navigate to the Ory Network SCIM server and verify that the users have been provisioned.

Okta assignment
Troubleshooting

When the provisioning fails, the error will be logged. In Ory Network, navigate to Activity > Logs & Events and look for SCIM provisioning error events.

Set up SCIM provisioning from Okta

This page guides you through setting up SCIM provisioning from Okta to Ory Network. Also refer to the Okta SCIM documentation for more information.
Create a SCIM App in Okta

From the Okta admin dashboard, navigate to Applications > Add Application and search for SCIM 2.0 Test App (Header Auth).

Okta app catalog

Click on the tile to open the app details page, then click Add Integration to add the app to your Okta organization.

Choose a name for the app and click Next.

Complete the wizard by clicking on Done.
Set up provisioning

Next, navigate to the Provisioning tab and click on Enable API Integration. For the Base URL, enter the SCIM server URL from your Ory Network SCIM server, and for th API token, enter the SCIM token you created in the Ory Network.

Click Test API Credentials to verify the connection. If successful, you should see a success message.

Okta app provisioning

Click on Edit in the Provisioning tab and check the boxes for Create Users, Update User Attributes, and Deactivate Users. Click Save to save the changes.
Configure assignments

To assign users to the app, navigate to the Assignments tab and click on Assign. You can assign users or groups to the app. Click Assign to People to assign individual users or Assign to Groups to assign groups.

Okta assignment
Verify provisioning

After completing the assignment, navigate to the Ory Network SCIM server and verify that the users have been provisioned.

Okta assignment
Troubleshooting

When the provisioning fails, both in Ory Network and Okta you will see an error message. In Ory Network, navigate to Activity > Logs & Events and look for SCIM provisioning error events.

In Okta, navigate to the Assignments tab and click on the red exclamation mark next to the user. This will show you the error response from Ory Network.

Okta assignment


Set up SCIM provisioning from Google Workspace

This page guides you through setting up SCIM provisioning from Google Workspace to Ory Network. Also refer to the Google Workspace automated user provisioning documentation for more information.
Create Keeper SAML app in Google workspace

Login to the Google Workspace Admin Console.

Navigate to Apps > Web and mobile apps. Click on Add App and Search for Apps.

Google workspace app search

For Enter app name, enter Keeper. Select Keeper Web (SAML) from the search results.

Select Keeper app

In the Google Identity Provider details window, for Option 1: Download IdP metadata, click Download Metadata. The metadata file can be used to add a SAML connection. Click Continue.

Download IdP metadata

On the Service provider details page, set the values for ACS URL and Entity ID from Ory Network. To ensure that the entire SAML authentication response is signed, check the Signed response box. The Name ID should be EMAIL. Click Continue.

Set service provider details

In the Attribute mapping tab click the Select field menu to choose a field name for Google Directory attributes. Click Finish.

Map attributes
Configure user access

In the created SAML app, under the User access section click on OFF for everyone.

User access

Select ON for everyone to activate SSO.

On for everyone

You have successfully configured the Google App as a SAML Identity Provider (IdP). Using the downloaded metadata, you can now add an SSO connection in Ory Network.
Set up provisioning

Under the provisioning section of the created app click on Configure autoprovisioning.

Configure autoprovisioning

For the Access token enter the SCIM token you created in the Ory Network.

Access token

For the Endpoint URL enter the SCIM server URL from your Ory Network SCIM server.

Endpoint URL

In attribute mapping screen ensure the right attributes are mapped for the app. Complete the remaining steps by setting the provisioning scope to particular groups (if required) and setting the deprovisioning settings.

Attribute mapping SCIM

Finally click Finish. Toggle the Autoprovisioning to Active to complete the setup.

Toggle Autoprovisioning active
Troubleshooting

When the provisioning fails, the error will be logged. In Ory Network, navigate to Activity > Logs & Events and look for SCIM provisioning error events.
Limitations

There is no support for group memberships with Google SCIM.

External Identifiers

This guide explains how to configure and use the external_id field in Ory Kratos to support external primary identifiers such as customer_id, employee_id, or similar. This is especially useful for migrations from systems where you need to preserve identifiers or support user-defined primary identifiers.
note

The external_id must be unique across all identities. If you attempt to import multiple identities with the same external_id, the operation will fail with a 409 Conflict.
Overview

Traditionally, Ory Kratos identifies users using an internal identity.id UUID. With the external_id feature, you can:

    Assign a unique, domain-specific identifier to each identity.
    Query and manage identities using external_id.
    Use external_id as the sub (subject) claim in JWTs.
    Preserve identity semantics across systems during migration.

This helps simplify migrations, reduce mapping layers, and align Kratos with your existing infrastructure.
Configuration
Use external_id via API, not schema

The external_id is not part of the identity JSON Schema. Instead, it is a dedicated top-level attribute in API requests that create or update identities.

Do not add external_id to your identity schema definition. It is handled separately by Ory Kratos internally.
Use external_id in tokenized session JWTs sub claim

Set the subject_source to external_id in the tokenization config:

session:
  whoami:
    tokenizer:
      templates:
        jwt_template_1:
          jwks_url: base64://... # A JSON Web Key Set (required)
          claims_mapper_url: base64://... # A JsonNet template for modifying the claims
          ttl: 1m # 1 minute (defaults to 10 minutes)
          subject_source: external_id
        another_jwt_template:
          jwks_url: base64://... # A JSON Web Key Set

Read more about session tokenization here.

This will populate the sub claim in JWTs with the value of external_id.

If external_id is not set for a user when subject_source is external_id, tokenization will fail.
API usage
Create an identity with external_id

POST /admin/identities
Content-Type: application/json

{
  "schema_id": "default",
  "traits": {
    "email": "user@example.com"
  },
  "external_id": "customer-12345"
}

Get identity by external_id

GET /admin/identities/by/external/customer-12345

Optional query parameter

    include_credential=password,oidc,... — Include specific credentials in the response.

Example:

GET /admin/identities/by/external/customer-12345?include_credential=password

Response:

{
  "id": "uuid-abc123",
  "external_id": "customer-12345",
  "traits": {
    "email": "user@example.com"
  },
  "credentials": {
    "password": { ... }
  }
}

Error responses:

    404 – Identity not found.
    409 – Duplicate external_id on creation.
    400 – Invalid request structure.

note

There are no other APIs that support external_id, for the APIs that require a Kratos identity_id you need to use the Get identity by external_id API above and use the identity id from there.
JWT configuration
Jsonnet example

When tokenizing sessions, external_id is available in the session context:

local claims = std.extVar('claims');
local session = std.extVar('session');

{
  claims: {
    iss: claims.iss + "/additional-component",
    schema_id: session.identity.schema_id,
    external_id: session.identity.external_id,
    session: session,
  }
}

Token behavior with external_id

If subject_source is set to external_id in the tokenizer template, the JWT's sub claim becomes:

{
  "sub": "customer-12345"
}

If external_id is missing, tokenization will fail.
Migration guide

To migrate from an existing system, you can bulk import identities into Kratos and set their external_id using the Identity Import API.
Use PATCH /admin/identities
Basic import example

[
  {
    "schema_id": "default",
    "external_id": "customer-001",
    "traits": {
      "email": "alice@example.com"
    }
  }
]

Pre-hashed password example

[
  {
    "schema_id": "default",
    "external_id": "customer-002",
    "traits": {
      "email": "bob@example.com"
    },
    "credentials": {
      "password": {
        "config": {
          "hashed_password": "$2b$12$abc123..." // bcrypt hash
        }
      }
    }
  }
]

Migration tips

    Pre-hash passwords to avoid timeouts
    Validate external_id uniqueness before import
    Import in smaller batches (≤ 200 identities if using plaintext passwords)

Troubleshooting
Error / Code	Context	Description
409 Conflict	Migration (batch import)	One or more identities have a duplicate external_id. Ensure all values are unique.
400 Bad Request	Migration (batch import)	The request payload is invalid or improperly formatted. Check JSON structure and required fields.
504 Gateway Timeout	Migration (batch import)	The batch is too large or includes plaintext passwords. Reduce batch size or pre-hash passwords.
500 Internal Server Error	Session token generation	If subject_source = external_id is configured, the session will not tokenize unless the identity has an external_id set.

For advanced examples, see:

    Tokenization with Jsonnet
    Importing Users in Bulk


Identity schema

The identity schema implements the JSON Schema Standard and allows you to adjust Ory specifically to your requirements. The identity schema specifies the types of data the system can store for users, such as their names, email addresses, phone numbers, or birthdays. Through schemas, you can also define additional fields that can be added to user profiles, such as a job titles, company names, or locales.

The identity schema not only defines the data model of your identities, but also controls business logic and allows you to:

    Define which field is used as the identifier when logging in: username, email, phone number, or a combination of those.
    Define fields which are used to verify or recover the user's identity: email, phone number, or a combination of those.

Depending on your setup, you can benefit from defining different identity schemas for different groups of users, such as customer support and end users. This allows to tailor the user experience and security measures to the specific needs and requirements of each group.

The Ory Network provides default presets to help users get started with creating and managing identity schemas for their systems.
info

Identity schemas are a powerful tool with a learning curve. When getting started, use one of the presets Ory provides to make your life easier. Use the preset as a starting point and customize the identity schema to your needs later.
Presets

The Ory Network provides five identity schema presets. Use a preset URL (for example preset://email) when configuring your project. Each preset defines which traits are available and which credentials and recovery/verification channels are enabled.
Profile with email - preset://email

With this preset, identities have a single trait, the email. The email is the login identifier and is used for email verification and for account recovery:

// Identity example
{
  id: "6e9d3d30-f93e-4630-901f-c2096953723d",
  traits: {
    email: "foo@bar.com",
  },
}

Profile with username - preset://username

This preset is useful for applications that don't need the user's email address and don't prioritize a high degree of user anonymity. Without an email, users can not send recovery links to their email. They will not be able to regain access to their account.

With this preset, every identity has a single trait - the username. The username is the login identifier:

// Identity example
{
  id: "6e9d3d30-f93e-4630-901f-c2096953723d",
  traits: {
    username: "some-username",
  },
}

Profile with SMS - preset://sms

This preset uses a phone number as the login identifier. Verification is done through SMS. Account recovery is not configured in this preset.

Identities have a single trait, phone_number.

// Identity example
{
  id: "6e9d3d30-f93e-4630-901f-c2096953723d",
  traits: {
    phone_number: "+1234567890",
  },
}

Profile with email, name, newsletter opt-in - preset://basic

This preset extends the email preset with additional profile fields: first name, last name, and a newsletter subscription checkbox. The email is the login identifier and is used for recovery and verification.

// Identity example
{
  id: "6e9d3d30-f93e-4630-901f-c2096953723d",
  traits: {
    email: "foo@bar.com",
    name: {
      first: "Foo",
      last: "Bar",
    },
    newsletter: true,
  },
}

Blank profile template - preset://blank

An empty schema with no traits defined. Use this as a starting point when building a fully custom identity schema from scratch. This preset has no login identifiers, recovery, or verification configured — you must add them yourself.

// Identity example
{
  id: "6e9d3d30-f93e-4630-901f-c2096953723d",
  traits: {},
}


Identity metadata & traits

Identities have traits and metadata:

    Traits are attributes of an identity, that can be updated by the identity owner, for example the username or email address.
    Metadata are attributes defined by the system admin that can't be updated or modified by the identity owner. The only way to update the metadata is through the /admin/identities APIs. These fields can store additional information, such as the original sign up date if the identity was created through a migration. Other common use cases include for example storing a user's subscription status, legacy user ID, or basic roles.

At a glance
	User changeable via settings flow	Available in toSession API	getIdentity API (updatable via updateIdentity)
traits	✅	✅	✅
metadata_public		✅	✅
metadata_admin			✅
Metadata

There are two types of identity metadata:

    Public: Attributes that can only be modified using the /admin/identities APIs. They are visible to anyone having access to the user's sessions, for example by calling toSession() or /sessions/whoami. This allows you to access the metadata in the frontend without calling the admin APIs.
    Admin: Attributes that can only be modified and read using the /admin/identities APIs.

note

Metadata is not validated using the identity's JSON schema. You must ensure that the metadata you store is valid according to your schema and you must keep the schema up to date to accommodate changes in the data.

To manage metadata, use the following APIs:

    POST /admin/identities
    GET /admin/identities
    GET /admin/identities/{id}
    PUT /admin/identities/{id}

info

You need an API Key to call these endpoints. Read Authorization with API Keys to learn more.
Traits

Traits are the data associated with an identity. This data can be modified by the identity owner, for example at sign up or in the profile update process. Identity traits can also be modified by users with Ory Identities (Kratos) Admin API access.
note

Ory Identities (Kratos) uses JSON Schema to validate Identity traits.

Each identity can, theoretically, have a different JSON Schema. This can be useful in the following situations:

    There is more than one type of identity in the system for example: customers, support, staff.
    The system includes both human users and "robots" (sometimes also known as named service accounts).
    The system needs to ingest another company's Identity Schema.
    The system's Identity Schema changes or grows over time and requires versioning.

This example illustrates a usage scenario with three types of identities: regular customers, grandfather accounts, and service accounts (for example a Microsoft Service Account). Each identity has one JSON schema that defines it:

    Customers: http://mydomain.com/schemas/v2/customer.schema.json
    Grandfather Accounts: http://mydomain.com/schemas/v1/customer.schema.json
    Service Accounts: http://mydomain.com/schemas/service-account.schema.json

Ory Identities expects the JSON Schemas in its configuration file:

identity:
  # This will be the default JSON Schema. If `schema_id` is empty when creating an identity using the
  # Admin API or a user signs up using a selfservice flow, this schema will be used.
  #
  # This is a required configuration field!
  default_schema_id: person

  # Optionally define additional schemas here:
  schemas:
    # When creating an identity that uses this schema, `traits_schema_id: customer` are set for that identity.
    - id: customer
      url: http://foo.bar.com/customer.schema.json
    - id: person
      url: http://foo.bar.com/person.schema.json

Ory validates the identity traits against the corresponding schema on all "write" operations (create/update). The employed business logic must be able to distinguish these three types of identities. You might use a switch statement like in the following example:

// This is an example program that can deal with all three types of identities
session, err := ory.SessionFromRequest(r)
// some error handling
switch (session.Identity.SchemaID) {
    case "customer":
        // ...
    case "employee":
        // ...
    case "default":
        fallthrough
    default:
        // ...
}

Manage identity schemas

This document explains how to create, update, and manage identity schemas in Ory Network.
Schema list overview

The identity schema page in Ory Console (User management → Identity schema in the Ory Console) shows all schemas available to your project. The table has the following columns:

    Default — the schema used for new identities when no schema is specified. Only one schema can be the default at a time.
    Self-service — whether the schema is offered to end users during registration and login flows. See identity schema selection for details on the selfservice_selectable flag.
    In project — whether the schema is part of the current project configuration. A schema can exist as a custom schema or preset without being added to your project.

Use an existing preset

Ory Network provides five preset schemas that are ready to use out of the box. If you are getting started with Ory Network, use one of the presets to make your life easier.

    Ory Console
    Ory CLI

    Go to User management → Identity schema in the Ory Console.
    Find the preset you want to use in the Preset schemas section.
    Open the row menu (three dots) and select Make default.
    Confirm the change in the dialog.

To add a preset to your project without making it the default, select Add to project from the row menu instead.
caution

Be aware that changing the default schema will affect all new identities created in the project. Existing identities might not be able to sign in, for example if you change from an email based schema, to a username based schema.
Create custom schema

If the presets do not fit your needs, you can create a custom schema. Follow these steps to create a custom schema:

    Ory Console
    Ory CLI

    Go to User management → Identity schema in the Ory Console.
    From the Select template drop down, select the schema you want to use as a template.
    Click the Create button.
    Give your schema a name.
    Customize the schema to your needs. Read more about the customization options.
    Click the Save button to save.
    Confirm the changes by clicking the Confirm button in the confirmation dialog.

To make this schema the default schema for your project, find the newly created schema in the Custom schemas section, open the row menu, and select Make default.
Update identity schemas

Identity schemas are immutable to prevent inconsistencies in the data. This means, that you cannot update an existing schema. However, you can use the existing schema as a template to create a new schema. Simply follow the steps in Create custom schema and select the current schema as a template.

It's recommended to manage identity schemas in version control. Learn more about managing Ory Network configuration in git.
Update identities to use a new schema

Updating the identity schema of a project can result in inconsistencies between the new schema and the identities created with the old schema. Follow these steps to patch identities after updating the identity schema. If you are self-hosting Ory, you can follow the same steps by using the API or Ory Kratos CLI.

The following steps are for updating one identity. If you have more identities that should be patched to the new schema, repeat the steps 4 to 7 or check out the example code for bulk updating identities below.

    Retrieve the Project ID.

    ory list workspaces
    ory list projects --workspace <workspace-id>

    export ORY_PROJECT_ID=$PROJECT_ID

    Create a new identity with the updated schema - through the registration interface or Ory Console and copy the schema_id of the identity you just created.

    Identity schema ID and URL

    Get all identities of the project using the following command:

    ory list identities --format json-pretty

    Find the identity to be updated and note down their id.

    To update the identity, you need to use the Admin API. The API requires the Ory Network Project slug, API Key, and identity ID. Set them as environment variables:

    export ORY_API_KEY=$ORY_API_KEY
    export ORY_SLUG=$ORY_SLUG
    export IDENTITY_ID=$IDENTITY_ID

    Assess the required updates in traits. You need to add, remove, or update existing traits to match the new identity schema. You also need to change the schema_id to the new schema. For instance, adding a new trait and removing an old trait:

    cURL and patchIdentity
    Ory SDK
    cURL and updateIdentity

Using the patchIdentity API, you can change the identity schema and traits directly.

Using patchIdentity is the recommended way to update identities.

curl --location --request PATCH "https://$ORY_SLUG.projects.oryapis.com/admin/identities/$IDENTITY_ID" \
--header "Authorization: Bearer $ORY_API_KEY" \
--header "Content-Type: application/json" \
--data-raw '[
{
    "op": "replace",
    "path": "/schema_id",
    "value": "{new-schema-id}"
},
{
    "op": "remove",
    "path": "/traits/foo"
},
{
    "op": "add",
    "path": "/traits/bar",
    "value": "barfoo"
}
]'

This should return the modified identity as the response.

Now, you have migrated a single identity to a new identity schema. If you have more identities to be patched to the new schema, repeat the above process for each of them.


Customize identity schemas

This document explains how to customize your identity model with a custom identity schema. A custom identity schema allows you to add custom fields to your identities such as birthday or job title.

It is important to note that throughout this document we use specific draft-07 features of JSON Schema as shown by the $schema property at the start of every document.

{
  $schema: "http://json-schema.org/draft-07/schema#",
}

Use the JSON Schema Validator to check your identity schema. If you're not familiar with JSON Schemas, study the official examples to get familiar with the structure.
Writing your first custom identity schema

This is the minimum viable identity schema:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object"
    }
  }
}

Traits translate into fields presented in the user-facing UI. In the minimum viable identity schema, there are no traits which means that the UI doesn't present any fields. Let's change that by adding three fields:

    first name
    last name
    username

    Identity schema
    Generated UI

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "username": {
          "title": "Username",
          "type": "string"
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "title": "First name",
              "type": "string"
            },
            "last": {
              "title": "Last name",
              "type": "string"
            }
          }
        }
      }
    }
  }
}

To log in, the user needs to provide their ID and password. The identity schema does not yet state which field is the ID used for login. Let's change that by adding the following schema extension:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "username": {
          "title": "Username",
          "type": "string",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "title": "First name",
              "type": "string"
            },
            "last": {
              "title": "Last name",
              "type": "string"
            }
          }
        }
      }
    }
  }
}

Ory supports all JSON Schema types (string, number, integer, boolean, object). Use string for text fields, boolean for checkbox fields, and integer or number for integral or floating-point numbers. If you want to know more about these types, read the the JSON Schema documentation.
info

Avoid complex identity schemas and use the identity schema for basic profile information. The more complex the schema, the more difficult it is to introduce changes in the future. Complex schemas make it difficult to generate user interfaces automatically.
Custom user interface labels

The title property defines the description of the field rendered in the UI. This schema has a field which asks users to provide their GitHub handle, which is clear thanks to the field description defined in the title property.

    Identity schema
    Generated UI

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.basic.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "Email",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          }
        },
        "name": {
          "type": "string",
          "title": "What's your GitHub handle?"
        }
      }
    }
  },
  "required": [
    "email"
  ],
  "additionalProperties": false
}

Restrict values with enum

Use the JSON Schema enum keyword to restrict a trait to a fixed set of allowed values. When you declare an enum on a string property, the Ory Account Experience renders the field as a dropdown (a native <select>) and only accepts values from the list at registration, settings, and admin updates.

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string",
          "title": "Country",
          "enum": ["US", "UK", "DE", "AT"]
        }
      },
      "required": ["country"]
    }
  }
}

Ory Kratos surfaces the allowed values on the UI node by attaching an options array to the input attributes. Custom UIs that already know how to render a UI node can read attributes.options and display a <select>; UIs that do not look at options fall back to a plain text input, so the change is backward compatible with older custom UIs.
note

Only top-level string properties under traits are supported. The rendered option value is used as both the submitted value and the visible label.
Identity schema extensions

Because the system doesn't know which fields have system-relevant meaning, you have to specify that in the schema. For example:

    This email address should be used for recovering a lost password.
    This identifier (username or email) should be used for logging in with a password.
    This is the phone number used for SMS 2FA.

The vocabulary extension can be used within a property. Let's take a look at the email identity schema preset. It uses all available identity schema extensions:

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.email.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "E-Mail",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          },
          "maxLength": 320
        },
        "phone": {
          "type": "string",
          "format": "tel",
          "title": "Phone number",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "code": {
                "identifier": true,
                "via": "sms"
              }
            },
            "recovery": {
              "via": "sms"
            },
            "verification": {
              "via": "sms"
            }
          },
          "maxLength": 320
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}

Multiple identifiers

It is possible to have multiple identifiers. For example, you could have a username and an email address that the user can use to sign in:

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.email.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "minLength": 6,
          "title": "Username",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "email": {
          "type": "string",
          "format": "email",
          "title": "E-Mail",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          },
          "maxLength": 320
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}

You can also specify an array of elements:

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.email.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "emails": {
          "type": "array",
          "items": [
            {
              "type": "string",
              "format": "email",
              "title": "E-Mail",
              "ory.sh/kratos": {
                "credentials": {
                  "password": {
                    "identifier": true
                  },
                  "webauthn": {
                    "identifier": true
                  },
                  "totp": {
                    "account_name": true
                  },
                  "passkey": {
                    "display_name": true
                  },
                  "code": {
                    "identifier": true,
                    "via": "email"
                  }
                },
                "recovery": {
                  "via": "email"
                },
                "verification": {
                  "via": "email"
                }
              },
              "maxLength": 320
            }
          ]
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}

Password login identifier

You can configure Ory Identities to use specific fields as the identity's identifier. In this example, the password is set as the identifier:

{
  "ory.sh/kratos": {
    "credentials": {
      "password": {
        "identifier": true
      }
    }
  }
}

Email

Let's assume the identity's traits are

traits:
  # These are just examples
  email: office@ory.com
  name:
    first: Aeneas
    last: Rekkas
  favorite_animal: Dog
  accepted_tos: true

and we are using a JSON Schema that uses the email field as the identifier for the password flow:

{
  "$id": "http://mydomain.com/schemas/v2/customer.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "A customer (v2)",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "title": "E-Mail",
          "type": "string",
          "format": "email",

          // This tells Ory Identities that the field should be used as the "username" for the username and password flow.
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "title": "First Name",
              "type": "string"
            },
            "last": {
              "title": "Last Name",
              "type": "string"
            }
          }
        },
        "favorite_animal": {
          "title": "Favourite Animal",
          "type": "string"
        },
        "accepted_tos": {
          "title": "Terms of Service",
          "type": "boolean"
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}

In this example, Ory understands that traits.email='office@ory.com' is the identifier for this identity. The system must get office@ory.com and a password to sign in an user.

Username and Password Credentials contains more information and examples about credentials usage.

Note that the format field of the identity schema will perform validation of the given trait. In this example, the email address is validated using the JSON Schema rule set.
Email validation rules

When you use "format": "email", Ory validates the email address against RFC 5322, section 3.4.1 and the domain part against RFC 1034, section 3.1 and RFC 1123, section 2.1.

The following rules are enforced:

    The total address length must not exceed 254 characters.
    The address must contain an @ separator.
    The local part (before @) must not exceed 64 characters.
    The domain part (after @) must be a valid hostname:
        Only ASCII letters (a-z, A-Z), digits (0-9), and hyphens (-) are allowed.
        Each label must be 1–63 characters long.
        Labels must not start or end with a hyphen.
        The total hostname length must not exceed 253 characters.

For example, test_user_name@example.com is valid because underscores are allowed in the local part. However, user@domain_name.com is rejected because underscores are not allowed in the domain part.

To customize email validation beyond these rules, you can replace "format": "email" with a "pattern" regex in your identity schema. Alternatively, you can use a before-registration webhook to apply custom validation logic.
caution

Replacing "format": "email" with a custom "pattern" bypasses RFC-compliant validation. This can allow malformed or undeliverable addresses into your system, which may cause issues with account recovery, email verification, and other flows that depend on valid email addresses. Only relax validation when you have a clear need and understand the trade-offs.
Phone number

Let's extend the identity schema from the previous chapter with a phone number:

{
  "$id": "http://mydomain.com/schemas/v2/customer.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "A customer (v2)",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "title": "E-Mail",
          "type": "string",
          "format": "email",

          // This tells Ory Identities that the field should be used as the "username" for the Username and Password Flow.
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "phone": {
          "title": "Phone",
          "type": "string",
          "format": "tel",

          // The phone number is marked as an identifier. This allows the user to log in with both email and phone number.
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "title": "First Name",
              "type": "string"
            },
            "last": {
              "title": "Last Name",
              "type": "string"
            }
          }
        },
        "favorite_animal": {
          "title": "Favourite Animal",
          "type": "string"
        },
        "accepted_tos": {
          "title": "Terms of Service",
          "type": "boolean"
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}

By using the "format": "tel" field we enable validation of phone numbers using the Golang port of Google's libphonenumber.

Using the following identity schema extension we specify that the field is used as the "ID" when signing in using a password:

{
  "ory.sh/kratos": {
    "credentials": {
      "password": {
        "identifier": true
      }
    }
  }
}

Passkey display name

Using the following identity schema extension we specify that the field is used as the display name for PassKeys:

{
  "ory.sh/kratos": {
    "credentials": {
      "passkey": {
        "display_name": true
      }
    }
  }
}

Passwordless one-time code login identifier

Using the following identity schema extension we specify that the field is used as the "ID" when using passwordless one-time code login:

    Email
    SMS

{
  "ory.sh/kratos": {
    "credentials": {
      "code": {
        "identifier": true,
        "via": "email",
      }
    }
  }
}

Google Authenticator (TOTP) display name

The following identity schema extension specifies that this field should be displayed in the Authenticator App as the account name:

{
  "ory.sh/kratos": {
    "credentials": {
      "totp": {
        "account_name": true
      }
    }
  }
}

Passwordless WebAuthn login identifier
note

Please use the PassKey method instead. This is documented for legacy reasons.

Using the following identity schema extension we specify that the field is used as the "ID" when using passwordless WebAuthn login:

{
  "ory.sh/kratos": {
    "credentials": {
      "webauthn": {
        "identifier": true
      }
    }
  }
}

Verification address

Specifies that the field is verifiable by sending an email with a verification code or link.

    Email
    SMS

{
  "ory.sh/kratos": {
    "recovery": {
      "via": "email"
    }
  }
}

Recovery address

Specifies that the field can be used to send an account recovery code or link.

    Email
    SMS

{
  "ory.sh/kratos": {
    "recovery": {
      "via": "email"
    }
  }
}

Mandatory fields for registration

Use required to define which identity schema fields users must fill in during registration. When users try to register without filling in the mandatory fields, Ory Account Experience shows a message that tells users they must provide the mandatory information to proceed. Additionally, required fields are marked with an asterisk for easy visual identification.

The sample identity schema has two mandatory fields: email address and last name.
note

For nested objects such as name, add the required property inside of the object.

    Identity schema
    Generated UI

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.basic.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "Email address",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          },
          "maxLength": 320
        },
        "name": {
          "type": "object",
          "required": [
            "last"
          ],
          "properties": {
            "first": {
              "type": "string",
              "title": "First name",
              "maxLength": 256
            },
            "last": {
              "type": "string",
              "title": "Last name",
              "maxLength": 256
            }
          }
        }
      },
      "required": [
        "email"
      ],
      "additionalProperties": false
    }
  }
}

More advanced validation

Json schemas are a powerful tool to even do conditional validation.

For example, when a user opts in to receiving security updates it is required to have their phone number as well.

You can read more about using the definitions and dependencies keywords in the JSON schema structuring a complex schema and conditional subschemas.
Self-hosted

If you split a schema across multiple files with "$ref": "file:///path/to/fragment.json", list each referenced file under security.landlock.allowed_paths so the Landlock filesystem sandbox does not block the read. Only the top-level identity.schemas[].url entries are auto-allowed.

Below is an example of how to do this:

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.email.schema.json",
  "title": "Person",
  "type": "object",
  "definitions": {
    "phone": {
      "type": "string",
      "format": "tel",
      "title": "Phone Number"
    },
    "optIn": {
      "type": "boolean",
      "title": "Get security related notifications"
    }
  },
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "title": "Username",
          "minLength": 6,
          "maxLength": 32,
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "passkey": {
                "display_name": true
              }
            }
          }
        },
        "email": {
          "type": "string",
          "format": "email",
          "title": "E-Mail",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          },
          "maxLength": 320
        },
        "phone": {
          "$ref": "#/definitions/phone"
        },
        "optIn": {
          "$ref": "#/definitions/optIn"
        }
      },
      "required": [
        "email",
        "username",
      ],
      "additionalProperties": false,
      "dependencies": {
        "optIn": {
          "properties": {
            "phone": {
              "$ref": "#/definitions/phone"
            }
          },
          "required": [
            "phone"
          ]
        },
        "phone": {
          "properties": {
            "optIn": {
              "$ref": "#/definitions/optIn"
            }
          },
          "required": [
            "optIn"
          ]
        }
      }
    }
  }
}

Choosing between username, email, and phone number

Before you start, you need to decide what data you want to collect from your users and why. It's hard to change this decision afterwards, so make sure you've taken everything into account.

When logging in, the user will use a login identifier and a password to sign up and in. The identifier can be:

    a username - "john.doe" or "johndoe123" or "oryuser"
    an email address - john.doe@gmail.com
    a phone number - +49-1234-4321-1234-4321

All of these approaches have up- and downsides.

Using the email address as the login identifier is easy to remember, doesn't require additional fields (because the email address is already being collected), and is usually unique. It's usually unique because sometimes companies use a "shared" email account (for example office@acme.org) to access services. In that case, multiple real identities are using the same email identifier to log in.

The email address however represents a unique identifier and personally identifiable information (PII). An attacker could for example check if the email address john.doe@gmail.com is registered at for example an adult website and use that information for blackmail.

The same considerations apply to using a phone number as the primary registration & login identifier.

Using a free text username reduces the privacy risk because it's much harder to make a connection between the username and a real world identity. It's still possible in cases where users choose a username such as "john.doe.from.newyork.1970", but finding the right username identifier is still difficult and there is plausible deniability because anyone could use that username.

A free text username however requires capturing additional fields (for example an email address for password resets / account recovery) and is hard to remember. It's often very difficult to find unique usernames as people tend to use a combination of their names and initials such as john.doe which has a high chance of collision. Therefore, one ends up with usernames such as john.doe1234432.

It's important to understand that Ory Identities lowercases all password identifiers and therefore email addresses. Characters + or . which have special meaning for some email providers such as Gmail aren't normalized:

    userNAME is equal to username
    foo@BaR.com is equal to foo@bar.com
    foo+baz@bar.com is NOT equal to foo@bar.com
    foo.baz@bar.com is NOT equal to foobaz@bar.com

You need to decide which route you want to take.
Examples

Let's take a look at some examples!
Email as the primary identifier

To use the email address as the login identifier, define the following identity schema:

{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "E-Mail",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          },
          "maxLength": 320
        }
      }
    }
  }
}

Multiple emails and password

You can allow users to sign up with multiple email addresses and use any of them to log in:

{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "emails": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "email",
            "ory.sh/kratos": {
              "credentials": {
                "password": {
                  "identifier": true
                },
                "webauthn": {
                  "identifier": true
                },
                "totp": {
                  "account_name": true
                },
                "code": {
                  "identifier": true,
                  "via": "email"
                },
                "passkey": {
                  "display_name": true
                }
              },
              "recovery": {
                "via": "email"
              },
              "verification": {
                "via": "email"
              }
            }
          }
        }
      }
    }
  }
}

Username and password

To use a username as the login identifier, define the following identity schema:

{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "ory.sh/kratos": {
             "credentials": {
               "password": {
                 "identifier": true
               },
               "webauthn": {
                 "identifier": true
               },
               "totp": {
                 "account_name": true
               },
                "passkey": {
                  "display_name": true
                }
              }
            }
          }
        }
      }
    }
  }
}

Username and email and password

You may also mix usernames and passwords:

{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          }
        },
        "username": {
          "type": "string",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            }
          }
        }
      }
    }
  }
}

Phone number and password

{
  "$id": "https://example.com/registration.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "phone": {
          "type": "string",
          "format": "tel",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
               "code": {
                 "identifier": true,
                 "via": "sms"
               },
               "passkey": {
                 "display_name": true
               }
             },
             "recovery": {
              "via": "sms"
            },
            "verification": {
              "via": "sms"
            }
            }
          }
        }
      }
    }
  }
}

Advanced schema

The following identity schema defines personal fields for first name, last name, nickname, and age, and includes two checkboxes: one required for accepting the terms of service and one optional for newsletter subscription.
To render links in a checkbox label, use markdown link syntax. Links open in a new tab.
To make a checkbox required, add "const": true to the property definition. This differs from text fields, which use the required array.

    Identity schema
    Generated UI

{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.basic.schema.json",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "Email",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              },
              "passkey": {
                "display_name": true
              }
            },
            "recovery": {
              "via": "email"
            },
            "verification": {
              "via": "email"
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "type": "string",
              "title": "Your first name"
            },
            "last": {
              "type": "string",
              "title": "Your last name"
            },
            "nickname": {
              "type": "string",
              "title": "Your nickname"
            }
          }
        },
        "age": {
          "type": "integer",
          "title": "How old are you?"
        },
        "tos": {
          "type": "boolean",
          "title": "I accept the [terms of service](https://example.com/tos)",
          "const": true
        },
        "newsletter": {
          "type": "boolean",
            "title": "I want to sign up for the newsletter"
        },
      },
      "required": [
        "email"
      ],
      "additionalProperties": false
    }
  }
}

Additional properties

Keep your identities clean by denying additionalProperties:

{
  properties: {
    traits: {
      type: "object",
      properties: {
        // ...
      },
      additionalProperties: false,
    },
  },
}

Identity schema selection for self-service registration and login flows

Ory Kratos now supports selecting an identity schema during registration and login self-service flows by specifying a query parameter. This gives administrators more control over which schemas are used and allows multi-tenant or multi-profile setups with distinct identity models.
Overview

    Users or integrators can choose which schema to use by appending the identity_schema query parameter when initiating registration or login flows.
    Only schemas explicitly marked as selectable via selfservice_selectable: true in the configuration will be accepted.
    If no schema is selected, the default schema is used (this is the existing behavior).

How to use
Registration example

Browser flow:

GET /self-service/registration/browser?identity_schema=schema-a

API flow:

GET /self-service/registration/api?identity_schema=schema-a

Login Example

Browser flow:

GET /self-service/login/browser?identity_schema=schema-a

API flow:

GET /self-service/login/api?identity_schema=schema-a

Configuration

You must define which schemas are available for self-service selection by using the selfservice_selectable flag. Only schemas with this flag set to true can be selected through the identity_schema query parameter.

    Ory Console
    Ory CLI

    Go to User management → Identity schema in the Ory Console.
    Find the schema in the schema list. The Self-service column shows whether the schema is currently enabled for self-service.
    Open the row menu (three dots) and select Enable self-service or Disable self-service.

If the schema is not yet part of your project, enabling self-service automatically adds it.
Behavior summary

    If a schema is listed and marked as selectable, it can be used in registration/login.
    If a schema is not listed or not marked as selectable, it cannot be used via query param.
    If no identity_schema is passed, the default schema (default_schema_id) is used.

Migration notes

    This feature is non-breaking. Existing flows using the default schema are unaffected.
    You only need to update configuration if you want to expose multiple schemas for selection.
    Schemas used internally can remain non-selectable, for example for admin or machine users.


Identity schema best practices

Follow this guide to learn about best practices when creating custom identity schemas.
Sensitive data

The identity schema isn't the right place to store data that should be obfuscated from the user. Users can see traits and other data - except credentials - using the /sessions/whoami endpoint. Users are also able to edit identity traits.
info

Don't store sensitive internal data in the identity's traits. Use the metadata_admin field for this purpose.

Read this document for information how to use metadata that can't be viewed or changed by the end user.
Keep your data lean

    Do not add too many fields to your identities. Keep the number of fields well below 15.
    Do not store business logic in your identities. Store this information in other systems. This includes credit card information, shipping addresses, shopping cart items, or user preferences.
    Do store profile data that is used across your system. This includes the usernames, email addresses, phone numbers, first names, and last names.

Updating identity schemas

When using the Ory CLI and Ory configuration files, use versioning to keep track of changes to your identity schema. This allows you to gradually update your identity schema without affecting existing identities.

Let's say that you just defined your first identity schema:

identity:
  default_schema_id: user_v0
  schemas:
    - id: user_v0
      url: file://path/to/user_v0.json

Self-hosted

On Ory Network and Ory Enterprise License (OEL), file:// schema URLs are auto-allowed by the Landlock filesystem sandbox. If a schema body uses "$ref": "file:///..." to pull in another local file, that referenced file must be listed under security.landlock.allowed_paths — only the top-level identity.schemas[].url entries are auto-discovered.

After a few weeks, you decide that you want to add additional fields or that you need to break compatibility with your current schema. To do that, add another version of the schema to the configuration and change the default_schema_id to use the new schema:

identity:
  default_schema_id: user_v1
  schemas:
    - id: user_v0
      url: base64://{b46-encoded-user_v0}
    - id: user_v1
      url: base64://{b46-encoded-user_v1}

With this configuration in place, existing identities work as expected and continue to use the user_v0 identity schema. All newly created identities will use user_v1 schema.

When you're ready to migrate all identities that use the user_v0 to the user_v1 schema, use the REST API to list all identities using the old version and perform the required data transformations.
Sanitize usernames/traits

To make sure usernames or traits satisfy a specific regex (for example only alphanumeric characters), they can be sanitized. To sanitize usernames add regular expressions to the identity Schema. To sanitize usernames coming from third-party OIDC providers like Google or GitHub write JSonnet.

Credentials

Each identity has one or more credentials associated with it:

credentials:
  password:
    id: password
    identifiers:
      - john.doe@acme.com
      - johnd@ory.com
    config:
      hashed_password: ...
  oidc:
    id: oidc
    identifiers:
      - google:j8kf7a3...
      - facebook:83475891...
    config:
      - provider: google
        identifier: j8kf7a3
      - provider: facebook
        identifier: 83475891

Ory Kratos supports several credential types:

    password: The most common identifier (username, email, ...) + password credential.
    passkey: Passkeys use WebAuthn standards for secure, user-friendly, and cryptographic passwordless authentication.
    code: The "Log in via email or SMS" credential using a one-time code.
    oidc: The "Log in with Google/Facebook/GitHub/..." credential using OpenID Connect.
    saml: A standard for exchanging auth data between parties, often used for B2B SSO.
    webauthn: The same technology as Passkeys used as a second factor.
    totp: Time-based one-time passwords generated by authenticator apps, used as a second factor.
    lookup_secret: One-time codes used as a recovery mechanism for 2FA when the primary second factor is unavailable.
    deviceauthn: Passwordless authentication where the private key is hardware-resident on the user's device.

Each credential - regardless of its type - has one or more identifiers attached to it. Each identifier is universally unique. Assuming we had one identity with credentials

credentials:
  password:
    id: password
    identifiers:
      - john.doe@acme.com

and tried to create (or update) another identity with the same identifier (john.doe@acme.com), the system would reject the request with a 409 Conflict state.

While credentials must be unique per type, there can be duplicates amongst multiple types:

# This is ok:
credentials:
  password:
    id: password
    identifiers:
      - john.doe@acme.com
  oidc:
    id: oidc
    identifiers:
      - john.doe@acme.com

The same would apply if those were two separate identities:

# Identity 1
credentials:
  password:
    id: password
    identifiers:
      - john.doe@acme.com
---
# Identity 2
credentials:
  oidc:
    id: oidc
    identifiers:
      - john.doe@acme.com

Login and registration using passwords

The combination of identifier (username, email, phone number) and password is the oldest and most common way to authenticate users on the internet. Ory supports registering, importing, recovering, and changing passwords with an industry best-practice security and password policies.

Try out the flow yourself at our password demo.
Disable passwords

To disable or enable passwords:
note

Do not disable the password strategy once you have users using this method in your system. They will not be able to sign in anymore and will need to recover their account.

    Ory Console
    Ory CLI

    Go to Authentication → General in the Ory Console
    Use the Enable Password Authentication toggle

Custom identity schema

When using a custom identity schema, make sure to mark the field which is the password identifier (username, email, phone number). To allow both the username and email address for signing in, define

{
  // ...
  "ory.sh/kratos": {
    credentials: {
      password: {
        identifier: true,
      },
    },
  },
}

for both username and email fields:

{
  "$id": "https://example.com/example.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "first_name": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        },
        "username": {
          "type": "string",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            }
          }
        }
      },
      "additionalProperties": false
    }
  }
}

Use passwordless WebAuthN to protect against phishing attacks

Read this document if:

    You want to learn more about passwordless authentication before deciding whether to use it in your application or starting to code.
    You've heard about passwordless authentication as a potential solution to protect your system against phishing attacks and would like to learn more about how Ory supports this solution.
    You'd like to avoid using a traditional password-based solution since phishing attacks have been a threat for your users in the past.

Passwordless authentication is intended to replace traditional password-based authentication, enabling users to verify their identity using authenticators bound to the device they are using such as biometrics or hardware tokens. Passkeys and passwordless authentication via WebAuthn is a technology based on the specifications published by the FIDO Alliance, sponsored by software companies with an interest in security technology and standards.
How does Ory support passwordless authentication?

Ory's self-service flows support passwordless authentication for browser-based apps by integrating with the W3C Web Authentication (WebAuthn) API for browsers. After enabling it in Ory, the Ory Account Experience automatically presents passwordless as an option in the registration and login flows. When developing your own authentication UI for a browser-based app, the steps for integrating your application with the passwordless registration and login flows are described in the documentation.

There are two different classes of authenticators that can be used with passwordless:

    On-device authenticator: an authenticator available directly on the device you are using, for example fingerprint or facial recognition on a mobile phone.
    External authenticator: an authenticator provided by an external device, such as a Yubikey or a NFC device.

The user experiences the passwordless login flow as follows.

    On-device authenticator
    External authenticator

    Ory's self-service login flow presents an option to log in using passwordless (below the option for signing in with a password). Ory Account Experience login
    To sign in with passwordless, the user enters their ID and clicks the Sign in with security key button.
    The Ory Account Experience displays the sign-in preparation dialog, which gives the user time to prepare the physical device for passwordless login. The user clicks Continue to proceed to the next step.
    The platform verifies the user's identity using the chosen method.
    Login completes automatically.

Authenticator options for passwordless

Authenticators for passwordless are designed to be easy to use. For example, biometric authenticators are a popular option.

Here are some of the current authenticator options for passwordless:

    On-device authenticators
        Fingerprint (Apple TouchID, Windows Hello)
        Facial recognition (Apple FaceID, Windows Hello)
        Iris scan (Windows Hello)
        Voice recognition
        Handwriting recognition
        Device unlock
    External authenticators
        USB key (YubiKey)
        NFC devices
        Bluetooth Low Energy (BLE) devices

Resistance to phishing

The core idea of a phishing attack is to trick a user somehow into giving up their password to the attacker, typically by luring the user to a fake website where they are persuaded to log in, enabling the attacker to steal the password from the login credentials.

Passwordless authentication via WebAuthn is resistant to phishing attacks because it eliminates shared secrets during login, verifies the domain, and prevents password reuse.

    No shared secrets during login: WebAuthn leverages Public Key Infrastructure (PKI) to establish a unique keypair for each web application where the public key is held by the web app and the private key is stored in a user-controlled device.

    Domain verification: The server domain is used by the client to request the authenticator to sign the login request, ensuring that the credential provided by the authenticator is only valid for the specific site visited.

    No password reuse: WebAuthn prevents the vulnerability of "same password everywhere" commonly exploited in phishing attacks and prevents impact on other web apps in case of a breach by using a unique public key for each app.

How does passwordless work?

Passwordless authentication via WebAuthN achieves ease of use without compromising security too much by building on the following insights:

    The device you are using such as a mobile phone or PC already has built-in capabilities for verifying your identity. There is no need to duplicate the procedure for identity verification when the device already has this capability.
    Symmetric key authentication is an existing and proven technology, which has better security characteristics than password-based authentication. The FIDO alliance set itself the goal of automating symmetric key technology, making it more user friendly.

Consider the following diagram, which illustrates the passwordless WebAuthN login flow.

Passwordless login flow

The main steps in the passwordless login flow are, as follows:

    In the frontend app, a user enters their ID and clicks the Sign in with security key button, which initiates the passwordless login flow on Ory Identities.

    Ory Identities sends a cryptographic challenge consisting of unique, random data - also known as a nonce - to the frontend app.

    The frontend app requests verification of the user's identity by calling the WebAuthn API. WebAuthn automatically opens a dialog in the browser, asking the user to choose an authenticator.

    WebAuthn delegates identity verification to the browser, passing the challenge and the choice of authenticator to the browser. The browser invokes the chosen authenticator to verify the user's identity.
        On-device authenticator: If the user authenticates successfully, the platform selects the key pair that matches this app and uses the private key to sign the challenge.
        External authenticator: Identity verification is delegated to the external device, which holds the private key that is used to sign the challenge.

    The browser returns the cryptographic response - the signed challenge - to the frontend app, which forwards it on to Ory Identities. Ory Identities uses the public key from the user account to verify the cryptographic response. The public key gets stored in Ory Identities when the user signs up.

note

Neither the public key nor the private key are exposed to the app during this authentication flow. The only time the public key is sent over the network is during the registration flow, at which point the server stores the public key in the database entry for the user's account. The corresponding passkey (private key) never leaves the keychain on the user's device.
How passkeys and passwordless are related

Passkey-based authentication and passwordless authentication are often talked about together. But if you are new to passwordless, it's not always clear how these concepts are related. At some level, passkeys are always involved in the passwordless authentication process, in one of the following ways:

    Implicit use of passkeys - for example, when a user authenticates using fingerprint recognition or face recognition, the platform implicitly creates a symmetric key pair, but this detail is hidden from the user.
    Explicit use of passkeys - for example, when a user authenticates using a USB key, which has a private key embedded in the physical USB key.

Logging in with a passkey across multiple devices

If you need to log in with a passkey across multiple devices, the following options are supported by passwordless:

    One-off authentication using an external device
    Secure transfer of the passkey to the new device
    Platform-specific passkey sharing between devices

One-off authentication using an external device

Passkeys can be used to perform login across devices. WebAuthn defines a protocol for performing passkey authentication remotely over a secured BLE connection.

For example, consider the case where the passkey for a particular application is stored in the Android OS on your mobile phone. If you need to log into the application from a PC, you can use the passkey on your mobile phone to verify your identity. In this case, you select a BLE (Bluetooth Low Energy) device as the external authenticator on the PC and, after pairing your phone with the PC, you are prompted to verify your identity on the mobile phone. This authentication step is a one-off and the passkey is not transferred to the PC.

Using this remote authentication protocol, you can use your mobile phone as an external authenticator for any device that supports WebAuthn, without leaving any trace of your credentials on that device.
Secure transfer of the passkey to a new device

On the other hand, if you want to transfer passkey credentials from your mobile phone to your PC, this is also supported by the FIDO standard. Support for this feature is not available on all platforms, however, as it is a recent addition to the standard.

For example, consider the case where a passkey for a particular application is stored on your mobile phone, but you also want to have this passkey available on your personal laptop, so that you don't need to take out your phone every time you log in from your laptop. If your platform has support for this, you see an option to securely transfer the passkey to your laptop, while performing remote authentication over BLE. If you choose to transfer the passkey, it will be stored permanently (and securely) on your laptop's OS and in future you will be able to log in to the application directly from your laptop.
Platform-specific passkey sharing between devices

If all of your devices belong to the same platform ecosystem such as Android, macOS, or Windows, you might find there is a platform-specific mechanism available for sharing passkeys securely between devices. For example, the Apple iCloud Keychain is capable of sharing passkeys for passwordless login across multiple Apple devices assuming these devices have access to the same Apple iCloud account.


Email and SMS one-time-code authentication

Ory Network allows users to authenticate through a one-time code sent via email and SMS. This is useful for use-cases where users need to be onboarded through a minimal authentication process.

The one-time code method consists of a two-step process. The first step the user is required to enter their email address or phone number. In the second step they are prompted to enter the one-time code sent to their email address or phone number.

Below are examples of the one-time code authentication method in action:

WebAuthn prompt
Enable email one-time-code (OTP)

    To enable email one-time-code, enable the one-time code strategy for passwordless:

    Ory Console UI
    Ory CLI
    Full Config

config.yml

selfservice:
methods:
  code:
    passwordless_enabled: true

    If you are using a custom identity schema and not a preset, check the custom identity schema section.
    Open the login UI and test it out!
    You need a good email delivery provider to ensure that one-time codes are delivered reliably. We recommend setting up your own SMTP provider to ensure that you have full control over the email delivery process.

Enable SMS one-time-code (OTP)
note

Before enabling SMS one-time-code, please be aware that SMS OTP (One-Time Password) is considered insecure due to several vulnerabilities:

    SIM Swapping: Attackers can hijack your phone number by convincing your mobile carrier to transfer your number to a new SIM card.
    SMS Interception: SMS messages can be intercepted by attackers using various techniques, such as exploiting weaknesses in the SS7 protocol.
    Phishing: Users can be tricked into revealing their OTPs through phishing attacks.

Due to these risks, it is recommended to use more secure methods like Passkeys.

    To enable sms one-time-code, enable the one-time code strategy for passwordless:

    Ory Console UI
    Ory CLI
    Full Config

config.yml

selfservice:
methods:
  code:
    passwordless_enabled: true

    Select an identity schema that has a phone number. In our case we will use the sms preset:
        Go to User management → Identity schema in the Ory Console.
        Find preset://sms in the Preset schemas section.
        Open the row menu (three dots) and select Make default.
    For this example we will create a mock SMS provider. You can find more information on how to configure SMS providers in SMS delivery configuration:
        Set up a fake webhook endpoint using a service like webhook.site.
        Copy the "unique URL" of the webhook (for example https://webhook.site/859c1c...).
        Use the Ory CLI to set up the SMS channel:

        ory patch identity-config --project ${project_id} \
          --add '/courier/channels=[{"id":"sms","request_config":{"method":"PUT","body":"base64://ZnVuY3Rpb24oY3R4KSB7DQpjdHg6IGN0eCwNCn0=","url":"https://webhook.site/#!/view/859c1c2c-c4d5-4058-aec4-53f37929c5c1"}}]'

    Open the sign up page and sign up for an account.
    After the UI shows you that a code has been sent, check out the webhook target which will now show in response to the SMS being sent.
    If you are using a custom identity schema and not a preset, check the custom identity schema section.

Template customization

Customize the login and registration email templates to match your brand. You can find more information on how to do this in Emails and SMS.
Custom identity schema

All Ory Identity Schema presets are one-time code ready.

If you want to use a custom identity schema, you must define which field of the schema is the primary identifier for the one-time code strategy.
identity.schema.json

{
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    traits: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          title: "Your email",
          minLength: 3,
          "ory.sh/kratos": {
            credentials: {
              code: {
                identifier: true,
                via: "email",
              },
              // ...
            },
          },
        },
        // ...
        phone_number: {
          type: "string",
          format: "tel",
          title: "Your phone number",
          minLength: 3,
          "ory.sh/kratos": {
            credentials: {
              code: {
                identifier: true,
                via: "sms",
              },
              // ...
            },
          },
        },
      },
    },
  },
}



Passkeys & WebAuthN

The Web Authentication Browser API (WebAuthn) is a specification written by W3C and FIDO. The WebAuthn API allows servers to register and authenticate users using public key cryptography instead of passwords.

Passkeys use the WebAuthn standard to generate and manage cryptographic key pairs for users. Passkeys are, as described by the FIDO Alliance, "a password replacement that provides faster, easier, and more secure sign-ins to websites and apps across a user's devices."
info

WebAuthn is the underlying technology that allows passwordless authentication using public key cryptography.
Passkeys are a more user-friendly implementation of WebAuthn.
Passkeys

Passkeys are a method for registering and signing in users without passwords. Passkeys are an industry-accepted and adopted standard, which means that all of your users will be able to use this feature, no matter the hardware they work with.

Notable adopters of passkeys include:

    Apple with Apple Passkeys
    Google
    Microsoft
    Meta

While companies can add proprietary features to passkeys, such as iCloud synchronization in Apple Passkeys or Google Password Manager synchronization for Android devices, all of them use the same FIDO standard. This means that enabling passkeys is a simple, one-time operation in Ory.
tip

To learn more about passkeys and see sample flows for different platforms, watch this FIDO Alliance video:
Choose passkey strategy

Ory Network implements a dedicated passkey strategy that improves the ergonomics over using the webauthn strategy for first-factor login. Here is a comparison of the two approaches:
	Webauthn passwordless login	Passkey strategy
Discoverable credentials: The browser automatically discovers which credentials the user has stored for the site.	❌	✔︎
Conditional UI: The browser attaches an autofill dropdown to the email field that allows the user to select a passkey.	❌	✔︎
Backwards compatibility: Works for users that have a passkey configured with the WebAuthN strategy.	✔︎	❌
Passkeys with the dedicated passkey strategy
Configuration

By default, the passkey strategy is disabled. Go to Authentication → Passwordless login in the Ory Console and toggle the switch for Enable Passkey authentication to enable it.

Passkey in Console

Alternatively, use the Ory CLI to enable the passkey strategy:

    Ory CLI
    Ory Network
    Self-hosted Ory Kratos

config.yml

selfservice:
methods:
  passkey:
    enabled: true
    config:
      display_name: "My Display Name"

Identity schema

If you want to use a custom identity schema, you must define which field of the identity schema is the display name for the passkey. If you do not define the passkey.display_name field, the webauthn.identifier will be used as a fallback. If neither is defined, the passkey strategy will not work.
identity.schema.json

{
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    traits: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          title: "Your E-Mail",
          minLength: 3,
          "ory.sh/kratos": {
            credentials: {
              // ...
              passkey: {
                display_name: true,
              },
            },
            // ...
          },
        },
        // ...
      },
      // ...
    },
  },
}

Implementing passkeys in your application

After configuring passkeys, you need to integrate them into your application. The implementation differs depending on your platform:

    Web applications can use Ory's webauthn.js helper script or manually integrate the WebAuthn API.
    Mobile applications (iOS and Android) require platform-specific credential management APIs and direct integration with Ory's JSON API endpoints.

For detailed implementation instructions, code examples, and best practices for both web and mobile platforms, see Implementing passkeys for web and mobile.
Passkeys with the WebAuthN strategy
Configuration

To allow using passkeys, enable passwordless login. To do that in the Ory Network, go to

Authentication → Passwordless login in the Ory Console and toggle the switch to enable the feature.

Enabling passwordless login allows to use passkeys
Example

This is a macOS Safari prompt the browser shows when users try to sign in using the passwordless method. The first option allows to use a passkey associated with this account that's stored in the iCloud Keychain of the user that's signed in to iCloud on this device.

The second option allows delegating user authentication to a camera-equipped device. Upon successful authentication, a matching passkey found on the device will be used to sign in.

Apple Passkeys in Safari
WebAuthn
note

Please use the PassKey method instead. This is documented for legacy reasons.

WebAuthn is commonly used with:

    USB, NFC or Bluetooth Low Energy devices, for example YubiKey
    Built-in OS biometric authentication platforms such as TouchID, FaceID, Windows Hello, Android Biometric Authentication

When the end-user triggers the WebAuthn process, the browser shows WebAuthn prompt. The prompt looks different depending on the used browser. This is a Chrome example:

WebAuthn prompt
tip

Ory's WebAuthn implementation can be used for both multi-factor authentication and passwordless authentication. You need to configure whether WebAuthn is used for passwordless, or for multi-factor authentication. Read more on Multi-factor with WebAuthn.
Configuration

By default, passwordless with WebAuthn is disabled. To start using WebAuthn, apply this configuration:

    Ory Console UI
    Ory CLI
    Full Config

config.yml

selfservice:
methods:
  webauthn:
    enabled: true
    config:
      # If set to true will use WebAuthn for passwordless flows intead of multi-factor authentication.
      passwordless: false
      rp:
        # This MUST be your root domain (not a subdomain)
        id: example.org
        # This MUST be the exact URL of the page which will prompt for WebAuthn!
        # Only the scheme (https / http), host (auth.example.org), and port (4455) are relevant. The
        # path is irrelevant.
        origins:
          - http://auth.example.org:4455
          - https://auth2.example.org
        # A display name which will be shown to the user on her/his device.
        display_name: Ory

Updating configuration

The provider ID or domain is an essential component of WebAuthn. It is used to identify the relying party (the website or service) that the user is authenticating with. The provider ID or domain is provided by Ory during the registration process and is stored along with the user's credential on the user's device.

If the provider ID or domain associated with a WebAuthn implementation is changed, it can break existing users' logins due to the following reasons:

    Credential Association: The provider ID or domain is part of the credential's metadata. When a user registers a credential with a specific provider ID or domain, the web browser associates that credential with that particular website. When the user tries to log in subsequently, the browser looks for credentials associated with the same provider ID or domain. If the provider ID or domain is changed, the browser won't find a match, and the user's login attempt will fail.

    Trust Relationship: WebAuthn relies on a trust relationship between the browser, the user, and the website. Changing the provider ID or domain can disrupt this trust relationship. When a user registers a device and associates it with a specific provider ID or domain, they are implicitly trusting that website to handle their authentication securely. Changing the provider ID or domain could lead to confusion and erode trust in the authentication process, potentially making users hesitant to log in.

    Security Considerations: WebAuthn employs cryptographic techniques to ensure the integrity and security of user authentication. The provider ID or domain is used as a key component in these cryptographic operations. Changing the provider ID or domain without proper coordination and cryptographic updates can compromise the security of the authentication system, potentially allowing unauthorized access or rendering existing credentials invalid.

To mitigate the impact on existing users, any changes to the provider ID or domain in a WebAuthn implementation should be carefully planned and communicated to users in advance. Proper migration strategies, such as allowing users to re-register their credentials or ensuring backward compatibility, should be implemented to minimize disruption and maintain a seamless authentication experience.
(Custom) identity schema

All Ory identity schema presets are WebAuthn-ready.

If you want to use a custom identity schema, you must define which field of the identity schema is the primary identifier for WebAuthn.
note

This is used for WebAuthn both in passwordless flows and multi-factor authentication.
identity.schema.json

{
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    traits: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          title: "Your E-Mail",
          minLength: 3,
          "ory.sh/kratos": {
            credentials: {
              // ...
              webauthn: {
                identifier: true,
              },
            },
            // ...
          },
        },
        // ...
      },
      // ...
    },
  },
}

Constraints

    WebAuthn is a browser standard. It does not work in native mobile apps.
    WebAuthn is limited to one domain and does not work in a local environment when using CNAME / Ory Tunnel. WebAuthn uses the https://origin URL as part of the client<-> server challenge/response mechanism. This mechanism allows for only one URL as the origin. Read more in the WebAuthn guide and on GitHub.
    Implementing WebAuthn in your own UI can be challenging, depending on which framework to use. Check our reference implementations: React Native, Node.js, React/SPA



Implement passkey authentication in web and mobile applications

This guide covers how to implement passkey authentication in your applications using Ory Kratos or Ory Network. Passkeys provide a passwordless authentication experience using WebAuthn across web browsers and mobile platforms.

This page assumes you have already configured the passkey method in your Ory configuration. See the Passkeys overview for initial setup instructions.
note

Code examples in this guide are illustrative and likely need adjustments based on your specific configuration, identity schema, and application requirements.
Overview

Passkey implementation differs between platforms:

    Web applications use browser-native WebAuthn APIs with JavaScript.
    Mobile applications use platform-specific credential management APIs (iOS AuthenticationServices, Android CredentialManager) with Ory's JSON API endpoints.

This guide focuses on the integration patterns for each platform.
Web implementation

For web applications, you can use the browser's native WebAuthn API to create and authenticate with passkeys.
Using Ory's webauthn.js

Ory provides a webauthn.js helper script that simplifies WebAuthn integration in browser flows. When you initialize a registration or login flow through the browser, Ory automatically injects the necessary JavaScript to handle passkey operations.

<!-- The flow response includes script nodes that handle WebAuthn -->
<script src="https://$PROJECT_SLUG.projects.oryapis.com/.well-known/ory/webauthn.js"></script>

The script automatically:

    Detects passkey-related form fields.
    Calls navigator.credentials.create() for registration.
    Calls navigator.credentials.get() for authentication.
    Submits the WebAuthn response back to Ory.

See Custom UI Advanced Integration for details on using webauthn.js in custom UIs.
Manual WebAuthn integration

For more control, you can manually integrate the W3C WebAuthn API:

    Initialize a registration or login flow via Ory's API.
    Parse the WebAuthn challenge from the flow response.
    Call navigator.credentials.create() or navigator.credentials.get().
    Submit the credential response back to Ory.

The WebAuthn API is well-documented by the W3C and MDN:

    W3C WebAuthn Specification
    MDN Web Authentication API

Mobile implementation

Mobile passkey implementation requires using platform-specific APIs and Ory's JSON API endpoints. Unlike browser flows, mobile apps don't receive the webauthn.js script and must handle credential operations manually.
Platform requirements

Both iOS and Android require configuration to associate your app with your authentication domain.
iOS Associated Domains

iOS requires an apple-app-site-association (AASA) file to create a bidirectional link between your app and your domain. This proves that your app and domain are controlled by the same entity.
How iOS association works

    You add an Associated Domains entitlement to your app: webcredentials:example.com
    When your app is installed/updated, iOS downloads the AASA file from that domain (via Apple's CDN)
    When creating a passkey, iOS verifies the RP ID matches a domain in your entitlements AND the AASA file lists your app

Add the Associated Domains entitlement

Add the entitlement to your Xcode project. The domain should match your RP ID:

<!-- YourApp.entitlements -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
        <!-- Use your root domain as RP ID -->
        <string>webcredentials:example.com</string>
    </array>
</dict>
</plist>

For subdomain support, iOS allows wildcard entitlements:

<string>webcredentials:*.example.com</string>

This allows your app to work with any subdomain. However, the AASA file must still be served from your RP ID domain.
Serve the apple-app-site-association file

The AASA file must be hosted at https://{your-rp-id}/.well-known/apple-app-site-association. If your RP ID is example.com, host it at:

https://example.com/.well-known/apple-app-site-association

File structure:

{
  "webcredentials": {
    "apps": ["ABCDE12345.com.example.yourapp"]
  }
}

The value format is {Team_ID}.{Bundle_Identifier}:

    Team ID: Find in Apple Developer portal under Membership
    Bundle Identifier: Your app's bundle ID from Xcode (e.g., com.example.yourapp)

File requirements:

    Must be served over HTTPS with a valid TLS certificate
    Must return Content-Type: application/json
    Must be accessible without authentication
    Apple's CDN caches the file for up to 24 hours

warning

Ory Network doesn't host apple-app-site-association files automatically. You must host this file on your own domain at the RP ID you configured.
Apple documentation

    Supporting Associated Domains
    About the apple-app-site-association file

Android Digital Asset Links

Android uses Digital Asset Links to establish trust between your app and your domain. This verification allows credential sharing between your website and app.
How Android association works

When your app requests passkey operations, Android:

    Checks the domain associated with the RP ID
    Downloads the assetlinks.json file from that domain
    Verifies your app's package name and signing certificate match the file
    Grants permission for credential operations if validated

Important: Android does not support wildcard domains. The assetlinks.json file must be hosted at the exact RP ID domain.
Serve the assetlinks.json file

The file must be hosted at https://{your-rp-id}/.well-known/assetlinks.json. If your RP ID is example.com, host it at:

https://example.com/.well-known/assetlinks.json

File structure:

[
  {
    "relation": ["delegate_permission/common.handle_all_urls", "delegate_permission/common.get_login_creds"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.yourapp",
      "sha256_cert_fingerprints": [
        "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"
      ]
    }
  }
]

Key relation for passkeys: delegate_permission/common.get_login_creds enables credential sharing between your website and app.
Generate SHA-256 certificate fingerprint

For debug builds:

keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

For release builds:

keytool -list -v -keystore /path/to/your-release-key.keystore

Copy the SHA-256 fingerprint from the output.

File requirements:

    Must be served over HTTPS with a valid TLS certificate
    Must return Content-Type: application/json
    Must be accessible without authentication
    Package name must match your app's applicationId in build.gradle
    SHA-256 fingerprint must match your app's signing key

warning

Ory Network doesn't host assetlinks.json files automatically. You must host this file on your own domain at the RP ID you configured.
Subdomain handling

Unlike iOS, Android does not support wildcard associations. If you need passkeys on multiple subdomains:

    Use your root domain as the RP ID (recommended)
    Host the assetlinks.json at the root domain
    All subdomains will share the same passkey credentials

Example: With RP ID example.com, passkeys work on:

    https://example.com
    https://login.example.com
    https://app.example.com

All using the single assetlinks.json file at https://example.com/.well-known/assetlinks.json.
Validation tools

Test your assetlinks.json configuration:

    Statement List Generator and Tester
    Command line: curl https://example.com/.well-known/assetlinks.json

Android documentation

    Android Credential Manager
    Digital Asset Links
    Verify Android App Links

iOS implementation

iOS passkey support uses the AuthenticationServices framework. Here's how to integrate with Ory's API.
Registration flow

Initialize the registration flow:

func initializeRegistrationFlow() async throws -> FlowResponse {
    var request = URLRequest(url: URL(string: "\(oryBaseURL)/self-service/registration/api")!)
    request.httpMethod = "GET"
    request.setValue("application/json", forHTTPHeaderField: "Accept")

    let (data, response) = try await URLSession.shared.data(for: request)
    // Handle response...
    return try decodeFlowResponse(from: data)
}

Parse the WebAuthn challenge by extracting the challenge from the passkey_create_data node:

func extractRegistrationChallenge(_ flow: FlowResponse) -> String? {
    guard let ui = flow.raw["ui"] as? [String: Any],
          let nodes = ui["nodes"] as? [[String: Any]] else {
        return nil
    }

    // Find the passkey_create_data node
    for node in nodes {
        guard let attributes = node["attributes"] as? [String: Any],
              let name = attributes["name"] as? String,
              name == "passkey_create_data" else {
            continue
        }

        // Parse the nested JSON value
        if let valueStr = attributes["value"] as? String,
           let valueData = valueStr.data(using: .utf8),
           let json = try? JSONSerialization.jsonObject(with: valueData) as? [String: Any],
           let credentialOptions = json["credentialOptions"] as? [String: Any],
           let publicKey = credentialOptions["publicKey"] as? [String: Any],
           let challenge = publicKey["challenge"] as? String {
            return challenge
        }
    }
    return nil
}

The passkey_create_data node contains a JSON string with this structure:

{
  "credentialOptions": {
    "publicKey": {
      "challenge": "base64url-encoded-challenge",
      "rp": { "name": "Your App", "id": "ory.your-custom-domain.com" },
      "user": { "id": "base64url-user-id", "name": "", "displayName": "" },
      "pubKeyCredParams": [
        { "type": "public-key", "alg": -7 },
        { "type": "public-key", "alg": -257 }
      ],
      "authenticatorSelection": {
        "userVerification": "required",
        "residentKey": "required"
      }
    }
  },
  "displayNameFieldName": "traits.email"
}

Create the passkey:

func signUpWith(userName: String, challenge: Data, domain: String) {
    let publicKeyCredentialProvider = ASAuthorizationPlatformPublicKeyCredentialProvider(
        relyingPartyIdentifier: domain
    )

    let userID = Data(UUID().uuidString.utf8)
    let registrationRequest = publicKeyCredentialProvider.createCredentialRegistrationRequest(
        challenge: challenge,
        name: userName,
        userID: userID
    )

    let authController = ASAuthorizationController(authorizationRequests: [registrationRequest])
    authController.delegate = self
    authController.presentationContextProvider = self
    authController.performRequests()
}

When the user completes registration, format and submit the credential:

func submitRegistration(credential: ASAuthorizationPlatformPublicKeyCredentialRegistration) async throws {
    let credentialDict: [String: Any] = [
        "id": credential.credentialID.base64URLEncodedString(),
        "rawId": credential.credentialID.base64URLEncodedString(),
        "type": "public-key",
        "response": [
            "clientDataJSON": credential.rawClientDataJSON.base64URLEncodedString(),
            "attestationObject": credential.rawAttestationObject?.base64URLEncodedString() ?? ""
        ]
    ]

    let credentialJSON = try JSONSerialization.data(withJSONObject: credentialDict)
    let credentialString = String(data: credentialJSON, encoding: .utf8)!

    var request = URLRequest(url: URL(string: "\(oryBaseURL)/self-service/registration?flow=\(flowId)")!)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    let payload: [String: Any] = [
        "method": "passkey",
        "passkey_register": credentialString,
        "traits": [
            "email": userName  // Or other identity traits
        ]
    ]

    request.httpBody = try JSONSerialization.data(withJSONObject: payload)
    let (data, response) = try await URLSession.shared.data(for: request)
    // Handle response...
}

Login flow

Initialize the login flow:

func initializeLoginFlow() async throws -> FlowResponse {
    var request = URLRequest(url: URL(string: "\(oryBaseURL)/self-service/login/api")!)
    request.httpMethod = "GET"
    request.setValue("application/json", forHTTPHeaderField: "Accept")

    let (data, response) = try await URLSession.shared.data(for: request)
    return try decodeFlowResponse(from: data)
}

Extract the challenge from the passkey_challenge node:

func extractLoginChallenge(_ flow: FlowResponse) -> String? {
    guard let ui = flow.raw["ui"] as? [String: Any],
          let nodes = ui["nodes"] as? [[String: Any]] else {
        return nil
    }

    // Find the passkey_challenge node
    for node in nodes {
        guard let attributes = node["attributes"] as? [String: Any],
              let name = attributes["name"] as? String,
              name == "passkey_challenge" else {
            continue
        }

        // Parse the JSON value
        if let valueStr = attributes["value"] as? String,
           let valueData = valueStr.data(using: .utf8),
           let json = try? JSONSerialization.jsonObject(with: valueData) as? [String: Any],
           let publicKey = json["publicKey"] as? [String: Any],
           let challenge = publicKey["challenge"] as? String {
            return challenge
        }
    }
    return nil
}

The passkey_challenge node contains a JSON string with this structure:

{
  "publicKey": {
    "challenge": "base64url-encoded-challenge",
    "rpId": "ory.your-custom-domain.com",
    "allowCredentials": [],
    "userVerification": "required"
  }
}

Authenticate with passkey:

func signInWith(challenge: Data, domain: String) {
    let publicKeyCredentialProvider = ASAuthorizationPlatformPublicKeyCredentialProvider(
        relyingPartyIdentifier: domain
    )

    let assertionRequest = publicKeyCredentialProvider.createCredentialAssertionRequest(
        challenge: challenge
    )

    let authController = ASAuthorizationController(authorizationRequests: [assertionRequest])
    authController.delegate = self
    authController.presentationContextProvider = self
    authController.performRequests()
}

Submit the assertion:

func submitLogin(credential: ASAuthorizationPlatformPublicKeyCredentialAssertion) async throws {
    let credentialDict: [String: Any] = [
        "id": credential.credentialID.base64URLEncodedString(),
        "rawId": credential.credentialID.base64URLEncodedString(),
        "type": "public-key",
        "response": [
            "clientDataJSON": credential.rawClientDataJSON.base64URLEncodedString(),
            "authenticatorData": credential.rawAuthenticatorData.base64URLEncodedString(),
            "signature": credential.signature.base64URLEncodedString(),
            "userHandle": credential.userID.base64URLEncodedString()
        ]
    ]

    let credentialJSON = try JSONSerialization.data(withJSONObject: credentialDict)
    let credentialString = String(data: credentialJSON, encoding: .utf8)!

    var request = URLRequest(url: URL(string: "\(oryBaseURL)/self-service/login?flow=\(flowId)")!)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    let payload: [String: Any] = [
        "method": "passkey",
        "passkey_login": credentialString
    ]

    request.httpBody = try JSONSerialization.data(withJSONObject: payload)
    let (data, response) = try await URLSession.shared.data(for: request)
    // Handle response...
}

Base64URL encoding

iOS requires Base64URL encoding (not standard Base64) for WebAuthn:

extension Data {
    func base64URLEncodedString() -> String {
        return self.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }

    init?(base64URLEncoded string: String) {
        var base64 = string
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        let remainder = base64.count % 4
        if remainder > 0 {
            base64 += String(repeating: "=", count: 4 - remainder)
        }
        self.init(base64Encoded: base64)
    }
}

Android implementation

Android passkey support uses the Credential Manager API. The integration pattern is similar to iOS.
Dependencies

Add the Credential Manager dependency to your build.gradle:

dependencies {
    implementation "androidx.credentials:credentials:1.2.0"
    implementation "androidx.credentials:credentials-play-services-auth:1.2.0"
}

Registration flow

Initialize the registration flow:

suspend fun initializeRegistrationFlow(): FlowResponse {
    val url = URL("$oryBaseURL/self-service/registration/api")
    val connection = url.openConnection() as HttpURLConnection
    connection.requestMethod = "GET"
    connection.setRequestProperty("Accept", "application/json")

    val response = connection.inputStream.bufferedReader().readText()
    return parseFlowResponse(response)
}

Parse the WebAuthn challenge:

fun extractRegistrationChallenge(flow: FlowResponse): String? {
    val ui = flow.raw["ui"] as? Map<*, *> ?: return null
    val nodes = ui["nodes"] as? List<*> ?: return null

    for (node in nodes) {
        val nodeMap = node as? Map<*, *> ?: continue
        val attributes = nodeMap["attributes"] as? Map<*, *> ?: continue
        val name = attributes["name"] as? String ?: continue

        if (name == "passkey_create_data") {
            val valueStr = attributes["value"] as? String ?: continue
            val json = JSONObject(valueStr)
            val credentialOptions = json.getJSONObject("credentialOptions")
            val publicKey = credentialOptions.getJSONObject("publicKey")
            return publicKey.getString("challenge")
        }
    }
    return null
}

Create the passkey:

suspend fun signUpWith(userName: String, requestJson: String, context: Context) {
    val credentialManager = CredentialManager.create(context)

    val request = CreatePublicKeyCredentialRequest(requestJson)

    try {
        val result = credentialManager.createCredential(
            request = request,
            context = context as Activity
        ) as CreatePublicKeyCredentialResponse

        submitRegistration(result.registrationResponseJson)
    } catch (e: CreateCredentialException) {
        // Handle error
    }
}

Submit the credential:

suspend fun submitRegistration(credentialJson: String) {
    val url = URL("$oryBaseURL/self-service/registration?flow=$flowId")
    val connection = url.openConnection() as HttpURLConnection
    connection.requestMethod = "POST"
    connection.setRequestProperty("Content-Type", "application/json")
    connection.doOutput = true

    val payload = JSONObject().apply {
        put("method", "passkey")
        put("passkey_register", credentialJson)
        put("traits", JSONObject().apply {
            put("email", userName)
        })
    }

    connection.outputStream.write(payload.toString().toByteArray())
    val response = connection.inputStream.bufferedReader().readText()
    // Handle response...
}

Login flow

Initialize the login flow:

suspend fun initializeLoginFlow(): FlowResponse {
    val url = URL("$oryBaseURL/self-service/login/api")
    val connection = url.openConnection() as HttpURLConnection
    connection.requestMethod = "GET"
    connection.setRequestProperty("Accept", "application/json")

    val response = connection.inputStream.bufferedReader().readText()
    return parseFlowResponse(response)
}

Parse the WebAuthn challenge:

fun extractLoginChallenge(flow: FlowResponse): String? {
    val ui = flow.raw["ui"] as? Map<*, *> ?: return null
    val nodes = ui["nodes"] as? List<*> ?: return null

    for (node in nodes) {
        val nodeMap = node as? Map<*, *> ?: continue
        val attributes = nodeMap["attributes"] as? Map<*, *> ?: continue
        val name = attributes["name"] as? String ?: continue

        if (name == "passkey_challenge") {
            val valueStr = attributes["value"] as? String ?: continue
            val json = JSONObject(valueStr)
            val publicKey = json.getJSONObject("publicKey")
            return publicKey.getString("challenge")
        }
    }
    return null
}

Authenticate with passkey:

suspend fun signInWith(requestJson: String, context: Context) {
    val credentialManager = CredentialManager.create(context)

    val request = GetPublicKeyCredentialOption(requestJson)
    val getCredRequest = GetCredentialRequest(listOf(request))

    try {
        val result = credentialManager.getCredential(
            request = getCredRequest,
            context = context as Activity
        )

        val credential = result.credential as PublicKeyCredential
        submitLogin(credential.authenticationResponseJson)
    } catch (e: GetCredentialException) {
        // Handle error
    }
}

Submit the assertion:

suspend fun submitLogin(credentialJson: String) {
    val url = URL("$oryBaseURL/self-service/login?flow=$flowId")
    val connection = url.openConnection() as HttpURLConnection
    connection.requestMethod = "POST"
    connection.setRequestProperty("Content-Type", "application/json")
    connection.doOutput = true

    val payload = JSONObject().apply {
        put("method", "passkey")
        put("passkey_login", credentialJson)
    }

    connection.outputStream.write(payload.toString().toByteArray())
    val response = connection.inputStream.bufferedReader().readText()
    // Handle response...
}

API response handling
Flow response structure

All registration and login flows return a similar structure:

{
  "id": "flow-id-uuid",
  "type": "api",
  "expires_at": "2025-11-23T12:00:00Z",
  "issued_at": "2025-11-23T11:00:00Z",
  "request_url": "https://example.com/self-service/registration/api",
  "ui": {
    "action": "https://example.com/self-service/registration?flow=flow-id-uuid",
    "method": "POST",
    "nodes": [...]
  }
}

Node types to parse

Registration flows contain these key nodes:

    csrf_token (group: default): CSRF protection token
    traits.email (group: default): User identity traits
    passkey_create_data (group: passkey): WebAuthn creation options
    passkey_register (group: passkey): Where to submit the credential

Login flows contain:

    csrf_token (group: default): CSRF protection token
    identifier (group: default): Optional username field
    passkey_challenge (group: passkey): WebAuthn assertion options
    passkey_login (group: passkey): Where to submit the assertion

Success response

On successful authentication, Ory returns a session:

{
  "session": {
    "id": "session-id-uuid",
    "active": true,
    "expires_at": "2025-11-23T13:00:00Z",
    "authenticated_at": "2025-11-23T11:00:00Z",
    "authenticator_assurance_level": "aal1",
    "authentication_methods": [
      {
        "method": "passkey",
        "aal": "aal1",
        "completed_at": "2025-11-23T11:00:00Z"
      }
    ],
    "identity": {
      "id": "identity-id-uuid",
      "schema_id": "default",
      "traits": {
        "email": "user@example.com"
      }
    }
  }
}

Store the session token for authenticated requests. On mobile, use secure storage (iOS Keychain, Android Keystore).
Error handling
Common errors
Invalid WebAuthn response

{
  "error": {
    "id": "browser_location_change_required",
    "code": 422,
    "status": "Unprocessable Entity",
    "reason": "Unable to parse WebAuthn response: Parse error for Registration"
  }
}

This error occurs when there is incorrect Base64URL encoding (using standard Base64 instead), missing required fields in the credential response, or malformed JSON in passkey_register or passkey_login fields.

To resolve this, verify your Base64URL encoding and ensure all required WebAuthn response fields are included.
Domain mismatch

{
  "error": {
    "id": "security_identity_mismatch",
    "code": 400,
    "status": "Bad Request",
    "reason": "The request was malformed or contained invalid parameters"
  }
}

This error occurs when the Associated Domains or assetlinks.json domain doesn't match Kratos rp.id, the AASA or assetlinks.json file isn't properly served, or the application uses HTTP instead of HTTPS.

To resolve this, verify your Associated Domains entitlement matches your Kratos configuration. Test AASA file accessibility using curl https://ory.your-custom-domain.com/.well-known/apple-app-site-association. Test assetlinks.json using curl https://ory.your-custom-domain.com/.well-known/assetlinks.json. Ensure HTTPS with valid certificate.
Flow expired

{
  "error": {
    "id": "self_service_flow_expired",
    "code": 410,
    "status": "Gone",
    "reason": "The self-service flow has expired"
  }
}

This error occurs when the user took too long to complete the flow (default: 1 hour).

To resolve this, initialize a new flow and retry the operation.
User canceled

On mobile platforms, users can cancel the passkey prompt. Handle this gracefully.

    iOS
    Android

func authorizationController(controller: ASAuthorizationController,
                            didCompleteWithError error: Error) {
    if let authError = error as? ASAuthorizationError,
       authError.code == .canceled {
        // User canceled - show alternative login options
    }
}

Mobile-specific issues
AASA file not found on iOS

The passkey prompt doesn't appear or the user sees "No credentials available" errors.

To troubleshoot this issue:

    Verify the AASA file is accessible via browser.
    Check the file has correct Content-Type: application/json.
    Verify the Team ID and Bundle ID are correct.
    Try uninstalling and reinstalling the app.
    Check the device isn't using a VPN that blocks the domain.

assetlinks.json validation failed on Android

The user sees "No credentials found" errors or the passkey dialog doesn't show.

To troubleshoot this issue:

    Verify the assetlinks.json file is accessible via browser.
    Use the Statement List Generator and Tester to validate.
    Verify the SHA-256 fingerprint matches your signing key.
    Ensure the package name matches exactly.
    Clear app data and retry.

Domain not HTTPS

Both iOS and Android require HTTPS for passkeys. HTTP domains fail silently or with cryptic errors.

To resolve this, use HTTPS with a valid TLS certificate. For local development, use a tool like ngrok to create an HTTPS tunnel.
Best practices
Session management

Store session tokens securely using iOS Keychain or Android Keystore. Handle session expiration by checking session validity before making authenticated requests. Implement token refresh using Ory's /sessions/whoami endpoint to verify sessions.
User experience

Provide fallback options to allow users to sign in with other methods if passkeys fail. Handle errors gracefully by showing user-friendly error messages. Support AutoFill on iOS 17+ and Android 14+ to enable AutoFill-assisted passkey sign-in for better user experience.
Testing

Test on physical devices as passkeys don't work reliably in simulators or emulators. Test with multiple accounts to verify credential isolation. Test cross-platform to ensure passkeys created on one platform work on others via cloud sync.
Next steps

Review the Passkeys overview for configuration options. See Self-Service Flows for more flow details. Check out the API documentation for complete endpoint reference.


Device binding

Device Authentication (also known as 'DeviceAuthn', or device binding) is a way for a user to authenticate with a hardware resident private key.

Since the key cannot leave the device, once the key has been added to the identity, it gives a high assurance that the user is who they say they are, and is using a trusted, known device, without needing to remember something like a password.

This is very similar to passkeys with one crucial difference: passkeys are usually synced in the cloud among many devices, whereas a DeviceAuthn key cannot leave the hardware where it was created.

Using this approach, the system can restrict the use of an application on specific, whitelisted devices.

Currently, this authentication strategy can only be used as a second factor. It may change in the future. That is because there is no way to do recovery, since the private key is never readable in clear and cannot be extracted out of the hardware.

Since this is a strategy, it supports all the same hooks as the other strategies.
Short summary

    This is implemented in the OEL version with the strategy DeviceAuthn, in spirit similar to WebAuthn.
    The settings flow is used to manage keys (create, delete).
    The login flow is used to step-up the AAL. Hardware-backed keys (TEE) satisfy AAL2, while keys stored in a dedicated security chip (StrongBox) may eventually be categorized as AAL3.
    Using the admin API, it is possible to delete all keys for a device on behalf of the user in case of theft or loss.
    A device may have multiple keys, to support multiple user accounts on the same device.
    Only these platforms are currently supported, because they offer native APIs, strong hardware, and trust guarantees:
        iOS: 14.0+
        iPadOS: 14.0+
        tvOS: 15.0+ (untested)
        visionOS 1.0+ (untested)
        Android SDK 24.0+. Older versions are unlikely to be supported.

Acronyms

    TPM: Trusted Platform Module
    TEE: Trusted Execution Environment
    CA: Certificate Authority
    AAL: Authenticator Assurance Level

Guides
How to implement Device Binding in your Android application

We recommend using the Ory Java SDK to communicate with Kratos, although this is not required. Code snippets here use this SDK, and are written in Kotlin.

Since Device Binding only is supported on native devices (not in the browser), all corresponding API calls should be done using the endpoints for native apps, to avoid having to pass cookies around manually.

    Ensure that the DeviceAuthn strategy is enabled in the Kratos configuration. This strategy implements the settings and login flow. This is done so:

    selfservice:
      methods:
        deviceauthn:
          enabled: true

    Implement a runtime check for the Android version. If is lower than 24, Device Binding may not be used, and a fallback should be found, for example using passkeys.

    Device Binding is (currently) only a second factor, the UI should only show existing Device Binding keys and related buttons (e.g. to add a key) if the user is currently logged in. This can be confirmed with a whoami call.

    Create a settings flow for native apps. The response contains the list of existing Device Binding keys.

    To delete an existing key, complete the settings flow with this payload:

    {
      "delete": {
        "client_key_id": "4fcXqFY9kg2unsTCM33GH8ayIWY6WdIGFWXMzhl9Vik="
      },
      "method": "deviceauthn"
    }

    Or using the SDK:

    val clientKeyIdToDelete = "..."

    val apiClient = Configuration.getDefaultApiClient()
    val apiInstance = FrontendApi(apiClient)
    val body = UpdateSettingsFlowBody()
    val method = UpdateSettingsFlowWithDeviceAuthnMethod()
    method.method = "deviceauthn"
    method.delete = UpdateSettingsFlowWithDeviceAuthnMethodDelete()
    method.delete!!.clientKeyId = clientKeyIdToDelete
    body.actualInstance = method
    val updatedFlow = apiInstance.updateSettingsFlow(settingsFlow?.id, body, sessionToken, "")

    Once the key has been deleted server-side, it is fine (although not required) to also delete it on the device using the KeyStore API.

    To add a new key, complete the settings flow with this payload:

    {
      "method": "deviceauthn",
      "add": {
        "device_name": "iPhone (iPhone14,5)",
        "attestation_ios": "...",
        "client_key_id": "sBS5ZHWqsSRbV6OEvCfsg0+DWa3ERns6JyqRypqccrE="
      }
    }

    Or using the SDK:

    val apiClient = Configuration.getDefaultApiClient()
    val withStrongbox = false // Better: Detect the presence of StrongBox at runtime.

    val keyAlias = UUID.randomUUID().toString()
    val nonce = extractNonceFromUiNodes(settingsFlow?.ui?.nodes ?: emptyList())
    if (nonce == null) {
        throw Exception("No nonce found in UI. Is DeviceAuthn enabled server-side?")
    }
    val keyCertChain = Api.create().createKeyPair(keyAlias, nonce, withStrongbox)
    val apiInstance = FrontendApi(apiClient)
    val body = UpdateSettingsFlowBody()
    val method = UpdateSettingsFlowWithDeviceAuthnMethod()
    method.method = "deviceauthn"
    method.add = UpdateSettingsFlowWithDeviceAuthnMethodAdd()
    method.add!!.deviceName = "My work phone"
    method.add!!.clientKeyId = keyAlias
    method.add!!.certificateChainAndroid = keyCertChain.map { it.encoded }.toList()
    body.actualInstance = method
    val updatedFlow = apiInstance.updateSettingsFlow(settingsFlow?.id, body, sessionToken, "")

    Once a key is created, the KeyStore APIs can be used to list all keys, query a key using its id, etc. However we recommend that the application keeps track of what keys were created to know which ones can be used on the device, compared to which keys belong to the same identity but reside on other devices. Note that there is a maximum number of keys that can be created for an identity, and there is no point to create multiple keys for the same user on the same device, even though the server allows it.

    To use a key to step-up the AAL, complete the settings flow with this payload:

    {
      "signature": "...",
      "client_key_id": "sBS5ZHWqsSRbV6OEvCfsg0+DWa3ERns6JyqRypqccrE=",
      "method": "deviceauthn"
    }

    Or using the SDK:

    val clientKeyId = "..."
    val nonce = extractNonceFromUiNodes(flow?.ui?.nodes ?: emptyList())
    if (nonce == null) {
        throw Exception("No nonce found in UI")
    }

    val updateMethod = UpdateLoginFlowWithDeviceAuthnMethod()
    updateMethod.clientKeyId = clientKeyId
    updateMethod.method = "deviceauthn"
    updateMethod.signature = Api.create().launchBiometricSigner(
        context as FragmentActivity,
        clientKeyId,
        nonce,
        "Confirm",
        "Cancel"
    )

    val updateBody = UpdateLoginFlowBody()
    updateBody.actualInstance = updateMethod

    val apiClient = Configuration.getDefaultApiClient()

    withContext(Dispatchers.IO) {
        val apiInstance = FrontendApi(apiClient)
        val res = apiInstance.updateLoginFlow(
            /* flow = */ flow.id,
            /* updateLoginFlowBody = */ updateBody,
            /* xSessionToken = */ sessionToken,
            /* cookie = */ ""
        )
    }

When running Kratos in development mode, some server-side checks are relaxed, which allows for using the Android emulator to create and use keys. The Android emulator create keys in software.

When running Kratos in production mode, only hardware-resident keys are accepted, and thus the Android emulator cannot be used to create or use keys.

There are two Keystore calls required: one to create the key and one to use it to sign:

package com.ory.sdk

import android.os.Build
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Log
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import kotlinx.coroutines.suspendCancellableCoroutine
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.PrivateKey
import java.security.Signature
import java.security.cert.Certificate
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

private const val TAG = "com.ory.sdk"

public interface Api {
    public companion object {
        @JvmStatic
        public fun create(): Api {
            return OryApi()
        }
    }

    public fun createKeyPair(
        keyAlias: String,
        challenge: ByteArray,
        withStrongBox: Boolean
    ): List<Certificate>

    public suspend fun launchBiometricSigner(
        activity: FragmentActivity,
        keyAlias: String,
        challenge: ByteArray,
        title: String,
        negativeButtonText: String,
    ): ByteArray
}

internal class OryApi : Api {
    private val keyStore: KeyStore by lazy {
        KeyStore.getInstance("AndroidKeyStore").apply {
            load(null)
        }
    }

    private fun getCertificateChain(keyAlias: String): List<Certificate> {
        return keyStore.getCertificateChain(keyAlias).toList()
    }


    override fun createKeyPair(
        keyAlias: String,
        challenge: ByteArray,
        withStrongBox: Boolean,
    ): List<Certificate> {
        val kpg: KeyPairGenerator = KeyPairGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_EC,
            "AndroidKeyStore"
        )

        val parameterSpec: KeyGenParameterSpec = KeyGenParameterSpec.Builder(
            keyAlias,
            KeyProperties.PURPOSE_SIGN
        ).run {
            setDigests(KeyProperties.DIGEST_SHA256)
            if (Build.VERSION.SDK_INT >= 24) {
                setAttestationChallenge(challenge)
            }

            if (Build.VERSION.SDK_INT >= 28) {
                setIsStrongBoxBacked(withStrongBox)
            }
            // Require biometric/PIN for every single use.
            setUserAuthenticationRequired(true)
            // TODO: Should we use: setInvalidatedByBiometricEnrollment(true) ?
            build()
        }

        kpg.initialize(parameterSpec)
        kpg.generateKeyPair()
        Log.i(TAG, "created keypair: alias=$keyAlias")

        return getCertificateChain(keyAlias)
    }


    /**
     * Provides an uninitialized Signature object for the App to use in BiometricPrompt.
     */
    private fun getSignatureObject(keyAlias: String): Signature {
        val privateKey = keyStore.getKey(keyAlias, null) as? PrivateKey

        return Signature.getInstance("SHA256withECDSA").apply {
            initSign(privateKey)
        }
    }

    override suspend fun launchBiometricSigner(
        activity: FragmentActivity,
        keyAlias: String,
        challenge: ByteArray,
        title: String,
        negativeButtonText: String,
    ): ByteArray = suspendCancellableCoroutine { continuation ->
        val executor = ContextCompat.getMainExecutor(activity)

        val biometricPrompt = BiometricPrompt(
            activity, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    try {
                        val signature = result.cryptoObject?.signature
                        if (signature != null) {
                            signature.update(challenge)
                            continuation.resume(signature.sign())
                        } else {
                            continuation.resumeWithException(Exception("Signature object is null"))
                        }
                    } catch (e: Exception) {
                        continuation.resumeWithException(e)
                    }
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    // Wrap the error in a custom Exception or handle specific error codes
                    continuation.resumeWithException(Exception(errString.toString()))
                }

                override fun onAuthenticationFailed() {
                    // Note: onAuthenticationFailed is called for finger-read errors
                    // but doesn't dismiss the prompt; we usually wait for Error or Success.
                }
            }
        )

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle(title)
            .setNegativeButtonText(negativeButtonText)
            .build()

        // Cancel the biometric prompt if the coroutine is canceled
        continuation.invokeOnCancellation {
            biometricPrompt.cancelAuthentication()
        }

        biometricPrompt.authenticate(
            promptInfo,
            BiometricPrompt.CryptoObject(getSignatureObject(keyAlias))
        )
    }
}

Making it work in the Android emulator

    Create an emulated device in the Android emulator with an Android version which is at least 24.
    Start the emulated device.
    Inside the emulated device, go to 'Settings > Security & Location > Screen Lock' and set a device PIN (this is required for biometrics).
    Inside the emulated device, go to 'Settings > Security & Location > Fingerprints' and add a fingerprint. A biometric prompt will appear on the screen of the emulated device.
    In the 'Extended Controls' for the emulated device (not inside the device, but in Android Studio), go to the 'Fingerprints' section and click on 'Touch sensor' to pass the biometrics prompt of the device. This simulates placing your finger on the sensor.

At this point the fingerprint is registered for the emulated device. The process must be repeated for each emulated device.

Then, start the application inside the emulated device. When the biometric prompt appears, repeat step 5. to pass the biometric prompt. There are several fingerprints available, so it is possible to test the case of using a registered fingerprint, and the case of using an unknown fingerprint. To test the case of no fingerprint registered, remove the registered fingerprint in the 'Settings' of the emulated device.
How to implement Device Binding in your iOS/iPadOS application

A notable difference with Android is that Apple's app attestation APIs require a network call to Apple's servers from a real device.

This means that the emulator cannot be used.

Since Device Binding only is supported on native devices (not in the browser), all corresponding API calls should be done using the endpoints for native apps, to avoid having to pass cookies around manually.

    Ensure that the DeviceAuthn strategy is enabled in the Kratos configuration. This strategy implements the settings and login flow. This is done so:

    selfservice:
      methods:
        deviceauthn:
          enabled: true

    In XCode, add a permission so that the application is allowed to use FaceID. In Target settings > Info > Custom iOS Target Properties, add:
        Key: Privacy - Face ID Usage Description
        Type: String
        Value: This app uses FaceID to authenticate signing operations.

    Implement a runtime check for the OS version. If is lower than the documented ones, Device Binding may not be used, and a fallback should be found, for example using passkeys.

    Device Binding is (currently) only a second factor, the UI should only show existing Device Binding keys and related buttons (e.g. to add a key) if the user is currently logged in. This can be confirmed with a whoami call.

    Create a settings flow for native apps. The response contains the list of existing Device Binding keys.

    To delete an existing key, complete the settings flow with this payload:

    {
      "delete": {
        "client_key_id": "4fcXqFY9kg2unsTCM33GH8ayIWY6WdIGFWXMzhl9Vik="
      },
      "method": "deviceauthn"
    }

    Or using the SDK:

    let clientKeyId = "..."

    let flow = try await FrontendAPI.createNativeSettingsFlow(
        xSessionToken: sessionToken
    )

    let body: UpdateSettingsFlowBody =
        .typeUpdateSettingsFlowWithDeviceAuthnMethod(
            UpdateSettingsFlowWithDeviceAuthnMethod(
                delete: UpdateSettingsFlowWithDeviceAuthnMethodDelete(
                    clientKeyId: clientKeyId,
                ),
                method: "deviceauthn"
            )
        )
    let finalFlow = try await FrontendAPI.updateSettingsFlow(
        flow: flow.id,
        updateSettingsFlowBody: body,
        xSessionToken: sessionToken
    )

    Once the key has been deleted server-side, it is fine (although not required) to also delete it on the device using the KeyStore API.

    To add a new key, complete the settings flow with this payload:

    {
      "method": "deviceauthn",
      "add": {
        "device_name": "iPhone (iPhone14,5)",
        "attestation_ios": "...",
        "client_key_id": "sBS5ZHWqsSRbV6OEvCfsg0+DWa3ERns6JyqRypqccrE="
      }
    }

    Or using the SDK:

    let clientKeyId = "..."

    let flow = try await FrontendAPI.createNativeSettingsFlow(
        xSessionToken: sessionToken
    )

    let nonce = extractNonceFromUiNodes(nodes: flow.ui.nodes) ?? ""
    let deviceName = "My work phone"
    let (clientKeyId, attestation) = try await OryApi().createKey(
        challengeB64: nonce
    )

    let body: UpdateSettingsFlowBody =
        .typeUpdateSettingsFlowWithDeviceAuthnMethod(
            UpdateSettingsFlowWithDeviceAuthnMethod(
                add: UpdateSettingsFlowWithDeviceAuthnMethodAdd(
                    attestationIos: attestation,
                    clientKeyId: clientKeyId,
                    deviceName: deviceName,
                ),
                method: "deviceauthn"
            )
        )
    let finalFlow = try await FrontendAPI.updateSettingsFlow(
        flow: flow.id,
        updateSettingsFlowBody: body,
        xSessionToken: sessionToken
    )

    Once a key is created, the application must store the key id somewhere, because there are no APIs to list keys or check if a key exists. Note that there is a maximum number of keys that can be created for an identity, and there is no point to create multiple keys for the same user on the same device, even though the server allows it.

    To use a key to step-up the AAL, complete the settings flow with this payload:

    {
      "signature": "...",
      "client_key_id": "sBS5ZHWqsSRbV6OEvCfsg0+DWa3ERns6JyqRypqccrE=",
      "method": "deviceauthn"
    }

    Or using the SDK:

    let clientKeyId = "..."

    let flow = try await FrontendAPI.createNativeLoginFlow(
        refresh: false,
        aal: AuthenticatorAssuranceLevel.aal2.rawValue,
        xSessionToken: sessionToken
    )
    let nonce = extractNonceFromUiNodes(nodes: flow.ui.nodes) ?? ""

    let signature = try await OryApi().signWithKey(
        keyId: clientKeyId,
        challengeB64: nonce,
    )

    let body =
        UpdateLoginFlowBody
        .typeUpdateLoginFlowWithDeviceAuthnMethod(
            UpdateLoginFlowWithDeviceAuthnMethod(
                clientKeyId: clientKeyId,
                method: "deviceauthn",
                signature: signature,
            )
        )

    let finalFlow = try await FrontendAPI.updateLoginFlow(
        flow: flow.id,
        updateLoginFlowBody: body,
        xSessionToken: sessionToken
    )

There are two required App Attest calls to create a key and use it to sign:

import CryptoKit
import DeviceCheck
import Foundation
import LocalAuthentication
import OSLog
import Security

public enum OryApiError: Error, LocalizedError {
    case secureEnclaveError(String, OSStatus?)
    case appAttestationNotSupported
    case appAttestationError(String)
    case biometricAuthenticationFailed(String?)
    case biometricAuthenticationCancelled

    public var errorDescription: String? {
        switch self {
        case .secureEnclaveError(let message, let status):
            let statusString = status != nil ? " (Status: \(status!))" : ""
            return "Secure Enclave Error: \(message)\(statusString)"
        case .appAttestationNotSupported:
            return "App Attestation is not supported on this device."
        case .appAttestationError(let message):
            return "App Attestation Error: \(message)"
        case .biometricAuthenticationFailed(let message):
            return
                "Biometric authentication failed: \(message ?? "Unknown error")"
        case .biometricAuthenticationCancelled:
            return "Biometric authentication canceled by user."
        }
    }
}

public class OryApi {
    public func createKey(challengeB64: String)
        async throws -> (clientKeyId: String, attestation: Data)
    {
        if #available(iOS 14.0, *) {
            let service = DCAppAttestService.shared
            guard service.isSupported else {
                throw OryApiError.appAttestationNotSupported
            }

            let keyId: String
            do {
                keyId = try await service.generateKey()
            } catch {
                let errorMessage =
                    "Failed to generate key: \(error.localizedDescription)"
                throw OryApiError.appAttestationError(errorMessage)
            }

            let challenge = Data(base64Encoded: challengeB64)!
            let attestation = try await service.attestKey(
                keyId,
                clientDataHash: challenge
            )

            return (keyId, attestation)
        } else {
            // Fallback for older iOS versions
            throw OryApiError.secureEnclaveError(
                "iOS 14.0 or newer is required for App Attestation.",
                nil
            )
        }
    }

    public func signWithKey(keyId: String, challengeB64: String)
        async throws -> Data
    {
        if #available(iOS 14.0, watchOS 14.0, *) {
            let context = LAContext()
            let reason = "Authenticate to sign in"
            do {
                try await context.evaluatePolicy(
                    .deviceOwnerAuthenticationWithBiometrics,
                    localizedReason: reason
                )
            } catch let error as LAError {
                switch error.code {
                case .userCancel, .appCancel, .systemCancel, .userFallback:
                    throw OryApiError.biometricAuthenticationCancelled
                default:
                    throw OryApiError.biometricAuthenticationFailed(
                        error.localizedDescription
                    )
                }
            } catch {
                throw OryApiError.biometricAuthenticationFailed(
                    error.localizedDescription
                )
            }

            let challenge = Data(base64Encoded: challengeB64)!
            let assertion = try await DCAppAttestService.shared
                .generateAssertion(keyId, clientDataHash: challenge)

            return assertion
        } else {
            throw OryApiError.secureEnclaveError(
                "iOS 14.0 or newer is required for App Attestation.",
                nil
            )
        }
    }
}

How to implement Device Binding in your Dart/Flutter application

Dart can call native APIs via message passing. Let's call a function called generateKey with the parameter {'alias': 'my_key_01'}:

Future<void> _generateKey() async {
setState(() => _isLoading = true);

try {
  // Calling the native method
  final String result = await platform.invokeMethod('generateKey', {
    'alias': 'my_key_01',
  });

  setState(() {
    _keyStoreResult = result;
    _isLoading = false;
  });
} on PlatformException catch (e) {
  setState(() {
    _keyStoreResult = "Failed to generate key: '${e.message}'.";
    _isLoading = false;
  });
}
}

Since the call might block, it is marked async and a loading indicator is shown in the UI via the _isLoading field.

Now to the platform code, for example for Android:

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.secure/keystore"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "generateKey") {
                val alias = call.argument<String>("alias") ?: "default_alias"
                try {
                    val keyStoreResult = [..] // Call the KeyStore here.

                    // Send the result back to Flutter.
                    result.success(keyStoreResult)
                } catch (e: Exception) {
                    // If generation fails (e.g., hardware issues), send an error
                    result.error("KEY_GEN_FAIL", e.localizedMessage, null)
                }
            } else {
                result.notImplemented()
            }
        }
    }
}

And for iOS:

import UIKit
import Flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    // 1. Standard plugin registration for things like path_provider, etc.
    GeneratedPluginRegistrant.register(with: self)

    // 2. Create a registrar for our custom "inline" plugin
    // The name "SecureKeystorePlugin" can be anything unique.
    let registrar = self.registrar(forPlugin: "SecureKeystorePlugin")

    // 3. Setup the channel using the registrar's messenger
    let channel = FlutterMethodChannel(
        name: "com.example.secure/keystore",
        binaryMessenger: registrar!.messenger()
    )

    // 4. Handle the method calls
    channel.setMethodCallHandler({
      (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in

      if call.method == "generateResidentKey" {
        let alias = (call.arguments as? [String: Any])?["alias"] as? String ?? "unknown"

        // Just for the example, get the iOS version.
        result("iOS \(version)")
      } else {
        result(FlutterMethodNotImplemented)
      }
    })

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}

And the Flutter code gets this result back: iOS 26.2.1 (for example).
Reference
Enrollment

    The DeviceAuthn strategy is enabled in the Kratos configuration. This strategy implements the settings and login flow. This is done so:

    selfservice:
      methods:
        deviceauthn:
          enabled: true

    The client creates a new settings flow and the existing keys for the identity are in the response. The settings flow has a field nonce which contains a random nonce. This is the server challenge. This value is opaque and should not be assigned meaning. It may be a random string, or a hash of something. The important part is that it is not guessable by an attacker.
    The client generates a private-public Elliptic Curve (EC) key pair in the TEE/TPM of the device using the server challenge, using native mobile APIs.
    The client completes the settings flow to enroll a new key by sending these fields:
        device name (human readable, picked by the user, for example My work phone)
        client key id
        certificate chain, which contains the signature of the server challenge, and the public key (in the leaf certificate)
    The server:
        Checks that the certificate chain is valid, using Google and Apple root CAs
        Checks the certificate revocation lists to ensure no root/intermediate CA in the chain has been revoked
        Checks that the challenge sent is the same as the challenge in the database (stored in the settings flow)
        Checks that the key is indeed in the TEE/TPM based on the device attestation information. A key in software is rejected. A key in the TPM (e.g. Strongbox) may warrant a higher AAL e.g. AAL3 in the future.
        Checks that the device is not emulated, modified in some way, etc based on the device attestation information
        Records the public key in the database
        Erases the challenge value in the database to prevent re-use
        Replies with 200

At this point the key is enrolled for the identity.
Kratos serverDevice hardware (TEE/TPM)Client (mobile app)Kratos serverDevice hardware (TEE/TPM)Client (mobile app)Verify cert chain vs Apple/Google root CAsCheck CRLsMatch challenge to stored nonceReject software/emulated keysStore pubkey, erase challengePOST /self-service/settings/api (xSessionToken)200 settings flow {nonce, existing_keys}generateKey(nonce){client_key_id, cert_chain}PUT /self-service/settings?flow=... {method: deviceauthn, add: {device_name, client_key_id, cert_chain or attestation_ios}}200 updated settings flow
Proof of device enrollment

    When the user creates the login flow with the DeviceAuthn strategy, the client receives a server challenge.
    Using the private key in the hardware of the device, the client signs the server challenge using ECDSA. The signature is only emitted after a biometric/PIN prompt has been passed. The client then sends the signature to the server using the login flow update endpoint.
    The server:
        Checks that the signature is valid using the recorded public key in the database
        Checks that no CA in the certificate chain (when the device has been enrolled) has been revoked
        Erases the challenge value in the database to prevent re-use.
        Replies with 200 with a fresh session token and a higher AAL e.g. AAL2 or AAL3

Kratos serverDevice hardware (TEE/TPM)Client (mobile app)Kratos serverDevice hardware (TEE/TPM)Client (mobile app)biometric/PIN promptprivate key never leaves hardwareVerify signature with stored pubkeyCheck no CA in chain is revokedErase challengePOST /self-service/login/api {aal: aal2, refresh: false}200 login flow {nonce}sign(nonce, client_key_id)ECDSA signaturePUT /self-service/login?flow=... {method: deviceauthn,client_key_id, signature}200 {session_token, aal: aal2}
Key Revocation

    The user can revoke a key themselves (e.g. because the device is stolen, lost, broken, etc) using the settings flow. This action can be done from any device (e.g. from the browser), as it is the case for other methods e.g. WebAuthn.
    An admin using the admin API can revoke all keys on a device on behalf of the user. This is useful when the user only owns one device which is the one that should be revoked (e.g. one mobile phone) and which has been lost/stolen

Revocation is done by removing the key from the database.
Device list

The settings flow contains all keys for the identity. This is used to present the list of keys (including device name) in the UI.
Key lifecycle on the device

    Creation: When the device enrollment process is started for the user
    Deletion:
        When the app is uninstalled or when the phone is reset, the mobile OSes automatically remove all keys for the app. This means that if the device was enrolled, the public key subsists server-side but the private key does not exist anymore, so no one can sign any challenge for this public key. This database entry is thus useless, but poses no security risks.

Cryptography

The security of this design relies on a chain of trust anchored in hardware and standard cryptographic primitives.

    Asymmetric Cryptography: ECDSA with P-256 is used for the device key pair. This is a modern, efficient, and widely supported standard for digital signatures. It is less computationally expensive than RSA.
    Hardware-Backed Keys: Private keys are generated and stored as non-exportable within the device's Secure Enclave (iOS) or Trusted Execution Environment (TEE)/StrongBox (Android). They cannot be accessed by the OS or any application, providing strong protection against extraction. As much as the APIs allow it, the keys are marked as requiring user authentication (the phone is unlocked) and a biometrics/PIN prompt.
    Hashing: SHA-256 is used for generating nonces and hashing challenges, providing standard collision resistance.
    Certificate Chains: X.509 certificates are used to establish the chain of trust. The device's attestation is signed by a key that is, in turn, certified by a platform authority (Apple or Google), ensuring the attestation's authenticity.
    No configurability: Intentionally, for simplicity, performance, auditability, and to avoid downgrade attacks, all cryptographic primitives are fixed.

Attack Surface and Mitigations

    Man-in-the-Middle (MitM) Attack
        Threat: An attacker intercepts and tries to modify the communication between the client and server.
        Mitigation: All communication occurs over TLS, encrypting the channel. More importantly, the core payloads (attestation and login signatures) are themselves digitally signed using the hardware-bound key. Any tampering would invalidate the signature, causing the server to reject the request.
    Replay Attacks
        Threat: An attacker captures a valid attestation or login payload and "replays" it to the server at a later time to gain access.
        Mitigation: The server generates a unique, single-use cryptographic challenge for every new enrollment or login attempt. This challenge is embedded in the certificate chain. The server verifies that the challenge in the payload is the exact one it issued for that specific session and reject any duplicates or expired challenges.
    Emulation & Software-Based Attacks
        Threat: An attacker attempts to enroll a software-based "device" (e.g., an emulator, a script) by faking an attestation.
        Mitigation: This is the central problem that hardware attestation solves. The server verifies the entire certificate chain of the attestation object up to a trusted root CA (Apple or Google). Only genuine hardware can obtain a valid certificate chain. The server also inspects attestation flags (e.g., Android's attestationSecurityLevel) to explicitly reject any keys that are not certified as hardware-backed.
    Physical Attacks & Key Extraction
        Threat: An attacker with physical possession of the device attempts to extract the private signing key from memory.
        Mitigation: Keys are generated as non-exportable inside the hardware security module (Secure Enclave/TEE). This is a physical countermeasure that makes it computationally infeasible to extract key material, even with advanced hardware probing techniques.
    Compromised OS (Rooting/Jailbreaking)
        Threat: An attacker gains root access to the device's operating system.
        Mitigation: The attestation object contains signals about the integrity of the operating system. Android's attestation includes VerifiedBootState, which indicates if the bootloader is locked and the OS is unmodified. The server can enforce a policy to only accept attestations from devices in a secure state.
    Cross-App/Cross-Site Attacks
        Threat: An attacker tricks a user into generating an attestation for a malicious app that is then used to attack the service.
        Mitigation: The attestation object includes an identifier for the application that requested it. On iOS, the authData contains the rpIdHash (a hash of the App ID). The server can verify that this hash matches its own app's identifier to ensure the attestation originated from the legitimate, code-signed application.
    Malicious App Key Theft/Usage
        Threat: A different, malicious app installed on the same device attempts to access and use the private key generated by the legitimate app to impersonate the user.
        Mitigation: This is prevented by the fundamental application sandbox security model of both iOS and Android. Keys generated in the hardware-backed key store are cryptographically bound to the application identifier that created them. The operating system and the secure hardware enforce this separation, making it impossible for "App B" to access, request, or use a key generated by "App A".
    Malware and Keyloggers on a Compromised Device
        Threat: Malware, such as a keylogger, screen scraper, or accessibility service exploit, is active on the user's device and attempts to intercept credentials.
        Mitigation: This design is highly resistant to such attacks. The entire flow is passwordless, meaning there is no "typeable" secret for a keylogger to capture. The core secret (the private key) never leaves the secure hardware. The user authorizes its use via a biometric prompt, which is managed by a privileged part of the OS, isolated from the application space where malware would reside. A keylogger can neither intercept the biometric data nor the signing operation itself.
    Device Backup, Restore, and Cloning
        Threat: An attacker steals a user's cloud backup (e.g., iCloud or Google One) and restores it to a new device they control, hoping to clone the trusted device and its keys.
        Mitigation: This is mitigated by the non-exportable property of hardware-backed keys. While application data and metadata may be backed up and restored, the actual private key material never leaves the Secure Enclave or TEE. When the app is restored on a new device, the reference to the old key will be invalid, effectively breaking the binding and forcing the user to perform a new enrollment. Furthermore, resetting the device automatically erases all keys in the TEE/TPM.
    Biometric System Bypass
        Threat: An attacker with physical possession of the device attempts to bypass biometric authentication (e.g., using a lifted fingerprint, high-resolution photo, or 3D mask).
        Mitigation: The design relies on the platform-level biometric security. Since the hardware key is only unlocked for signing after the hardware confirms a match, the attacker must defeat the hardware manufacturer's physical anti-spoofing technologies.
    Server-Side Compromise (Database Leak)
        Threat: An attacker breaches the server and steals the database containing public keys and device IDs for all enrolled devices.
        Mitigation: Because this is an asymmetric system, the public keys are useless for authentication without the corresponding private keys. Even with a full database leak, the attacker cannot impersonate users because they cannot sign the login challenges.
    Server-Side Compromise (CA Trust Anchor)
        Threat: An attacker gains enough server access to modify the list of trusted Root CAs, allowing them to accept attestations from a rogue CA they control.
        Mitigation: The Root CA certificates for Apple and Google are hard-coded within the server-side application logic rather than relying on the general OS trust store. This prevents an attacker from using a compromised system-wide trust store to validate fraudulent device attestations. However, if the attacker can modify the server executable, all bets are off, because they can modify the in-memory root CAs or bypass the validation logic entirely.
    UI Redressing / Overlay Attack (Android)
        Threat: A malicious app with the "Draw over other apps" permission creates a transparent overlay on top of your app. When the user thinks they are clicking "Enroll Device" or approving a "Transaction Signing" prompt, they are actually clicking through a malicious flow hidden beneath.
        Mitigation:
            iOS: Inherently protected by the OS (overlays are not permitted over other apps).
            Android: We use the setFilterTouchesWhenObscured(true) flag on sensitive UI components. This tells the Android OS to discard touch events if the window is obscured by another visible window. See tapjacking.
    Dependency / Supply Chain Attack
        Threat: An attacker compromises the Mobile SDK or a dependency. They inject code that leaks the challenge, or subtly alters device attestation.
        Mitigation:
            Minimized dependencies
            Automated dependency scanning
            Certificate pinning: The Ory server CA can be pinned in the mobile application/SDK to ensure the device is talking to the legitimate server.
            TLS & URL whitelisting: Both Android and iOS allow for URL whitelisting to avoid attacker controlled servers from being contacted.
            Signed Device Information: The TEE/TPM on the device signs the device information. Using Apple/Google root CAs, the server checks that this information, e.g. the application id, has not been altered.
    Attestation Misbinding Attack
        Threat: The attack manages to leak the challenge meant for another user (e.g. due to a supply chain attack in the mobile app code), they sign the challenge with the attacker device, and they submit that to the server before the legitimate user can, in order to register the attacker device for the other user account.
        Mitigation:
            Challenge bound to the identity id: The challenge is bound to the identity in the database (stored in the same row). Since the identity is detected from the session token, an attacker cannot tamper with the identity id (unless they steal the session token, at which point they are the user, from the server perspective).

Comparison with WebAuthn and Passkeys

It is useful to compare this custom implementation with the FIDO WebAuthn standard and the user-facing concept of Passkeys. While they share core cryptographic principles, their goals and scope are fundamentally different.
Similarities

    Core Cryptography: Both approaches are built on public-key cryptography (typically ECDSA), and use a challenge-response protocol

Key Differences

    Standard vs. proprietary:
        WebAuthn/passkeys: An open, interoperable standard from the W3C and FIDO Alliance, designed to work across different websites, apps, browsers, and operating systems.
        This Design: A proprietary implementation tailored specifically for Ory's native application and server. It is not intended to be interoperable with any other system. However the design is based on building blocks that are fully open and standardized: PKI, TPM 2.0, ASN1, iOS & Android device attestation, etc.
    Goal: Device Binding vs. synced credentials:
        WebAuthn/passkeys: The primary goal is to create a convenient and portable user credential (a Passkey). Passkeys are often syncable via a cloud service (like iCloud Keychain or Google Password Manager), allowing a user who enrolls on their phone to seamlessly sign in on their laptop without re-enrolling.
        This design: The primary goal is strict device binding. We are proving that a specific, individual piece of hardware is authorized. The key is explicitly non-exportable and bound to a single installation of an app on a single device. It physically cannot be synced or used elsewhere.
    Role of attestation:
        WebAuthn/passkeys: Attestation is an optional feature. While a server can request it to verify the properties of an authenticator, many services skip it in favor of a simpler user experience. The focus is on proving possession of the key, not on scrutinizing the device itself.
        This design: Attestation is mandatory and central to the entire security model. The main purpose of the enrollment ceremony is for the server to validate the device's hardware and software integrity.

Further reading

    Android
    iOS/iPadOS: 1 and 2



CSRF troubleshooting

For general CRSF troubleshooting visit the CSRF troubleshooting.

This document contains troubleshooting advice regarding CRSF and cookie errors specific to self-hosted Ory Identities Kratos.
Common issues
SameSite attribute

If you run Ory Kratos in --dev mode, it disables SameSite=Lax as Google Chrome rejects all cookies that have SameSite=Lax but have secure set to false. If you require SameSite=Lax, you need to run Ory Kratos with HTTPS and not use the --dev flag.
Running over HTTP without --dev mode

Ory Kratos' cookies have the Secure flag enabled by default. This means that the browser won't send the cookie unless the URL is a HTTPS URL. If you want Ory Kratos to work with HTTP (for example on localhost) you can add the --dev flag: kratos serve --dev.

Don't do this in production!
Running on separate (sub)domains

Cookies work best on the same domain. While it's possible to get cookies running on subdomains it isn't possible to do that across Top Level Domains (TLDs).

Make sure that your application (for example the Quickstart self service app ) and Ory Kratos Public API are available on the same domain - preferably without subdomains. Hosting both systems and routing paths with a Reverse Proxy such as Nginx or Envoy or AWS API Gateway is the best solution. For example, routing https://my-website/kratos/... to Ory Kratos and https://my-website/dashboard to the SecureApp's Dashboard. Alternatively you can use piping in your app as we do in the Quickstart guide.

We don't recommend running them on separate subdomains, such as https://kratos.my-website/ and https://secureapp.my-website/.

To allow cookies to work across subdomains, make sure to set the domain name in the Kratos config file under session.cookie.domain.

Running the apps on different domains won't work at all, such as https://kratos-my-website/ and https://secureapp-my-website/.

Running the services on different ports is ok, if the domain stays the same.
Mixing up 127.0.0.1 and localhost

Make sure that the domain stays the same. This is also true for 127.0.0.1 and localhost which are both separate domains. Make sure that you use 127.0.0.1 or localhost consistently across your configuration!


Debugging Ory Kratos in Docker with Delve

Very often, there is a need to debug Kratos being deployed as a Docker image. To support this, Kratos ships with a couple of files:

    The Dockerfile-debug file, which you can find in the .docker directory.
    The docker-compose.template.dbg file, which you can find in the same directory. This file defines a template for a service, one would like to debug in Docker
    and a supplementary debug-entrypoint.sh skript, located in the script directory.

Actually, these files don't include any Kratos specifica and thus can be used for any Golang based project. As you already could infer, this support is meant to be used in a docker-compose setup as described below. You can however run it as a standalone Docker container as well. You can find some information on how to achieve this at the end of this document.
As part of a docker-compose setup

Imagine you have the following project structure:

    docker-compose - a directory containing your docker-compose.yaml file
    kratos - a directory containing the Kratos code
    kratos-frontend - a directory containing a frontend application for Kratos

The docker-compose.yml mentioned above could look as follows:

version: "3.7"

volumes:
  postgres-db:

services:
  postgresd:
    image: postgres:9.6
    ports:
      - "5432:5432"
    volumes:
      - type: volume
        source: postgres-db
        target: /var/lib/postgresql/data
        read_only: false
    environment:
      - PGDATA=/var/lib/postgresql/data/pgdata
      - POSTGRES_PASSWORD=secret
      - POSTGRES_USER=kratos

  kratos-migrate:
    image: kratos
    build:
      context: ../kratos
      dockerfile: ./.docker/Dockerfile-build
    environment:
      - DSN=postgres://kratos:secret@postgresd:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4
    volumes:
      - type: bind
        source: path-to-kratos-config
        target: /etc/config/kratos
    command: migrate sql -e --yes
    depends_on:
      - postgresd

  kratos:
    image: kratos
    build:
      context: ../kratos
      dockerfile: ./.docker/Dockerfile-build
    depends_on:
      - kratos-migrate
    ports:
      - "4433:4433" # public
      - "4434:4434" # admin
    command: serve -c /etc/config/kratos/kratos.yml --watch-courier --dev
    volumes:
      - type: bind
        source: path-to-kratos-config
        target: /etc/config/kratos

  kratos-frontend:
    image: kratos-frontend
    build:
      context: ../kratos-kratos-frontend
      dockerfile: ./Dockerfile
    env_file:
      - file-containing-all-required-configuration.env

To enable debugging of Kratos without changing the above docker-compose file, you can do the following (from the docker-compose directory):

SERVICE_NAME=kratos SERVICE_ROOT=../kratos REMOTE_DEBUGGING_PORT=9999 envsubst < ../kratos/.docker/docker-compose.template.dbg \
  > docker-compose.kratos.tmp
docker-compose -f docker-compose.yaml -f docker-compose.kratos.tmp up --build -d kratos

The first line will create an overwrite docker-compose file to have a debug configuration for the kratos service. The second line will start a debug container by

    mounting your kratos directory into the resulting Docker container,
    downloading Delve,
    building Kratos inside the container,
    starting it in Delve with the arguments, you've defined in your regular docker-compose file - in the example above, this would be serve -c /etc/config/kratos/kratos.yml --watch-courier --dev - and
    watching for changes on any go file within the mounted code base.

Each time you change a .go file, the Delve process will be stopped, Kratos will be recompiled and Delve will be started again. With other words, you'll have to re-connect with your debugger again after each change.

As you can see from the above usage, the docker-compose.template.dbg template expects the following variables to be defined:

    SERVICE_ROOT - the root directory of the service to be started in the debug mode.
    SERVICE_NAME - the name of the service from the docker-compose file.
    REMOTE_DEBUGGING_PORT - the host port, the Delve listening port should be exposed as. This is the port you should connect your remote debugger to.

If you run docker-compose this way, the container run with debugging enabled will wait until the debugger connects. If your IDE supports remote debugging, set host to localhost and port to the value, you've used for REMOTE_DEBUGGING_PORT in your remote debugging configuration.
As a standalone Docker container

If you just would like to start Kratos in a container in debug mode, you can just use the Dockerfile-debug file instead of the regular Dockerfile. Make however sure your build context in the root directory of Kratos and not the .docker directory. In your IDE the debug configuration has to reference that file. In addition, you'll have to expose the Delve service port 40000 under the port 8000, as well as the actual port of the service, you'll like to access from your host, configure the bind mounts and set the run options to --security-opt="apparmor=unconfined" --cap-add=SYS_PTRACE.

Performance problems and out of memory panics caused by password hashing
info

This document only applies if you use Argon2 hashing.

To securely check if passwords match, Ory Kratos stores the Argon2 hash of every password. This algorithm has to be tuned to match the desired security level as well as responsiveness. Because it isn't easy to determine the exact values without trying them out, Ory Kratos comes with a CLI that automatically calibrates the values, following best practices. You can read more about these best practices in our blog post.
Common errors

There are some errors that indicate your Argon2 parameters need adjustment:

    Very slow login and registration requests, might cause network timeouts;
    Ory Kratos fails with fatal error: runtime: out of memory;
    The host environment on Minikube, Docker, or Kubernetes crashes or becomes unresponsive;

In any of these cases, try reducing the resources used by Argon2 or increasing the resources available to Kratos. Use the Argon2 calibrate CLI to detect the best practice values for your server. Note that the calibration has to be done under the exact same conditions that the server runs at.


General troubleshooting
info

Please add your troubleshooting tricks and other tips to this document, You can either open a discussion or edit the page directly.
permission denied / EPERM reading a config, schema, template, or certificate

If kratos serve logs permission denied opening a path that is owned by the right user and has the right Unix permissions, the Landlock filesystem sandbox on Ory Network and OEL binaries is most likely denying the access. Check the startup logs for the Landlock filesystem sandbox is active line and the preceding roPaths / rwDirs lists, then either add the missing path to security.landlock.allowed_paths or temporarily set security.landlock.disabled: true to confirm. The sandbox page has the full troubleshooting walkthrough, including how to read kernel audit records and use strace.
400: Bad Request on self-service flows

Make sure you are starting and finishing the request in one browser. Self-service browser flows need to be executed in the same browser from start to finish! Starting the flow in Safari and completing it in Chrome won't work. API Clients like Electron, Postman or Insomnia are browsers themselves, which can cause requests to fail. For testing purposes cURL is a good choice.
How can I separate customers/employee data, but have them use the same login dialog

    We want to separate our customers and employees, so we store them in different databases. But we would like to have them use the same login dialog for our portal.

You can deploy Ory Kratos two times, and use the same login UI pointing to two different Kratos login endpoints - /login/customer or /login/employee, either by having two different login routes, or by adding some logic to your login UI that reroutes customers to /login/customer and employees to /login/employee. So you define the same login or registration UI URLs in both of the Kratos configurations. You may need to tell your login/registration UI which Kratos it's supposed to talk to. The instances are cheap to deploy and the databases are isolated from each other. For example something like /login/customer and /login/employee.
Automatic user migration from legacy system

    For example configure a callback to the legacy system when you can't find the corresponding user, and store the identity on successful legacy system response.

An alternative to callback and custom code is fronting the legacy system with Ory OAuth2 & OpenID Connect (Ory Hydra) and then using that as an upstream in Ory Identities (Ory Kratos).
Safari ITP limits cookies to 7 days

Safari's Intelligent Tracking Prevention (ITP) limits cookies to 7 days. If you set a cookie with a longer lifespan, Safari ignores the configured duration and expires the cookie after 7 days. This behavior can affect Ory Identities, because the cookies used for authentication and session management may expire sooner than expected.

This happens when an AJAX request is made from a URL that does not match the custom domain you configured for Ory.

For example, if your login UI runs on ui.example.com, Ory is available at ory.example.com via a CNAME, and you use AJAX to submit the login form, Safari ITP will limit the cookie lifespan to 7 days.

To resolve this issue, you can either:

    Use Cloudflare for the domain that makes the AJAX request to Ory. This makes Ory and your domain appear as the same party to Safari.
    Change the form submission from AJAX to a normal form submission. Safari does not apply ITP restrictions to top-level navigations.

Read more about CNAME cloaking: https://www.cookiestatus.com/safari/#cname-cloaking


    Ory Open SourceOry KratosReferenceHTTP API

    identity
    frontend
    courier
    metadata
        getCheck HTTP Server Status
        getCheck HTTP Server and Database Status
        getReturn Running Software Version.

redocly logoAPI docs by Redocly
Ory Identities API

Download OpenAPI specification:Download
E-mail: office@ory.sh License: Apache 2.0

This is the API specification for Ory Identities with features such as registration, login, recovery, account verification, profile settings, password reset, identity management, session management, email and sms delivery, and more.
identity

APIs for managing identities.
List Identities

Lists all identities in the system. Note: filters cannot be combined.
Authorizations:
oryAccessToken
query Parameters
per_page	
integer <int64> [ 1 .. 1000 ]
Default: 250

Deprecated Items per Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This is the number of items per page.
page	
integer <int64>

Deprecated Pagination Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This value is currently an integer, but it is not sequential. The value is not the page number, but a reference. The next page can be any number and some numbers might return an empty list.

For example, page 2 might not follow after page 1. And even if page 3 and 5 exist, but page 4 might not exist. The first page can be retrieved by omitting this parameter. Following page pointers will be returned in the Link header.
page_size	
integer <int64> [ 1 .. 500 ]
Default: 250

Page Size

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
consistency	
string
Enum: "" "strong" "eventual"

Read Consistency Level (preview)

The read consistency level determines the consistency guarantee for reads:

strong (slow): The read is guaranteed to return the most recent data committed at the start of the read. eventual (very fast): The result will return data that is about 4.8 seconds old.

The default consistency guarantee can be changed in the Ory Network Console or using the Ory CLI with ory patch project --replace '/previews/default_read_consistency_level="strong"'.

Setting the default consistency level to eventual may cause regressions in the future as we add consistency controls to more APIs. Currently, the following APIs will be affected by this setting:

GET /admin/identities

This feature is in preview and only available in Ory Network. ConsistencyLevelUnset ConsistencyLevelUnset is the unset / default consistency level. strong ConsistencyLevelStrong ConsistencyLevelStrong is the strong consistency level. eventual ConsistencyLevelEventual ConsistencyLevelEventual is the eventual consistency level using follower read timestamps.
ids	
Array of strings

Retrieve multiple identities by their IDs.

This parameter has the following limitations:

Duplicate or non-existent IDs are ignored. The order of returned IDs may be different from the request. This filter does not support pagination. You must implement your own pagination as the maximum number of items returned by this endpoint may not exceed a certain threshold (currently 500).
credentials_identifier	
string

CredentialsIdentifier is the identifier (username, email) of the credentials to look up using exact match. Only one of CredentialsIdentifier and CredentialsIdentifierSimilar can be used.
preview_credentials_identifier_similar	
string

This is an EXPERIMENTAL parameter that WILL CHANGE. Do NOT rely on consistent, deterministic behavior. THIS PARAMETER WILL BE REMOVED IN AN UPCOMING RELEASE WITHOUT ANY MIGRATION PATH.

CredentialsIdentifierSimilar is the (partial) identifier (username, email) of the credentials to look up using similarity search. Only one of CredentialsIdentifier and CredentialsIdentifierSimilar can be used.
include_credential	
Array of strings

Include Credentials in Response

Include any credential, for example password or oidc, in the response. When set to oidc, This will return the initial OAuth 2.0 Access Token, OAuth 2.0 Refresh Token and the OpenID Connect ID Token if available.
organization_id	
string

List identities that belong to a specific organization.
Responses
Response samples

    200default

Content type
application/json
[

    {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    }

]
Create multiple identities

Creates multiple identities.

You can also use this endpoint to import credentials, including passwords, social sign-in settings, and multi-factor authentication methods.

If the patch includes hashed passwords you can import up to 1,000 identities per request.

If the patch includes at least one plaintext password you can import up to 200 identities per request.

Avoid importing large batches with plaintext passwords. They can cause timeouts as the passwords need to be hashed before they are stored.

If at least one identity is imported successfully, the response status is 200 OK. If all imports fail, the response is one of the following 4xx errors: 400 Bad Request: The request payload is invalid or improperly formatted. 409 Conflict: Duplicate identities or conflicting data were detected.

If you get a 504 Gateway Timeout: Reduce the batch size Avoid duplicate identities Pre-hash passwords with BCrypt

If the issue persists, contact support.
Authorizations:
oryAccessToken
Request Body schema: application/json
	
Array of objects (identityPatch)

Identities holds the list of patches to apply

required
Array
	
object (createIdentityBody)

Create Identity Body
patch_id	
string <uuid>

The ID of this patch.

The patch ID is optional. If specified, the ID will be returned in the response, so consumers of this API can correlate the response with the patch.
Responses
Request samples

    Payload

Content type
application/json
{

    "identities": [
        {}
    ]

}
Response samples

    200400409default

Content type
application/json
{

    "identities": [
        {}
    ]

}
Create an Identity

Create an identity. This endpoint can also be used to import credentials for instance passwords, social sign in configurations or multifactor methods.
Authorizations:
oryAccessToken
Request Body schema: application/json
	
object (identityWithCredentials)

Create Identity and Import Credentials
external_id	
string

ExternalID is an optional external ID of the identity. This is used to link the identity to an external system. If set, the external ID must be unique across all identities.
metadata_admin	
any

Store metadata about the user which is only accessible through admin APIs such as GET /admin/identities/<id>.
metadata_public	
any

Store metadata about the identity which the identity itself can see when calling for example the session endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.
organization_id	
string or null <uuid4> (NullUUID)
	
Array of objects (recoveryIdentityAddress)

RecoveryAddresses contains all the addresses that can be used to recover an identity.

Use this structure to import recovery addresses for an identity. Please keep in mind that the address needs to be represented in the Identity Schema or this field will be overwritten on the next identity update.
schema_id
required
	
string

SchemaID is the ID of the JSON Schema to be used for validating the identity's traits.
state	
string
Enum: "active" "inactive"

State is the identity's state. active StateActive inactive StateInactive
traits
required
	
object

Traits represent an identity's traits. The identity is able to create, modify, and delete traits in a self-service manner. The input will always be validated against the JSON Schema defined in schema_url.
	
Array of objects (verifiableIdentityAddress)

VerifiableAddresses contains all the addresses that can be verified by the user.

Use this structure to import verified addresses for an identity. Please keep in mind that the address needs to be represented in the Identity Schema or this field will be overwritten on the next identity update.
Responses
Request samples

    Payload

Content type
application/json
{

    "credentials": {
        "oidc": {},
        "password": {},
        "saml": {}
    },
    "external_id": "string",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "state": "active",
    "traits": { },
    "verifiable_addresses": [
        {}
    ]

}
Response samples

    201400409default

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "credentials": {
        "property1": {},
        "property2": {}
    },
    "external_id": "string",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "schema_url": "string",
    "state": "active",
    "state_changed_at": "2019-08-24T14:15:22Z",
    "traits": null,
    "updated_at": "2019-08-24T14:15:22Z",
    "verifiable_addresses": [
        {}
    ]

}
Get an Identity by its External ID

Return an identity by its external ID. You can optionally include credentials (e.g. social sign in connections) in the response by using the include_credential query parameter.
Authorizations:
oryAccessToken
path Parameters
externalID
required
	
string

ExternalID must be set to the ID of identity you want to get
query Parameters
include_credential	
Array of strings
Items Enum: "password" "oidc" "totp" "lookup_secret" "webauthn" "code" "passkey" "profile" "saml" "link_recovery" "code_recovery"

Include Credentials in Response

Include any credential, for example password or oidc, in the response. When set to oidc, This will return the initial OAuth 2.0 Access Token, OAuth 2.0 Refresh Token and the OpenID Connect ID Token if available.
Responses
Response samples

    200404default

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "credentials": {
        "property1": {},
        "property2": {}
    },
    "external_id": "string",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "schema_url": "string",
    "state": "active",
    "state_changed_at": "2019-08-24T14:15:22Z",
    "traits": null,
    "updated_at": "2019-08-24T14:15:22Z",
    "verifiable_addresses": [
        {}
    ]

}
Delete an Identity

Calling this endpoint irrecoverably and permanently deletes the identity given its ID. This action can not be undone. This endpoint returns 204 when the identity was deleted or 404 if the identity was not found.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the identity's ID.
Responses
Response samples

    404default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Get an Identity

Return an identity by its ID. You can optionally include credentials (e.g. social sign in connections) in the response by using the include_credential query parameter.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID must be set to the ID of identity you want to get
query Parameters
include_credential	
Array of strings
Items Enum: "password" "oidc" "totp" "lookup_secret" "webauthn" "code" "passkey" "profile" "saml" "link_recovery" "code_recovery"

Include Credentials in Response

Include any credential, for example password or oidc, in the response. When set to oidc, This will return the initial OAuth 2.0 Access Token, OAuth 2.0 Refresh Token and the OpenID Connect ID Token if available.
Responses
Response samples

    200404default

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "credentials": {
        "property1": {},
        "property2": {}
    },
    "external_id": "string",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "schema_url": "string",
    "state": "active",
    "state_changed_at": "2019-08-24T14:15:22Z",
    "traits": null,
    "updated_at": "2019-08-24T14:15:22Z",
    "verifiable_addresses": [
        {}
    ]

}
Patch an Identity

Partially updates an identity's field using JSON Patch. The fields id, stateChangedAt and credentials can not be updated using this method.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID must be set to the ID of identity you want to update
Request Body schema: application/json
Array
from	
string

This field is used together with operation "move" and uses JSON Pointer notation.

Learn more about JSON Pointers.
op
required
	
string

The operation to be performed. One of "add", "remove", "replace", "move", "copy", or "test".
path
required
	
string

The path to the target path. Uses JSON pointer notation.

Learn more about JSON Pointers.
value	
any

The value to be used within the operations.

Learn more about JSON Pointers.
Responses
Request samples

    Payload

Content type
application/json
[

    {
        "from": "/name",
        "op": "replace",
        "path": "/name",
        "value": "foobar"
    }

]
Response samples

    200400404409default

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "credentials": {
        "property1": {},
        "property2": {}
    },
    "external_id": "string",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "schema_url": "string",
    "state": "active",
    "state_changed_at": "2019-08-24T14:15:22Z",
    "traits": null,
    "updated_at": "2019-08-24T14:15:22Z",
    "verifiable_addresses": [
        {}
    ]

}
Update an Identity

This endpoint updates an identity. The full identity payload, except credentials, is expected. For partial updates, use the patchIdentity operation.

A credential can be provided via the credentials field in the request body. If provided, the credentials will be imported and added to the existing credentials of the identity.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID must be set to the ID of identity you want to update
Request Body schema: application/json
	
object (identityWithCredentials)

Create Identity and Import Credentials
external_id	
string

ExternalID is an optional external ID of the identity. This is used to link the identity to an external system. If set, the external ID must be unique across all identities.
metadata_admin	
any

Store metadata about the user which is only accessible through admin APIs such as GET /admin/identities/<id>.
metadata_public	
any

Store metadata about the identity which the identity itself can see when calling for example the session endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.
schema_id
required
	
string

SchemaID is the ID of the JSON Schema to be used for validating the identity's traits. If set will update the Identity's SchemaID.
state
required
	
string
Enum: "active" "inactive"

State is the identity's state. active StateActive inactive StateInactive
traits
required
	
object

Traits represent an identity's traits. The identity is able to create, modify, and delete traits in a self-service manner. The input will always be validated against the JSON Schema defined in schema_id.
Responses
Request samples

    Payload

Content type
application/json
{

    "credentials": {
        "oidc": {},
        "password": {},
        "saml": {}
    },
    "external_id": "string",
    "metadata_admin": null,
    "metadata_public": null,
    "schema_id": "string",
    "state": "active",
    "traits": { }

}
Response samples

    200400404409default

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "credentials": {
        "property1": {},
        "property2": {}
    },
    "external_id": "string",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "metadata_admin": null,
    "metadata_public": null,
    "organization_id": "string",
    "recovery_addresses": [
        {}
    ],
    "schema_id": "string",
    "schema_url": "string",
    "state": "active",
    "state_changed_at": "2019-08-24T14:15:22Z",
    "traits": null,
    "updated_at": "2019-08-24T14:15:22Z",
    "verifiable_addresses": [
        {}
    ]

}
Delete a credential for a specific identity

Delete an identity credential by its type. You cannot delete passkeys or code auth credentials through this API.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the identity's ID.
type
required
	
string
Enum: "password" "oidc" "totp" "lookup_secret" "webauthn" "code" "passkey" "profile" "saml" "link_recovery" "code_recovery"

Type is the type of credentials to delete. password CredentialsTypePassword oidc CredentialsTypeOIDC totp CredentialsTypeTOTP lookup_secret CredentialsTypeLookup webauthn CredentialsTypeWebAuthn code CredentialsTypeCodeAuth passkey CredentialsTypePasskey profile CredentialsTypeProfile saml CredentialsTypeSAML link_recovery CredentialsTypeRecoveryLink CredentialsTypeRecoveryLink is a special credential type linked to the link strategy (recovery flow). It is not used within the credentials object itself. code_recovery CredentialsTypeRecoveryCode
query Parameters
identifier	
string

Identifier is the identifier of the OIDC/SAML credential to delete. Find the identifier by calling the GET /admin/identities/{id}?include_credential={oidc,saml} endpoint.
Responses
Response samples

    404default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Delete & Invalidate an Identity's Sessions

Calling this endpoint irrecoverably and permanently deletes and invalidates all sessions that belong to the given Identity.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the identity's ID.
Responses
Response samples

    400401404default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
List an Identity's Sessions

This endpoint returns all sessions that belong to the given Identity.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the identity's ID.
query Parameters
per_page	
integer <int64> [ 1 .. 1000 ]
Default: 250

Deprecated Items per Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This is the number of items per page.
page	
integer <int64>

Deprecated Pagination Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This value is currently an integer, but it is not sequential. The value is not the page number, but a reference. The next page can be any number and some numbers might return an empty list.

For example, page 2 might not follow after page 1. And even if page 3 and 5 exist, but page 4 might not exist. The first page can be retrieved by omitting this parameter. Following page pointers will be returned in the Link header.
page_size	
integer <int64> [ 1 .. 500 ]
Default: 250

Page Size

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
active	
boolean

Active is a boolean flag that filters out sessions based on the state. If no value is provided, all sessions are returned.
Responses
Response samples

    200400404default

Content type
application/json
[

    {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    }

]
Create a Recovery Code

This endpoint creates a recovery code which should be given to the user in order for them to recover (or activate) their account.
Authorizations:
oryAccessToken
Request Body schema: application/json
expires_in	
string^([0-9]+(ns|us|ms|s|m|h))*$

Code Expires In

The recovery code will expire after that amount of time has passed. Defaults to the configuration value of selfservice.methods.code.config.lifespan.
flow_type	
string (Type is the flow type.)

The flow type can either be api or browser.
identity_id
required
	
string <uuid>

Identity to Recover

The identity's ID you wish to recover.
Responses
Request samples

    Payload

Content type
application/json
{

    "expires_in": "string",
    "flow_type": "string",
    "identity_id": "011a42b9-62d7-49eb-8328-c2e454af88a1"

}
Response samples

    201400404default

Content type
application/json
{

    "expires_at": "2019-08-24T14:15:22Z",
    "recovery_code": "string",
    "recovery_link": "string"

}
Create a Recovery Link

This endpoint creates a recovery link which should be given to the user in order for them to recover (or activate) their account.
Authorizations:
oryAccessToken
query Parameters
return_to	
string
Request Body schema: application/json
expires_in	
string^[0-9]+(ns|us|ms|s|m|h)$

Link Expires In

The recovery link will expire after that amount of time has passed. Defaults to the configuration value of selfservice.methods.code.config.lifespan.
identity_id
required
	
string <uuid>

Identity to Recover

The identity's ID you wish to recover.
Responses
Request samples

    Payload

Content type
application/json
{

    "expires_in": "string",
    "identity_id": "011a42b9-62d7-49eb-8328-c2e454af88a1"

}
Response samples

    200400404default

Content type
application/json
{

    "expires_at": "2019-08-24T14:15:22Z",
    "recovery_link": "string"

}
List All Sessions

Listing all sessions that exist.
Authorizations:
oryAccessToken
query Parameters
page_size	
integer <int64> [ 1 .. 1000 ]
Default: 250

Items per Page

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
active	
boolean

Active is a boolean flag that filters out sessions based on the state. If no value is provided, all sessions are returned.
expand	
Array of strings
Items Enum: "identity" "devices"

ExpandOptions is a query parameter encoded list of all properties that must be expanded in the Session. If no value is provided, the expandable properties are skipped.
Responses
Response samples

    200400default

Content type
application/json
[

    {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    }

]
Deactivate a Session

Calling this endpoint deactivates the specified session. Session data is not deleted.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the session's ID.
Responses
Response samples

    400401default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Get Session

This endpoint is useful for:

Getting a session object with all specified expandables that exist in an administrative context.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the session's ID.
query Parameters
expand	
Array of strings
Items Enum: "identity" "devices"

ExpandOptions is a query parameter encoded list of all properties that must be expanded in the Session. Example - ?expand=Identity&expand=Devices If no value is provided, the expandable properties are skipped.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": true,
    "authenticated_at": "2019-08-24T14:15:22Z",
    "authentication_methods": [
        {}
    ],
    "authenticator_assurance_level": "aal0",
    "devices": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "tokenized": "string"

}
Extend a Session

Calling this endpoint extends the given session ID. If session.earliest_possible_extend is set it will only extend the session after the specified time has passed.

This endpoint returns per default a 204 No Content response on success. Older Ory Network projects may return a 200 OK response with the session in the body. Returning the session as part of the response will be deprecated in the future and should not be relied upon.

This endpoint ignores consecutive requests to extend the same session and returns a 404 error in those scenarios. This endpoint also returns 404 errors if the session does not exist.

Retrieve the session ID from the /sessions/whoami endpoint / toSession SDK method.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

ID is the session's ID.
Responses
Response samples

    200400404default

Content type
application/json
{

    "active": true,
    "authenticated_at": "2019-08-24T14:15:22Z",
    "authentication_methods": [
        {}
    ],
    "authenticator_assurance_level": "aal0",
    "devices": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "tokenized": "string"

}
Get all Identity Schemas

Returns a list of all identity schemas currently in use.
query Parameters
per_page	
integer <int64> [ 1 .. 1000 ]
Default: 250

Deprecated Items per Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This is the number of items per page.
page	
integer <int64>

Deprecated Pagination Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This value is currently an integer, but it is not sequential. The value is not the page number, but a reference. The next page can be any number and some numbers might return an empty list.

For example, page 2 might not follow after page 1. And even if page 3 and 5 exist, but page 4 might not exist. The first page can be retrieved by omitting this parameter. Following page pointers will be returned in the Link header.
page_size	
integer <int64> [ 1 .. 500 ]
Default: 250

Page Size

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
Responses
Response samples

    200default

Content type
application/json
[

    {
        "id": "string",
        "schema": { }
    }

]
Get Identity JSON Schema

Return a specific identity schema.
path Parameters
id
required
	
string

ID must be set to the ID of schema you want to get
Responses
Response samples

    200404default

Content type
application/json
{ }
frontend

Endpoints used by frontend applications (e.g. Single-Page-App, Native Apps, Server Apps, ...) to manage a user's own profile.
Get WebAuthn JavaScript

This endpoint provides JavaScript which is needed in order to perform WebAuthn login and registration.

If you are building a JavaScript Browser App (e.g. in ReactJS or AngularJS) you will need to load this file:

<script src="https://public-kratos.example.org/.well-known/ory/webauthn.js" type="script" async />

More information can be found at Ory Kratos User Login and User Registration Documentation.
Responses
Response samples

    200

Content type
application/json
"string"
Get User-Flow Errors

This endpoint returns the error associated with a user-facing self service errors.

This endpoint supports stub values to help you implement the error UI:

?id=stub:500 - returns a stub 500 (Internal Server Error) error.

More information can be found at Ory Kratos User User Facing Error Documentation.
query Parameters
id
required
	
string

Error is the error's ID
Responses
Response samples

    200403404500

Content type
application/json
{

    "created_at": "2019-08-24T14:15:22Z",
    "error": { },
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "updated_at": "2019-08-24T14:15:22Z"

}
Get FedCM Parameters

This endpoint returns a list of all available FedCM providers. It is only supported on the Ory Network.
Responses
Response samples

    200400default

Content type
application/json
{

    "csrf_token": "string",
    "providers": [
        {}
    ]

}
Submit a FedCM token

Use this endpoint to submit a token from a FedCM provider through navigator.credentials.get and log the user in. The parameters from navigator.credentials.get must have come from GET self-service/fed-cm/parameters.
Request Body schema:
application/json
required
csrf_token
required
	
string

CSRFToken is the anti-CSRF token.
nonce	
string

Nonce is the nonce that was used in the navigator.credentials.get call. If specified, it must match the nonce claim in the token.
token
required
	
string

Token contains the result of navigator.credentials.get.
transient_payload	
object

Transient data to pass along to any webhooks.
Responses
Request samples

    Payload

Content type
application/json
{

    "csrf_token": "string",
    "nonce": "string",
    "token": "string",
    "transient_payload": { }

}
Response samples

    200400410422default

Content type
application/json
{

    "continue_with": [
        {}
    ],
    "session": {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    },
    "session_token": "string"

}
Submit a Login Flow

Use this endpoint to complete a login flow. This endpoint behaves differently for API and browser flows.

API flows expect application/json to be sent in the body and responds with HTTP 200 and a application/json body with the session token on success; HTTP 410 if the original flow expired with the appropriate error messages set and optionally a use_flow_id parameter in the body; HTTP 400 on form validation errors.

Browser flows expect a Content-Type of application/x-www-form-urlencoded or application/json to be sent in the body and respond with a HTTP 303 redirect to the post/after login URL or the return_to value if it was set and if the login succeeded; a HTTP 303 redirect to the login UI URL with the flow ID containing the validation errors otherwise.

Browser flows with an accept header of application/json will not redirect but instead respond with HTTP 200 and a application/json body with the signed in identity and a Set-Cookie header on success; HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set; HTTP 400 on form validation errors.

If this endpoint is called with Accept: application/json in the header, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration! browser_location_change_required: Usually sent when an AJAX request indicates that the browser needs to open a specific URL. Most likely used in Social Sign In flows.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
flow
required
	
string

The Login Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /login?flow=abcde).
header Parameters
X-Session-Token	
string

The Session Token of the Identity performing the settings flow.
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Request Body schema:
application/json
required
address	
string

Address is the address to send the code to, in case that there are multiple addresses. This field is only used in two-factor flows and is ineffective for passwordless flows.
code	
string

Code is the 6 digits code sent to the user
csrf_token
required
	
string

CSRFToken is the anti-CSRF token
identifier	
string

Identifier is the code identifier The identifier requires that the user has already completed the registration or settings with code flow.
method
required
	
string

Method should be set to "code" when logging in using the code strategy.
code
resend	
string

Resend is set when the user wants to resend the code
transient_payload	
object

Transient data to pass along to any webhooks
Responses
Request samples

    Payload

Content type
application/json
Example
code
{

    "address": "string",
    "code": "string",
    "csrf_token": "string",
    "identifier": "string",
    "method": "code",
    "resend": "string",
    "transient_payload": { }

}
Response samples

    200400410422default

Content type
application/json
{

    "continue_with": [
        {}
    ],
    "session": {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    },
    "session_token": "string"

}
Create Login Flow for Native Apps

This endpoint initiates a login flow for native apps that do not use a browser, such as mobile devices, smart TVs, and so on.

If a valid provided session cookie or session token is provided, a 400 Bad Request error will be returned unless the URL query parameter ?refresh=true is set.

To fetch an existing login flow call /self-service/login/flows?flow=<flow_id>.

You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make you vulnerable to a variety of CSRF attacks, including CSRF login attacks.

In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. session_aal1_required: Multi-factor auth (e.g. 2fa) was requested but the user has no session yet. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred.

This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
refresh	
boolean

Refresh a login session

If set to true, this will refresh an existing login session by asking the user to sign in again. This will reset the authenticated_at time of the session.
aal	
string

Request a Specific AuthenticationMethod Assurance Level

Use this parameter to upgrade an existing session's authenticator assurance level (AAL). This allows you to ask for multi-factor authentication. When an identity sign in using e.g. username+password, the AAL is 1. If you wish to "upgrade" the session's security by asking the user to perform TOTP / WebAuth/ ... you would set this to "aal2".
return_session_token_exchange_code	
boolean

EnableSessionTokenExchangeCode requests the login flow to include a code that can be used to retrieve the session token after the login flow has been completed.
return_to	
string

The URL to return the browser to after the flow was completed.
organization	
string

An optional organization ID that should be used for logging this user in. This parameter is only effective in the Ory Network.
via	
string

Via should contain the identity's credential the code should be sent to. Only relevant in aal2 flows.

DEPRECATED: This field is deprecated. Please remove it from your requests. The user will now see a choice of MFA credentials to choose from to perform the second factor instead.
identity_schema	
string

An optional identity schema to use for the login flow.
header Parameters
X-Session-Token	
string

The Session Token of the Identity performing the settings flow.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "password",
    "created_at": "2019-08-24T14:15:22Z",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "refresh": true,
    "request_url": "string",
    "requested_aal": "aal0",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    },
    "updated_at": "2019-08-24T14:15:22Z"

}
Create Login Flow for Browsers

This endpoint initializes a browser-based user login flow. This endpoint will set the appropriate cookies and anti-CSRF measures required for browser-based flows.

If this endpoint is opened as a link in the browser, it will be redirected to selfservice.flows.login.ui_url with the flow ID set as the query parameter ?flow=. If a valid user session exists already, the browser will be redirected to urls.default_redirect_url unless the query parameter ?refresh=true was set.

If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. session_aal1_required: Multi-factor auth (e.g. 2fa) was requested but the user has no session yet. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration!

The optional query parameter login_challenge is set when using Kratos with Hydra in an OAuth2 flow. See the oauth2_provider.url configuration option.

This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
refresh	
boolean

Refresh a login session

If set to true, this will refresh an existing login session by asking the user to sign in again. This will reset the authenticated_at time of the session.
aal	
string

Request a Specific AuthenticationMethod Assurance Level

Use this parameter to upgrade an existing session's authenticator assurance level (AAL). This allows you to ask for multi-factor authentication. When an identity sign in using e.g. username+password, the AAL is 1. If you wish to "upgrade" the session's security by asking the user to perform TOTP / WebAuth/ ... you would set this to "aal2".
return_to	
string

The URL to return the browser to after the flow was completed.
login_challenge	
string

An optional Hydra login challenge. If present, Kratos will cooperate with Ory Hydra to act as an OAuth2 identity provider.

The value for this parameter comes from login_challenge URL Query parameter sent to your application (e.g. /login?login_challenge=abcde).
organization	
string

An optional organization ID that should be used for logging this user in. This parameter is only effective in the Ory Network.
via	
string

Via should contain the identity's credential the code should be sent to. Only relevant in aal2 flows.

DEPRECATED: This field is deprecated. Please remove it from your requests. The user will now see a choice of MFA credentials to choose from to perform the second factor instead.
identity_schema	
string

An optional identity schema to use for the login flow.
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "password",
    "created_at": "2019-08-24T14:15:22Z",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "refresh": true,
    "request_url": "string",
    "requested_aal": "aal0",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    },
    "updated_at": "2019-08-24T14:15:22Z"

}
Get Login Flow

This endpoint returns a login flow's context with, for example, error details and other information.

Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header. For AJAX requests you must ensure that cookies are included in the request or requests will fail.

If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain and you need to forward the incoming HTTP Cookie header to this endpoint:

pseudo-code example
router.get('/login', async function (req, res) {
const flow = await client.getLoginFlow(req.header('cookie'), req.query['flow'])

res.render('login', flow)
})

This request may fail due to several reasons. The error.id can be one of:

session_already_available: The user is already signed in. self_service_flow_expired: The flow is expired and you should request a new one.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
id
required
	
string

The Login Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /login?flow=abcde).
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200403404410default

Content type
application/json
{

    "active": "password",
    "created_at": "2019-08-24T14:15:22Z",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "refresh": true,
    "request_url": "string",
    "requested_aal": "aal0",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    },
    "updated_at": "2019-08-24T14:15:22Z"

}
Update Logout Flow

This endpoint logs out an identity in a self-service manner.

If the Accept HTTP header is not set to application/json, the browser will be redirected (HTTP 303 See Other) to the return_to parameter of the initial request or fall back to urls.default_return_to.

If the Accept HTTP header is set to application/json, a 204 No Content response will be sent on successful logout instead.

This endpoint is NOT INTENDED for API clients and only works with browsers (Chrome, Firefox, ...). For API clients you can call the /self-service/logout/api URL directly with the Ory Session Token.

More information can be found at Ory Kratos User Logout Documentation.
query Parameters
token	
string

A Valid Logout Token

If you do not have a logout token because you only have a session cookie, call /self-service/logout/browser to generate a URL for this endpoint.
return_to	
string

The URL to return to after the logout was completed.
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Perform Logout for Native Apps

Use this endpoint to log out an identity using an Ory Session Token. If the Ory Session Token was successfully revoked, the server returns a 204 No Content response. A 204 No Content response is also sent when the Ory Session Token has been revoked already before.

If the Ory Session Token is malformed or does not exist a 403 Forbidden response will be returned.

This endpoint does not remove any HTTP Cookies - use the Browser-Based Self-Service Logout Flow instead.
Request Body schema: application/json
required
session_token
required
	
string

The Session Token

Invalidate this session token.
Responses
Request samples

    Payload

Content type
application/json
{

    "session_token": "string"

}
Response samples

    400default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Create a Logout URL for Browsers

This endpoint initializes a browser-based user logout flow and a URL which can be used to log out the user.

This endpoint is NOT INTENDED for API clients and only works with browsers (Chrome, Firefox, ...). For API clients you can call the /self-service/logout/api URL directly with the Ory Session Token.

The URL is only valid for the currently signed in user. If no user is signed in, this endpoint returns a 401 error.

When calling this endpoint from a backend, please ensure to properly forward the HTTP cookies.
query Parameters
return_to	
string

Return to URL

The URL to which the browser should be redirected to after the logout has been performed.
header Parameters
cookie	
string

HTTP Cookies

If you call this endpoint from a backend, please include the original Cookie header in the request.
Responses
Response samples

    200400401500

Content type
application/json
{

    "logout_token": "string",
    "logout_url": "string"

}
Update Recovery Flow

Use this endpoint to update a recovery flow. This endpoint behaves differently for API and browser flows and has several states:

choose_method expects flow (in the URL query) and email (in the body) to be sent and works with API- and Browser-initiated flows. For API clients and Browser clients with HTTP Header Accept: application/json it either returns a HTTP 200 OK when the form is valid and HTTP 400 OK when the form is invalid. and a HTTP 303 See Other redirect with a fresh recovery flow if the flow was otherwise invalid (e.g. expired). For Browser clients without HTTP Header Accept or with Accept: text/* it returns a HTTP 303 See Other redirect to the Recovery UI URL with the Recovery Flow ID appended. sent_email is the success state after choose_method for the link method and allows the user to request another recovery email. It works for both API and Browser-initiated flows and returns the same responses as the flow in choose_method state. passed_challenge expects a token to be sent in the URL query and given the nature of the flow ("sending a recovery link") does not have any API capabilities. The server responds with a HTTP 303 See Other redirect either to the Settings UI URL (if the link was valid) and instructs the user to update their password, or a redirect to the Recover UI URL with a new Recovery Flow ID which contains an error message that the recovery link was invalid.

More information can be found at Ory Kratos Account Recovery Documentation.
query Parameters
flow
required
	
string

The Recovery Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /recovery?flow=abcde).
token	
string

Recovery Token

The recovery token which completes the recovery request. If the token is invalid (e.g. expired) an error will be shown to the end-user.

This parameter is usually set in a link and not used by any direct API call.
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Request Body schema:
application/json
required
code	
string

Code from the recovery email

If you want to submit a code, use this field, but make sure to not include the email field, as well.
csrf_token	
string

Sending the anti-csrf token is only required for browser login flows.
email	
string

The email address of the account to recover

If the email belongs to a valid account, a recovery email will be sent.

If you want to notify the email address if the account does not exist, see the notify_unknown_recipients flag

If a code was already sent, including this field in the payload will invalidate the sent code and re-send a new code.

format: email
method
required
	
string

Method is the method that should be used for this recovery flow

Allowed values are link and code. link RecoveryStrategyLink code RecoveryStrategyCode
code
recovery_address	
string

A recovery address that is registered for the user. It can be an email, a phone number (to receive the code via SMS), etc. Used in RecoveryV2.
recovery_confirm_address	
string

If there are multiple recovery addresses registered for the user, and the initially provided address is different from the address chosen when the choice (of masked addresses) is presented, then we need to make sure that the user actually knows the full address to avoid information exfiltration, so we ask for the full address. Used in RecoveryV2.
recovery_select_address	
string

If there are multiple addresses registered for the user, a choice is presented and this field stores the result of this choice. Addresses are 'masked' (never sent in full to the client and shown partially in the UI) since at this point in the recovery flow, the user has not yet proven that it knows the full address and we want to avoid information exfiltration. So for all intents and purposes, the value of this field should be treated as an opaque identifier. Used in RecoveryV2.
screen	
string

Set to "previous" to go back in the flow, meaningfully. Used in RecoveryV2.
transient_payload	
object

Transient data to pass along to any webhooks
Responses
Request samples

    Payload

Content type
application/json
Example
code
{

    "code": "string",
    "csrf_token": "string",
    "email": "string",
    "method": "code",
    "recovery_address": "string",
    "recovery_confirm_address": "string",
    "recovery_select_address": "string",
    "screen": "string",
    "transient_payload": { }

}
Response samples

    200400410422default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Recovery Flow for Native Apps

This endpoint initiates a recovery flow for API clients such as mobile devices, smart TVs, and so on.

If a valid provided session cookie or session token is provided, a 400 Bad Request error.

On an existing recovery flow, use the getRecoveryFlow API endpoint.

You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make you vulnerable to a variety of CSRF attacks.

This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).

More information can be found at Ory Kratos Account Recovery Documentation.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Recovery Flow for Browsers

This endpoint initializes a browser-based account recovery flow. Once initialized, the browser will be redirected to selfservice.flows.recovery.ui_url with the flow ID set as the query parameter ?flow=. If a valid user session exists, the browser is returned to the configured return URL.

If this endpoint is called via an AJAX request, the response contains the recovery flow without any redirects or a 400 bad request error if the user is already authenticated.

This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.

More information can be found at Ory Kratos Account Recovery Documentation.
query Parameters
return_to	
string

The URL to return the browser to after the flow was completed.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Get Recovery Flow

This endpoint returns a recovery flow's context with, for example, error details and other information.

Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header. For AJAX requests you must ensure that cookies are included in the request or requests will fail.

If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain and you need to forward the incoming HTTP Cookie header to this endpoint:

pseudo-code example
router.get('/recovery', async function (req, res) {
const flow = await client.getRecoveryFlow(req.header('Cookie'), req.query['flow'])

res.render('recovery', flow)
})

More information can be found at Ory Kratos Account Recovery Documentation.
query Parameters
id
required
	
string

The Flow ID

The value for this parameter comes from request URL Query parameter sent to your application (e.g. /recovery?flow=abcde).
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200404410default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Update Registration Flow

Use this endpoint to complete a registration flow by sending an identity's traits and password. This endpoint behaves differently for API and browser flows.

API flows expect application/json to be sent in the body and respond with HTTP 200 and a application/json body with the created identity success - if the session hook is configured the session and session_token will also be included; HTTP 410 if the original flow expired with the appropriate error messages set and optionally a use_flow_id parameter in the body; HTTP 400 on form validation errors.

Browser flows expect a Content-Type of application/x-www-form-urlencoded or application/json to be sent in the body and respond with a HTTP 303 redirect to the post/after registration URL or the return_to value if it was set and if the registration succeeded; a HTTP 303 redirect to the registration UI URL with the flow ID containing the validation errors otherwise.

Browser flows with an accept header of application/json will not redirect but instead respond with HTTP 200 and a application/json body with the signed in identity and a Set-Cookie header on success; HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set; HTTP 400 on form validation errors.

If this endpoint is called with Accept: application/json in the header, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration! browser_location_change_required: Usually sent when an AJAX request indicates that the browser needs to open a specific URL. Most likely used in Social Sign In flows.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
flow
required
	
string

The Registration Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /registration?flow=abcde).
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Request Body schema:
application/json
required
code	
string

The OTP Code sent to the user
csrf_token	
string

The CSRF Token
method
required
	
string

Method to use

This field must be set to code when using the code method.
code
resend	
string

Resend restarts the flow with a new code
traits
required
	
object

The identity's traits
transient_payload	
object

Transient data to pass along to any webhooks
Responses
Request samples

    Payload

Content type
application/json
Example
code
{

    "code": "string",
    "csrf_token": "string",
    "method": "code",
    "resend": "string",
    "traits": { },
    "transient_payload": { }

}
Response samples

    200400410422default

Content type
application/json
{

    "continue_with": [
        {}
    ],
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "session": {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    },
    "session_token": "string"

}
Create Registration Flow for Native Apps

This endpoint initiates a registration flow for API clients such as mobile devices, smart TVs, and so on.

If a valid provided session cookie or session token is provided, a 400 Bad Request error will be returned unless the URL query parameter ?refresh=true is set.

To fetch an existing registration flow call /self-service/registration/flows?flow=<flow_id>.

You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make you vulnerable to a variety of CSRF attacks.

In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred.

This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
return_session_token_exchange_code	
boolean

EnableSessionTokenExchangeCode requests the login flow to include a code that can be used to retrieve the session token after the login flow has been completed.
return_to	
string

The URL to return the browser to after the flow was completed.
organization	
string

An optional organization ID that should be used to register this user. This parameter is only effective in the Ory Network.
identity_schema	
string

An optional identity schema to use for the registration flow.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "password",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "request_url": "string",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Registration Flow for Browsers

This endpoint initializes a browser-based user registration flow. This endpoint will set the appropriate cookies and anti-CSRF measures required for browser-based flows.

If this endpoint is opened as a link in the browser, it will be redirected to selfservice.flows.registration.ui_url with the flow ID set as the query parameter ?flow=. If a valid user session exists already, the browser will be redirected to urls.default_redirect_url.

If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

session_already_available: The user is already signed in. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration!

If this endpoint is called via an AJAX request, the response contains the registration flow without a redirect.

This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
return_to	
string

The URL to return the browser to after the flow was completed.
login_challenge	
string

Ory OAuth 2.0 Login Challenge.

If set will cooperate with Ory OAuth2 and OpenID to act as an OAuth2 server / OpenID Provider.

The value for this parameter comes from login_challenge URL Query parameter sent to your application (e.g. /registration?login_challenge=abcde).

This feature is compatible with Ory Hydra when not running on the Ory Network.
after_verification_return_to	
string

The URL to return the browser to after the verification flow was completed.

After the registration flow is completed, the user will be sent a verification email. Upon completing the verification flow, this URL will be used to override the default selfservice.flows.verification.after.default_redirect_to value.
organization	
string

An optional organization ID that should be used to register this user. This parameter is only effective in the Ory Network.
identity_schema	
string

An optional identity schema to use for the registration flow.
Responses
Response samples

    200default

Content type
application/json
{

    "active": "password",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "request_url": "string",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Get Registration Flow

This endpoint returns a registration flow's context with, for example, error details and other information.

Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header. For AJAX requests you must ensure that cookies are included in the request or requests will fail.

If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain and you need to forward the incoming HTTP Cookie header to this endpoint:

pseudo-code example
router.get('/registration', async function (req, res) {
const flow = await client.getRegistrationFlow(req.header('cookie'), req.query['flow'])

res.render('registration', flow)
})

This request may fail due to several reasons. The error.id can be one of:

session_already_available: The user is already signed in. self_service_flow_expired: The flow is expired and you should request a new one.

More information can be found at Ory Kratos User Login and User Registration Documentation.
query Parameters
id
required
	
string

The Registration Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /registration?flow=abcde).
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200403404410default

Content type
application/json
{

    "active": "password",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity_schema": "string",
    "issued_at": "2019-08-24T14:15:22Z",
    "oauth2_login_challenge": "string",
    "oauth2_login_request": {
        "challenge": "string",
        "client": {},
        "oidc_context": {},
        "request_url": "string",
        "requested_access_token_audience": [],
        "requested_scope": [],
        "session_id": "string",
        "skip": true,
        "subject": "string"
    },
    "organization_id": "string",
    "request_url": "string",
    "return_to": "string",
    "session_token_exchange_code": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Complete Settings Flow

Use this endpoint to complete a settings flow by sending an identity's updated password. This endpoint behaves differently for API and browser flows.

API-initiated flows expect application/json to be sent in the body and respond with HTTP 200 and an application/json body with the session token on success; HTTP 303 redirect to a fresh settings flow if the original flow expired with the appropriate error messages set; HTTP 400 on form validation errors. HTTP 401 when the endpoint is called without a valid session token. HTTP 403 when selfservice.flows.settings.privileged_session_max_age was reached or the session's AAL is too low. Implies that the user needs to re-authenticate.

Browser flows without HTTP Header Accept or with Accept: text/* respond with a HTTP 303 redirect to the post/after settings URL or the return_to value if it was set and if the flow succeeded; a HTTP 303 redirect to the Settings UI URL with the flow ID containing the validation errors otherwise. a HTTP 303 redirect to the login endpoint when selfservice.flows.settings.privileged_session_max_age was reached or the session's AAL is too low.

Browser flows with HTTP Header Accept: application/json respond with HTTP 200 and a application/json body with the signed in identity and a Set-Cookie header on success; HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set; HTTP 401 when the endpoint is called without a valid session cookie. HTTP 403 when the page is accessed without a session cookie or the session's AAL is too low. HTTP 400 on form validation errors.

Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user to sign in with the second factor (happens automatically for server-side browser flows) or change the configuration.

If this endpoint is called with a Accept: application/json HTTP header, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

session_refresh_required: The identity requested to change something that needs a privileged session. Redirect the identity to the login init endpoint with query parameters ?refresh=true&return_to=<the-current-browser-url>, or initiate a refresh login flow otherwise. security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. session_inactive: No Ory Session was found - sign in a user first. security_identity_mismatch: The flow was interrupted with session_refresh_required but apparently some other identity logged in instead. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration! browser_location_change_required: Usually sent when an AJAX request indicates that the browser needs to open a specific URL. Most likely used in Social Sign In flows.

More information can be found at Ory Kratos User Settings & Profile Management Documentation.
Authorizations:
None
query Parameters
flow
required
	
string

The Settings Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /settings?flow=abcde).
header Parameters
X-Session-Token	
string

The Session Token of the Identity performing the settings flow.
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Request Body schema:
application/json
required
csrf_token	
string

CSRFToken is the anti-CSRF token
lookup_secret_confirm	
boolean

If set to true will save the regenerated lookup secrets
lookup_secret_disable	
boolean

Disables this method if true.
lookup_secret_regenerate	
boolean

If set to true will regenerate the lookup secrets
lookup_secret_reveal	
boolean

If set to true will reveal the lookup secrets
method
required
	
string

Method

Should be set to "lookup" when trying to add, update, or remove a lookup pairing.
lookup_secret
transient_payload	
object

Transient data to pass along to any webhooks
Responses
Request samples

    Payload

Content type
application/json
Example
lookup_secret
{

    "csrf_token": "string",
    "lookup_secret_confirm": true,
    "lookup_secret_disable": true,
    "lookup_secret_regenerate": true,
    "lookup_secret_reveal": true,
    "method": "lookup_secret",
    "transient_payload": { }

}
Response samples

    200400401403410422default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Settings Flow for Native Apps

This endpoint initiates a settings flow for API clients such as mobile devices, smart TVs, and so on. You must provide a valid Ory Kratos Session Token for this endpoint to respond with HTTP 200 OK.

To fetch an existing settings flow call /self-service/settings/flows?flow=<flow_id>.

You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make you vulnerable to a variety of CSRF attacks.

Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user to sign in with the second factor or change the configuration.

In the case of an error, the error.id of the JSON response body can be one of:

security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. session_inactive: No Ory Session was found - sign in a user first.

This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).

More information can be found at Ory Kratos User Settings & Profile Management Documentation.
header Parameters
X-Session-Token	
string

The Session Token of the Identity performing the settings flow.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Settings Flow for Browsers

This endpoint initializes a browser-based user settings flow. Once initialized, the browser will be redirected to selfservice.flows.settings.ui_url with the flow ID set as the query parameter ?flow=. If no valid Ory Kratos Session Cookie is included in the request, a login flow will be initialized.

If this endpoint is opened as a link in the browser, it will be redirected to selfservice.flows.settings.ui_url with the flow ID set as the query parameter ?flow=. If no valid user session was set, the browser will be redirected to the login endpoint.

If this endpoint is called via an AJAX request, the response contains the settings flow without any redirects or a 401 forbidden error if no valid session was set.

Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user to sign in with the second factor (happens automatically for server-side browser flows) or change the configuration.

If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. session_inactive: No Ory Session was found - sign in a user first. security_identity_mismatch: The requested ?return_to address is not allowed to be used. Adjust this in the configuration!

This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.

More information can be found at Ory Kratos User Settings & Profile Management Documentation.
query Parameters
return_to	
string

The URL to return the browser to after the flow was completed.
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200400401403default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Get Settings Flow

When accessing this endpoint through Ory Kratos' Public API you must ensure that either the Ory Kratos Session Cookie or the Ory Kratos Session Token are set.

Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user to sign in with the second factor or change the configuration.

You can access this endpoint without credentials when using Ory Kratos' Admin API.

If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the case of an error, the error.id of the JSON response body can be one of:

security_csrf_violation: Unable to fetch the flow because a CSRF violation occurred. session_inactive: No Ory Session was found - sign in a user first. security_identity_mismatch: The flow was interrupted with session_refresh_required but apparently some other identity logged in instead.

More information can be found at Ory Kratos User Settings & Profile Management Documentation.
query Parameters
id
required
	
string

ID is the Settings Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /settings?flow=abcde).
header Parameters
X-Session-Token	
string

The Session Token

When using the SDK in an app without a browser, please include the session token here.
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Responses
Response samples

    200401403404410default

Content type
application/json
{

    "active": "string",
    "continue_with": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Complete Verification Flow

Use this endpoint to complete a verification flow. This endpoint behaves differently for API and browser flows and has several states:

choose_method expects flow (in the URL query) and email (in the body) to be sent and works with API- and Browser-initiated flows. For API clients and Browser clients with HTTP Header Accept: application/json it either returns a HTTP 200 OK when the form is valid and HTTP 400 OK when the form is invalid and a HTTP 303 See Other redirect with a fresh verification flow if the flow was otherwise invalid (e.g. expired). For Browser clients without HTTP Header Accept or with Accept: text/* it returns a HTTP 303 See Other redirect to the Verification UI URL with the Verification Flow ID appended. sent_email is the success state after choose_method when using the link method and allows the user to request another verification email. It works for both API and Browser-initiated flows and returns the same responses as the flow in choose_method state. passed_challenge expects a token to be sent in the URL query and given the nature of the flow ("sending a verification link") does not have any API capabilities. The server responds with a HTTP 303 See Other redirect either to the Settings UI URL (if the link was valid) and instructs the user to update their password, or a redirect to the Verification UI URL with a new Verification Flow ID which contains an error message that the verification link was invalid.

More information can be found at Ory Kratos Email and Phone Verification Documentation.
query Parameters
flow
required
	
string

The Verification Flow ID

The value for this parameter comes from flow URL Query parameter sent to your application (e.g. /verification?flow=abcde).
token	
string

Verification Token

The verification token which completes the verification request. If the token is invalid (e.g. expired) an error will be shown to the end-user.

This parameter is usually set in a link and not used by any direct API call.
header Parameters
Cookie	
string

HTTP Cookies

When using the SDK in a browser app, on the server side you must include the HTTP Cookie Header sent by the client to your server here. This ensures that CSRF and session cookies are respected.
Request Body schema:
application/json
required
code	
string

Code from the recovery email

If you want to submit a code, use this field, but make sure to not include the email field, as well.
csrf_token	
string

Sending the anti-csrf token is only required for browser login flows.
email	
string

The email address to verify

If the email belongs to a valid account, a verifiation email will be sent.

If you want to notify the email address if the account does not exist, see the notify_unknown_recipients flag

If a code was already sent, including this field in the payload will invalidate the sent code and re-send a new code.

format: email
method
required
	
string

Method is the method that should be used for this verification flow

Allowed values are link and code. link VerificationStrategyLink code VerificationStrategyCode
code
transient_payload	
object

Transient data to pass along to any webhooks
Responses
Request samples

    Payload

Content type
application/json
Example
code
{

    "code": "string",
    "csrf_token": "string",
    "email": "string",
    "method": "code",
    "transient_payload": { }

}
Response samples

    200400410default

Content type
application/json
{

    "active": "string",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Verification Flow for Native Apps

This endpoint initiates a verification flow for API clients such as mobile devices, smart TVs, and so on.

To fetch an existing verification flow call /self-service/verification/flows?flow=<flow_id>.

You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make you vulnerable to a variety of CSRF attacks.

This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).

More information can be found at Ory Email and Phone Verification Documentation.
query Parameters
return_to	
string

A URL contained in the return_to key of the verification flow. This piece of data has no effect on the actual logic of the flow and is purely informational.
Responses
Response samples

    200400default

Content type
application/json
{

    "active": "string",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Create Verification Flow for Browser Clients

This endpoint initializes a browser-based account verification flow. Once initialized, the browser will be redirected to selfservice.flows.verification.ui_url with the flow ID set as the query parameter ?flow=.

If this endpoint is called via an AJAX request, the response contains the recovery flow without any redirects.

This endpoint is NOT INTENDED for API clients and only works with browsers (Chrome, Firefox, ...).

More information can be found at Ory Kratos Email and Phone Verification Documentation.
query Parameters
return_to	
string

The URL to return the browser to after the flow was completed.
Responses
Response samples

    200default

Content type
application/json
{

    "active": "string",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Get Verification Flow

This endpoint returns a verification flow's context with, for example, error details and other information.

Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header. For AJAX requests you must ensure that cookies are included in the request or requests will fail.

If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain and you need to forward the incoming HTTP Cookie header to this endpoint:

pseudo-code example
router.get('/recovery', async function (req, res) {
const flow = await client.getVerificationFlow(req.header('cookie'), req.query['flow'])

res.render('verification', flow)
})

More information can be found at Ory Kratos Email and Phone Verification Documentation.
query Parameters
id
required
	
string

The Flow ID

The value for this parameter comes from request URL Query parameter sent to your application (e.g. /verification?flow=abcde).
header Parameters
cookie	
string

HTTP Cookies

When using the SDK on the server side you must include the HTTP Cookie Header originally sent to your HTTP handler here.
Responses
Response samples

    200403404default

Content type
application/json
{

    "active": "string",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "issued_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "return_to": "string",
    "state": null,
    "transient_payload": { },
    "type": "string",
    "ui": {
        "action": "string",
        "messages": [],
        "method": "string",
        "nodes": []
    }

}
Disable my other sessions

Calling this endpoint invalidates all except the current session that belong to the logged-in user. Session data are not deleted.
header Parameters
X-Session-Token	
string

Set the Session Token when calling from non-browser clients. A session token has a format of MP2YWEMeM8MxjkGKpH4dqOQ4Q4DlSPaj.
Cookie	
string

Set the Cookie Header. This is especially useful when calling this endpoint from a server-side application. In that scenario you must include the HTTP Cookie Header which originally was included in the request to your server. An example of a session in the HTTP Cookie Header is: ory_kratos_session=a19iOVAbdzdgl70Rq1QZmrKmcjDtdsviCTZx7m9a9yHIUS8Wa9T7hvqyGTsLHi6Qifn2WUfpAKx9DWp0SJGleIn9vh2YF4A16id93kXFTgIgmwIOvbVAScyrx7yVl6bPZnCx27ec4WQDtaTewC1CpgudeDV2jQQnSaCP6ny3xa8qLH-QUgYqdQuoA_LF1phxgRCUfIrCLQOkolX5nv3ze_f==.

It is ok if more than one cookie are included here as all other cookies will be ignored.
Responses
Response samples

    200400401default

Content type
application/json
{

    "count": 0

}
Get My Active Sessions

This endpoints returns all other active sessions that belong to the logged-in user. The current session can be retrieved by calling the /sessions/whoami endpoint.
query Parameters
per_page	
integer <int64> [ 1 .. 1000 ]
Default: 250

Deprecated Items per Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This is the number of items per page.
page	
integer <int64>

Deprecated Pagination Page

DEPRECATED: Please use page_token instead. This parameter will be removed in the future.

This value is currently an integer, but it is not sequential. The value is not the page number, but a reference. The next page can be any number and some numbers might return an empty list.

For example, page 2 might not follow after page 1. And even if page 3 and 5 exist, but page 4 might not exist. The first page can be retrieved by omitting this parameter. Following page pointers will be returned in the Link header.
page_size	
integer <int64> [ 1 .. 500 ]
Default: 250

Page Size

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
header Parameters
X-Session-Token	
string

Set the Session Token when calling from non-browser clients. A session token has a format of MP2YWEMeM8MxjkGKpH4dqOQ4Q4DlSPaj.
Cookie	
string

Set the Cookie Header. This is especially useful when calling this endpoint from a server-side application. In that scenario you must include the HTTP Cookie Header which originally was included in the request to your server. An example of a session in the HTTP Cookie Header is: ory_kratos_session=a19iOVAbdzdgl70Rq1QZmrKmcjDtdsviCTZx7m9a9yHIUS8Wa9T7hvqyGTsLHi6Qifn2WUfpAKx9DWp0SJGleIn9vh2YF4A16id93kXFTgIgmwIOvbVAScyrx7yVl6bPZnCx27ec4WQDtaTewC1CpgudeDV2jQQnSaCP6ny3xa8qLH-QUgYqdQuoA_LF1phxgRCUfIrCLQOkolX5nv3ze_f==.

It is ok if more than one cookie are included here as all other cookies will be ignored.
Responses
Response samples

    200400401default

Content type
application/json
[

    {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    }

]
Exchange Session Token
query Parameters
init_code
required
	
string

The part of the code return when initializing the flow.
return_to_code
required
	
string

The part of the code returned by the return_to URL.
Responses
Response samples

    200403404410default

Content type
application/json
{

    "continue_with": [
        {}
    ],
    "session": {
        "active": true,
        "authenticated_at": "2019-08-24T14:15:22Z",
        "authentication_methods": [],
        "authenticator_assurance_level": "aal0",
        "devices": [],
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "identity": {},
        "issued_at": "2019-08-24T14:15:22Z",
        "tokenized": "string"
    },
    "session_token": "string"

}
Check Who the Current HTTP Session Belongs To

Uses the HTTP Headers in the GET request to determine (e.g. by using checking the cookies) who is authenticated. Returns a session object in the body or 401 if the credentials are invalid or no credentials were sent. When the request it successful it adds the user ID to the 'X-Kratos-Authenticated-Identity-Id' header in the response.

If you call this endpoint from a server-side application, you must forward the HTTP Cookie Header to this endpoint:

pseudo-code example
router.get('/protected-endpoint', async function (req, res) {
const session = await client.toSession(undefined, req.header('cookie'))

console.log(session)
})

When calling this endpoint from a non-browser application (e.g. mobile app) you must include the session token:

pseudo-code example
...
const session = await client.toSession("the-session-token")

console.log(session)

When using a token template, the token is included in the tokenized field of the session.

pseudo-code example
...
const session = await client.toSession("the-session-token", { tokenize_as: "example-jwt-template" })

console.log(session.tokenized) // The JWT

Depending on your configuration this endpoint might return a 403 status code if the session has a lower Authenticator Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user to sign in with the second factor or change the configuration.

This endpoint is useful for:

AJAX calls. Remember to send credentials and set up CORS correctly! Reverse proxies and API Gateways Server-side calls - use the X-Session-Token header!

This endpoint authenticates users by checking:

if the Cookie HTTP header was set containing an Ory Kratos Session Cookie; if the Authorization: bearer <ory-session-token> HTTP header was set with a valid Ory Kratos Session Token; if the X-Session-Token HTTP header was set with a valid Ory Kratos Session Token.

If none of these headers are set or the cookie or token are invalid, the endpoint returns a HTTP 401 status code.

As explained above, this request may fail due to several reasons. The error.id can be one of:

session_inactive: No active session was found in the request (e.g. no Ory Session Cookie / Ory Session Token). session_aal2_required: An active session was found but it does not fulfil the Authenticator Assurance Level, implying that the session must (e.g.) authenticate the second factor.
query Parameters
tokenize_as	
string

Returns the session additionally as a token (such as a JWT)

The value of this parameter has to be a valid, configured Ory Session token template. For more information head over to the documentation.
header Parameters
X-Session-Token	
string
Example: MP2YWEMeM8MxjkGKpH4dqOQ4Q4DlSPaj

Set the Session Token when calling from non-browser clients. A session token has a format of MP2YWEMeM8MxjkGKpH4dqOQ4Q4DlSPaj.
Cookie	
string
Example: ory_session=a19iOVAbdzdgl70Rq1QZmrKmcjDtdsviCTZx7m9a9yHIUS8Wa9T7hvqyGTsLHi6Qifn2WUfpAKx9DWp0SJGleIn9vh2YF4A16id93kXFTgIgmwIOvbVAScyrx7yVl6bPZnCx27ec4WQDtaTewC1CpgudeDV2jQQnSaCP6ny3xa8qLH-QUgYqdQuoA_LF1phxgRCUfIrCLQOkolX5nv3ze_f==

Set the Cookie Header. This is especially useful when calling this endpoint from a server-side application. In that scenario you must include the HTTP Cookie Header which originally was included in the request to your server. An example of a session in the HTTP Cookie Header is: ory_kratos_session=a19iOVAbdzdgl70Rq1QZmrKmcjDtdsviCTZx7m9a9yHIUS8Wa9T7hvqyGTsLHi6Qifn2WUfpAKx9DWp0SJGleIn9vh2YF4A16id93kXFTgIgmwIOvbVAScyrx7yVl6bPZnCx27ec4WQDtaTewC1CpgudeDV2jQQnSaCP6ny3xa8qLH-QUgYqdQuoA_LF1phxgRCUfIrCLQOkolX5nv3ze_f==.

It is ok if more than one cookie are included here as all other cookies will be ignored.
Responses
Response samples

    200401403default

Content type
application/json
{

    "active": true,
    "authenticated_at": "2019-08-24T14:15:22Z",
    "authentication_methods": [
        {}
    ],
    "authenticator_assurance_level": "aal0",
    "devices": [
        {}
    ],
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "identity": {
        "created_at": "2019-08-24T14:15:22Z",
        "credentials": {},
        "external_id": "string",
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "metadata_admin": null,
        "metadata_public": null,
        "organization_id": "string",
        "recovery_addresses": [],
        "schema_id": "string",
        "schema_url": "string",
        "state": "active",
        "state_changed_at": "2019-08-24T14:15:22Z",
        "traits": null,
        "updated_at": "2019-08-24T14:15:22Z",
        "verifiable_addresses": []
    },
    "issued_at": "2019-08-24T14:15:22Z",
    "tokenized": "string"

}
Disable one of my sessions

Calling this endpoint invalidates the specified session. The current session cannot be revoked. Session data are not deleted.
path Parameters
id
required
	
string

ID is the session's ID.
header Parameters
X-Session-Token	
string

Set the Session Token when calling from non-browser clients. A session token has a format of MP2YWEMeM8MxjkGKpH4dqOQ4Q4DlSPaj.
Cookie	
string

Set the Cookie Header. This is especially useful when calling this endpoint from a server-side application. In that scenario you must include the HTTP Cookie Header which originally was included in the request to your server. An example of a session in the HTTP Cookie Header is: ory_kratos_session=a19iOVAbdzdgl70Rq1QZmrKmcjDtdsviCTZx7m9a9yHIUS8Wa9T7hvqyGTsLHi6Qifn2WUfpAKx9DWp0SJGleIn9vh2YF4A16id93kXFTgIgmwIOvbVAScyrx7yVl6bPZnCx27ec4WQDtaTewC1CpgudeDV2jQQnSaCP6ny3xa8qLH-QUgYqdQuoA_LF1phxgRCUfIrCLQOkolX5nv3ze_f==.

It is ok if more than one cookie are included here as all other cookies will be ignored.
Responses
Response samples

    400401default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": { },
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
courier

APIs for managing email and SMS message delivery.
List Messages

Lists all messages by given status and recipient.
Authorizations:
oryAccessToken
query Parameters
page_size	
integer <int64> [ 1 .. 1000 ]
Default: 250

Items per Page

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
status	
string (courierMessageStatus)
Enum: "queued" "sent" "processing" "abandoned"

Status filters out messages based on status. If no value is provided, it doesn't take effect on filter.
recipient	
string

Recipient filters out messages based on recipient. If no value is provided, it doesn't take effect on filter.
Responses
Response samples

    200400default

Content type
application/json
[

    {
        "body": "string",
        "channel": "string",
        "created_at": "2019-08-24T14:15:22Z",
        "dispatches": [],
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "recipient": "string",
        "send_count": 0,
        "status": "queued",
        "subject": "string",
        "template_type": "recovery_invalid",
        "type": "email",
        "updated_at": "2019-08-24T14:15:22Z"
    }

]
Get a Message

Gets a specific messages by the given ID.
Authorizations:
oryAccessToken
path Parameters
id
required
	
string

MessageID is the ID of the message.
Responses
Response samples

    200400default

Content type
application/json
{

    "body": "string",
    "channel": "string",
    "created_at": "2019-08-24T14:15:22Z",
    "dispatches": [
        {}
    ],
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "recipient": "string",
    "send_count": 0,
    "status": "queued",
    "subject": "string",
    "template_type": "recovery_invalid",
    "type": "email",
    "updated_at": "2019-08-24T14:15:22Z"

}
metadata

Server Metadata provides relevant information about the running server. Only available when self-hosting this service.
Check HTTP Server Status

This endpoint returns a HTTP 200 status code when Ory Kratos is accepting incoming HTTP requests. This status does currently not include checks whether the database connection is working.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of this service, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200

Content type
application/json
{

    "status": "string"

}
Check HTTP Server and Database Status

This endpoint returns a HTTP 200 status code when Ory Kratos is up running and the environment dependencies (e.g. the database) are responsive as well.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of Ory Kratos, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200503

Content type
application/json
{

    "status": "string"

}
Return Running Software Version.

This endpoint returns the version of Ory Kratos.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of this service, the version will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200

Content type
application/json
{

    "version": "string"

}

oftware Development Kit (SDK)

The Ory Kratos SDK allows for integration with a self-hosted Ory Kratos Identity Server.

Before using the SDK, consult the Ory Kratos REST API documentation.

To view the source code for the generated SDKs, visit the Ory Kratos SDKs GitHub repository. Ory SDKs are generated using the openapi-generator.
Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

    Dart
    .NET
    Elixir
    Go
    Java
    JavaScript with TypeScript definitions and compatible with Node.js, React.js, Angular, Vue.js, and many more.
    PHP
    Python
    Ruby
    Rust

tip

Missing your programming language?
Create an issue and help the Ory team build, test, and publish the SDK for your programming language!
SDK backward compatibility

The Ory SDK uses automated code generation by openapi-generator. openapi-generator can make changes to the generated code with each new version, which breaks backwards compatibility in some cases. As a result, Ory SDK may not be compatible with previous versions.


Go

In this document you can find code examples for a self-hosted Ory Kratos Go SDK.
info

Missing an example? Please create a feature request and it will be added here.

You can find more examples of SDK usage in the auto-generated documentation kratos-client.
Installation

If you are starting from scratch, first set up a new Go project

mkdir myproject
cd myproject
go mod init myproject

Install the Ory Kratos Go SDK

go get  github.com/ory/kratos-client-go@v26.2.0

Configuration

The following code example shows how to set up and configure Ory Kratos using the Go SDK:

package main

import (
	"context"

	client "github.com/ory/kratos-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4434", // Kratos Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	// resp, r, err := apiClient.FrontendAPI.ToSession(context.Background()).Cookie("ory_Kratos_session").Execute()
}

Use Frontend API

The following code examples show how to use the FrontendAPI.
toSession

In this example you make a toSession call to check if the session is active.

    Open the the local hosted UI in your browser
    Sign up and create an account and log in
    Copy the ory_kratos_session cookie from the Application tab in your browser developer tools
    Add the cookie value in cookie
    Run the example and send the request with go run main.go

The response should look like this.

Traits  map[email:youremail@example.com]

package main

import (
	"context"
	"fmt"
	"os"

	client "github.com/ory/kratos-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4433", // Kratos Public API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	cookie := "ory_kratos_session=MTY0ODgyMTExN3xEdi1CQkFFQ180SUFBUkFCRUFBQVJfLUNBQUVHYzNSeWFXNW5EQThBRFhObGMzTnBiMjVmZEc5clpXNEdjM1J5YVc1bkRDSUFJRkZDVFVKbFNIcEJOalZyY0Vad1JEZ3dNMng1V0RsWlpEQlFXa3RoUjNJenzKCLhzCkox1OmvNJlKcqtWuNkSnPLrUgM6Ew2EMYksfg=="
	resp, r, err := apiClient.FrontendApi.ToSession(context.Background()).Cookie(cookie).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FrontendApi.ToSession``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ToSession`: Session
	fmt.Fprintf(os.Stdout, "Traits  %v\n", resp.Identity.Traits)
}

Use Identity Management API

The following code examples show how to use the IdentityAPI requests need to be authorized.
CreateIdentity and DeleteIdentity

package main

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/kratos-client-go"
)

func main() {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4434", // Kratos Admin API
		},
	}
	apiClient := ory.NewAPIClient(configuration)
	CreateIdentityBody := *ory.NewCreateIdentityBody(
		"default",
		map[string]interface{}{
			"email": "foo@example.com",
			"name": map[string]string{
				"first": "foo",
				"last":  "bar",
			},
		},
	) // CreateIdentityBody |  (optional)

	createdIdentity, r, err := apiClient.IdentityApi.CreateIdentity(context.Background()).CreateIdentityBody(CreateIdentityBody).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FrontendApi.CreateIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateIdentity`: Identity
	fmt.Fprintf(os.Stdout, "Created identity with ID: %v\n", createdIdentity.Id)
	getIdentity, r, err := apiClient.IdentityApi.GetIdentity(context.Background(), createdIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FrontendApi.GetIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Fprintf(os.Stdout, "Email for identity with id %v. Traits %v\n", createdIdentity.Id, getIdentity.Traits)

	r, err = apiClient.IdentityApi.DeleteIdentity(context.Background(), getIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FrontendApi.DeleteIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Println("Successfully Removed identity")

}

Gin middleware

The following code example shows how to use the Kratos Go SDK with the Gin Web Framework. Follow the instructions in the README to install Gin.

    Run the Gin middleware with go run main.go
    Open the the local hosted UI in your browser
    Sign up and create an account and log in
    Copy the ory cookie from the Application tab in your browser developer tools
    Add the cookie to the cUrl request below:

curl 'http://localhost:8080/ping' -b 'ory_kratos_session=<your-session-cookie-here>'
pong

package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	ory "github.com/ory/kratos-client-go"
)

type kratosMiddleware struct {
	ory *ory.APIClient
}

func NewMiddleware() *kratosMiddleware {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4434", // Kratos Admin API
		},
	}
	return &kratosMiddleware{
		ory: ory.NewAPIClient(configuration),
	}
}
func (k *kratosMiddleware) Session() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := k.validateSession(c.Request)
		if err != nil {
			c.Redirect(http.StatusMovedPermanently, "http://127.0.0.1:4455/login")
			return
		}
		if !*session.Active {
			c.Redirect(http.StatusMovedPermanently, "http://your_endpoint")
			return
		}
		c.Next()
	}
}
func (k *kratosMiddleware) validateSession(r *http.Request) (*ory.Session, error) {
	cookie, err := r.Cookie("ory_kratos_session")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	resp, _, err := k.ory.FrontendApi.ToSession(context.Background()).Cookie(cookie.String()).Execute()
	if err != nil {
		return nil, err
	}
	return resp, nil
}
func main() {

	r := gin.Default()
	k := NewMiddleware()

	r.Use(k.Session())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

Echo middleware

The following code example shows how to use Kratos Go SDK with the Echo framework. Follow the instructions to install Echo.

    Run the Echo middleware with go run main.go
    Open the the local hosted UI in your browser
    Sign up and create an account and log in
    Copy the ory cookie from the Application tab in your browser developer tools
    Add the cookie to the cUrl request below:

curl 'http://localhost:8080/ping' -b 'ory_kratos_session=<your-session-cookie-here>'
pong

package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"

	ory "github.com/ory/kratos-client-go"
)

type kratosMiddleware struct {
	ory *ory.APIClient
}

func NewMiddleware() *kratosMiddleware {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4433", // Kratos Public API
		},
	}
	return &kratosMiddleware{
		ory: ory.NewAPIClient(configuration),
	}
}
func (k *kratosMiddleware) Session(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, err := k.validateSession(c.Request())
		if err != nil {
			return c.Redirect(http.StatusMovedPermanently, "http://127.0.0.1:4455/login")
		}
		if !*session.Active {
			return c.Redirect(http.StatusMovedPermanently, "http://your_endpoint")
		}
		return next(c)
	}
}
func (k *kratosMiddleware) validateSession(r *http.Request) (*ory.Session, error) {
	cookie, err := r.Cookie("ory_kratos_session")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	resp, _, err := k.ory.FrontendApi.ToSession(context.Background()).Cookie(cookie.String()).Execute()
	if err != nil {
		return nil, err
	}
	return resp, nil
}
func main() {

	k := NewMiddleware()
	e := echo.New()
	e.Use(k.Session)
	e.GET("/hello", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}

Configuration

You can load the config file from another source using the -c path/to/config.yaml or --config path/to/config.yaml flag: $kratos --config path/to/config.yaml.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart. All configuration values can be set using environment variables, as documented below.
Disclaimer

This reference configuration documents all keys, also deprecated ones! It is a reference for all possible configuration values.

If you are looking for an example configuration, it is better to try out the quickstart.

To find out more about edge cases like setting string array values through environmental variables head to the Configuration section.

## Ory Kratos Configuration


selfservice:
  default_browser_return_url: https://my-app.com/dashboard
  allowed_return_urls:
    - https://app.my-app.com/dashboard
    - /dashboard
    - https://www.my-app.com/
    - https://*.my-app.com/
  flows:
    settings:
      ui_url: https://my-app.com/user/settings
      lifespan: 1h
      privileged_session_max_age: 1h
      required_aal: aal1
      after:
        default_browser_return_url: https://my-app.com/dashboard
        password:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        totp:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        oidc:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        webauthn:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        passkey:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        lookup_secret:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        profile:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: web_hook
              config:
                id: ""
                url: http://a.aaa
                method: ""
                headers: {}
                body: file:///path/to/body.jsonnet
                can_interrupt: false
                emit_analytics_event: false
                auth:
                  type: api_key
                  config:
                    name: ""
                    value: ""
                    in: header
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      before:
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
    logout:
      after:
        default_browser_return_url: https://my-app.com/dashboard
    registration:
      enabled: false
      login_hints: false
      ui_url: https://my-app.com/signup
      lifespan: 1h
      before:
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      after:
        default_browser_return_url: https://my-app.com/dashboard
        password:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: session
        webauthn:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: session
        passkey:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: session
        oidc:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: session
        code:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: session
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      enable_legacy_one_step: false
      style: unified
    login:
      ui_url: https://my-app.com/login
      lifespan: 1h
      style: unified
      before:
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      after:
        default_browser_return_url: https://my-app.com/dashboard
        password:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        webauthn:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        passkey:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        oidc:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        code:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        totp:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        lookup_secret:
          default_browser_return_url: https://my-app.com/dashboard
          hooks:
            - hook: revoke_active_sessions
        hooks:
          - hook: revoke_active_sessions
    verification:
      enabled: false
      ui_url: https://my-app.com/verify
      after:
        default_browser_return_url: https://my-app.com/dashboard
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      lifespan: 1h
      before:
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      use: link
      notify_unknown_recipients: false
    recovery:
      enabled: false
      ui_url: https://my-app.com/verify
      after:
        default_browser_return_url: https://my-app.com/dashboard
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      lifespan: 1h
      before:
        hooks:
          - hook: web_hook
            config:
              id: ""
              url: http://a.aaa
              method: ""
              headers: {}
              body: file:///path/to/body.jsonnet
              can_interrupt: false
              emit_analytics_event: false
              auth:
                type: api_key
                config:
                  name: ""
                  value: ""
                  in: header
      use: link
      notify_unknown_recipients: false
    error:
      ui_url: https://my-app.com/kratos-error
  methods:
    b2b:
      config:
        organizations:
          - id: 00000000-0000-0000-0000-000000000000
            label: ACME SSO
            domains:
              - my-app.com
    profile:
      enabled: false
    link:
      enabled: false
      config:
        base_url: https://my-app.com
        lifespan: 1h
    code:
      passwordless_enabled: true
      mfa_enabled: false
      enabled: false
      config:
        lifespan: 1h
        max_submissions: 1
        missing_credential_fallback_enabled: false
    password:
      enabled: false
      config:
        haveibeenpwned_host: ""
        haveibeenpwned_enabled: false
        max_breaches: 0
        ignore_network_errors: false
        min_password_length: 6
        identifier_similarity_check_enabled: false
        migrate_hook:
          enabled: false
          config:
            url: http://a.aaa
            method: POST
            headers: {}
            emit_analytics_event: false
            auth:
              type: api_key
              config:
                name: ""
                value: ""
                in: header
            body: file:///path/to/body.jsonnet
    totp:
      enabled: false
      config:
        issuer: ""
    lookup_secret:
      enabled: false
    webauthn:
      enabled: false
      config:
        passwordless: false
        rp:
          display_name: Ory Foundation
          id: ory.sh
          icon: https://www.ory.sh/an-icon.png
    passkey:
      enabled: false
      config:
        rp:
          display_name: Ory Foundation
          id: ory.sh
          origins:
            - https://www.ory.sh
    oidc:
      enabled: false
      config:
        base_redirect_uri: https://auth.myexample.org/
        providers:
          - id: google
            provider: google
            label: ""
            client_id: ""
            client_secret: ""
            issuer_url: https://accounts.google.com
            auth_url: https://accounts.google.com/o/oauth2/v2/auth
            token_url: https://www.googleapis.com/oauth2/v4/token
            mapper_url: file://path/to/oidc.jsonnet
            scope:
              - offline_access
            microsoft_tenant: common
            subject_source: userinfo
            apple_team_id: KP76DQS54M
            apple_private_key_id: UX56C66723
            apple_private_key: |-
              -----BEGIN PRIVATE KEY-----
              ........
              -----END PRIVATE KEY-----
            requested_claims:
              id_token:
                email: null
                email_verified: null
            organization_id: 12345678-1234-1234-1234-123456789012
            additional_id_token_audiences:
              - 12345678-1234-1234-1234-123456789012
            claims_source: id_token
            pkce: auto
            fedcm_config_url: https://example.com/config.json
            net_id_token_origin_header: https://example.com
            account_linking_mode: confirm_with_existing_credential
database:
  cleanup:
    batch_size: 1
    sleep:
      tables: 0ns
    older_than: 0ns
dsn: "postgres://user:
  password@postgresd:5432/database?sslmode=disable&max_conns=20&max_idle_conns=\
  4"
courier:
  templates:
    recovery:
      invalid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
    recovery_code:
      invalid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
    verification:
      invalid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
    verification_code:
      invalid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
    registration_code:
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
    login_code:
      valid:
        email:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
            html: file://path/to/body.html.gotmpl
          subject: file://path/to/subject.gotmpl
        sms:
          body:
            plaintext: file://path/to/body.plaintext.gotmpl
  template_override_path: /conf/courier-templates
  message_retries: 10
  worker:
    pull_count: -100000000
    pull_wait: 0ns
  delivery_strategy: smtp
  http:
    request_config:
      url: https://example.com/api/v1/email
      method: ""
      headers: {}
      body: file:///path/to/body.jsonnet
      auth:
        type: api_key
        config:
          name: ""
          value: ""
          in: header
  smtp:
    connection_uri: smtps://foo:bar@my-mailserver:1234/?skip_ssl_verify=false
    client_cert_path: ""
    client_key_path: ""
    from_address: aaa@a.aa
    from_name: Bob
    headers:
      X-SES-SOURCE-ARN: arn:aws:ses:us-west-2:123456789012:identity/example.com
      X-SES-FROM-ARN: arn:aws:ses:us-west-2:123456789012:identity/example.com
      X-SES-RETURN-PATH-ARN: arn:aws:ses:us-west-2:123456789012:identity/example.com
    local_name: ""
  channels:
    - id: sms
      type: http
      request_config:
        url: https://example.com/api/v1/email
        method: ""
        headers: {}
        body: file:///path/to/body.jsonnet
        auth:
          type: api_key
          config:
            name: ""
            value: ""
            in: header
oauth2_provider:
  url: https://some-slug.projects.oryapis.com
  headers:
    Authorization: Bearer some-token
  override_return_to: false
preview:
  default_read_consistency_level: strong
serve:
  admin:
    request_log:
      disable_for_health: false
    base_url: https://kratos.private-network:4434/
    host: ""
    port: 4434
    socket:
      owner: ""
      group: ""
      mode: 0
    tls:
      key:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
      cert:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
  public:
    request_log:
      disable_for_health: false
    cors:
      enabled: false
      allowed_origins:
        - https://example.com
        - https://*.example.com
        - https://*.foo.example.com
      allowed_methods:
        - POST
      allowed_headers:
        - ""
      exposed_headers:
        - ""
      allow_credentials: false
      options_passthrough: false
      max_age: 0
      debug: false
    base_url: https://my-app.com/
    host: ""
    port: 4433
    socket:
      owner: ""
      group: ""
      mode: 0
    tls:
      key:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
      cert:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
tracing:
  provider: jaeger
  service_name: Ory Hydra
  deployment_environment: development
  providers:
    jaeger:
      local_agent_address: 127.0.0.1:6831
      sampling:
        server_url: http://localhost:5778/sampling
        trace_id_ratio: 0.5
    zipkin:
      server_url: http://localhost:9411/api/v2/spans
      sampling:
        sampling_ratio: 0.4
    otlp:
      server_url: localhost:4318
      insecure: false
      sampling:
        sampling_ratio: 0.4
      authorization_header: Bearer 2389s8fs9d8fus9f
log:
  level: trace
  leak_sensitive_values: false
  redaction_text: ""
  format: json
identity:
  default_schema_id: ""
  schemas:
    - id: customer
      url: base64://ewogICIkc2NoZW1hIjogImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hIyIsCiAgInR5cGUiOiAib2JqZWN0IiwKICAicHJvcGVydGllcyI6IHsKICAgICJiYXIiOiB7CiAgICAgICJ0eXBlIjogInN0cmluZyIKICAgIH0KICB9LAogICJyZXF1aXJlZCI6IFsKICAgICJiYXIiCiAgXQp9
    - id: employee
      url: https://foo.bar.com/path/to/employee.traits.schema.json
    - id: employee-v2
      url: file://path/to/employee.v2.traits.schema.json
secrets:
  default:
    - ipsumipsumipsumi
  cookie:
    - ipsumipsumipsumi
  pagination:
    - secret used for encryption
    - old secret kept for decryption
    - another old secret kept for decryption
  cipher:
    - ipsumipsumipsumipsumipsumipsumip
hashers:
  algorithm: argon2
  argon2:
    memory: 0B
    iterations: 1
    parallelism: 1
    salt_length: 16
    key_length: 16
    expected_duration: 0ns
    expected_deviation: 0ns
    dedicated_memory: 0B
  bcrypt:
    cost: 4
ciphers:
  algorithm: noop
cookies:
  domain: ""
  path: ""
  secure: ""
  same_site: Strict
session:
  whoami:
    required_aal: aal1
    tokenizer:
      templates:
        a:
          ttl: 0ns
          claims_mapper_url: http://a.aaa
          jwks_url: http://a.aaa
          subject_source: id
  lifespan: 1h
  cookie:
    domain: ""
    name: ""
    persistent: false
    path: ""
    secure: ""
    same_site: Strict
  earliest_possible_extend: 1h
security:
  account_enumeration:
    mitigate: false
version: v0.5.0-alpha.1
dev: false
help: false
sqa-opt-out: false
watch-courier: false
expose-metrics-port: 4434
config:
  - ""
clients:
  http:
    disallow_private_ip_ranges: false
    private_ip_exception_urls:
      - http://a.aaa
  web_hook:
    header_allowlist:
      - ""
feature_flags:
  cacheable_sessions: false
  cacheable_sessions_max_age: 0ns
  use_continue_with_transitions: false
  choose_recovery_address: false
  legacy_continue_with_verification_ui: false
  legacy_require_verified_login_error: false
  faster_session_extend: false
  password_profile_registration_node_group: password
  legacy_oidc_registration_node_group: false
organizations: []
enterprise:
  identity_schema_fallback_url_template: ""
revision: ""



JSON schema and JSON paths

JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It's a IETF (Internet and Engineering Task Force) public standard and is similar to a XML DTD but suited for JSON payloads.

We rely on JSON Schema heavily internally, from configuration validation to generating OpenAPI Spec to writing documentation. By using Ory Kratos, you will be exposed to JSON Schema as it's used for defining Identity Schemas and other things.

To learn more about JSON Schema, head over to json-schema.org/learn/.

Ory Kratos is using JSON Schema Draft7.
JSON Path Syntax

In some cases you can define a JSON Path. We use tidwall/gjson for this. A GJSON Path is a text string syntax that describes a search pattern for quickly retrieving values from a JSON payload.

There are two types of JSON Paths:

    Reading JSON using the GJSON Syntax;
    Writing JSON using the SJSON Syntax.



HTML Form Parser

If you're using HTML Forms to sign users up or update profiles, Ory Kratos needs to assert the type of each field, as HTML Form Field Values are untyped.

Ory Kratos uses the Identity Schema to assert form field types.
Nesting

Assuming this Identity Schema:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "type": "string"
            },
            "last": {
              "type": "string"
            }
          }
        }
      }
    }
  }
}

You could address traits.name.first this with an HTML Input Form:

<input type="text" name="traits.name.last">

Checkboxes

Checkboxes for true / false can be set up as follows. If the value is supposed to be false: not checked:

<input type="hidden" value="false" name="traits.path.to.my.boolean" />
<input type="checkbox" value="true" name="traits.path.to.my.boolean" />
