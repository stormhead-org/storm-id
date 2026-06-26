Introduction to Ory Oathkeeper for Ory Open Source (OSS)
Professional support?

Ory offers support for self-hosted Ory software through the Ory Enterprise License (OEL). Read more about the OEL here.

Ory Oathkeeper authorizes incoming HTTP requests. It can be the Policy Enforcement Point in your cloud architecture, i.e. a reverse proxy in front of your upstream API or web server that rejects unauthorized requests and forwards authorized ones to your server. If you want to use another API Gateway (Kong, Nginx, Envoy, AWS API Gateway, ...), Oathkeeper can also plug into that and act as its Policy Decision Point.

The implemented problem domain and scope is called Zero-Trust Network Architecture, BeyondCorp, and Identity And Access Proxy (IAP).

While Ory Oathkeeper works well with Ory OAuth2 & OpenID Connect (Ory Hydra) and Ory Keto, Ory Oathkeeper can be used standalone and alongside other stacks with adjacent problem domains (Keycloak, Gluu, Vault). Ory Oathkeeper's Access Control Decision API works with

    Emissary-ingress via auth service
    Envoy via the External Authorization HTTP Filter
    AWS API Gateway via Custom Authorizers
    Nginx via Authentication Based on Subrequest Result

among others.
Dependencies

Ory Oathkeeper doesn't have any dependencies to other services. It can work in isolation and doesn't require a database or any other type of persistent storage. Ory Oathkeeper is configurable with yaml configuration files, JSON files, and environment variables.
Operating modes

Starting Oathkeeper via oathkeeper serve exposes two ports: One port serves the reverse proxy, the other Ory Oathkeeper's API.
Reverse proxy

The port exposing the reverse proxy forwards requests to the upstream server, defined in the rule, if the request is allowed. If the request isn't allowed, Ory Oathkeeper doesn't forward the request and instead returns an error message.

Ory Oathkeeper deployed as a Reverse Proxy
Reverse proxy example

Assuming the following request

GET /my-service/whatever HTTP/1.1
Host: oathkeeper-proxy:4455
Authorization: bearer some-token

and you have the following rule defined (which allows this request)

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://oathkeeper-proxy:4455/my-service/whatever",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}

then the request will be forwarded by Ory Oathkeeper as follows:

GET /my-service/whatever HTTP/1.1
Host: my-backend-service:4455
Authorization: bearer some-token

The response of this request will then be sent to the client that made the request to Ory Oathkeeper.
Access Control Decision API

The Ory Oathkeeper Access Control Decision API follows best-practices and works with most (if not all) modern API gateways and reverse proxies. To verify a request, send it to the decisions endpoint located at the Ory Oathkeeper API port. It matches every sub-path and HTTP Method:

    GET /decisions/v1/api
    PUT /decisions/my/other/api
    DELETE /decisions/users?foo=?bar

When matching a rule, the /decisions prefix is stripped from the matching path.

Ory Oathkeeper deployed as an Decision API
Access Control Decision API example

Assuming you are making the following request to Ory Oathkeeper's Access Control Decision API

GET /decisions/my-service/whatever HTTP/1.1
Host: oathkeeper-api:4456
Authorization: bearer some-token

and you have the following rule defined (which allows this request)

{
  "id": "some-id",
  "match": {
    "url": "http://oathkeeper-api:4456/my-service/whatever",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "noop"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}

then this endpoint will directly respond with HTTP Status Code 200:

HTTP/1.1 200 OK
Authorization: bearer some-token

If any other status code is returned, the request must not be allowed, for example:

HTTP/1.1 401 OK
Content-Length: 0
Connection: Closed

It's also possible to have this endpoint return other error responses such as the HTTP Status Found (HTTP Status Code 302), depending configured on the error handling. Use this feature only if your Reverse Proxy supports these type of responses.

Depending on the mutator defined by the access rule, the HTTP Response might contain additional or mutated HTTP Headers:

HTTP/1.1 200 OK
X-User-ID: john.doe

Decision engine

The decision engine allows to configure how Ory Oathkeeper authorizes HTTP requests. Authorization happens in four steps, each of which can be configured:

    Access Rule Matching: Verifies that the HTTP method, path, scheme, and host of the incoming HTTP request conform to your access rules. The information is taken either from the URL, or from the X-Forwarded-Method, X-Forwarded-Proto, X-Forwarded-Host, X-Forwarded-Uri headers (if present) of the incoming request. The request is denied if no access rules match. The configuration of the matching access rule becomes the input for the next steps.
    Authentication: Oathkeeper can validate credentials via a variety of methods like Bearer Token, Basic Authorization, or cookie. Invalid credentials result in denial of the request. The "internal" session state (such as the user ID) of valid (authenticated) credentials becomes input for the next steps.
    Authorization: Access Rules can check permissions. To secure, for example, an API that requires admin privileges, configure the authorizer to check if the user ID from step 2 has the "admin" permission or role. Oathkeeper supports a variety of authorizers. Failed authorization (for example user doesn't have role "admin") results denial of the request.
    Mutation: The Access Rule can add session data to the HTTP request that it forwards to the upstream API. For example, the mutator could add X-User-ID: the-user-id to the HTTP headers or generate a JWT with session information and set it as Authorization: Bearer the.jwt.token.

Additionally, error handling can be configured. You may want to send an application/json response for API clients and a HTTP Redirect response for browsers with an end user.

Ory Oathkeeper Pipeline


Installation

Ory software runs on any operating system (FreeBSD, macOS, Linux, Windows, ...) and supports all major CPU platforms (ARM64, ARMv7, x86_64, x86, ...).

Ory provides pre-built binaries, Docker Images and support various package managers:

    Linux
    macOS
    Windows
    Docker
    Kubernetes
    Download Binaries
    Building from source

Linux

Install Ory Oathkeeper on Linux using bash <(curl ...):

bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b . oathkeeper v26.2.0
./oathkeeper help

You may want to move Ory Oathkeeper to your $PATH:

sudo mv ./oathkeeper /usr/local/bin/
oathkeeper help

macOS

Install Ory Oathkeeper using homebrew on macOS:

brew install ory/tap/oathkeeper
undefined help

Windows

Install Ory Oathkeeper on Windows using Scoop:

scoop bucket add ory https://github.com/ory/scoop.git
scoop install oathkeeper
oathkeeper help

Docker

Ory Oathkeeper is available as a Docker Image for all major platforms (ARM64, AMD64, ...):

docker pull oryd/oathkeeper:v26.2.0
docker run --rm -it oryd/oathkeeper:v26.2.0 help

Kubernetes

A list of available Helm Charts for Kubernetes can be found at k8s.ory.com/helm.
Download Binaries

You can download the client and server binaries on our Github releases page. No installer is available. You have to add the binary to the PATH in your environment yourself, for example by putting it into /usr/local/bin or something comparable.

Once installed, you should be able to run:

oathkeeper help

Building from source

If you wish to compile the binary yourself, you need to install and set up Go 1.17+ and add $GOPATH/bin to your $PATH.
danger

Please note that this will check out the latest commit, which might be not yet released and unstable.

git clone https://github.com/ory/oathkeeper.git
cd oathkeeper
go mod download
go install -tags sqlite,json1,hsm .
$(go env GOPATH)/bin/oathkeeper help

Configuration file

You can load the config file from another source using the -c path/to/config.yaml or --config path/to/config.yaml flag: $oathkeeper --config path/to/config.yaml.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart. All configuration values can be set using environment variables, as documented below.
Disclaimer

This reference configuration documents all keys, also deprecated ones! It is a reference for all possible configuration values.

If you are looking for an example configuration, it is better to try out the quickstart.

To find out more about edge cases like setting string array values through environmental variables head to the Configuration section.

## ORY Oathkeeper Configuration


serve:
  api:
    port: -100000000
    host: localhost
    timeout:
      read: 5s
      write: 5s
      idle: 5s
    cors:
      enabled: false
      allowed_origins:
        - https://example.com
        - https://*.example.com
        - https://*.foo.example.com
      allowed_methods:
        - GET
      allowed_headers:
        - ""
      exposed_headers:
        - ""
      allow_credentials: false
      max_age: -100000000
      debug: false
    tls:
      key:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
      cert:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
  proxy:
    port: -100000000
    host: localhost
    trust_forwarded_headers: false
    timeout:
      read: 5s
      write: 5s
      idle: 5s
    cors:
      enabled: false
      allowed_origins:
        - https://example.com
        - https://*.example.com
        - https://*.foo.example.com
      allowed_methods:
        - GET
      allowed_headers:
        - ""
      exposed_headers:
        - ""
      allow_credentials: false
      max_age: -100000000
      debug: false
    tls:
      key:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
      cert:
        path: path/to/file.pem
        base64: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUlEWlRDQ0FrMmdBd0lCQWdJRVY1eE90REFOQmdr...
  prometheus:
    port: -100000000
    host: localhost
    metrics_path: ""
    metric_name_prefix: ""
    hide_request_paths: false
    collapse_request_paths: false
access_rules:
  repositories:
    - file://path/to/rules.json
    - inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d
    - https://path-to-my-rules/rules.json
    - s3://my-bucket-name/rules.json
    - s3://my-bucket-name/rules.json?endpoint=minio.my-server.net
    - gs://gcp-bucket-name/rules.json
    - azblob://my-blob-container/rules.json
    - https://path-to-my-rules/rules.json
  matching_strategy: glob
authenticators:
  anonymous:
    enabled: true
    config:
      subject: guest
  noop:
    enabled: true
  unauthorized:
    enabled: true
  cookie_session:
    enabled: true
    config:
      check_session_url: https://session-store-host
      only:
        - ""
      preserve_query: false
      preserve_path: false
      preserve_host: false
      force_method: GET
      forward_http_headers: []
      additional_headers: {}
      extra_from: ""
      subject_from: ""
  bearer_token:
    enabled: true
    config:
      check_session_url: https://session-store-host
      token_from: null
      prefix: ""
      preserve_query: false
      preserve_path: false
      preserve_host: false
      force_method: GET
      forward_http_headers: []
      additional_headers: {}
      extra_from: ""
      subject_from: ""
  jwt:
    enabled: true
    config:
      required_scope:
        - ""
      target_audience:
        - ""
      trusted_issuers:
        - ""
      allowed_algorithms:
        - ""
      jwks_urls:
        "0": https://my-website.com/.well-known/jwks.json
        "1": https://my-other-website.com/.well-known/jwks.json
        "2": file://path/to/local/jwks.json
      jwks_max_wait: 100ms
      jwks_ttl: 30m
      scope_strategy: hierarchic
      token_from: null
  oauth2_client_credentials:
    enabled: true
    config:
      token_url: https://my-website.com/oauth2/token
      required_scope:
        - ""
      retry:
        give_up_after: 0ns
        max_delay: 0ns
      cache:
        enabled: true
        ttl: 5s
        max_tokens: -100000000
  oauth2_introspection:
    enabled: true
    config:
      introspection_url: https://my-website.com/oauth2/introspection
      scope_strategy: hierarchic
      pre_authorization:
        enabled: false
        audience: http://www.example.com
        scope:
          "0": foo
          "1": bar
      required_scope:
        - ""
      target_audience:
        - ""
      trusted_issuers:
        - ""
      prefix: ""
      preserve_host: false
      introspection_request_headers: {}
      token_from: null
      retry:
        give_up_after: 0ns
        max_delay: 0ns
      cache:
        enabled: true
        ttl: 5s
        max_cost: -100000000
errors:
  fallback:
    - redirect
  handlers:
    www_authenticate:
      enabled: true
      config:
        realm: ""
        when:
          - error:
              - unauthorized
            request:
              cidr:
                - ""
              header:
                content_type: []
                accept: []
    redirect:
      enabled: true
      config:
        to: http://my-app.com/dashboard
        code: 301
        return_to_query_param: ""
        when:
          - error:
              - unauthorized
            request:
              cidr:
                - ""
              header:
                content_type: []
                accept: []
    json:
      enabled: true
      config:
        verbose: false
        when:
          - error:
              - unauthorized
            request:
              cidr:
                - ""
              header:
                content_type: []
                accept: []
authorizers:
  allow:
    enabled: true
  deny:
    enabled: true
  keto_engine_acp_ory:
    enabled: true
    config:
      base_url: http://my-keto/
      required_action: ""
      required_resource: ""
      subject: ""
      flavor: ""
  remote:
    enabled: true
    config:
      remote: https://host/path
      headers: {}
      forward_response_headers_to_upstream:
        - ""
      retry:
        give_up_after: 0ns
        max_delay: 0ns
  remote_json:
    enabled: true
    config:
      remote: https://host/path
      headers: {}
      payload: '{"subject":"{{ .Subject }}"}'
      forward_response_headers_to_upstream:
        - ""
      retry:
        give_up_after: 0ns
        max_delay: 0ns
mutators:
  noop:
    enabled: true
  cookie:
    enabled: true
    config:
      cookies: {}
  header:
    enabled: true
    config:
      headers: {}
  hydrator:
    enabled: true
    config:
      api:
        url: http://a.aaa
        auth:
          basic:
            username: ""
            password: ""
        retry:
          give_up_after: 0ns
          max_delay: 0ns
      cache:
        enabled: true
        ttl: 0ns
  id_token:
    enabled: true
    config:
      claims: ""
      issuer_url: ""
      jwks_url: https://fetch-keys/from/this/location.json
      ttl: 1h
log:
  level: panic
  format: json
  leak_sensitive_values: false
  redaction_text: ""
  additional_redacted_headers:
    - ""
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
profiling: cpu
version: v0.0.0


Configuration editor
Errors
must have required property 'Session Check URL'
.authenticators.cookie_session.enabled must be equal to constant
'Cookie Session' must match exactly one schema in oneOf
must have required property 'Token Check URL'
.authenticators.bearer_token.enabled must be equal to constant
'Bearer Token' must match exactly one schema in oneOf
must have required property 'token_url'
.authenticators.oauth2_client_credentials.enabled must be equal to constant
'OAuth 2.0 Client Credentials' must match exactly one schema in oneOf
must have required property 'OAuth 2.0 Introspection URL'
.authenticators.oauth2_introspection.enabled must be equal to constant
'OAuth 2.0 Token Introspection' must match exactly one schema in oneOf
must have required property 'Redirect to'
.errors.handlers.redirect.enabled must be equal to constant
'HTTP Redirect Error Handler' must match exactly one schema in oneOf
must have required property 'JSON Error Handler'
.errors.handlers.json.enabled must be equal to constant
'JSON Error Handler' must match exactly one schema in oneOf
must have required property 'Base URL'
must have required property 'required_action'
must have required property 'required_resource'
.authorizers.keto_engine_acp_ory.enabled must be equal to constant
'ORY Keto Access Control Policies Engine' must match exactly one schema in oneOf
must have required property 'Remote Authorizer URL'
.authorizers.remote.enabled must be equal to constant
'Remote' must match exactly one schema in oneOf
must have required property 'Remote Authorizer URL'
must have required property 'JSON Payload'
.authorizers.remote_json.enabled must be equal to constant
'Remote JSON' must match exactly one schema in oneOf
must have required property 'url'
.mutators.hydrator.enabled must be equal to constant
'Hydrator' must match exactly one schema in oneOf
must have required property 'JSON Web Key URL'
must have required property 'Issuer URL'
.mutators.id_token.enabled must be equal to constant
'ID Token (JSON Web Token)' must match exactly one schema in oneOf
ORY Oathkeeper Configuration
HTTP(s)
HTTP REST API
Port
The port to listen on.
Host
The network interface to listen on.
HTTP Timeouts
Control the HTTP timeouts.
HTTP Read Timeout
The maximum duration for reading the entire request, including the body.
HTTP Write Timeout
The maximum duration before timing out writes of the response. Increase this parameter to prevent unexpected closing a client connection if an upstream request is responding slowly.
HTTP Idle Timeout
The maximum amount of time to wait for any action of a request session, reading data or writing the response.
Cross Origin Resource Sharing (CORS)
Configure [Cross Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/) using the following options.
If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.
Enable CORS
Allowed Origins
A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: http://*.domain.com). Usage of wildcards implies a small performance penality. Only one wildcard can be used per origin.
Allowed Origins-1*
Allowed HTTP Methods
A list of methods the client is allowed to use with cross-domain requests.
Allowed Request HTTP Headers
A list of non simple headers the client is allowed to use with cross-domain requests.
Allowed Request HTTP Headers-1*
Allowed Request HTTP Headers-2*
Allowed Response HTTP Headers
Indicates which headers are safe to expose to the API of a CORS API specification
Allowed Response HTTP Headers-1*
Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
Allow HTTP Credentials
Maximum Age
Indicates how long (in seconds) the results of a preflight request can be cached. The default is 0 which stands for no max age.
Set to true to debug server side CORS issues.
Enable Debugging
HTTPS
Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes `export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.
Private Key (PEM)
Path to PEM-encoded Fle
Base64 Encoded Inline
The base64 string of the PEM-encoded file content. Can be generated using for example `base64 -i path/to/file.pem`.
TLS Certificate (PEM)
Path to PEM-encoded Fle
Base64 Encoded Inline
The base64 string of the PEM-encoded file content. Can be generated using for example `base64 -i path/to/file.pem`.
HTTP Reverse Proxy
Port
The port to listen on.
Host
The network interface to listen on. Leave empty to listen on all interfaces.
Trust the X-Forwarded-* headers from the reverse proxy. This is useful when running behind a load balancer or similar. Set this to false if you are not running behind a reverse proxy that prevents Hop-by-Hop attacks.
Trust X-Forwarded Headers
HTTP Timeouts
Control the HTTP timeouts.
HTTP Read Timeout
The maximum duration for reading the entire request, including the body.
HTTP Write Timeout
The maximum duration before timing out writes of the response. Increase this parameter to prevent unexpected closing a client connection if an upstream request is responding slowly.
HTTP Idle Timeout
The maximum amount of time to wait for any action of a request session, reading data or writing the response.
Cross Origin Resource Sharing (CORS)
Configure [Cross Origin Resource Sharing (CORS)](http://www.w3.org/TR/cors/) using the following options.
If set to true, CORS will be enabled and preflight-requests (OPTION) will be answered.
Enable CORS
Allowed Origins
A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: http://*.domain.com). Usage of wildcards implies a small performance penality. Only one wildcard can be used per origin.
Allowed Origins-1*
Allowed HTTP Methods
A list of methods the client is allowed to use with cross-domain requests.
Allowed Request HTTP Headers
A list of non simple headers the client is allowed to use with cross-domain requests.
Allowed Request HTTP Headers-1*
Allowed Request HTTP Headers-2*
Allowed Response HTTP Headers
Indicates which headers are safe to expose to the API of a CORS API specification
Allowed Response HTTP Headers-1*
Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
Allow HTTP Credentials
Maximum Age
Indicates how long (in seconds) the results of a preflight request can be cached. The default is 0 which stands for no max age.
Set to true to debug server side CORS issues.
Enable Debugging
HTTPS
Configure HTTP over TLS (HTTPS). All options can also be set using environment variables by replacing dots (`.`) with underscores (`_`) and uppercasing the key. For example, `some.prefix.tls.key.path` becomes `export SOME_PREFIX_TLS_KEY_PATH`. If all keys are left undefined, TLS will be disabled.
Private Key (PEM)
Path to PEM-encoded Fle
Base64 Encoded Inline
The base64 string of the PEM-encoded file content. Can be generated using for example `base64 -i path/to/file.pem`.
TLS Certificate (PEM)
Path to PEM-encoded Fle
Base64 Encoded Inline
The base64 string of the PEM-encoded file content. Can be generated using for example `base64 -i path/to/file.pem`.
Prometheus scraping endpoint
Port
The port to listen on.
Host
The network interface to listen on. Leave empty to listen on all interfaces.
Path
The path to provide metrics on
Metrix prefix
Prefix appended to Prometheus request metrics
When set to true the request label will be set to an empty value
HidePaths
When set to true the request label will include just the first segment of the request path
CollapsePaths
Access Rules
Configure access rules. All sub-keys support configuration reloading without restarting.
Repositories
Locations (list of URLs) where access rules should be fetched from on boot. It is expected that the documents at those locations return a JSON or YAML Array containing ORY Oathkeeper Access Rules: - If the URL Scheme is `file://`, the access rules (an array of access rules is expected) will be fetched from the local file system. - If the URL Scheme is `inline://`, the access rules (an array of access rules is expected) are expected to be a base64 encoded (with padding!) JSON/YAML string (base64_encode(`[{"id":"foo-rule","authenticators":[....]}]`)). - If the URL Scheme is `http://` or `https://`, the access rules (an array of access rules is expected) will be fetched from the provided HTTP(s) location. - If the URL Scheme is `s3://`, `gs://` or `azblob://`, the access rules (an array of access rules is expected) will be fetched by an object storage (AWS S3, Google Cloud Storage, Azure Blob Storage). S3 storage also supports S3-compatible endpoints served by Minio or Ceph. See aws.ConfigFromURLParams (https://godoc.org/gocloud.dev/aws#ConfigFromURLParams) for more details on supported URL options for S3.
Matching strategy
This an optional field describing matching strategy. Currently supported values are 'glob' and 'regexp'.
Authenticators
For more information on authenticators head over to: https://www.ory.sh/oathkeeper/docs/pipeline/authn
Anonymous
The [`anonymous` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#anonymous).
En-/disables this component.
Enabled
Anonymous Authenticator Configuration
This section is optional when the authenticator is disabled.
Anonymous Subject
Sets the anonymous username.
No Operation (noop)
The [`noop` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#noop).
En-/disables this component.
Enabled
Unauthorized
The [`unauthorized` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#unauthorized).
En-/disables this component.
Enabled
Cookie Session
The [`cookie_session` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#cookie_session).
En-/disables this component.
Enabled

    must be equal to constant

cookie_session
enabled

    must be equal to constant

Cookie Session Authenticator Configuration
This section is optional when the authenticator is disabled.
Session Check URL*
The origin to proxy requests to. If the response is a 200 with body `{ "subject": "...", "extra": {} }`. The request will pass the subject through successfully, otherwise it will be marked as unauthorized. >If this authenticator is enabled, this value is required.

    must have required property 'Session Check URL'

Only Cookies
A list of possible cookies to look for on incoming requests, and will fallthrough to the next authenticator if none of the passed cookies are set on the request.
When unset or set to true, any query parameters specified in `check_session_url` will be preserved instead of overwriting them with the query parameters from the original request
Preserve Query
When set to true, any path specified in `check_session_url` will be preserved instead of overwriting the path with the path from the original request.
Preserve Path
When set to true the HTTP Header X-Forwarded-Host will be set to the original HTTP host.
Preserve Host
Force HTTP Method
When set uses the given HTTP method instead of the request HTTP method.

Unsupported field schema for field root_authenticators_cookie_session_config_forward_http_headers: Missing items definition.

{
  "title": "Set Forward HTTP Headers",
  "type": "array",
  "description": "Set HTTP Headers allowed forwarding to upstream.",
  "additionalProperties": {
    "type": "string"
  },
  "properties": {}
}

Set Additional HTTP Headers
Set additional HTTP Headers for the Session Check URL.
Extra JSON Path
The `extra` field in the ORY Oathkeeper authentication session is set using this JSON Path. Defaults to `extra`, and could be `@this` (for the root element), `foo.bar` (for key foo.bar), or any other valid GJSON path. See [GSJON Syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) for reference.
Subject JSON Path
The `subject` field in the ORY Oathkeeper authentication session is set using this JSON Path. Defaults to `subject`. See [GSJON Syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) for reference.

    must match exactly one schema in oneOf

Bearer Token
The [`bearer_token` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#bearer_token).
En-/disables this component.
Enabled

    must be equal to constant

bearer_token
enabled

    must be equal to constant

Bearer Token Authenticator Configuration
This section is optional when the authenticator is disabled.
Token Check URL*
The origin to proxy requests to. If the response is a 200 with body `{ "subject": "...", "extra": {} }`. The request will pass the subject through successfully, otherwise it will be marked as unauthorized. >If this authenticator is enabled, this value is required.

    must have required property 'Token Check URL'

Token From
token_from
The location of the token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header or query) must be specified.
Token Prefix
The token is considered only if it starts with this string.
When unset or set to true, any query parameters specified in `check_session_url` will be preserved instead of overwriting them with the query parameters from the original request
Preserve Query
When set to true, any path specified in `check_session_url` will be preserved instead of overwriting the path with the path from the original request
Preserve Path
When set to true the HTTP Header X-Forwarded-Host will be set to the original HTTP host.
Preserve Host
Force HTTP Method
When set uses the given HTTP method instead of the request HTTP method.

Unsupported field schema for field root_authenticators_bearer_token_config_forward_http_headers: Missing items definition.

{
  "title": "Set Forward HTTP Headers",
  "type": "array",
  "description": "Set HTTP Headers allowed forwarding to upstream.",
  "additionalProperties": {
    "type": "string"
  },
  "properties": {}
}

Set Additional HTTP Headers
Set additional HTTP Headers for the Session Check URL.
Extra JSON Path
The `extra` field in the ORY Oathkeeper authentication session is set using this JSON Path. Defaults to `extra`, and could be `@this` (for the root element), `foo.bar` (for key foo.bar), or any other valid GJSON path. See [GSJON Syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) for reference.
Subject JSON Path
The `subject` field in the ORY Oathkeeper authentication session is set using this JSON Path. Defaults to `subject`. See [GSJON Syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md) for reference.

    must match exactly one schema in oneOf

JSON Web Token (jwt)
The [`jwt` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#jwt).
En-/disables this component.
Enabled
jwt
enabled
JWT Authenticator Configuration
This section is optional when the authenticator is disabled.
Required Token Scope
An array of OAuth 2.0 scopes that are required when accessing an endpoint protected by this handler. If the token used in the Authorization header did not request that specific scope, the request is denied.
Intended Audience
An array of audiences that are required when accessing an endpoint protected by this handler. If the token used in the Authorization header is not intended for any of the requested audiences, the request is denied.
trusted_issuers
allowed_algorithms
JSON Web Key URLs
URLs where ORY Oathkeeper can retrieve JSON Web Keys from for validating the JSON Web Token. Usually something like "https://my-keys.com/.well-known/jwks.json". The response of that endpoint must return a JSON Web Key Set (JWKS). >If this authenticator is enabled, this value is required.
Max await interval for the JWK fetch
The configuration which sets the max wait threshold when fetching new JWKs
JWK cache TTL configuration
The time interval for which fetched JWKs are cached
Scope Strategy
Sets the strategy validation algorithm.
Token From
token_from
The location of the token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header or query) must be specified.
OAuth 2.0 Client Credentials
The [`oauth2_client_credentials` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#oauth2_client_credentials).
En-/disables this component.
Enabled

    must be equal to constant

oauth2_client_credentials
enabled

    must be equal to constant

OAuth 2.0 Client Credentials Authenticator Configuration
This section is optional when the authenticator is disabled.
token_url*
The OAuth 2.0 Token Endpoint that will be used to validate the client credentials. >If this authenticator is enabled, this value is required.

    must have required property 'token_url'

Request Permissions (Token Scope)
Scopes is an array of OAuth 2.0 scopes that are required when accessing an endpoint protected by this rule. If the token used in the Authorization header did not request that specific scope, the request is denied.
retry
give_up_after
max_delay
cache
En-/disables this component.
Enabled
Cache Time to Live
Can override the default behaviour of using the token exp time, and specify a set time to live for the token in the cache. If the token exp time is lower than the set value the token exp time will be used instead.
Maximum Cached Tokens
Max number of tokens to cache.

    must match exactly one schema in oneOf

OAuth 2.0 Token Introspection
The [`oauth2_introspection` authenticator](https://www.ory.sh/oathkeeper/docs/pipeline/authn#oauth2_introspection).
En-/disables this component.
Enabled

    must be equal to constant

oauth2_introspection
enabled

    must be equal to constant

OAuth 2.0 Introspection Authenticator Configuration
This section is optional when the authenticator is disabled.
OAuth 2.0 Introspection URL*
The OAuth 2.0 Token Introspection endpoint URL. >If this authenticator is enabled, this value is required.

    must have required property 'OAuth 2.0 Introspection URL'

Scope Strategy
Sets the strategy validation algorithm.
Pre-Authorization
Enable pre-authorization in cases where the OAuth 2.0 Token Introspection endpoint is protected by OAuth 2.0 Bearer Tokens that can be retrieved using the OAuth 2.0 Client Credentials grant.
Enabled
OAuth 2.0 Client ID
The OAuth 2.0 Client ID to be used for the OAuth 2.0 Client Credentials Grant. >If pre-authorization is enabled, this value is required.
OAuth 2.0 Client Secret
The OAuth 2.0 Client Secret to be used for the OAuth 2.0 Client Credentials Grant. >If pre-authorization is enabled, this value is required.
OAuth 2.0 Token URL
The OAuth 2.0 Token Endpoint where the OAuth 2.0 Client Credentials Grant will be performed. >If pre-authorization is enabled, this value is required.
OAuth 2.0 Audience
The OAuth 2.0 Audience to be requested during the OAuth 2.0 Client Credentials Grant.
OAuth 2.0 Scope
The OAuth 2.0 Scope to be requested during the OAuth 2.0 Client Credentials Grant.
pre_authorization
enabled

Unsupported field schema for field root_authenticators_oauth2_introspection_config_pre_authorization_enabled: Unknown field type undefined.

{
  "const": false
}

Required Scope
An array of OAuth 2.0 scopes that are required when accessing an endpoint protected by this handler. If the token used in the Authorization header did not request that specific scope, the request is denied.
Target Audience
An array of audiences that are required when accessing an endpoint protected by this handler. If the token used in the Authorization header is not intended for any of the requested audiences, the request is denied.
Trusted Issuers
The token must have been issued by one of the issuers listed in this array.
Token Prefix
The token is considered only if it starts with this string.
When set to true the HTTP Header X-Forwarded-Host will be set to the original HTTP host.
Preserve Host
Introspection Request Headers
Additional headers to be added to the introspection request.
Token From
token_from
The location of the token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header or query) must be specified.
retry
give_up_after
max_delay
cache
En-/disables this component.
Enabled
Cache Time to Live
Can override the default behaviour of using the token exp time, and specify a set time to live for the token in the cache.
Max Cost
Max cost to cache.

    must match exactly one schema in oneOf

Error Handling
Error Handling Fallback
This array defines how to handle errors when no "when" clause matches. If you have, for example, enabled redirect and json in your access rule, you could tell ORY Oathkeeper to try sending JSON if the request does not match the access rule definition
Error Handling Fallback-1*
Individual Error Handler Configuration
HTTP WWW-Authenticate Handler
Responds with the WWW-Authenticate HTTP Response
En-/disables this component.
Enabled
www_authenticate
enabled
WWW-Authenticate Error Handler
This section is optional when the error handler is disabled.
The WWW-Authenticate Realm
This is a message that will be displayed by the browser. Most browsers show a message like "The website says: `,<realm>`". Using a real message is thus more appropriate than a Realm identifier.
Error Handler Conditions
Conditions set under which circumstances an error handler should be responsible for handling the request. If no conditions are given, the error handler will be responsible for all requests. Sections error and request are combined using AND.
HTTP Redirect Error Handler
Responds with a 301/302 HTTP redirect.
En-/disables this component.
Enabled

    must be equal to constant

redirect
enabled

    must be equal to constant

HTTP Redirect Error Handler
This section is optional when the error handler is disabled.
Redirect to*
Set the redirect target. Can either be a http/https URL, or a relative URL.

    must have required property 'Redirect to'

HTTP Redirect Status Code
Defines the HTTP Redirect status code which can bei 301 (Moved Permanently) or 302 (Found).
URL query parameter
Adds the original URL the request tried to access to the query parameter.
Error Handler Conditions
Conditions set under which circumstances an error handler should be responsible for handling the request. If no conditions are given, the error handler will be responsible for all requests. Sections error and request are combined using AND.

    must match exactly one schema in oneOf

JSON Error Handler
Responds with a JSON error response
En-/disables this component.
Enabled

    must be equal to constant

json
enabled

    must be equal to constant

JSON Error Handler
This section is optional when the error handler is disabled.
verbose
Error Handler Conditions
Conditions set under which circumstances an error handler should be responsible for handling the request. If no conditions are given, the error handler will be responsible for all requests. Sections error and request are combined using AND.

    must have required property 'JSON Error Handler'

    must match exactly one schema in oneOf

Authorizers
For more information on authorizers head over to: https://www.ory.sh/oathkeeper/docs/pipeline/authz
Allow
The [`allow` authorizer](https://www.ory.sh/oathkeeper/docs/pipeline/authz#allow).
En-/disables this component.
Enabled
Deny
The [`deny` authorizer](https://www.ory.sh/oathkeeper/docs/pipeline/authz#deny).
En-/disables this component.
Enabled
ORY Keto Access Control Policies Engine
The [`keto_engine_acp_ory` authorizer](https://www.ory.sh/oathkeeper/docs/pipeline/authz#keto_engine_acp_ory).
En-/disables this component.
Enabled

    must be equal to constant

keto_engine_acp_ory
enabled

    must be equal to constant

ORY Keto Access Control Policy Authorizer Configuration
This section is optional when the authorizer is disabled.
Base URL*
The base URL of ORY Keto. >If this authorizer is enabled, this value is required.

    must have required property 'Base URL'

required_action*

    must have required property 'required_action'

required_resource*

    must have required property 'required_resource'

subject
flavor

    must match exactly one schema in oneOf

Remote
The [`remote` authorizer](https://www.ory.sh/oathkeeper/docs/pipeline/authz#remote).
En-/disables this component.
Enabled

    must be equal to constant

remote
enabled

    must be equal to constant

Remote Configuration
This section is optional when the authorizer is disabled.
Remote Authorizer URL*
The URL of the remote authorizer. The remote authorizer is expected to return either 200 OK or 403 Forbidden to allow/deny access. >If this authorizer is enabled, this value is required.

    must have required property 'Remote Authorizer URL'

headers
Allowed Remote HTTP Headers for his Responses
A list of non simple headers the remote is allowed to return to mutate requests.
retry
give_up_after
max_delay

    must match exactly one schema in oneOf

Remote JSON
The [`remote_json` authorizer](https://www.ory.sh/oathkeeper/docs/pipeline/authz#remote_json).
En-/disables this component.
Enabled

    must be equal to constant

remote_json
enabled

    must be equal to constant

Remote JSON Configuration
This section is optional when the authorizer is disabled.
Remote Authorizer URL*
The URL of the remote authorizer. The remote authorizer is expected to return either 200 OK or 403 Forbidden to allow/deny access. >If this authorizer is enabled, this value is required.

    must have required property 'Remote Authorizer URL'

headers
JSON Payload*
The JSON payload of the request sent to the remote authorizer. The string will be parsed by the Go text/template package and applied to an AuthenticationSession object. >If this authorizer is enabled, this value is required.

    must have required property 'JSON Payload'

Allowed Remote HTTP Headers for his Responses
A list of non simple headers the remote is allowed to return to mutate requests.
retry
give_up_after
max_delay

    must match exactly one schema in oneOf

Mutators
For more information on mutators head over to: https://www.ory.sh/oathkeeper/docs/pipeline/mutator
No Operation (noop)
The [`noop` mutator](https://www.ory.sh/oathkeeper/docs/pipeline/mutator#noop).
En-/disables this component.
Enabled
HTTP Cookie
The [`cookie` mutator](https://www.ory.sh/oathkeeper/docs/pipeline/mutator#cookie).
En-/disables this component.
Enabled
cookie
enabled
Cookie Mutator Configuration
This section is optional when the mutator is disabled.
cookies
HTTP Header
The [`header` mutator](https://www.ory.sh/oathkeeper/docs/pipeline/mutator#header).
En-/disables this component.
Enabled
header
enabled
Header Mutator Configuration
This section is optional when the mutator is disabled.
headers
Hydrator
The [`hydrator` mutator](https://www.ory.sh/oathkeeper/docs/pipeline/mutator#hydrator).
En-/disables this component.
Enabled

    must be equal to constant

hydrator
enabled

    must be equal to constant

Hydrator Mutator Configuration
This section is optional when the mutator is disabled.
api
url*

    must have required property 'url'

auth
basic
username*
password*
retry
give_up_after
max_delay
cache
En-/disables this component.
Enabled
Cache Time to Live
How long to cache hydrate calls

    must match exactly one schema in oneOf

ID Token (JSON Web Token)
The [`id_token` mutator](https://www.ory.sh/oathkeeper/docs/pipeline/mutator#id_token).
En-/disables this component.
Enabled

    must be equal to constant

id_token
enabled

    must be equal to constant

ID Token Mutator Configuration
This section is optional when the mutator is disabled.
claims
Issuer URL*
Sets the "iss" value of the ID Token. >If this mutator is enabled, this value is required.

    must have required property 'Issuer URL'

JSON Web Key URL*
Sets the URL where keys should be fetched from. Supports remote locations (http, https) as well as local filesystem paths. >If this mutator is enabled, this value is required.

    must have required property 'JSON Web Key URL'

Expire After
Sets the time-to-live of the JSON Web Token.

    must match exactly one schema in oneOf

Log
Configure logging using the following options. Logs will always be sent to stdout and stderr.
Level
The level of log entries to show. Debug enables stack traces on errors.
Log Format
The output format of log messages.
If set will leak sensitive values (e.g. emails) in the logs.
Leak Sensitive Log Values
Sensitive log value redaction text
Text to use, when redacting sensitive log value.
Additional redacted headers
List of HTTP headers which will be redacted.
tracing
Configure distributed tracing using OpenTelemetry
provider
Set this to the tracing backend you wish to use. Supports Jaeger, Zipkin, and OTEL.
service_name
Specifies the service name to use on the tracer.
deployment_environment
Specifies the deployment environment to use on the tracer.
providers
jaeger
Configures the jaeger tracing backend.
local_agent_address
IPv6 Address and Port

Unsupported field schema for field root_tracing_providers_jaeger_local_agent_address: Unknown field type undefined.

{
  "title": "IPv6 Address and Port",
  "pattern": "^\\[(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\]:([0-9]*)$"
}

The address of the jaeger-agent where spans should be sent to.
sampling
server_url
The address of jaeger-agent's HTTP sampling server
trace_id_ratio
Trace Id ratio sample
zipkin
Configures the zipkin tracing backend.
server_url
The address of the Zipkin server where spans should be sent to.
sampling
sampling_ratio
Sampling ratio for spans.
otlp
Configures the OTLP tracing backend.
server_url
IPv6 Address and Port

Unsupported field schema for field root_tracing_providers_otlp_server_url: Unknown field type undefined.

{
  "title": "IPv6 Address and Port",
  "pattern": "^\\[(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\]:([0-9]*)$"
}

The endpoint of the OTLP exporter (HTTP) where spans should be sent to.
Will use HTTP if set to true; defaults to HTTPS.
insecure
sampling
sampling_ratio
Sampling ratio for spans.
authorization_header
Profiling
Enables CPU or memory profiling if set. For more details on profiling Go programs read [Profiling Go Programs](https://blog.golang.org/profiling-go-programs).
The Oathkeeper version this config is written for.
SemVer according to https://semver.org/ prefixed with `v` as in our releases.

Define WebSockets rules

This guide shows how to use Ory Oathkeeper with WebSockets.
tip

WebSockets bypass Ory Oathkeeper after the first request and thus Ory Oathkeeper only validates cookies once. It is up to your service to make sure that WebSocket connections expire within a reasonable time frame so the session cookie is still active and valid.

Let's create a simple echo WebSocket service that sends back an accepted message. We'll use the Gin Web framework to build our application, and Ory Kratos to handle user login, sign-up, and verification flows.
Install Ory Kratos and Ory Oathkeeper

You can create any directory for testing and create a docker-compose.yml file with the following content:

version: "3.7"
services:
oathkeeper:
  image: oryd/oathkeeper:v26.2.0
  depends_on:
    - kratos
  ports:
    - 8080:4455
    - 4456:4456
  command:
    serve proxy -c "/etc/config/oathkeeper/oathkeeper.yml"
  environment:
    - LOG_LEVEL=debug
  restart: on-failure
  networks:
    - intranet
  volumes:
    - ./oathkeeper:/etc/config/oathkeeper
postgres-kratos:
  image: postgres:12
  environment:
    - POSTGRES_USER=kratos
    - POSTGRES_PASSWORD=secret
    - POSTGRES_DB=kratos
  networks:
    - intranet
kratos-migrate:
  image: oryd/kratos:v26.2.0
  links:
    - postgres-kratos:postgres-kratos
  environment:
    - DSN=postgres://kratos:secret@postgres-kratos:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4
  networks:
    - intranet
  volumes:
    - type: bind
      source: ./kratos
      target: /etc/config/kratos
  command: -c /etc/config/kratos/kratos.yml migrate sql -e --yes
kratos:
  image: oryd/kratos:v26.2.0
  links:
    - postgres-kratos:postgres-kratos
  environment:
    - DSN=postgres://kratos:secret@postgres-kratos:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4
  ports:
    - '4433:4433'
    - '4434:4434'
  volumes:
    - type: bind
      source: ./kratos
      target: /etc/config/kratos
  networks:
    - intranet
  command: serve -c /etc/config/kratos/kratos.yml --dev --watch-courier
kratos-selfservice-ui-node:
  image: oryd/kratos-selfservice-ui-node:latest
  environment:
    - KRATOS_PUBLIC_URL=http://kratos:4433/
    - KRATOS_BROWSER_URL=http://127.0.0.1:4433/
    - CSRF_COOKIE_NAME=ax-csrf-cookie
    - COOKIE_SECRET=I_AM_VERY_SECRET
    - CSRF_COOKIE_SECRET=I_AM_VERY_SECRET_TOO
  networks:
    - intranet
  ports:
    - "4455:3000"
  restart: on-failure
mailslurper:
  image: oryd/mailslurper:latest-smtps
  ports:
    - '4436:4436'
    - '4437:4437'
  networks:
    - intranet
networks:
intranet:

This example uses the following network architecture:

    4433 port is the public ("browser") API of Ory Kratos.
    4434 is the admin API of Ory Kratos.
    4455 is a port for the user interface implemented by the reference self-service UI.
    8080 is a port of Ory Oathkeeper.

Other ports and services are available only in the internal network.
Configure Ory Oathkeeper and Ory Kratos

    Create a kratos folder and fetch configuration files:

mkdir kratos
wget https://raw.githubusercontent.com/ory/kratos/v26.2.0/contrib/quickstart/kratos/email-password/identity.schema.json -O kratos/identity.schema.json
wget https://raw.githubusercontent.com/ory/kratos/v26.2.0/contrib/quickstart/kratos/email-password/kratos.yml -O kratos/kratos.yml

    Create a oathkeeper folder and oathkeeper/oathkeeper.yml with the following content:

log:
  level: debug
  format: json

serve:
  proxy:
    cors:
      enabled: true
      allowed_origins:
        - http://127.0.0.1:8080
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE
      allowed_headers:
        - Authorization
        - Content-Type
      exposed_headers:
        - Content-Type
      allow_credentials: true
      debug: true

errors:
  fallback:
    - json

  handlers:
    redirect:
      enabled: true
      config:
        to: http://127.0.0.1:4455/login
        when:
          - error:
              - unauthorized
              - forbidden
            request:
              header:
                accept:
                  - text/html
    json:
      enabled: true
      config:
        verbose: true

access_rules:
  matching_strategy: glob
  repositories:
    - file:///etc/config/oathkeeper/access-rules.yml

authenticators:
  anonymous:
    enabled: true
    config:
      subject: guest

  cookie_session:
    enabled: true
    config:
      check_session_url: http://kratos:4433/sessions/whoami
      preserve_path: true
      extra_from: "@this"
      subject_from: "identity.id"
      only:
        - ory_kratos_session

  noop:
    enabled: true

authorizers:
  allow:
    enabled: true

mutators:
  noop:
    enabled: true

    Create oathkeeper/access-rules.yml with the following content:

- id: "ws:protected"
  upstream:
    preserve_host: true
    url: "http://ws:8080"
  match:
    url: "http://127.0.0.1:8080/<**>"
    methods:
      - GET
      - POST
  authenticators:
    - handler: cookie_session
  mutators:
    - handler: noop
  authorizer:
    handler: allow
  errors:
    - handler: redirect
      config:
        to: http://127.0.0.1:4455/login

This configuration of Ory Oathkeeper uses the cookie authenticator against Ory Kratos and proxies only authenticated requests to http://ws:8080 upstream. The ws hostname is resolved through the Docker network. If you aren't deploying your application within Docker, this would just be your localhost IP.
WebSocket service

    Let's create a folder ws and create our WebSocket service using Go and Gin framework. Create ws/main.go file with the following content:

// Copyright © 2026 Ory Corp

package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func main() {

	r := gin.Default()
	r.LoadHTMLFiles("index.html")

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
		return
	})

	r.GET("/ws", func(c *gin.Context) {
		var wsupgrader = websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		}
		conn, err := wsupgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Printf("Failed to set websocket upgrade: %+v\n", err)
			return
		}

		for {
			t, msg, err := conn.ReadMessage()
			if err != nil {
				break
			}
			conn.WriteMessage(t, msg)
		}
		return
	})

	r.Run(":8080")
}

    We need to initialize go modules by running the following commands:

cd ws
go mod init ws
go mod tidy

    Create ws/index.html file with the following content:

<html>
  <head>
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  </head>

  <body>
    <h3>WebSocket Go</h3>
    <pre id="output"></pre>

    <script>
      url = "ws://127.0.0.1:8080/ws"
      c = new WebSocket(url)

      send = function (data) {
        $("#output").append(new Date() + " ==> " + data + "\n")
        c.send(data)
      }

      c.onmessage = function (msg) {
        $("#output").append(new Date() + " <== " + msg.data + "\n")
        console.log(msg)
      }

      c.onopen = function () {
        setInterval(function () {
          send("ping")
        }, 1000)
      }
    </script>
  </body>
</html>

    Create ws/Dockerfile with the following content:

FROM golang as builder

RUN mkdir /build

ADD . /build

WORKDIR /build
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ws main.go

FROM alpine
EXPOSE 8090

COPY --from=builder /build/ws /ws
COPY index.html /index.html
ENTRYPOINT ["/ws"]

    We need to add our ws service to the docker-compose.yml

services:
---
ws:
  build:
    context: "ws"
  networks:
    - intranet

Testing

    Run docker-compose up.
    Wait for services to be ready.
    Open http://127.0.0.1:4455.
    Create a new account.
    Open http://127.0.0.1:8080.



Traefik proxy integration

Traefik is modern HTTP proxy and load balancer for microservices, oathkeeper can be integrated with via the ForwardAuth Middleware by making use of the available Access Control Decision API.

To achieve this,

    configure traefik
        to make use of the aforesaid ForwardAuth middleware by setting the address property to the decision URL endpoint and
        by including the required header name(s), the oathkeeper sets in the HTTP responses into the authResponseHeaders property.
    configure the route of your service to make use of this middleware

Example (using Docker labels):

edge-router:
  image: traefik
  # further configuration
  labels:
    - traefik.http.middlewares.oathkeeper.forwardauth.address=http://oathkeeper:4456/decisions
    - traefik.http.middlewares.oathkeeper.forwardauth.authResponseHeaders=X-Id-Token,Authorization
    # further labels

service:
  image: my-service
  # further configuration
  labels:
    - traefik.http.routers.service.middlewares=oathkeeper
    # further labels


API access rules

Ory Oathkeeper reaches decisions to allow or deny access by applying Access Rules. Access Rules can be stored on the file system, set as an environment variable, or fetched from HTTP(s) remotes. These repositories can be configured in the configuration file (oathkeeper -c ./path/to/config.yml ...)

# Configures Access Rules
access_rules:
  # Locations (list of URLs) where access rules should be fetched from on boot.
  # It's expected that the documents at those locations return a JSON or YAML Array containing Ory Oathkeeper Access Rules.
  repositories:
    # If the URL Scheme is `file://`, the access rules (an array of access rules is expected) will be
    # fetched from the local file system.
    - file://path/to/rules.json
    # If the URL Scheme is `inline://`, the access rules (an array of access rules is expected)
    # are expected to be a base64 encoded (with padding!) JSON/YAML string (base64_encode(`[{"id":"foo-rule","authenticators":[....]}]`)):
    - inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d
    # If the URL Scheme is `http://` or `https://`, the access rules (an array of access rules is expected) will be
    # fetched from the provided HTTP(s) location.
    - https://path-to-my-rules/rules.json
    # If the URL Scheme is `s3://`, `gs://` or `azblob://`, the access rules (an array of access rules is expected)
    # will be fetched by an object storage (AWS S3, Google Cloud Storage, Azure Blob Storage).
    #
    # S3 storage also supports S3-compatible endpoints served by Minio or Ceph.
    # See aws.ConfigFromURLParams (https://godoc.org/gocloud.dev/aws#ConfigFromURLParams) for more details on supported URL options for S3.
    - s3://my-bucket-name/rules.json
    - s3://my-bucket-name/rules.json?endpoint=minio.my-server.net
    - gs://gcp-bucket-name/rules.json
    - azblob://my-blob-container/rules.json
  # Determines a matching strategy for the access rules . Supported values are `glob` and `regexp`. Empty string defaults to regexp.
  matching_strategy: glob

or by setting the equivalent environment variable:

export ACCESS_RULES_REPOSITORIES='file://path/to/rules.json,https://path-to-my-rules/rules.json,inline://W3siaWQiOiJmb28tcnVsZSIsImF1dGhlbnRpY2F0b3JzIjpbXX1d'

The repository (file, inline, remote) must be formatted either as a JSON or a YAML array containing the access rules:

cat ./rules.json
[{
    "id": "my-first-rule"
},{
    "id": "my-second-rule"
}]

cat ./rules.yaml
- id: my-first-rule
  version: v0.36.0-beta.4
  authenticators:
    - handler: noop
- id: my-second-rule
  version: v0.36.0-beta.4
  authorizer:
    handler: allow

Access rule format

Access Rules have four principal keys:

    id (string): The unique ID of the Access Rule.

    version (string): The version of Ory Oathkeeper uses Semantic Versioning. Please use vMAJOR.MINOR.PATCH notation format. Ory Oathkeeper can migrate access rules across versions. If left empty Ory Oathkeeper will assume that the rule uses the same tag as the running version. Examples: v0.1.3 or v1.2.3

    upstream (object): The location of the server where requests matching this rule should be forwarded to. This only needs to be set when using the Ory Oathkeeper Proxy as the Decision API doesn't forward the request to the upstream.
        url (string): The URL the request will be forwarded to.
        preserve_host (bool): If set to false (default), the forwarded request will include the host and port of the url value. If true, the host and port of the Ory Oathkeeper Proxy will be used instead:
            false: Incoming HTTP Header Host: mydomain.com-> Forwarding HTTP Header Host: someservice.intranet.mydomain.com:1234
        strip_path (string): If set, replaces the provided path prefix when forwarding the requested URL to the upstream URL:
            set to /api/v1: Incoming HTTP Request at /api/v1/users -> Forwarding HTTP Request at /users.
            unset: Incoming HTTP Request at /api/v1/users -> Forwarding HTTP Request at /api/v1/users.

    match (object): Defines the URL(s) this Access Rule should match.

        methods (string[]): Array of HTTP methods (for example GET, POST, PUT, DELETE, ...).

        url (string): The URL that should be matched. You can use regular expressions or glob patterns in this field to match more than one url. The matching strategy (glob or regexp) is defined in the global configuration file as access_rules.matching_strategy. This matcher ignores query parameters. Regular expressions (or glob patterns) are encapsulated in brackets < and >.

        Regular expressions examples:
            https://mydomain.com/ matches https://mydomain.com/ and doesn't match https://mydomain.com/foo or https://mydomain.com.
            <https|http>://mydomain.com/<.*> matches:https://mydomain.com/ or http://mydomain.com/foo. Doesn't match: https://other-domain.com/ or https://mydomain.com.
            http://mydomain.com/<[[:digit:]]+> matches http://mydomain.com/123 and doesn't match http://mydomain/abc.
            http://mydomain.com/<(?!protected).*> matches http://mydomain.com/resource and doesn't match http://mydomain.com/protected

        Glob patterns examples:
            https://mydomain.com/<m?n> matches https://mydomain.com/man and does not match http://mydomain.com/foo.
            https://mydomain.com/<{foo*,bar*}> matches https://mydomain.com/foo or https://mydomain.com/bar and doesn't match https://mydomain.com/any.

    authenticators: A list of authentication handlers that authenticate the provided credentials. Authenticators are checked iteratively from index 0 to n and the first authenticator to return a positive result will be the one used. If you want the rule to first check a specific authenticator before "falling back" to others, have that authenticator as the first item in the array. For the full list of available authenticators, click here.

    authorizer: The authorization handler which will try to authorize the subject ("user") from the previously validated credentials making the request. For example, you could check if the subject ("user") is part of the "admin" group or if he/she has permission to perform that action. For the full list of available authorizers, click here.

    mutators: A list of mutation handlers that transform the HTTP request before forwarding it. A common use case is generating a new set of credentials (for example JWT) which then will be forwarded to the upstream server. When using Ory Oathkeeper's Decision API, it's expected that the API Gateway forwards the mutated HTTP Headers to the upstream server. For the full list of available mutators, click here.

    errors: A list of error handlers that are executed when any of the previous handlers (for example authentication) fail. Error handlers define what to do in case of an error, for example redirect the user to the login endpoint when a unauthorized (HTTP Status Code 401) error occurs. If left unspecified, errors will always be handled as JSON responses unless the global configuration key errors.fallback was changed. For more information on error handlers, click here.

Examples

Rule in JSON format:

{
  "id": "some-id",
  "version": "v0.36.0-beta.4",
  "upstream": {
    "url": "http://my-backend-service",
    "preserve_host": true,
    "strip_path": "/api/v1"
  },
  "match": {
    "url": "http://my-app/some-route/<.*>",
    "methods": ["GET", "POST"]
  },
  "authenticators": [{ "handler": "noop" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }],
  "errors": [{ "handler": "json" }]
}

Rule in YAML format:

id: some-id
version: v0.36.0-beta.4
upstream:
  url: http://my-backend-service
  preserve_host: true
  strip_path: /api/v1
match:
  url: http://my-app/some-route/<.*>
  methods:
    - GET
    - POST
authenticators:
  - handler: noop
authorizer:
  handler: allow
mutators:
  - handler: noop
errors:
  - handler: json

Handler configuration

Handlers (Authenticators, Mutators, Authorizers, Errors) sometimes require configuration. The configuration can be defined globally as well as per Access Rule. The configuration from the Access Rules overrides values from the global configuration.

oathkeeper.yml

authenticators:
  anonymous:
    enabled: true
    config:
      subject: anon

rule.json

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service",
    "preserve_host": true,
    "strip_path": "/api/v1"
  },
  "match": {
    "url": "http://my-app/some-route/<.*>",
    "methods": ["GET", "POST"]
  },
  "authenticators": [{ "handler": "anonymous", "config": { "subject": "anon" } }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}

Scoped credentials

Some credentials are scoped. For example, OAuth 2.0 Access Tokens usually are scoped ("OAuth 2.0 Scope"). Scope validation depends on the meaning of the scope. Therefore, wherever Ory Oathkeeper validates a scope, these scope strategies are supported:

    hierarchic: Scope foo matches foo, foo.bar, foo.baz but not bar
    wildcard: Scope foo.* matches foo, foo.bar, foo.baz but not bar. Scope foo matches foo but not foo.bar nor bar
    exact: Scope foo matches foo but not bar nor foo.bar
    none: Scope validation is disabled. If however a scope is configured to be validated, the request will fail with an error message.

Match strategy behavior

With the Regular expression strategy, you can use the extracted groups in all handlers where the substitutions are supported by using the Go text/template package, receiving the AuthenticationSession struct:

type AuthenticationSession struct {
  Subject      string
  Extra        map[string]interface{}
  Header       http.Header
  MatchContext MatchContext
}

type MatchContext struct {
  RegexpCaptureGroups []string
  URL                 *url.URL
}

If the match URL is <https|http>://mydomain.com/<.*> and the request is http://mydomain.com/foo, the MatchContext field will contain

    RegexpCaptureGroups: ["http", "foo"]
    URL: "http://mydomain.com/foo"


Access rule pipeline

Read more about the principal components and execution pipeline of access rules if you haven't already. This chapter explains the different pipeline handlers available to you:

    Authentication handlers inspect HTTP requests (for example the HTTP Authorization Header) and execute some business logic that return true (for authentication ok) or false (for authentication invalid) as well as a subject ("user"). The subject is typically the "user" that made the request, but it could also be a machine (if you have machine-2-machine interaction) or something different.
    Authorization handlers: ensure that a subject ("user") has the right permissions. For example, a specific endpoint might only be accessible to subjects ("users") from group "admin". The authorizer handles that logic.
    Mutation handlers: transforms the credentials from incoming requests to credentials that your backend understands. For example, the Authorization: basic header might be transformed to X-User: <subject-id>. This allows you to write backends that don't care if the original request was an anonymous one, an OAuth 2.0 Access Token, or some other credential type. All your backend has to do is understand, for example, the X-User:.
    Error handlers: are responsible for executing logic after, for example, authentication or authorization failed. Ory Oathkeeper supports different error handlers and we will add more as the project progresses.

Templating

Some handlers such as the ID Token Mutator support templating using Golang Text Templates (examples). The sprig is also supported, on top of these two functions:

var _ = template.FuncMap{
    "print": func(i interface{}) string {
        if i == nil {
            return ""
        }
        return fmt.Sprintf("%v", i)
    },
    "printIndex": func(element interface{}, i int) string {
        if element == nil {
            return ""
        }

        list := reflect.ValueOf(element)

        if list.Kind() == reflect.Slice && i < list.Len() {
            return fmt.Sprintf("%v", list.Index(i))
        }

        return ""
    },
}

Session

In all configurations supporting templating instructions, it's possible to use the AuthenticationSession struct content.

type AuthenticationSession struct {
  Subject      string
  Extra        map[string]interface{}
  Header       http.Header
  MatchContext MatchContext
}

type MatchContext struct {
  RegexpCaptureGroups []string
  URL                 *url.URL
  Method              string
  Header              http.Header
}

RegexpCaptureGroups
Configuration Examples

To use the subject extract to the token

{ "config_field": "{{ print .Subject }}" }

To use any arbitrary header value from the request headers

{ "config_field": "{{ .MatchContext.Header.Get \"some_header\" }}" }

To use an embedded value in the Extra map (most of the time, it's a JWT token claim)

{ "config_field": "{{ print .Extra.some.arbitrary.data }}" }

To use a Regex capture from the request URL Note the usage of printIndex to print a value from the array

{
  "claims": "{\"aud\": \"{{ print .Extra.aud }}\", \"resource\": \"{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}\""
}

To display a string array to JSON format, we can use the fmt printf function

{
  "claims": "{\"aud\": \"{{ print .Extra.aud }}\", \"scope\": {{ printf \"%+q\" .Extra.scp }}}"
}

Note that the AuthenticationSession struct has a field named Extra which is a map[string]interface{}, which receives varying introspection data from the authentication process. Because the contents of Extra are so variable, nested and potentially non-existent values need special handling by the text/template parser, and a print FuncMap function has been provided to ensure that non-existent map values will simply return an empty string, rather than <no value>.

If you find that your field contain the string <no value> then you have most likely omitted the print function, and it's recommended you use it for all values out of an abundance of caution and for consistency.

In the same way, a printIndex FuncMap function is provided to avoid out of range exception to access in a array. It can be useful for the regexp captures which depend of the request.


Authenticators

An authenticator is responsible for authenticating request credentials. Ory Oathkeeper supports different authenticators and we will add more as the project progresses.

An authenticator inspects the HTTP request (for example the HTTP Authorization Header) and executes some business logic that returns true (for authentication ok) or false (for authentication invalid) as well as a subject ("user"). The subject is typically the "user" that made the request, but it could also be a machine (if you have machine-2-machine interaction) or something different.

Each authenticator has two keys:

    handler (string, required): Defines the handler (for example noop) to be used.
    config (object, optional): Configures the handler. Configuration keys vary per handler. The configuration can be defined in the global configuration file, or per access rule.

{
  "authenticators": [
    {
      "handler": "noop",
      "config": {}
    }
  ]
}

You can define more than one authenticator in the Access Rule. The first authenticator that's able to handle the credentials will be consulted and other authenticators will be ignored:

{
  "authenticators": [
    {
      "handler": "a"
    },
    {
      "handler": "b"
    },
    {
      "handler": "c"
    }
  ]
}

If handler a is able to handle the provided credentials, then handler b and c will be ignored. If handler a can't handle the provided credentials but handler b can, then handler a and c will be ignored. Handling the provided credentials means that the authenticator knows how to handle, for example, the Authorization: basic header. It doesn't mean that the credentials are valid! If a handler encounters invalid credentials, then other handlers will be ignored too.
noop

The noop handler tells Ory Oathkeeper to bypass authentication, authorization, and mutation. This implies that no authorization will be executed and no credentials will be issued. It's basically a pass-all authenticator that allows any request to be forwarded to the upstream URL.

    Using this handler is basically an allow-all configuration. It makes sense when the upstream handles access control itself or doesn't need any type of access control.

noop configuration

This handler isn't configurable.

To enable this handler, set:

# Global configuration file oathkeeper.yml
authenticators:
  noop:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

noop access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "noop"
  }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed!

unauthorized

The unauthorized handler tells Ory Oathkeeper to reject all requests as unauthorized.
unauthorized Configuration

This handler isn't configurable.

To enable this handler, set:

# Global configuration file oathkeeper.yml
unauthorized:
  # Set 'enabled' to 'true' if the authenticator should be enabled and 'false' to disable the authenticator. Defaults to 'false'.
  enabled: true

unauthorized access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "unauthorized"
  }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Unauthorized

anonymous

The anonymous authenticator checks whether or not an Authorization header is set. If not, it will set the subject to anonymous.
anonymous Configuration

    subject (string, optional) - Sets the anonymous username. Defaults to "anonymous". Common names include "guest", "anon", "anonymous", "unknown".

# Global configuration file oathkeeper.yml
authenticators:
  anonymous:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      subject: guest

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: anonymous
    config:
      subject: guest

anonymous access rule example

The following rule allows all requests to GET http://my-app/some-route and sets the subject name to the anonymous username, as long as no Authorization header is set in the HTTP request:

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "anonymous"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed! The subject is: "anonymous"

curl -X GET -H "Authorization: Bearer foobar" http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because credentials have been provided but only the anonymous
authenticator is enabled for this URL.

cookie_session

The cookie_session authenticator will forward the request method, path and headers to a session store. If the session store returns 200 OK and body { "subject": "...", "extra": {} } then the authenticator will set the subject appropriately. Please note that Gzipped responses from check_session_url are not supported, and will fail silently.
cookie_session configuration

    check_session_url (string, required) - The session store to forward request method/path/headers to for validation.
    only ([]string, optional) - If set, only requests that have at least one of the set cookies will be forwarded, others will be passed to the next authenticator. If unset, all requests are forwarded.
    preserve_path (boolean, optional) - If set, any path in check_session_url will be preserved instead of replacing the path with the path of the request being checked.
    preserve_query (boolean, optional) - If unset or true, query parameters in check_session_url will be preserved instead of replacing them with the query of the request being checked.
    force_method (string, optional) - If set uses the given HTTP method when forwarding the request, instead of the original HTTP method.
    extra_from (string, optional - defaults to extra) - A GJSON Path pointing to the extra field. This defaults to extra, but it could also be @this (for the root element), session.foo.bar for { "subject": "...", "session": { "foo": {"bar": "whatever"} } }, and so on.
    subject_from (string, optional - defaults to subject) - A GJSON Path pointing to the subject field. This defaults to subject. Example: identity.id for { "identity": { "id": "1234" } }.
    additional_headers (map[string]string, optional - defaults empty) - If set, you can either add additional headers or override existing ones.
    forward_http_headers ([]string, optional - defaults ["Authorization", "Cookie"]) - If set, you can specify which headers will be forwarded.

# Global configuration file oathkeeper.yml
authenticators:
  cookie_session:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      check_session_url: https://session-store-host

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host
      only:
        - sessionid

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host
      only:
        - sessionid
      forward_http_headers:
        - Connect
        - Authorization
        - Cookie
        - X-Forwarded-For

# Some Access Rule Preserving Path: access-rule-2.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: cookie_session
    config:
      check_session_url: https://session-store-host/check-session
      only:
        - sessionid
      preserve_path: true
      preserve_query: true

cookie_session access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "cookie_session"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET -b sessionid=abc http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

curl -X GET -b sessionid=def http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

bearer_token

The bearer_token authenticator will forward the request method, path and headers to a session store. If the session store returns 200 OK and body { "subject": "...", "extra": {} } then the authenticator will set the subject appropriately. Please note that Gzipped responses from check_session_url are not supported, and will fail silently.
bearer_token configuration

    check_session_url (string, required) - The session store to forward request method/path/headers to for validation.
    preserve_path (boolean, optional) - If set, any path in check_session_url will be preserved instead of replacing the path with the path of the request being checked.
    preserve_query (boolean, optional) - If unset or true, query parameters in check_session_url will be preserved instead of replacing them with the query of the request being checked.
    force_method (string, optional) - If set uses the given HTTP method when forwarding the request, instead of the original HTTP method.
    extra_from (string, optional - defaults to extra) - A GJSON Path pointing to the extra field. This defaults to extra, but it could also be @this (for the root element), session.foo.bar for { "subject": "...", "session": { "foo": {"bar": "whatever"} } }, and so on.
    subject_from (string, optional - defaults to sub) - A GJSON Path pointing to the sub field. This defaults to sub. Example: identity.id for { "identity": { "id": "1234" } }.
    token_from (object, optional) - The location of the bearer token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
        header (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request authentication. It can't be set along with query_parameter or cookie.
        query_parameter (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or cookie.
        cookie (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or query_parameter
    forward_http_headers ([]string, optional - defaults ["Authorization", "Cookie"]) - If set, you can specify which headers will be forwarded.
    prefix (string, optional) - If the bearer token does not begin with this prefix, the bearer_token authenticator will not handle the request.

# Global configuration file oathkeeper.yml
authenticators:
  bearer_token:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      check_session_url: https://session-store-host
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token

# Some Access Rule Preserving Path: access-rule-2.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host/check-session
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      preserve_path: true
      preserve_query: true
      forward_http_headers:
        - Authorization
        - Cookie
        - X-Forwarded-For

# Some Access Rule Handling a Token with a Specified Prefix: access-rule-3.yaml
id: access-rule-2
# match: ...
# upstream: ...
authenticators:
  - handler: bearer_token
    config:
      check_session_url: https://session-store-host/check-session
      token_from:
        header: Authorization
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      # Will only handle requests with Authorization: bearer custom_token_prefix_xxxxxx
      prefix: "custom_token_prefix_"

bearer_token access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "bearer_token"
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET -H 'Authorization: Bearer valid-token' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

oauth2_client_credentials

This oauth2_client_credentials uses the username and password from HTTP Basic Authorization (Authorization: Basic base64(<username:password>) to perform the OAuth 2.0 Client Credentials grant in order to detect if the provided credentials are valid.

This authenticator will use the username from the HTTP Basic Authorization header as the subject for this request.

    If you are unfamiliar with OAuth 2.0 Client Credentials we recommend reading this guide.

oauth2_client_credentials configuration

    token_url (string, required) - The OAuth 2.0 Token Endpoint that will be used to validate the client credentials.
    retry (object, optional) - Configures timeout and delay settings for the request against the token endpoint
        give_up_after (string) timeout
        max_delay (string) time to wait between retries
    cache (object, optional) - Enables caching of requested tokens
        enabled (bool, optional) - Enable the cache, will use exp time of token to determine when to evict from cache. Defaults to false.
        ttl (string) - Can override the default behavior of using the token exp time, and specify a set time to live for the token in the cache. If the token exp time is lower than the set value the token exp time will be used instead.
        max_tokens (int) - Max number of tokens to cache. Defaults to 1000.
    required_scope ([]string, optional) - Sets what scope is required by the URL and when making performing OAuth 2.0 Client Credentials request, the scope will be included in the request:

# Global configuration file oathkeeper.yml
authenticators:
  oauth2_client_credentials:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      token_url: https://my-website.com/oauth2/token

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: oauth2_client_credentials
    config:
      token_url: https://my-website.com/oauth2/token

oauth2_client_credentials access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "oauth2_client_credentials",
    "config": {
      "required_scope": ["scope-a", "scope-b"]
    }
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET --user idonotexist:whatever http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET --user peter:somesecret http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

In the background, a request to the OAuth 2.0 Token Endpoint (value of authenticators.oauth2_client_credentials.token_url) will be made, using the OAuth 2.0 Client Credentials Grant:

POST /oauth2/token HTTP/1.1
Host: authorization-server.com

grant_type=client_credentials
&client_id=peter
&client_secret=somesecret
&scope=scope-a+scope-b

If the request succeeds, the credentials are considered valid and if the request fails, the credentials are considered invalid.
oauth2_introspection

The oauth2_introspection authenticator handles requests that have an Bearer Token in the Authorization Header (Authorization: bearer <token>) or in a different header or query parameter specified in configuration. It then uses OAuth 2.0 Token Introspection to check if the token is valid and if the token was granted the requested scope.

    If you are unfamiliar with OAuth 2.0 Introspection we recommend reading this guide.

oauth2_introspection configuration

    introspection_url (string, required) - The OAuth 2.0 Token Introspection endpoint.
    scope_strategy (string, optional) - Sets the strategy to be used to validate/match the token scope. Supports "hierarchic", "exact", "wildcard", "none". Defaults to "none".
    required_scope ([]string, optional) - Sets what scope is required by the URL and when performing OAuth 2.0 Client Credentials request, the scope will be included in the request.
    target_audience ([]string, optional) - Sets what audience is required by the URL.
    trusted_issuers ([]string, optional) - Sets a list of trusted token issuers.
    pre_authorization (object, optional) - Enable pre-authorization in cases where the OAuth 2.0 Token Introspection endpoint is protected by OAuth 2.0 Bearer Tokens that can be retrieved using the OAuth 2.0 Client Credentials grant.
        enabled (bool, optional) - Enable pre-authorization. Defaults to false.
        client_id (string, required if enabled) - The OAuth 2.0 Client ID to be used for the OAuth 2.0 Client Credentials Grant.
        client_secret (string, required if enabled) - The OAuth 2.0 Client Secret to be used for the OAuth 2.0 Client Credentials Grant.
        token_url (string, required if enabled) - The OAuth 2.0 Token Endpoint where the OAuth 2.0 Client Credentials Grant will be performed.
        audience (string, optional) - The OAuth 2.0 Audience to be requested during the OAuth 2.0 Client Credentials Grant.
        scope ([]string, optional) - The OAuth 2.0 Scope to be requested during the OAuth 2.0 Client Credentials Grant.
    token_from (object, optional) - The location of the bearer token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
        header (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request authentication. It can't be set along with query_parameter or cookie.
        query_parameter (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or cookie.
        cookie (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or query_parameter
    introspection_request_headers (object, optional) - Additional headers to add to the introspection request.
    retry (object, optional) - Configure the retry policy
        max_delay (string, optional, default to 500ms) - Maximum delay to wait before retrying the request
        give_up_after (string, optional, default to 1s) - Maximum delay allowed for retries
    cache (object, optional) - Enables caching of incoming tokens
        enabled (bool, optional) - Enable the cache, will use exp time of token to determine when to evict from cache. Defaults to false.
        ttl (string) - Can override the default behavior of using the token exp time, and specify a set time to live for the token in the cache.
        max_cost (int) - Max cost to cache. Defaults to 100000000.

Please note that caching won't be used if the scope strategy is none and required_scope isn't empty. In that case, the configured introspection URL will always be called and is expected to check if the scope is valid or not.

# Global configuration file oathkeeper.yml
authenticators:
  oauth2_introspection:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      introspection_url: https://my-website.com/oauth2/introspection
      scope_strategy: exact
      required_scope:
        - photo
        - profile
      target_audience:
        - example_audience
      trusted_issuers:
        - https://my-website.com/
      pre_authorization:
        enabled: true
        client_id: some_id
        client_secret: some_secret
        scope:
          - introspect
        token_url: https://my-website.com/oauth2/token
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token
      introspection_request_headers:
        x-forwarded-proto: https
      retry:
        max_delay: 300ms
        give_up_after: 2s
      cache:
        enabled: true
        ttl: 60s

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: oauth2_introspection
    config:
      introspection_url: https://my-website.com/oauth2/introspection
      scope_strategy: exact
      required_scope:
        - photo
        - profile
      target_audience:
        - example_audience
      trusted_issuers:
        - https://my-website.com/
      pre_authorization:
        enabled: true
        client_id: some_id
        client_secret: some_secret
        scope:
          - introspect
        token_url: https://my-website.com/oauth2/token
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token
      introspection_request_headers:
        x-forwarded-proto: https
        x-foo: bar
      retry:
        max_delay: 300ms
        give_up_after: 2s

oauth2_introspection access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "oauth2_introspection",
    "config": {
      "required_scope": ["scope-a", "scope-b"],
      "target_audience": ["example_audience"]
    }
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET -H 'Authorization: Bearer valid.access.token.from.peter' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

In the background, this handler will make a request to the OAuth 2.0 Token Endpoint (configuration value authenticators.oauth2_introspection.introspection_url) to check if the Bearer Token is valid:

POST /oauth2/introspect HTTP/1.1

token=valid.access.token.from.peter

If pre-authorization is enabled, that request will include an Authorization Header:

POST /oauth2/introspect HTTP/1.1
Authorization: Bearer token-received-by-performing-pre-authorization

token=valid.access.token.from.peter

The Token is considered valid if the Introspection response is HTTP 200 OK and includes {"active":true} in the response payload. The subject is extracted from the username field.
jwt

The jwt authenticator handles requests that have an Bearer Token in the Authorization Header (Authorization: bearer <token>) or in a different header or query parameter specified in configuration. It assumes that the token is a JSON Web Token and tries to verify the signature of it.
jwt configuration

    jwks_urls ([]string, required) - The URLs where Ory Oathkeeper can retrieve JSON Web Keys from for validating the JSON Web Token. Usually something like https://my-keys.com/.well-known/jwks.json. The response of that endpoint must return a JSON Web Key Set (JWKS).
    jwks_max_wait (duration, optional) - The maximum time for which the JWK fetcher should wait for the JWK request to complete. After the interval passes, the JWK fetcher will return expired or no JWK at all. If the initial JWK request finishes successfully, it will still refresh the cached JWKs. Defaults to "1s".
    jwks_ttl (duration, optional) - The duration for which fetched JWKs should be cached internally. Defaults to "30s".
    scope_strategy (string, optional) - Sets the strategy to be used to validate/match the scope. Supports "hierarchic", "exact", "wildcard", "none". Defaults to "none".
    If trusted_issuers ([]string) is set, the JWT must contain a value for claim iss that matches exactly (case-sensitive) one of the values of trusted_issuers. If no values are configured, the issuer will be ignored.
    If target_audience ([]string) is set, the JWT must contain all values (exact, case-sensitive) in the claim aud. If no values are configured, the audience will be ignored.
    Value allowed_algorithms ([]string) sets what signing algorithms are allowed. Defaults to RS256.
    Value required_scope ([]string) validates the scope of the JWT. It will checks for claims scp, scope, scopes in the JWT when validating the scope as that claim isn't standardized.
    token_from (object, optional) - The location of the bearer token. If not configured, the token will be received from a default location - 'Authorization' header. One and only one location (header, query, or cookie) must be specified.
        header (string, required, one of) - The header (case insensitive) that must contain a Bearer token for request authentication. It can't be set along with query_parameter or cookie.
        query_parameter (string, required, one of) - The query parameter (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or cookie.
        cookie (string, required, one of) - The cookie (case sensitive) that must contain a Bearer token for request authentication. It can't be set along with header or query_parameter

# Global configuration file oathkeeper.yml
authenticators:
  jwt:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

    config:
      jwks_urls:
        - https://my-website.com/.well-known/jwks.json
        - https://my-other-website.com/.well-known/jwks.json
        - file://path/to/local/jwks.json
      scope_strategy: none
      required_scope:
        - scope-a
        - scope-b
      target_audience:
        - https://my-service.com/api/users
        - https://my-service.com/api/devices
      trusted_issuers:
        - https://my-issuer.com/
      allowed_algorithms:
        - RS256
      token_from:
        header: Custom-Authorization-Header
        # or
        # query_parameter: auth-token
        # or
        # cookie: auth-token

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authenticators:
  - handler: jwt
    config:
      jwks_urls:
        - https://my-website.com/.well-known/jwks.json
        - https://my-other-website.com/.well-known/jwks.json
        - file://path/to/local/jwks.json
      scope_strategy: none
      required_scope:
        - scope-a
        - scope-b
      target_audience:
        - https://my-service.com/api/users
        - https://my-service.com/api/devices
      trusted_issuers:
        - https://my-issuer.com/
      allowed_algorithms:
        - RS256
      token_from:
        query_parameter: auth-token
        # or
        # header: Custom-Authorization-Header
        # or
        # cookie: auth-token

jwt validation example

{
  "handler": "jwt",
  "config": {
    "required_scope": ["scope-a", "scope-b"],
    "target_audience": ["https://my-service.com/api/users", "https://my-service.com/api/devices"],
    "trusted_issuers": ["https://my-issuer.com/"],
    "allowed_algorithms": ["RS256", "RS256"]
  }
}

That exemplary Access Rule consider the following (decoded) JSON Web Token as valid:

{
  "alg": "RS256"
}
{
  "iss": "https://my-issuer.com/",
  "aud": ["https://my-service.com/api/users", "https://my-service.com/api/devices"],
  "scp": ["scope-a", "scope-b"]
}

And this token as invalid (audience is missing, issuer isn't matching, scope is missing, wrong algorithm):

{
  "alg": "HS256"
}
{
  "iss": "https://not-my-issuer.com/",
  "aud": ["https://my-service.com/api/users"],
  "scp": ["not-scope-a", "scope-b"]
}

jwt Scope

JSON Web Tokens can be scoped. However, that feature isn't standardized and several claims that represent the token scope have been seen in the wild: scp, scope, scopes. Additionally, the claim value can be a string ("scope-a"), a space-delimited string ("scope-a scope-b") or a JSON string array (["scope-a", "scope-b"]). Because of this ambiguity, all of those claims are checked and parsed and will be available as scp (string array) in the authentication session (.Extra["scp"]).
jwt access rule example

cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{
    "handler": "jwt",
    "config": {
      "required_scope": ["scope-a", "scope-b"],
      "target_audience": ["aud-1"],
      "trusted_issuers": ["iss-1"]
    }
  }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

curl -X GET http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because no credentials have been provided.

curl -X GET -H 'Authorization: Bearer invalid-token' http://my-app/some-route

HTTP/1.0 401 Status Unauthorized
The request isn't authorized because the provided credentials are invalid.

curl -X GET -H 'Authorization: Bearer valid.jwtfrom.peter' http://my-app/some-route

HTTP/1.0 200 OK
The request has been allowed! The subject is: "peter"

In the background, this handler will fetch all JSON Web Key Sets provided by configuration key authenticators.jwt.jwks_urls and use those keys to verify the signature. If the signature can't be verified by any of those keys, the JWT is considered invalid.


Authorizers

An "authorizer" is responsible for properly permissioning a subject. Ory Oathkeeper supports different kinds of authorizers. The list of authorizers increases over time due to new features and requirements.

Authorizers assure that a subject, for instance a "user", has the permissions necessary to access or perform a particular service. For example, an authorizer can permit access to an endpoint or URL for specific subjects or "users" from a specific group "admin". The authorizer permits the subjects the desired access to the endpoint.

Each authorizer has two keys:

    handler (string, required): Defines the handler, for example noop, to be used.
    config (object, optional): Configures the handler. Configuration keys can vary for each handler.s

{
  "authorizer": {
    "handler": "noop",
    "config": {}
  }
}

There is a 1:1 mandatory relationship between an authoriser and an access rule. It isn't possible to configure more than one authorizer per Access Rule.
allow

This authorizer permits every action allowed.
allow configuration

This handler isn't configurable.

To enable this handler, set as follows:

# Global configuration file oathkeeper.yml
authorizers:
  allow:
    # Set enabled to "true" to enable the authenticator, and "false" to disable the authenticator. Defaults to "false".
    enabled: true

allow access rule example

$ cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{ "handler": "anonymous" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }]
}]

$ curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed!

deny

This authorizer considers every action unauthorized therefore "forbidden" or "disallowed".
deny configuration

This handler isn't configurable.

To enable this handler, set:

# Global configuration file oathkeeper.yml
authorizers:
  deny:
    # Set enabled to "true" to enable the authenticator, and "false" to disable the authenticator. Defaults to "false".
    enabled: true

deny access rule example

$ cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/some-route",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [{ "handler": "anonymous" }],
  "authorizer": { "handler": "deny" },
  "mutators": [{ "handler": "noop" }]
}]

$ curl -X GET http://my-app/some-route

HTTP/1.0 403 Forbidden
The request is forbidden!

keto_engine_acp_ory

This authorizer uses the Ory Keto API to carry out access control using "Ory-flavored" Access Control Policies. The conventions used in the Ory Keto project are located on GitHub Ory Keto for consultation prior to using this authorizer.
keto_engine_acp_ory configuration

    base_url (string, required) - The base URL of Ory Keto, typically something like https://hostname:port/
    required_action (string, required) - See section below.
    required_resource (string, required) - See section below.
    subject (string, optional) - See section below.
    flavor (string, optional) - See section below.

Resource, relation, subject

Actions were renamed to relations. Read the Ory Keto policy migration guide for more details.

This authorizer has four configuration options, required_action, required_resource, subject, and flavor:

{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "...",
    "required_resource": "...",
    "subject": "...",
    "flavor": "..."
  }
}

All configuration options except flavor support Go text/template. For example in the following match configuration:

{
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": ["GET"]
  }
}

The following example shows how to reference the values matched by or resulting from the two regular expressions, <[0-9]+> and <[a-zA-Z]+>. using the AuthenticationSession struct:

{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "my:action:{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}",
    "required_resource": "my:resource:{{ printIndex .MatchContext.RegexpCaptureGroups 1 }}:foo:{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}"
  }
}

Assuming a request to http://my-api/api/users/1234/foobar was made, the config from above would expand to:

{
  "handler": "keto_engine_acp_ory",
  "config": {
    "required_action": "my:action:1234",
    "required_resource": "my:resource:foobar:foo:1234"
  }
}

The subject field configures the subject that passes to the Ory Keto endpoint. If subject isn't specified it will default to AuthenticationSession.Subject.

For more details about supported Go template substitution, see. How to use session variables
keto_engine_acp_ory example

# Global configuration file oathkeeper.yml
authorizers:
  keto_engine_acp_ory:
    # Set enabled to "true" to enable the authenticator, and "false" to disable the authenticator. Defaults to "false".
    enabled: true

    config:
      base_url: http://my-keto/
      required_action: ...
      required_resource: ...
      subject: ...
      flavor: ...

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authorizers:
  - handler: keto_engine_acp_ory
    config:
      base_url: http://my-keto/
      required_action: ...
      required_resource: ...
      subject: ...
      flavor: ...

keto_engine_acp_ory access rule example

$ cat ./rules.json

[{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "keto_engine_acp_ory",
    "config": {
      "required_action": "my:action:$1",
      "required_resource": "my:resource:$2:foo:$1"
      "subject": "{{ .Extra.email }}",
      "flavor": "exact"
    }
  }
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}]

remote

This authorizer performs authorization using a remote authorizer. The authorizer makes a HTTP POST request to a remote endpoint with the original body request as body. If the endpoint returns a "200 OK" response code, the access is allowed, if it returns a "403 Forbidden" response code, the access is denied.
remote configuration

    remote (string, required) - The remote authorizer's URL. The remote authorizer is expected to return either "200 OK" or "403 Forbidden" to allow/deny access.
    headers (map of strings, optional) - The HTTP headers sent to the remote authorizer. The values will be parsed by the Go text/template package and applied to an AuthenticationSession object. See Session for more details.
    forward_response_headers_to_upstream (slice of strings, optional) - The HTTP headers that will be allowed from remote authorizer responses. If returned, headers on this list will be forward to upstream services.
    retry (object, optional) - Configures timeout and delay settings for the request against the token endpoint
        give_up_after (string) max delay duration of retry. The value will be parsed by the Go duration parser.
        max_delay (string) time to wait between retries and max service response time. The value will be parsed by the Go duration parser.

remote example

# Global configuration file oathkeeper.yml
authorizers:
  remote:
    # Set enabled to "true" to enable the authenticator, and "false" to disable the authenticator. Defaults to "false".
    enabled: true

    config:
      remote: http://my-remote-authorizer/authorize
      headers:
        X-Subject: "{{ print .Subject }}"

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authorizers:
  - handler: remote
    config:
      remote: http://my-remote-authorizer/authorize
      headers:
        X-Subject: "{{ print .Subject }}"

remote access rule example

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "remote",
    "config": {
      "remote": "http://my-remote-authorizer/authorize",
      "headers": {
        "X-Subject": "{{ print .Subject }}"
      },
      "forward_response_headers_to_upstream": [
        "X-Foo"
      ]
    }
  }
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}

remote_json

This authorizer performs authorization using a remote authorizer. The authorizer makes a HTTP POST request to a remote endpoint with a JSON body. If the endpoint returns a "200 OK" response code, the access is allowed, if it returns a "403 Forbidden" response code, the access is denied.
remote_json configuration

    remote (string, required) - The remote authorizer's URL. The remote authorizer is expected to return either "200 OK" or "403 Forbidden" to allow/deny access.
    payload (string, required) - The request's JSON payload sent to the remote authorizer. The string will be parsed by the Go text/template package and applied to an AuthenticationSession object. See Session for more details.
    headers (map of strings, optional) - The HTTP headers sent to the remote authorizer. The values will be parsed by the Go text/template package and applied to an AuthenticationSession object. See Session for more details.
    forward_response_headers_to_upstream (slice of strings, optional) - The HTTP headers that will be allowed from remote authorizer responses. If returned, headers on this list will be forward to upstream services.
    retry (object, optional) - Configures timeout and delay settings for the request against the token endpoint
        give_up_after (string) max delay duration of retry. The value will be parsed by the Go duration parser.
        max_delay (string) time to wait between retries and max service response time. The value will be parsed by the Go duration parser.

remote_json example

# Global configuration file oathkeeper.yml
authorizers:
  remote_json:
    # Set enabled to "true" to enable the authenticator, and "false" to disable the authenticator. Defaults to "false".
    enabled: true

    config:
      remote: http://my-remote-authorizer/authorize
      headers:
        Y-Api-Key: '{{ .MatchContext.Header.Get "X-Api-Key" }}'
      payload: |
        {
          "subject": "{{ print .Subject }}",
          "resource": "{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}"
        }

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
authorizers:
  - handler: remote_json
    config:
      remote: http://my-remote-authorizer/authorize
      headers:
        Y-Api-Key: '{{ .MatchContext.Header.Get "X-Api-Key" }}'
      payload: |
        {
          "subject": "{{ print .Subject }}",
          "resource": "{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}"
        }

remote_json access rule example

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "remote_json",
    "config": {
      "headers": {
         "Y-Api-Key": "{{ .MatchContext.Header.Get \"X-Api-Key\" }}"
      },
      "remote": "http://my-remote-authorizer/authorize",
      "payload": "{\"subject\": \"{{ print .Subject }}\", \"resource\": \"{{ printIndex .MatchContext.RegexpCaptureGroups 0 }}\"}"
    },
    "forward_response_headers_to_upstream": [
      "X-Foo"
    ]
  }
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}


Mutators

A mutator transforms the credentials from incoming requests to credentials that your backend understands. For example, the Authorization: basic header might be transformed to X-User: <subject-id>. This allows you to write backends that don't care if the original request was an anonymous one, an OAuth 2.0 Access Token, or some other credential type. All your backend has to do is understand, for example, the X-User:.

The Access Control Decision API will return the mutated result as the HTTP Response.
noop

This mutator doesn't transform the HTTP request and simply forwards the headers as-is. This is useful if you don't want to replace, for example, Authorization: basic with X-User: <subject-id>.
noop configuration

# Global configuration file oathkeeper.yml
mutators:
  noop:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
mutators:
  - handler: noop

noop access rule example

cat ./rules.json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "noop"
    }
  ]
}

curl -X GET http://my-app/some-route

HTTP/1.0 200 Status OK
The request has been allowed! The original HTTP Request hasn't been modified.

id_token

This mutator takes the authentication information (such as subject) and transforms it to a signed JSON Web Token, and more specifically to an OpenID Connect ID Token. Your backend can verify the token by fetching the (public) key from the /.well-known/jwks.json endpoint provided by the Ory Oathkeeper API.

Let's say a request is made to a resource protected by Ory Oathkeeper using Basic Authorization:

GET /api/resource HTTP/1.1
Host: www.example.com
Authorization: Basic Zm9vOmJhcg==

Assuming that Ory Oathkeeper is granting the access request, Basic Zm9vOmJhcg== will be replaced with a cryptographically signed JSON Web Token:

GET /api/resource HTTP/1.1
Host: internal-api-endpoint-dns
Authorization: Bearer <jwt-signed-id-token>

Now, the protected resource is capable of decoding and validating the JSON Web Token using the public key supplied by Ory Oathkeeper's API. The public key for decoding the ID token is available at Ory Oathkeeper's /.well-known/jwks.json endpoint:

http://oathkeeper:4456/.well-known/jwks.json

The related flow diagram looks like this:

ID Token Transformation

Let's say the oauth2_client_credentials authenticator successfully authenticated the credentials client-id:client-secret. This mutator will craft an ID Token (JWT) with the following exemplary claims:

{
  "iss": "https://server.example.com",
  "sub": "client-id",
  "aud": "s6BhdRkqt3",
  "jti": "n-0S6_WzA2Mj",
  "exp": 1311281970,
  "iat": 1311280970
}

The ID Token Claims are as follows:

    iss: Issuer Identifier for the Issuer of the response. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components. Typically, this is the URL of Ory Oathkeeper, for example: https://oathkeeper.myapi.com.
    sub: Subject Identifier. A locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client, for example, 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It must not exceed 255 ASCII characters in length. The sub value is a case sensitive string. The End-User might also be an OAuth 2.0 Client, given that the access token was granted using the OAuth 2.0 Client Credentials flow.
    aud: Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party as an audience value. It MAY also contain identifiers for other audiences. In the general case, the aud value is an array of case sensitive strings.
    exp: Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times and UTC in particular.
    iat: Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
    jti: A cryptographically strong random identifier to ensure the ID Token's uniqueness.

id_token configuration

    issuer_url (string, required) - Sets the "iss" value of the ID Token.
    jwks_url (string, required) - Sets the URL where keys should be fetched from. Supports remote locations (http, https, s3, gs, azblob) as well as local filesystem paths.
    ttl (string, optional) - Sets the time-to-live of the ID token. Defaults to one minute. Valid time units are: s (second), m (minute), h (hour).
    claims (string, optional) - Allows you to customize the ID Token claims and support Go Templates. For more information, check section Claims
    cache (object, optional) - Enables caching of computed tokens
        enabled (bool, optional) - Enable the cache, will use exp time of ID token to determine when to evict from cache. Defaults to true.
        max_cost (int) - Max cost to cache. Defaults to 33554432.

# Global configuration file oathkeeper.yml
mutators:
  id_token:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
    config:
      issuer_url: https://my-oathkeeper/
      jwks_url: https://fetch-keys/from/this/location.json
      # jwks_url: file:///from/this/absolute/location.json
      # jwks_url: file://../from/this/relative/location.json
      ttl: 60s
      claims: '{"aud": ["https://my-backend-service/some/endpoint"],"def": "{{ print .Extra.some.arbitrary.data }}"}'
      cache:
        max_cost: 10000

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
mutators:
  - handler: id_token
    config:
      issuer_url: https://my-oathkeeper/
      jwks_url: https://fetch-keys/from/this/location.json
      # jwks_url: file:///from/this/absolute/location.json
      # jwks_url: file://../from/this/relative/location.json
      ttl: 60s
      claims: '{"aud": ["https://my-backend-service/some/endpoint"],"def": "{{ print .Extra.some.arbitrary.data }}"}'

The first private key found in the JSON Web Key Set defined by mutators.id_token.jwks_url will be used for signing the JWT:

    If the first key found is a symmetric key (HS256 algorithm), that key will be used. That key won't be broadcasted at /.well-known/jwks.json. You must manually configure the upstream to be able to fetch the key (for example from an environment variable).
    If the first key found is an asymmetric private key (for example RS256, ES256, ...), that key will be used. The related public key will be broadcasted at /.well-known/jwks.json.

id_token Claims

This mutator allows you to specify custom claims, like the audience of ID tokens, via the claims field of the mutator's config field. The keys represent names of claims and the values are arbitrary data structures which will be parsed by the Go text/template package for value substitution, receiving the AuthenticationSession struct.

For more details please check Session variables

The claims configuration expects a string which is expected to be valid JSON:

{
  "handler": "id_token",
  "config": {
    "claims": "{\"aud\": [\"https://my-backend-service/some/endpoint\"],\"def\": \"{{ print .Extra.some.arbitrary.data }}\"}"
  }
}

Please keep in mind that certain keys (such as the sub) claim can't be overwritten!
id_token access rule example

cat ./rules.json
{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/users/<[0-9]+>/<[a-zA-Z]+>",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "id_token",
      "config": {
        "aud": [
          "audience-1",
          "audience-2"
        ],
        "claims": "{\"abc\": \"{{ print .Subject }}\",\"def\": \"{{ print .Extra.some.arbitrary.data }}\"}"
      }
    }
  ]
}

header

This mutator will transform the request, allowing you to pass the credentials to the upstream application via the headers. This will augment, for example, Authorization: basic with X-User: <subject-id>.
header configuration

    headers (object (string: string), required) - A keyed object (string:string) representing the headers to be added to this request, see section headers.

# Global configuration file oathkeeper.yml
mutators:
  header:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
    config:
      headers:
        X-User: "{{ print .Subject }}"
        X-Some-Arbitrary-Data: "{{ print .Extra.some.arbitrary.data }}"

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
mutators:
  - handler: header
    config:
      headers:
        X-User: "{{ print .Subject }}"
        X-Some-Arbitrary-Data: "{{ print .Extra.some.arbitrary.data }}"

Headers

The headers are specified via the headers field of the mutator's config field. The keys are the header name and the values are a string which will be parsed by the Go text/template package for value substitution, receiving the AuthenticationSession struct.

For more details please check Session variables
header access rule example

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "header",
      "config": {
        "headers": {
          "X-User": "{{ print .Subject }}",
          "X-Some-Arbitrary-Data": "{{ print .Extra.some.arbitrary.data }}"
        }
      }
    }
  ]
}

cookie

This mutator will transform the request, allowing you to pass the credentials to the upstream application via the cookies.
cookie configuration

    cookies (object (string: string), required) - A keyed object (string:string) representing the cookies to be added to this request, see section cookies.

# Global configuration file oathkeeper.yml
mutators:
  cookie:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
    config:
      cookies:
        user: "{{ print .Subject }}",
        some-arbitrary-data: "{{ print .Extra.some.arbitrary.data }}"

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
mutators:
  - handler: cookie
    config:
      cookies:
        user: "{{ print .Subject }}",
        some-arbitrary-data: "{{ print .Extra.some.arbitrary.data }}"

Cookies

The cookies are specified via the cookies field of the mutators config field. The keys are the cookie name and the values are a string which will be parsed by the Go text/template package for value substitution, receiving the AuthenticationSession struct.

For more details please check Session variables
cookie example

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "cookie",
      "config": {
        "cookies": {
          "user": "{{ print .Subject }}",
          "some-arbitrary-data": "{{ print .Extra.some.arbitrary.data }}"
        }
      }
    }
  ]
}

hydrator

This mutator allows for fetching additional data from external APIs, which can be then used by other mutators. It works by making an upstream HTTP call to an API specified in the Per-Rule Configuration section below. The request is a POST request and it contains JSON representation of AuthenticationSession struct in body, which is:

{
  "subject": String,
  "extra": Object,
  "header": Object,
  "match_context": {
    "regexp_capture_groups": Object,
    "url": Object
  }
}

As a response the mutator expects similar JSON object, but with extra or header fields modified.

Example request/response payload:

{
  "subject": "anonymous",
  "extra": {
    "foo": "bar"
  },
  "header": {
    "foo": ["bar1", "bar2"]
  },
  "match_context": {
    "regexp_capture_groups": ["http", "foo"],
    "url": "http://domain.com/foo"
  }
}

note

Ory Oathkeeper is case-insensitive when accepting custom request headers. However, all incoming custom headers are converted to the canonical format of the MIME header key. This means that the first letter of the incoming header, as well as any letter that follows a hyphen, is converted into upper case and the rest of the letters are converted into lowercase. For example, the incoming header x-user-company is converted and returned by Oathkeeper as X-User-Company.

The AuthenticationSession from this object replaces the original one and is passed to the next mutator, where it can be used to set a particular cookie to the value received from an API.

Setting extra field doesn't transform the HTTP request, whereas headers set in the header field will be added to the final request headers.
Cache

This handler supports caching. If caching is enabled, the api.url configuration value and the full AuthenticationSession payload.
info

Because the cache key is quite complex, the caching handler has a higher chance of cache misses.
hydrator configuration

    api.url (string - required) - The API URL.
    api.auth.basic.* (optional) - Enables HTTP Basic Authorization.
    api.auth.retry.* (optional) - Configures the retry logic.
    cache.ttl (optional) - Configures how long to cache hydrate requests

# Global configuration file oathkeeper.yml
mutators:
  hydrator:
    # Set enabled to true if the authenticator should be enabled and false to disable the authenticator. Defaults to false.
    enabled: true
    config:
      api:
        url: http://my-backend-api
        auth:
          basic:
            username: someUserName
            password: somePassword
        retry:
          give_up_after: 2s
          max_delay: 100ms
      cache:
        ttl: 60s

# Some Access Rule: access-rule-1.yaml
id: access-rule-1
# match: ...
# upstream: ...
mutators:
  - handler: hydrator
    config:
      api:
        url: http://my-backend-api
        auth:
          basic:
            username: someUserName
            password: somePassword
        retry:
          give_up_after: 2s
          max_delay: 100ms
      cache:
        ttl: 60s

hydrator access rule example

{
  "id": "some-id",
  "upstream": {
    "url": "http://my-backend-service"
  },
  "match": {
    "url": "http://my-app/api/<.*>",
    "methods": ["GET"]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "hydrator",
      "config": {
        "api": {
          "url": "http://my-backend-api"
        }
      }
    },
    {
      "handler": "cookie",
      "config": {
        "cookies": {
          "some-arbitrary-data": "{{ print .Extra.cookie }}"
        }
      }
    }
  ]
}


Error handlers

A error handler is responsible for executing logic after, for example, authentication or authorization failed. Ory Oathkeeper supports different error handlers and we will add more as the project progresses.

A error handler can be configured to match on certain conditions, for example, it's possible to configure the json error handler to only be executed if the HTTP Header Accept contains application/json.

Each error handler has two keys:

    handler (string, required): Defines the handler (for example noop) to be used.
    config (object, optional): Configures the handler. Configuration keys vary per handler. The configuration can be defined in the global configuration file, or per access rule.

Example

{
  "errors": [
    {
      "handler": "json",
      "config": {}
    }
  ]
}

You can define more than one error handler in the Access Rule. Depending on their matching conditions (see next chapter), the appropriate error handler will be chosen.

Please be aware that defining error handlers with overlapping matching conditions will cause errors, because Ory Oathkeeper won't know which error handler to execute!
Error matching

You can configure the error handlers in such a way, that - for example - Ory Oathkeeper responds, in the case of an error, with

    a JSON response, such as {"error":{"code":403,"status":"Forbidden","message":"Access credentials aren't sufficient to access this resource"}}, when the client that expects JSON (Accept: application/json);
    an XML response when the API Client expects XML (Accept: application/xml);
    a HTTP Redirect (HTTP Status Found - 302) to /login when the endpoint is directly (no AJAX) accessed from a browser (Accept: text/html,application/xhtml+xml).

There are also other possible matching strategies - such as defining a response per error type (unauthorized, forbidden, internal_server_error, ...) , per HTTP Content-Type Header (similar to Accept), or based on the Remote IP Address.

All match definitions are set in the handler's config, using the when key. This is the same for all handlers!

{
  handler: "json", // or redirect, www_authenticate, ...
  config: {
    when: [
      {
        error: ["unauthorized", "...", "..."],
      },
    ],
  },
}

If when is empty, then no conditions are applied and the error handler is always matching! In fact, this is also true for all subkeys. If left empty, the matching condition won't be applied and is thus always true!
Fallback

Error handling can be set globally and per access rule. Ory Oathkeeper will first check for any access rule specific error handling before falling back to the globally defined error handling.

Similar to other pipeline handlers (authentication, authorization, mutation), you must enable the error handlers in the global Ory Oathkeeper config, except for the json error handler which is always enabled by default:

# .oathkeeper.yaml
errors:
  handlers:
    json:
      enabled: true # this is true by default
      # config:
      #   when: ...
    redirect:
      enabled: true # this is false by default
      # config:
      #   when: ...

As discussed in the previous section, when config.when is empty, the error handler will always match. This of course is a problem because Ory Oathkeeper now doesn't know if it should redirect or send a JSON error!

Therefore, an additional configuration - called fallback - is available:

# .oathkeeper.yaml
errors:
  # `["json"]` is the default!
  fallback:
    - json

  handlers:
    json:
      enabled: true # this is true by default
      # config:
      #   when: ...
    redirect:
      enabled: true # this is false by default
      config:
        to: http://mywebsite/login
      # when: ...

This feature tells Ory Oathkeeper that the json error handler should be used as fallback. You could also define multiple fallback handlers - the first matching handler will be the one and only executed! This makes sense if you configure the when section as well:

# .oathkeeper.yaml
errors:
  fallback:
    - redirect
    - json

  handlers:
    json:
      enabled: true
    redirect:
      enabled: true
      config:
        when:
          - request:
              header:
                accept:
                  - text/*

In this configuration example, Ory Oathkeeper would first check if the HTTP Request Header contains Accept: text/html (or text/xhtml, text/text, ...) and if not, would return a JSON Error Message.
Matchers

All matchers are defined under the config.when key of the error handler, both in the global config and in the access rule:

// access-rule.json
{
  handler: "json",
  config: {
    when: [
      {
        error: ["unauthorized", "...", "..."],
      },
    ],
  },
}

# .oathkeeper.yaml
errors:
  handlers:
    redirect:
      enabled: true
      config:
        when:
          - error:
              - unauthorized
              - ...
              - ...

You can define multiple when clauses which allows you to differentiate between error types and HTTP Requests. The when sections are combined with OR while the subkeys (error, request.header.accept, request.header.content_type, ...) are matched with AND. Keys that have arrays as values (error, request.header.accept, request.header.content_type, ...) are usually matched with OR:

# .oathkeeper.yaml
errors:
  handlers:
    redirect:
      enabled: true
      config:
        when:
          - error:
              - unauthorized
              # OR
              - internal_server_error

            # AND
            request:
              remote_ip:
                match:
                  - 192.168.1.0/24
                  # OR
                  - 192.178.1.0/24

          # OR
          - error:
              - forbidden
              # OR
              - not_found

            # AND
            request:
              header:
                accept:
                  - text/html
                  # OR
                  - text/xhtml

                # AND
                content_type:
                  - application/x-www-form-urlencoded
                  # OR
                  - multipart/form-data

Error

The config.when.#.error key may contain zero, one, or multiple error names that must match for this matching condition to be true. The error names are derived (lowercase and whitespaces replaced with _) from the well-defined HTTP Status messages such as Not Found, Forbidden, Internal Server Error, and so on.

Here are some examples:

    Internal Server Error (500) -> {"errors": ["internal_server_error"]}
    Forbidden (403) -> {"errors": ["forbidden"]}
    Not Found (404) -> {"errors": ["not_found"]}
    Bad Request (400) -> {"errors": ["bad_request"]}

Keep in mind that these errors must be emitted by Ory Oathkeeper itself, not by the upstream API. Therefore, most HTTP Status Codes won't have any effect because Ory Oathkeeper - as of now - mostly returns 401, 403, 500 error codes.

As discussed previously, if this configuration key is left empty, then all error types will match!
HTTP Request: Remote IP

The HTTP Remote IP is the IP of the Client that initially made the request. The Remote Address is matched using CIDR Notation:

config:
  when:
    - request:
        remote_ip:
          match:
            - 192.168.1.0/24

This configuration would match a HTTP Request coming directly from 192.168.1.1, 192.168.1.2, and so on.

If Ory Oathkeeper runs behind a Load Balancer or any other type of Reverse Proxy, you can configure Ory Oathkeeper to check the X-Forwarded-For HTTP Header header as well:

config:
  when:
    - request:
        remote_ip:
          respect_forwarded_for_header: true # defaults to false
          match:
            - 192.168.1.0/24

As discussed previously, if this configuration key is left empty, then all remote IPs will match!

HTTP Requests that include one of the matching IP Addresses in the X-Forwarded-For HTTP Header, for example X-Forwarded-For: 123.123.123.123, ..., 192.168.1.1, ..., now match this error handler.
HTTP Request Header: Accept

The HTTP Accept Header is the most common way to tell an HTTP API what MIME content type is expected. For example, FireFox sends Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 for all regular requests for example when opening www.ory.com. And a REST API Client usually sends Accept: application/json.

Therefore, using the Accept header is one of the most common ways to distinguish between "regular" browser traffic, REST API traffic, and other types of HTTP traffic.

In Ory Oathkeeper, you can specify the matching conditions for the Accept header as follows:

config:
  when:
    - request:
        header:
          accept:
            - text/html
            - text/*

The defined matching condition would apply if a client sends one of the following Accept headers:

    Accept: text/html
    Accept: text/xhtml
    Accept: text/xhtml+xml
    Accept: text/...
    Accept: text/*

Most browsers (see the FireFox example) also send wildcard Accept headers such as */*. To prevent multiple conditions to match, HTTP Accept Headers from the client are interpreted literally, meaning that wildcards aren't interpreted.

Assuming the client sends Accept: */* and the error condition is set to accept: ["text/text"], the error condition would not match. If however the client sends Accept: text/text and the error condition is set to accept: ["*/*"], then the condition would match.

To match against wildcards in the Accept header, you have to explicitly define them in the error condition. Setting the configuration to accept: ["*/*"] will match Accept: */* and of course any other type such as Accept: text/* Accept: text/html, and so on.

As discussed previously, if this configuration key is left empty, then all Accept headers will match!
HTTP Request Header: Content-Type

The HTTP Content Type matcher works similar to the Accept header. The HTTP Content Type Header however is much less common, as it's only used in POST, PUT, PATCH requests (or any other requests that send a HTTP Body).

The main difference however is that the client never (unless it sends malformed data) sends wildcard MIME types, as the MIME type needs to be deterministic. It's typically something like multipart/form-data, application/x-www-form-urlencoded, or application/json.

In Ory Oathkeeper, you can specify the matching conditions for the Content-Type header as follows:

config:
  when:
    - request:
        header:
          content_type:
            - multipart/form-data
            # OR
            - application/x-www-form-urlencoded
            # OR
            - application/json

As discussed previously, if this configuration key is left empty, then all Content-Type headers will match!
Error Handlers
json

The json Error Handler returns an application/json response type. Per default, error messages are stripped of their details to reduce OSINT attack surface. You can enable more detailed error messages by setting verbose to true. As discussed in the previous section, you can define error matching conditions under the when key.
json Example

// access-rule.json
{
  handler: "json",
  config: {
    verbose: true, // defaults to false
    when: [
      // ...
    ],
  },
}

redirect

The redirect Error Handler returns a HTTP 302/301 response with a Location Header. As discussed in the previous section, you can define error matching conditions under the when key.

If you want to append the current url (where the error happened) to address redirected to, You can specify return_to_query_param to set the name of parameter that will hold the url. The information about the current url is taken either from the URL, or from the X-Forwarded-Method, X-Forwarded-Proto, X-Forwarded-Host, X-Forwarded-Uri headers (if present) of the incoming request.
redirect Example

// access-rule.json
{
  handler: "json",
  config: {
    to: "http://my-website/login", // required!!
    return_to_query_param: "return_to",
    code: 301, // defaults to 302 - only 301 and 302 are supported.
    when: [
      // ...
    ],
  },
}

When the user accesses a protected url http://my-website/settings, they will be redirected to http://my-website/login?return_to=http%3A%2F%2Fmy-website%2Fsettings. The login page can use the return_to parameter to return user to intended page after a successful login.
www_authenticate

The www_authenticate Error Handler responds with HTTP 401 and a WWW-Authenticate HTTP Header.

You can configure the realm the browser will display. The realm is a message that will be displayed by the browser. Most browsers show a message like "The website says: <realm>". Using a real message is thus more appropriate than a Realm identifier.

This error handler is "exotic" as WWW-Authenticate isn't a common pattern in today's web. As discussed in the previous section, you can define error matching conditions under the when key.
www_authenticate example

// access-rule.json
{
  handler: "json",
  config: {
    realm: "Please enter your username and password", // Defaults to `Please authenticate.`
    when: [
      // ...
    ],
  },
}


gRPC middleware

In addition to exposing Ory Oathkeeper as a HTTP proxy, you can directly embed it into your Go application as a gRPC middleware. The gRPC traffic will then be handled by the middleware as if it were a standalone Ory Oathkeeper instance, just without the added network hop.
danger

This feature is experimental and may change. We can give no compatibility guarantees regarding the API.

This option is only available if you are using Go and gRPC.

You can use Ory Oathkeeper as a gRPC middleware thus:

import (
	"github.com/ory/oathkeeper/middleware"
	"google.golang.org/grpc"
)

func setup() {
	oathkeeperMW, err := middleware.New(ctx, middleware.WithConfigFile("path/to/config"))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create oathkeeper middleware: %w", err)
	}

 	s := grpc.NewServer(
		grpc.UnaryInterceptor(mw.UnaryInterceptor()),
		grpc.StreamInterceptor(mw.StreamInterceptor()),
	)

  // register your service to s, start the server, ...
}

The middleware will match only against explicit gRPC matchers, which you can use by specifying authority and full_method in the JSON configuration:

{
  "id": "some-id",
  "version": "v0.36.0-beta.4",
  "match": {
    "authority": "example.com",
    "full_method": "my.grpc.package/MyService/MyMethod"
  },
  "authenticators": [{ "handler": "noop" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }],
  "errors": [{ "handler": "json" }]
}


Configure and deploy

The Ory Oathkeeper HTTP serve process oathkeeper serve opens two ports exposing the

    reverse proxy
    REST API which serves the Access Control Decision API as well as other API endpoints such as health checks, JSON Web Key Sets, and a list of available rules.

For this guide we're using Docker. Ory Oathkeeper however can be installed in a variety of ways.
Configure

Ory Oathkeeper can be configured via the filesystem as well as environment variables. For more information on mapping the keys to environment variables please head over to the configuration chapter.

First, create an empty directory and cd into it:

mkdir oathkeeper-demo
cd oathkeeper-demo

Create a file called config.yaml with the following content:

cat << EOF > config.yaml
serve:
  proxy:
    port: 4455 # run the proxy at port 4455
  api:
    port: 4456 # run the api at port 4456

access_rules:
  repositories:
    - file:///rules.json

errors:
  fallback:
    - json
  handlers:
    json:
      enabled: true
      config:
        verbose: true
    redirect:
      enabled: true
      config:
        to: https://www.ory.com/docs

mutators:
  header:
    enabled: true
    config:
      headers:
        X-User: "{{ print .Subject }}"
        # You could add some other headers, for example with data from the
        # session.
        # X-Some-Arbitrary-Data: "{{ print .Extra.some.arbitrary.data }}"
  noop:
    enabled: true
  id_token:
    enabled: true
    config:
      issuer_url: http://localhost:4455/
      jwks_url: file:///jwks.json

authorizers:
  allow:
    enabled: true
  deny:
    enabled: true

authenticators:
  anonymous:
    enabled: true
    config:
      subject: guest
EOF

This configuration file will run the proxy at port 4455, the api at port 4456, and enable the anonymous authenticator, the allow and deny authorizers, and the noop and id_token mutators.
Access rules

We will be using httpbin.org as the upstream server. The service echoes incoming HTTP Requests and is perfect for seeing how Ory Oathkeeper works. Let's define three rules:

    An access rule that allowing anonymous access to https://httpbin.org/anything/header and using the header mutator.
    An access rule denying every access to https://httpbin.org/anything/deny. If the request header has Accept: application/json, we will receive a JSON response. If however the accept header has Accept: text/*, a HTTP Redirect will be sent (to https://www.ory.com/docs as configured above).
    An access rule allowing anonymous access to https://httpbin.org/anything/id_token using the id_token mutator.

cat << EOF > rules.json
[
{
  "id": "allow-anonymous-with-header-mutator",
  "version": "v26.2.0",
  "upstream": {
    "url": "https://httpbin.org/anything/header"
  },
  "match": {
    "url": "http://<127.0.0.1|localhost>:4455/anything/header",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "header",
      "config": {
        "headers": {
          "X-User": "{{ print .Subject }}"
        }
      }
    }
  ]
},
{
  "id": "deny-anonymous",
  "version": "v26.2.0",
  "upstream": {
    "url": "https://httpbin.org/anything/deny"
  },
  "match": {
    "url": "http://<127.0.0.1|localhost>:4455/anything/deny",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "deny"
  },
  "mutators": [
    {
      "handler": "noop"
    }
  ],
  "errors": [
    {
      "handler": "json",
      "config": {
        "when": [
          {
            "request": {
              "header": {
                "accept": ["application/json"]
              }
            }
          }
        ]
      }
    },
    {
      "handler": "redirect",
      "config": {
        "when": [
          {
            "request": {
              "header": {
                "accept": ["text/*"]
              }
            }
          }
        ]
      }
    }
  ]
},
{
  "id": "allow-anonymous-with-id-token-mutator",
  "version": "v26.2.0",
  "upstream": {
    "url": "https://httpbin.org/anything/id_token"
  },
  "match": {
    "url": "http://<127.0.0.1|localhost>:4455/anything/id_token",
    "methods": [
      "GET"
    ]
  },
  "authenticators": [
    {
      "handler": "anonymous"
    }
  ],
  "authorizer": {
    "handler": "allow"
  },
  "mutators": [
    {
      "handler": "id_token"
    }
  ]
}
]
EOF

Cryptographic keys

The id_token mutator creates a signed JSON Web Token. For that to work, a public/private key is required. Luckily, Ory Oathkeeper can assist you in creating such keys. All common JWT algorithms are supported (RS256, ES256, HS256, ...). Let's generate a key for the RS256 algorithm that will be used by the id_token mutator:

docker run oryd/oathkeeper:v26.2.0 credentials generate --alg RS256 > jwks.json

Dockerfile

Next we will be creating a custom Docker Image that adds these configuration files to the image:

cat << EOF > Dockerfile
FROM oryd/oathkeeper:v26.2.0
ADD config.yaml /config.yaml
ADD rules.json /rules.json
ADD jwks.json /jwks.json
EOF

We're doing this for demonstration purposes only. In a production environment you would separate these configuration values from the build artifact itself. In Kubernetes, it would make most sense to provide the JSON Web Keys as a Kubernetes Secret mounted as in a directory, for example.

We encourage you to check out our helm charts which apply these best practices.
Build & run

Before building the Docker Image, we need to make sure that the local Ory Oathkeeper Docker Image is on the most recent version:

docker pull oryd/oathkeeper:v26.2.0

Next we will build our custom Docker Image

docker build -t ory-oathkeeper-demo .

and run it

docker run --rm \
  --name ory-oathkeeper-demo \
  -p 4455:4455 \
  -p 4456:4456 \
  ory-oathkeeper-demo \
  --config /config.yaml \
  serve

Let's open a new terminal and check if it's alive:

curl http://127.0.0.1:4456/health/alive
{"status":"ok"}

curl http://127.0.0.1:4456/health/ready
{"status":"ok"}

Let's also check if the rules have been imported properly:

curl http://127.0.0.1:4456/rules
[{"id":"allow-anonymous-with-header-mutator","description":"","match":{"methods":["GET"],...

Authorize requests

Everything is up and running and configured! Let's make some requests:

curl -X GET http://127.0.0.1:4455/anything/header
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0",
    "X-User": "guest"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 82.135.11.242, 172.17.0.1",
  "url": "https://httpbin.org/anything/header/anything/header"
}

# Make request and accept JSON (we get an error response)
curl -H "Accept: application/json" -X GET http://127.0.0.1:4455/anything/deny
{
  "error":{
    "code":403,
    "status":"Forbidden",
    "message":"Access credentials aren't sufficient to access this resource"
  }
}

# Make request and accept text/* (we get a redirect response).
curl -H "Accept: text/html" -X GET http://127.0.0.1:4455/anything/deny
<a href="https://www.ory.com/docs">Found</a>.

curl -X GET http://127.0.0.1:4455/anything/id_token
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3N2E2NWE0LTUzM2YtNDFhYi1hODI2LTgxNDliMDM2NDQ0MyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTgwMTg1MTcsImlhdCI6MTU1ODAxODQ1NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0NDU1LyIsImp0aSI6IjExNmRiNzhmLTQyMjEtNDU2ZC05OWIzLTY4NGJkMWVjYThjZSIsIm5iZiI6MTU1ODAxODQ1Nywic3ViIjoiZ3Vlc3QifQ.2VKW-oYtzkFGRPgK3sb4iRlObDSzW8PyHzgNiQubppFSlp0bzJLl4Rnt56orJndPqIa7hwsm8YIskf-Wp-FA1piv-aG_XljkUjgilKr3cncMXDP15yDRwZj8g0iVKEhnugQsw_zWf5gMU2YBev2Eyv4xciJxbhrKCat-X8xNT9SvAbwpY-VxQdu_rnpu1GKCA54DyIX6r-Qh5bQPrrT7NvIupA7jJQ23qq83m4C1cQfBgzlhm7dcCuPqKunYKRsc7NZuER3lT6TjkhsF1qhf7o7BZmCnhz6VuH8L8TwMZS8IJWKSjJd8dEKKwxwPkNXOcZO8A3hIO8SZx4Yd7jrONA",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "method": "GET",
  "origin": "172.17.0.1, 82.135.11.242, 172.17.0.1",
  "url": "https://httpbin.org/anything/id_token/anything/id_token"
}

That's it! You can now clean up the demo using:

docker rm -f ory-oathkeeper-demo
docker rmi -f ory-oathkeeper-demo
rm -rf oathkeeper-demo

Monitoring

Ory Oathkeeper provides an endpoint for Prometheus to scrape as a target. This endpoint can be accessed by default at: http://localhost:9000/metrics:

You can adjust the settings in the Ory Oathkeeper configuration.

cat << EOF > config.yaml
serve:
  prometheus:
    port: 9000
    host: localhost
    metrics_path: /metrics
EOF

Prometheus can be run as a Docker container. More information are available on https://github.com/prometheus/prometheus. Start with setting up a Prometheus configuration:

cat << EOF > prometheus.yml
global:
  scrape_interval: 15s # By default, scrape targets every 15 seconds.

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'oathkeeper'
    scrape_interval: 15s
    metrics_path: /metrics
    static_configs:
      # The target needs to match what you've configured above
      - targets: ['localhost:9000']
EOF

Run the following commands to start the Prometheus server and access it on http://localhost:9090:

docker run \
  --config.file=/etc/prometheus/prometheus.yml \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  --name prometheus \
  -d \
  --net=host
  -p 9090:9090 \
  prom/prometheus

You can extend the basic monitoring setup with visualizations using for example Grafana. For more information visit the "Grafana support for Prometheus" documentation.

You can use the exemplary dashboard to get started quickly: Oathkeeper-Dashboard.json.

Ory Oathkeeper with Prometheus and Grafana

    Ory Open SourceOry OathkeeperReferenceHTTP API

    api
    metadata
        getCheck HTTP Server Status
        getCheck HTTP Server and Database Status
        getReturn Running Software Version.

redocly logoAPI docs by Redocly
Ory Oathkeeper API

Download OpenAPI specification:Download
E-mail: hi@ory.sh License: Apache 2.0

Documentation for all of Ory Oathkeeper's APIs.
api
Lists Cryptographic Keys

This endpoint returns cryptographic keys that are required to, for example, verify signatures of ID Tokens.
Responses
Response samples

    200500

Content type
application/json
{

    "keys": [
        {}
    ]

}
Access Control Decision API

    This endpoint works with all HTTP Methods (GET, POST, PUT, ...) and matches every path prefixed with /decisions.

This endpoint mirrors the proxy capability of ORY Oathkeeper's proxy functionality but instead of forwarding the request to the upstream server, returns 200 (request should be allowed), 401 (unauthorized), or 403 (forbidden) status codes. This endpoint can be used to integrate with other API Proxies like Ambassador, Kong, Envoy, and many more.
Responses
Response samples

    401403404500

Content type
application/json
{

    "code": 0,
    "details": [
        {}
    ],
    "message": "string",
    "reason": "string",
    "request": "string",
    "status": "string"

}
List All Rules

This method returns an array of all rules that are stored in the backend. This is useful if you want to get a full view of what rules you have currently in place.
query Parameters
limit	
integer <int64>

The maximum amount of rules returned.
offset	
integer <int64>

The offset from where to start looking.
Responses
Response samples

    200500

Content type
application/json
[

    {
        "authenticators": [],
        "authorizer": {},
        "description": "string",
        "id": "string",
        "match": {},
        "mutators": [],
        "upstream": {}
    }

]
Retrieve a Rule

Use this method to retrieve a rule from the storage. If it does not exist you will receive a 404 error.
path Parameters
id
required
	
string
Responses
Response samples

    200404500

Content type
application/json
{

    "authenticators": [
        {}
    ],
    "authorizer": {
        "config": null,
        "handler": "string"
    },
    "description": "string",
    "id": "string",
    "match": {
        "methods": [],
        "url": "string"
    },
    "mutators": [
        {}
    ],
    "upstream": {
        "preserve_host": true,
        "strip_path": "string",
        "url": "string"
    }

}
metadata
Check HTTP Server Status

This endpoint returns a HTTP 200 status code when Ory Oathkeeper is accepting incoming HTTP requests. This status does currently not include checks whether the database connection is working.

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

This endpoint returns a HTTP 200 status code when Ory Oathkeeper is up running and the environment dependencies (e.g. the database) are responsive as well.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of Ory Oathkeeper, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200503

Content type
application/json
{

    "status": "string"

}
Return Running Software Version.

This endpoint returns the version of Ory Oathkeeper.

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

Software Development Kit (SDK)

The Ory Oathkeeper SDK allows for integration with Ory Oathkeeper.

Before using the SDK, consult the Ory Oathkeeper REST API documentation.

To view the source code for the generated SDKs, visit the Ory Oathkeeper SDK GitHub repository. Ory SDKs are generated using the openapi-generator.
Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

    Dart
    .NET
    Elixir
    Go REST
    Java
    JavaScript with TypeScript definitions and compatible with: Node.js, React.js, Angular, Vue.js, and many more.
    PHP
    Python
    Ruby
    Rust

Further information

To view the source code for the generated Ory SDKs, visit the GitHub repository: Generated SDKs for Ory Oathkeeper

Missing your programming language?
Create an issue and help the Ory team build, test, and publish the SDK for your programming language!

:::
SDK Backwards compatibility

The Ory SDK uses automated code generation by openapi-generator. openapi-generator can make changes to the generated code with each new version, which breaks backwards compatibility in some cases. As a result, the Ory SDK may not be compatible with previous versions.

:::
