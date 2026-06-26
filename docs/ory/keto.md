Introduction to Ory Keto for Ory Open Source (OSS)

Ory Permissions is a modern permission system you can use to create a complete authorization system for your application or website, no matter the size or the complexity of the ACLs (access-control lists) your use case requires. Ory Permissions, based on the open-source Ory Keto Permission Server, is the first open-source implementation of the design principles and specifications described in Zanzibar: Google's Consistent, Global Authorization System.

Implementing the design principles described in the Zanzibar paper allows Ory Permissions to offer the following benefits over other, widely adopted permission systems:

    Flexibility: Traditional permission systems typically rely on a fixed set of permissions and access control rules that are difficult to customize or modify. Ory Permissions provides a flexible data model you can customize to fit a wide range of use cases. Creating custom permission models is aided by Ory Permission Language, a developer-friendly, TypeScript-based configuration language.

    Scalability: While traditional permission systems often struggle to handle large-scale applications and services with high request volume, Ory Permissions is designed to be highly scalable and handle a large number of concurrent requests without sacrificing performance or reliability.

With Ory Permissions, you can:

    Use Ory Permission Language to create permission models that fit your exact use case - RBAC, ABAC, and beyond.
    Unify authorization logic in one service that's the single source of truth for access rights across all of your applications.
    Be tech-stack agnostic and use Ory Network SDKs available for all major programming languages.
    Issue fine-grained permissions, for example User:x is in readers of Document:y.
    Allow permissions inheritance through groups, roles, and hierarchies to ensure organic scaling that follows the growth of your application.

Ory Permission Language

The Ory Permission Language (OPL) is a developer-friendly configuration language defined as a subset of TypeScript. It's designed to be quick to learn and has a familiar source in contrary to other, proprietary languages used to represent permissions, such as Rego or Casbin.
tip

You can create permission rules with OPL using the Ory Console. Go to Ory Console → Namespaces & Rules and use the editor in the Permission Rules tab.

This is an example of OPL code:

import { Namespace, Context } from "@ory/keto-namespace-types"

class User implements Namespace {}

class Document implements Namespace {
  // All relationships for a single document.
  related: {
    editors: User[]
    viewers: User[]
  }

  // The permissions derived from the relationships and context.
  permits = {
    // A permission is a function that takes the context and returns a boolean. It can reference `this.related` and `this.permits`.
    write: (ctx: Context): boolean =>
      this.related.editors.includes(ctx.subject),
    read: (ctx: Context): boolean =>
      this.permits.write(ctx) || this.related.viewers.includes(ctx.subject),
  }
}

Next steps

    Complete the Ory Permissions quickstart to see the system in action.
    Learn about the foundational concepts behind Ory Permissions: relationships, namespaces, objects, and subjects.
    Learn what is a permission model and how to create one.
    Read the Ory Permission Language specification.


Installation
danger

The APIs of Ory open-source Servers don't come with integrated access control. This means that all requests sent to their APIs are considered authenticated, authorized, and will be executed. Leaving the APIs in this state can lead to severe security risks.

When deploying Ory open-source Servers, protect access to their APIs using Ory Oathkeeper or a comparable API Gateway.

If you need help, reach out to the community on Ory Community Slack.

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

Install Ory Keto on Linux using bash <(curl ...):

bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b . keto v26.2.0
./keto help

You may want to move Ory Keto to your $PATH:

sudo mv ./keto /usr/local/bin/
keto help

macOS

Install Ory Keto using homebrew on macOS:

brew install ory/tap/keto
undefined help

Windows

Install Ory Keto on Windows using Scoop:

scoop bucket add ory https://github.com/ory/scoop.git
scoop install keto
keto help

Docker

Ory Keto is available as a Docker Image for all major platforms (ARM64, AMD64, ...):

docker pull oryd/keto:v26.2.0
docker run --rm -it oryd/keto:v26.2.0 help

Kubernetes

A list of available Helm Charts for Kubernetes can be found at k8s.ory.com/helm.
Download Binaries

You can download the client and server binaries on our Github releases page. No installer is available. You have to add the binary to the PATH in your environment yourself, for example by putting it into /usr/local/bin or something comparable.

Once installed, you should be able to run:

keto help

Building from source

If you wish to compile the binary yourself, you need to install and set up Go 1.17+ and add $GOPATH/bin to your $PATH.
danger

Please note that this will check out the latest commit, which might be not yet released and unstable.

git clone https://github.com/ory/keto.git
cd keto
go mod download
go install -tags sqlite,json1,hsm .
$(go env GOPATH)/bin/keto help

Migrating to Keto v0.7

Ory Keto v0.6 used the table-separated namespaces database schema described in the Google Zanzibar paper. However, we found for various reasons outlined in #613 that this isn't ideal for Keto.

Because the database schema changed significantly, and it isn't possible to have SQL-only migrations, there is a special migration procedure needed to upgrade Ory Keto v0.6.
Preparations
danger

As always with database migrations, please make a backup of your data and try the migration process first on a non-production copy of the database.

This migration has to download all the data from the database, transform them, and then write them back to the database. Make sure that you run it as close to the database as possible to reduce the latency and failure rate. In case of a failure, just restart the process. It's run as one big SQL transaction.
Recommended procedure
caution

This is the recommended procedure. Please adjust to your setup and test before applying to a production system. You might want to create a migration script that applies all these steps and handles errors.

This procedure is zero-downtime only for read API requests. The write API will not be available during migration.

    Create a new database user (from now on keto_new) with the same privileges as the one used until now (let's say it was keto).
    Start a server instance of Keto v0.7 next to the already running Keto v0.6. It should have the same settings, but use keto_new for accessing the database.
    Change the privileges of keto to be read-only on all tables.
    Still route all traffic to the old Keto. Write API requests will fail from now on, but the Read API will be zero-downtime.
    Run keto migrate up --yes considering the points raised in preparations. This command will apply SQL schema changes, but not yet migrate data.
    Run keto namespace migrate legacy --yes considering the points raised in preparations. This command will migrate all namespaces and delete the old tables on success.
    In case of failure, re-run the command until it succeeds.
    In case of log statements stating Skipping relationship, it seems to be in a broken state. Please recreate it manually. note down the logged data somewhere and recreate the relationships in question once the migration is done using the API.
    After the migration is successfully done, route all traffic to Keto v0.7 and shut down Keto v0.6. At this point the API is fully operational again.

Options for adjusting the migration process

The keto namespace migrate legacy command supports multiple options:

    interactive mode with manual approval by not specifying --yes
    migrate single namespace by specifying its name as an argument
    only delete old tables by specifying --down-only; useful if you didn't approve the down migration previously



Apply upgrades

Follow this guide when upgrading Ory Keto to a newer version.
danger

Back up your data! Applying upgrades can lead to data loss if handled incorrectly.

    Review breaking changes. Visit the CHANGELOG.md to see if breaking changes have been introduced in the version you are upgrading to.
    Backup your data.
    Update the Ory Keto SDK if used in your application.
    Install the new version of Ory Keto.
    Run keto migrate to run the SQL migrations to the new database schema.

Should you run into problems with the upgrade, consider a stepped upgrade and please visit the community chat or start a discussion.
Migrating to Keto 0.7

Ory Keto v0.6 used the table-separated namespaces database schema described in the Google Zanzibar paper. However, we found for various reasons outlined in that this isn't ideal for Keto. Visit migrating to Keto v0.7 guide for more information
Migrating Keto policies from 0.5 version

In Ory Keto 0.6 Ory Access Control Policy DSL modeled after AWS IAM Policies became obsolete. Visit migrating legacy policies guide for more information.


Ory Keto Quickstart
Professional support?

Ory offers support for self-hosted Ory software through the Ory Enterprise License (OEL). Read more about the OEL here.

This example describes a video sharing service. The individual videos are organized in directories. Every directory has an owner and every video has the same owner as it's parent directory. The owner has elevated privileges about the video files that aren't modeled individually in Ory Keto. The only other privilege modeled in this example is "view access." Every owner has view access to their objects, and this privilege can be granted to other users as well. The video sharing application interprets the special * user ID as any user, including anonymous users. Note that Ory Keto doesn't interpret this subject any differently from other subjects. It also doesn't know anything about directory structures or induced ownership.

The "Keto client" is the application interacting with Keto. In this case we refer to the video sharing service backend as the Keto client.
Starting the example

First, install Keto.

Now you can start the example using either docker-compose or a bash script. The bash script requires you to have the keto binary in your $PATH.

Alternatively, use Docker to automatically get the required images.

# clone the repository if you don't have it yet
git clone git@github.com:ory/keto.git && cd keto

# Alternatively, you can use 'https' to clone if ssh cloning gives permission denied error. (Configure ssh keys in github to resolve the issue.)
git clone https://github.com/ory/keto.git && cd keto

docker-compose -f contrib/cat-videos-example/docker-compose.yml up
# or
./contrib/cat-videos-example/up.sh

# output: all initially created relationships

# NAMESPACE       OBJECT          RELATION NAME   SUBJECT
# videos          /cats/1.mp4     owner           videos:/cats#owner
# videos          /cats/1.mp4     view            videos:/cats/1.mp4#owner
# videos          /cats/1.mp4     view            *
# videos          /cats/2.mp4     owner           videos:/cats#owner
# videos          /cats/2.mp4     view            videos:/cats/2.mp4#owner
# videos          /cats           owner           cat lady
# videos          /cats           view            videos:/cats#owner

State of the system

At the current state only one user with the username cat lady has added videos. Both videos are in the /cats directory owned by cat lady. The file /cats/1.mp4 can be viewed by anyone (*), while /cats/2.mp4 has no extra sharing options, and can therefore only be viewed by its owner, cat lady. The relationship definitions are located in the contrib/cat-videos-example/relation-tuples directory.
Simulating the video sharing application

Now you can open a second terminal to run the queries against, just like the video service client would do. In this example we will use the Keto CLI client.

If you want to run the Keto CLI within Docker, set the alias

alias keto="docker run -it --network cat-videos-example_default -e KETO_READ_REMOTE=\"keto:4466\" oryd/keto:v0.7.0-alpha.1"

in your terminal session. Alternatively, you need to set the remote endpoint so that the Keto CLI knows where to connect to (not necessary if using Docker):

export KETO_READ_REMOTE="127.0.0.1:4466"

Check incoming requests

First off, we get a request by an anonymous user that would like to view /cats/2.mp4. The client now has to ask Keto if that operation should be allowed or denied.

# Is "*" allowed to "view" the object "videos":"/cats/2.mp4"?
keto check "*" view videos /cats/2.mp4
# output:

# Denied

We already discussed that this request should be denied, but it's always good to see this in action.

Now cat lady wants to change some view permissions of /cats/1.mp4. For this, the video service application has to show all users that are allowed to view the video. It uses Keto's expand-API to get these data:

# Who is allowed to "view" the object "videos":"/cats/2.mp4"?
keto expand view videos /cats/1.mp4
# output:

# ∪ videos:/cats/1.mp4#view
# ├─ ∪ videos:/cats/1.mp4#owner
# │  ├─ ∪ videos:/cats#owner
# │  │  ├─ ☘ cat lady️
# ├─ ☘ *️

Here we can see the full subject set expansion. The first branch

videos:/cats/1.mp4#view

indicates that every owner of the object is allowed to view

videos:/cats/1.mp4#owner

In the next step we see that the object's owners are the owners of /cats

videos:/cats#owner

We see that cat lady is the owner of /cats.

Note that there is no direct relationship that would grant cat lady view access on /cats/1.mp4 as this is indirectly defined via the ownership relation.

The special user * on the other hand was directly granted view access on the object, as it's a first-level leaf of the expansion tree. The following CLI command proves that this is the case:

# Is "*" allowed to "view" the object "videos":"/cats/1.mp4"?
keto check "*" view videos /cats/1.mp4
# output:

# Allowed

videos:/cats

owner

view

cat lady

owner

videos:/cats/1.mp4

view
* (anyone)

videos/cats/2.mp4

view

owner

Updating the view permissions will be added here at a later stage.

Configuration file

You can load the config file from another source using the -c path/to/config.yaml or --config path/to/config.yaml flag: $keto --config path/to/config.yaml.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart. All configuration values can be set using environment variables, as documented below.
Disclaimer

This reference configuration documents all keys, also deprecated ones! It is a reference for all possible configuration values.

If you are looking for an example configuration, it is better to try out the quickstart.

To find out more about edge cases like setting string array values through environmental variables head to the Configuration section.

## ORY Keto Configuration


$schema: http://a.aaa
dsn: postgres://user:password@host:123/database
serve:
  read:
    port: 0
    host: localhost
    write_listen_file: file:///tmp/keto-read-api
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
  write:
    port: 0
    host: localhost
    write_listen_file: file:///tmp/keto-write-api
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
  metrics:
    port: 0
    host: localhost
    write_listen_file: file:///tmp/keto-metrics-api
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
  opl:
    port: 0
    host: localhost
    write_listen_file: file:///tmp/keto-opl-api
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
profiling: cpu
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
namespaces: http://a.aaa
limit:
  max_read_depth: 1
  max_read_width: 1
  max_batch_check_size: 1
  batch_check_max_parallelization: 1
  max_expand_size: 0
clients:
  http:
    disallow_private_ip_ranges: false
secrets:
  pagination:
    - secret used for encryption
    - old secret kept for decryption
    - another old secret kept for decryption
feature_flags:
  expand_rewrites: false
  strict_mode: false
version: v0.0.0


Configuration editor
ORY Keto Configuration
$schema
Add this to allow defining the schema, useful for IDE integration
Data Source Name*
Sets the data source name. This configures the backend where ORY Keto persists data. If dsn is "memory", data will be written to memory and is lost when you restart this instance. ORY Hydra supports popular SQL databases. For more detailed configuration information go to: https://www.ory.com/docs/hydra/dependencies-environment#sql
serve
Read API (http and gRPC)
Port
The port to listen on.
Host
The network interface to listen on.
Read Listen File
The path to a file that will be created when the read API is ready to accept connections. The content of the file is the host:port of the read API. Use this to get the actual port when using port 0. The service might not yet be ready to accept connections when the file is created.
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
Write API (http and gRPC)
Port
The port to listen on.
Host
The network interface to listen on.
Write Listen File
The path to a file that will be created when the write API is ready to accept connections. The content of the file is the host:port of the write API. Use this to get the actual port when using port 0. The service might not yet be ready to accept connections when the file is created.
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
Metrics API (http only)
Port
The port to listen on.
Host
The network interface to listen on.
Metrics Listen File
The path to a file that will be created when the metrics API is ready to accept connections. The content of the file is the host:port of the metrics API. Use this to get the actual port when using port 0. The service might not yet be ready to accept connections when the file is created.
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
Ory Permission Language Syntax API (http and gRPC)
Port
The port to listen on.
Host
The network interface to listen on.
OPL Listen File
The path to a file that will be created when the OPL API is ready to accept connections. The content of the file is the host:port of the OPL API. Use this to get the actual port when using port 0. The service might not yet be ready to accept connections when the file is created.
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
Profiling
Enables CPU or memory profiling if set. For more details on profiling Go programs read [Profiling Go Programs](https://blog.golang.org/profiling-go-programs).
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
namespaces
Legacy namespace Repo URI
A URI that points to a directory of namespace files, or a single file with all namespaces
Namespace configuration or it's location.
Limits
Limits aiming to control the resource consumption. These limits are not a sufficient replacement for rate-limiting.
Global maximum read depth
The global maximum depth on all read operations. Note that this does not affect how deeply nested the tuples can be. This value can be decreased for a request by a value specified on the request, only if the request-specific value is greater than 1 and less than the global maximum depth.
Global maximum read width
The global maximum width on all read operations. Note that this does not affect how deeply nested the tuples can be. This value can be decreased for a request by a value specified on the request, only if the request-specific value is greater than 1 and less than the global maximum width.
Maximum batch check size
The maximum number of tuples that will be accepted by the batch check endpoint.
Max concurrent checks during batch check
The limit for the number of tuples that will be checked concurrently during a batch check.
Maximum tuples during expand
The maximum total number of relation tuples the expand engine will return in a single BuildTree call. Once the limit is reached, further nodes are returned as truncated.
Global outgoing network settings
Configure how outgoing network calls behave.
Global HTTP client configuration
Configure how outgoing HTTP calls behave.
Disallow all outgoing HTTP calls to private IP ranges. This feature can help protect against SSRF attacks.
Disallow private IP ranges
Secrets for signing and encryption
Make sure to use unique and random secrets for production deployments. Horizontally scaled deployments have to use the same secrets across all instances.
pagination
Pagination secrets are used to encrypt pagination tokens. The first secret is used for encryption, while all others are used for decryption. This allows you to rotate the encryption key without invalidating all existing pagination tokens.
Feature flags
Opt in to features that are still being refined. Behavior may change in future releases.
If enabled, the expand API follows OPL rewrite rules when building permission trees.
Expand OPL rewrite rules
If strict mode is enabled, then relation tuples for permits are not checked directly (but the rewrites are applied). Similarly, subject sets are only expanded if they were declared with SubjectSet<...>. These stricter rules result in much faster checks with fewer queries to the underlying database.
Strict permission checking mode
The Keto version this config is written for.
SemVer according to https://semver.org/ prefixed with `v` as in our releases.


Prepare for production

Read this document to prepare for production when self-hosting Ory Keto.
Feel free to open an issue or pull request when you have an idea how to improve this documentation.

Read more about deployment fundamentals and requirements for Ory.
Database

Ory Keto requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production! Read more about deployment fundamentals and requirements for Ory.
Security checklist

Before deploying to production, review and explicitly set the following security-critical configuration values. Do not rely on defaults in a production environment.
Secrets

Review the secrets section of the Configuration.

Do not rely on the defaults in production, and set a custom secret value for secrets.pagination. Generate a cryptographically secure random value, for example:

openssl rand -base64 32

Ory Keto API behind an API gateway

Although Ory Keto implements all Go best practices around running public-facing production HTTP servers, we discourage running Ory Keto facing the public net directly. We strongly recommend running Ory Keto behind an API gateway or a load balancer. It's common to terminate TLS on the edge (gateway / load balancer) and use certificates provided by your infrastructure provider such as AWS CA for last mile security. A good practice is to not expose the Write API at all to the public internet. The Read API should also be protected, depending on your usecase it can reveal expose information (for example leak who has permission to do something). Use a Zero Trust networking architecture within your intranet.
Scaling

There are no additional requirements for scaling when self-hosting Ory Keto, just spin up another container!


    Ory Open SourceOry KetoReferenceHTTP API

    relationship
    metadata
    permission
        postBatch check permissions
        getCheck a permission
        postCheck a permission
        getCheck a permission
        postCheck a permission
        getExpand a Relationship into permissions.

redocly logoAPI docs by Redocly
Ory Keto API

Download OpenAPI specification:Download
E-mail: hi@ory.sh License: Apache 2.0

Documentation for all of Ory Keto's REST APIs. gRPC is documented separately.
relationship
Delete Relationships

Use this endpoint to delete relationships
query Parameters
namespace	
string

Namespace of the Relationship
object	
string

Object of the Relationship
relation	
string

Relation of the Relationship
subject_id	
string

SubjectID of the Relationship
subject_set.namespace	
string

Namespace of the Subject Set
subject_set.object	
string

Object of the Subject Set
subject_set.relation	
string

Relation of the Subject Set
Responses
Response samples

    400default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": {},
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Patch Multiple Relationships

Use this endpoint to patch one or more relationships.
Request Body schema: application/json
Array
action	
string
Enum: "insert" "delete"
	
object (relationship)

Relationship
Responses
Request samples

    Payload

Content type
application/json
[

    {
        "action": "insert",
        "relation_tuple": {}
    }

]
Response samples

    400404default

Content type
application/json
{

    "error": {
        "code": 404,
        "debug": "SQL field \"foo\" is not a bool.",
        "details": {},
        "id": "string",
        "message": "The resource could not be found",
        "reason": "User with ID 1234 does not exist.",
        "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
        "status": "Not Found"
    }

}
Create a Relationship

Use this endpoint to create a relationship.
Request Body schema: application/json
namespace	
string

Namespace to query
object	
string

Object to query
relation	
string

Relation to query
subject_id	
string

SubjectID to query

Either SubjectSet or SubjectID can be provided.
	
object (subjectSet)
Responses
Request samples

    Payload

Content type
application/json
{

    "namespace": "string",
    "object": "string",
    "relation": "string",
    "subject_id": "string",
    "subject_set": {
        "namespace": "string",
        "object": "string",
        "relation": "string"
    }

}
Response samples

    201400default

Content type
application/json
{

    "namespace": "string",
    "object": "string",
    "relation": "string",
    "subject_id": "string",
    "subject_set": {
        "namespace": "string",
        "object": "string",
        "relation": "string"
    }

}
Query namespaces

Get all namespaces
Responses
Response samples

    200default

Content type
application/json
{

    "namespaces": [
        {}
    ]

}
Check the syntax of an OPL file

The OPL file is expected in the body of the request.
Request Body schema: text/plain
string (checkOplSyntaxBody)

Ory Permission Language Document
Responses
Response samples

    200400default

Content type
application/json
{

    "errors": [
        {}
    ]

}
Query relationships

Get all relationships that match the query. Only the namespace field is required.
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
namespace	
string

Namespace of the Relationship
object	
string

Object of the Relationship
relation	
string

Relation of the Relationship
subject_id	
string

SubjectID of the Relationship
subject_set.namespace	
string

Namespace of the Subject Set
subject_set.object	
string

Object of the Subject Set
subject_set.relation	
string

Relation of the Subject Set
Responses
Response samples

    200404default

Content type
application/json
{

    "next_page_token": "string",
    "relation_tuples": [
        {}
    ]

}
metadata
Check HTTP Server Status

This endpoint returns a HTTP 200 status code when Ory Keto is accepting incoming HTTP requests. This status does currently not include checks whether the database connection is working.

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

This endpoint returns a HTTP 200 status code when Ory Keto is up running and the environment dependencies (e.g. the database) are responsive as well.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of Ory Keto, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200503

Content type
application/json
{

    "status": "string"

}
Return Running Software Version.

This endpoint returns the version of Ory Keto.

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
permission
Batch check permissions

To learn how relationship tuples and the check works, head over to the documentation.
query Parameters
max-depth	
integer <int64>
Request Body schema: application/json
	
Array of objects (relationship)
Array
namespace
required
	
string

Namespace of the Relation Tuple
object
required
	
string

Object of the Relation Tuple
relation
required
	
string

Relation of the Relation Tuple
subject_id	
string

SubjectID of the Relation Tuple

Either SubjectSet or SubjectID can be provided.
	
object (subjectSet)
Responses
Request samples

    Payload

Content type
application/json
{

    "tuples": [
        {}
    ]

}
Response samples

    200400default

Content type
application/json
{

    "results": [
        {}
    ]

}
Check a permission

To learn how relationship tuples and the check works, head over to the documentation.
query Parameters
namespace	
string

Namespace of the Relationship
object	
string

Object of the Relationship
relation	
string

Relation of the Relationship
subject_id	
string

SubjectID of the Relationship
subject_set.namespace	
string

Namespace of the Subject Set
subject_set.object	
string

Object of the Subject Set
subject_set.relation	
string

Relation of the Subject Set
max-depth	
integer <int64>
Responses
Response samples

    200400403default

Content type
application/json
{

    "allowed": true

}
Check a permission

To learn how relationship tuples and the check works, head over to the documentation.
query Parameters
max-depth	
integer <int64>
Request Body schema: application/json
namespace	
string

Namespace to query
object	
string

Object to query
relation	
string

Relation to query
subject_id	
string

SubjectID to query

Either SubjectSet or SubjectID can be provided.
	
object (subjectSet)
Responses
Request samples

    Payload

Content type
application/json
{

    "namespace": "string",
    "object": "string",
    "relation": "string",
    "subject_id": "string",
    "subject_set": {
        "namespace": "string",
        "object": "string",
        "relation": "string"
    }

}
Response samples

    200400403default

Content type
application/json
{

    "allowed": true

}
Check a permission

To learn how relationship tuples and the check works, head over to the documentation.
query Parameters
namespace	
string

Namespace of the Relationship
object	
string

Object of the Relationship
relation	
string

Relation of the Relationship
subject_id	
string

SubjectID of the Relationship
subject_set.namespace	
string

Namespace of the Subject Set
subject_set.object	
string

Object of the Subject Set
subject_set.relation	
string

Relation of the Subject Set
max-depth	
integer <int64>
Responses
Response samples

    200400default

Content type
application/json
{

    "allowed": true

}
Check a permission

To learn how relationship tuples and the check works, head over to the documentation.
query Parameters
max-depth	
integer <int64>
Request Body schema: application/json
namespace	
string

Namespace to query
object	
string

Object to query
relation	
string

Relation to query
subject_id	
string

SubjectID to query

Either SubjectSet or SubjectID can be provided.
	
object (subjectSet)
Responses
Request samples

    Payload

Content type
application/json
{

    "namespace": "string",
    "object": "string",
    "relation": "string",
    "subject_id": "string",
    "subject_set": {
        "namespace": "string",
        "object": "string",
        "relation": "string"
    }

}
Response samples

    200400default

Content type
application/json
{

    "allowed": true

}
Expand a Relationship into permissions.

Use this endpoint to expand a relationship tuple into permissions.
query Parameters
namespace
required
	
string

Namespace of the Subject Set
object
required
	
string

Object of the Subject Set
relation
required
	
string

Relation of the Subject Set
max-depth	
integer <int64>
Responses
Response samples

    200400404default

Content type
application/json
{

    "children": [
        { }
    ],
    "tuple": {
        "namespace": "string",
        "object": "string",
        "relation": "string",
        "subject_id": "string",
        "subject_set": {}
    },
    "type": "union"

}

Protocol Documentation
Table of Contents

    ory/keto/opl/v1alpha1/syntax_service.proto
        CheckRequest
        CheckResponse
        ParseError
        SourcePosition
        SyntaxService

    ory/keto/relation_tuples/v1alpha2/relation_tuples.proto
        RelationQuery
        RelationTuple
        Subject
        SubjectSet

    ory/keto/relation_tuples/v1alpha2/check_service.proto
        BatchCheckRequest
        BatchCheckResponse
        CheckRequest
        CheckResponse
        CheckResponseWithError
        CheckService

    ory/keto/relation_tuples/v1alpha2/expand_service.proto
        ExpandRequest
        ExpandResponse
        SubjectTree
        NodeType
        ExpandService

    ory/keto/relation_tuples/v1alpha2/namespaces_service.proto
        ListNamespacesRequest
        ListNamespacesResponse
        Namespace
        NamespacesService

    ory/keto/relation_tuples/v1alpha2/read_service.proto
        ListRelationTuplesRequest
        ListRelationTuplesRequest.Query
        ListRelationTuplesResponse
        ReadService

    ory/keto/relation_tuples/v1alpha2/version.proto
        GetVersionRequest
        GetVersionResponse
        VersionService

    ory/keto/relation_tuples/v1alpha2/write_service.proto
        DeleteRelationTuplesRequest
        DeleteRelationTuplesRequest.Query
        DeleteRelationTuplesResponse
        RelationTupleDelta
        TransactRelationTuplesRequest
        TransactRelationTuplesResponse
        RelationTupleDelta.Action
        WriteService

    Scalar Value Types

Top
ory/keto/opl/v1alpha1/syntax_service.proto
CheckRequest
Field	Type	Label	Description
content	bytes		
CheckResponse
Field	Type	Label	Description
parse_errors	ParseError	repeated	
ParseError
Field	Type	Label	Description
message	string		
start	SourcePosition		
end	SourcePosition		
SourcePosition
Field	Type	Label	Description
line	uint32		
column	uint32		
SyntaxService

The service that checks the syntax of an OPL file.
Method Name	Request Type	Response Type	Description
Check	CheckRequest	CheckResponse	Performs a syntax check request.

Top
ory/keto/relation_tuples/v1alpha2/relation_tuples.proto
RelationQuery

The query for listing relationships. Clients can specify any optional field to partially filter for specific relationships.

Example use cases (namespace is always required):

    object only: display a list of all permissions referring to a specific object
    relation only: get all groups that have members; get all directories that have content
    object & relation: display all subjects that have a specific permission relation
    subject & relation: display all groups a subject belongs to; display all objects a subject has access to
    object & relation & subject: check whether the relation tuple already exists

Field	Type	Label	Description
namespace	string	optional	The namespace this relation tuple lives in.
object	string	optional	The object related by this tuple.
It is an object in the namespace of the tuple.
relation	string	optional	The relation between an Object and a Subject.
subject	Subject	optional	The subject related by this tuple.
A Subject either represents a concrete subject id or
a SubjectSet that expands to more Subjects.
RelationTuple

RelationTuple defines a relation between an Object and a Subject.
Field	Type	Label	Description
namespace	string		The namespace this relation tuple lives in.
object	string		The object related by this tuple.
It is an object in the namespace of the tuple.
relation	string		The relation between an Object and a Subject.
subject	Subject		The subject related by this tuple.
A Subject either represents a concrete subject id or
a SubjectSet that expands to more Subjects.
Subject

Subject is either a concrete subject id or a SubjectSet expanding to more Subjects.
Field	Type	Label	Description
id	string		A concrete id of the subject.
set	SubjectSet		A subject set that expands to more Subjects.
More information are available under concepts.
SubjectSet

SubjectSet refers to all subjects who have the same relation on an object.
Field	Type	Label	Description
namespace	string		The namespace of the object and relation
referenced in this subject set.
object	string		The object related by this subject set.
relation	string		The relation between the object and the subjects.

Top
ory/keto/relation_tuples/v1alpha2/check_service.proto
BatchCheckRequest

The request for a CheckService.BatchCheck RPC. Checks a batch of relations.
Field	Type	Label	Description
tuples	RelationTuple	repeated	
latest	bool		This field is not implemented yet and has no effect.
snaptoken	string		This field is not implemented yet and has no effect.
max_depth	int32		The maximum depth to search for a relation.

If the value is less than 1 or greater than the global
max-depth then the global max-depth will be used instead.
BatchCheckResponse

The response for a CheckService.BatchCheck rpc.
Field	Type	Label	Description
results	CheckResponseWithError	repeated	The results of the batch check. The order of these
results will match the order of the input.
CheckRequest

The request for a CheckService.Check RPC. Checks whether a specific subject is related to an object.
Field	Type	Label	Description
namespace	string		Deprecated. The namespace to evaluate the check.

Note: If you use the expand-API and the check
evaluates a RelationTuple specifying a SubjectSet as
subject or due to a rewrite rule in a namespace config
this check request may involve other namespaces automatically.
object	string		Deprecated. The related object in this check.
relation	string		Deprecated. The relation between the Object and the Subject.
subject	Subject		Deprecated. The related subject in this check.
tuple	RelationTuple		
latest	bool		This field is not implemented yet and has no effect.
snaptoken	string		This field is not implemented yet and has no effect.
max_depth	int32		The maximum depth to search for a relation.

If the value is less than 1 or greater than the global
max-depth then the global max-depth will be used instead.
CheckResponse

The response for a CheckService.Check rpc.
Field	Type	Label	Description
allowed	bool		Whether the specified subject (id)
is related to the requested object.

It is false by default if no ACL matches.
snaptoken	string		This field is not implemented yet and has no effect.
CheckResponseWithError

The response for an individual check in the CheckService.BatchCheck rpc.
Field	Type	Label	Description
allowed	bool		Whether the specified subject (id)
is related to the requested object.

It is false by default if no ACL matches.
error	string		If there was an error checking the tuple,
this will contain the error message.

If the check was performed successfully, this will be empty.
snaptoken	string		This field is not implemented yet and has no effect.
CheckService

The service that performs authorization checks based on the stored Access Control Lists.

This service is part of the read-APIs.
Method Name	Request Type	Response Type	Description
Check	CheckRequest	CheckResponse	Performs an authorization check.
BatchCheck	BatchCheckRequest	BatchCheckResponse	

Top
ory/keto/relation_tuples/v1alpha2/expand_service.proto
ExpandRequest

The request for an ExpandService.Expand RPC. Expands the given subject set.
Field	Type	Label	Description
subject	Subject		The subject to expand.
max_depth	int32		The maximum depth of tree to build.

If the value is less than 1 or greater than the global
max-depth then the global max-depth will be used instead.

It is important to set this parameter to a meaningful
value. Ponder how deep you really want to display this.
snaptoken	string		This field is not implemented yet and has no effect.
ExpandResponse

The response for a ExpandService.Expand RPC.
Field	Type	Label	Description
tree	SubjectTree		The tree the requested subject set expands to.
The requested subject set is the subject of the root.

This field can be nil in some circumstances.
SubjectTree
Field	Type	Label	Description
node_type	NodeType		The type of the node.
subject	Subject		Deprecated. The subject this node represents.
Deprecated: More information is now available in the tuple field.
tuple	RelationTuple		The relation tuple this node represents.
children	SubjectTree	repeated	The children of this node.

This is never set if node_type == NODE_TYPE_LEAF.
NodeType
Name	Number	Description
NODE_TYPE_UNSPECIFIED	0	
NODE_TYPE_UNION	1	This node expands to a union of all children.
NODE_TYPE_EXCLUSION	2	Not implemented yet.
NODE_TYPE_INTERSECTION	3	Not implemented yet.
NODE_TYPE_LEAF	4	This node is a leaf and contains no children.
Its subject is a SubjectID unless max_depth was reached.
ExpandService

The service that performs subject set expansion based on the stored Access Control Lists.

This service is part of the read-APIs.
Method Name	Request Type	Response Type	Description
Expand	ExpandRequest	ExpandResponse	Expands the subject set into a tree of subjects.

Top
ory/keto/relation_tuples/v1alpha2/namespaces_service.proto
ListNamespacesRequest

Request for ReadService.ListNamespaces RPC.
ListNamespacesResponse
Field	Type	Label	Description
namespaces	Namespace	repeated	
Namespace
Field	Type	Label	Description
name	string		
NamespacesService

The service to query namespaces.

This service is part of the read-APIs.
Method Name	Request Type	Response Type	Description
ListNamespaces	ListNamespacesRequest	ListNamespacesResponse	Lists Namespaces

Top
ory/keto/relation_tuples/v1alpha2/read_service.proto
ListRelationTuplesRequest

Request for ReadService.ListRelationTuples RPC. See ListRelationTuplesRequest_Query for how to filter the query.
Field	Type	Label	Description
query	ListRelationTuplesRequest.Query		Deprecated. All query constraints are concatenated
with a logical AND operator.

The RelationTuple list from ListRelationTuplesResponse
is ordered from the newest RelationTuple to the oldest.
relation_query	RelationQuery		
expand_mask	google.protobuf.FieldMask		This field is not implemented yet and has no effect.
snaptoken	string		This field is not implemented yet and has no effect.
page_size	int32		Optional. The maximum number of
RelationTuples to return in the response.

Default: 100
page_token	string		Optional. An opaque pagination token returned from
a previous call to ListRelationTuples that
indicates where the page should start at.

An empty token denotes the first page. All successive
pages require the token from the previous page.
ListRelationTuplesRequest.Query

The query for listing relationships. Clients can specify any optional field to partially filter for specific relationships.

Example use cases (namespace is always required):

    object only: display a list of all permissions referring to a specific object
    relation only: get all groups that have members; get all directories that have content
    object & relation: display all subjects that have a specific permission relation
    subject & relation: display all groups a subject belongs to; display all objects a subject has access to
    object & relation & subject: check whether the relation tuple already exists

Field	Type	Label	Description
namespace	string		Required. The namespace to query.
object	string		Optional. The object to query for.
relation	string		Optional. The relation to query for.
subject	Subject		Optional. The subject to query for.
ListRelationTuplesResponse

The response of a ReadService.ListRelationTuples RPC.
Field	Type	Label	Description
relation_tuples	RelationTuple	repeated	The relationships matching the list request.
next_page_token	string		The token required to get the next page.
If this is the last page, the token will be the empty string.
ReadService

The service to query relationships.

This service is part of the read-APIs.
Method Name	Request Type	Response Type	Description
ListRelationTuples	ListRelationTuplesRequest	ListRelationTuplesResponse	Lists ACL relationships.

Top
ory/keto/relation_tuples/v1alpha2/version.proto
GetVersionRequest

Request for the VersionService.GetVersion RPC.
GetVersionResponse

Response of the VersionService.GetVersion RPC.
Field	Type	Label	Description
version	string		The version string of the Ory Keto instance.
VersionService

The service returning the specific Ory Keto instance version.

This service is part of the read-APIs and write-APIs.
Method Name	Request Type	Response Type	Description
GetVersion	GetVersionRequest	GetVersionResponse	Returns the version of the Ory Keto instance.

Top
ory/keto/relation_tuples/v1alpha2/write_service.proto
DeleteRelationTuplesRequest
Field	Type	Label	Description
query	DeleteRelationTuplesRequest.Query		Deprecated.
relation_query	RelationQuery		
DeleteRelationTuplesRequest.Query

The query for deleting relationships
Field	Type	Label	Description
namespace	string		Optional. The namespace to query.
object	string		Optional. The object to query for.
relation	string		Optional. The relation to query for.
subject	Subject		Optional. The subject to query for.
DeleteRelationTuplesResponse
RelationTupleDelta

Write-delta for a TransactRelationTuplesRequest.
Field	Type	Label	Description
action	RelationTupleDelta.Action		The action to do on the RelationTuple.
relation_tuple	RelationTuple		The target RelationTuple.
TransactRelationTuplesRequest

The request of a WriteService.TransactRelationTuples RPC.
Field	Type	Label	Description
relation_tuple_deltas	RelationTupleDelta	repeated	The write delta for the relationships operated in one single transaction.
Either all actions succeed or no change takes effect on error.
TransactRelationTuplesResponse

The response of a WriteService.TransactRelationTuples rpc.
Field	Type	Label	Description
snaptokens	string	repeated	This field is not implemented yet and has no effect.
RelationTupleDelta.Action
Name	Number	Description
ACTION_UNSPECIFIED	0	Unspecified.
The TransactRelationTuples RPC ignores this
RelationTupleDelta if an action was unspecified.
ACTION_INSERT	1	Insertion of a new RelationTuple.
It is ignored if already existing.
ACTION_DELETE	2	Deletion of the RelationTuple.
It is ignored if it does not exist.
WriteService

The write service to create and delete Access Control Lists.

This service is part of the write-APIs.
Method Name	Request Type	Response Type	Description
TransactRelationTuples	TransactRelationTuplesRequest	TransactRelationTuplesResponse	Writes one or more relationships in a single transaction.
DeleteRelationTuples	DeleteRelationTuplesRequest	DeleteRelationTuplesResponse	Deletes relationships based on relation query
Scalar Value Types
.proto Type	Notes	C++	Java	Python	Go	C#	PHP	Ruby
double		double	double	float	float64	double	float	Float
float		float	float	float	float32	float	float	Float
int32	Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead.	int32	int	int	int32	int	integer	Bignum or Fixnum (as required)
int64	Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead.	int64	long	int/long	int64	long	integer/string	Bignum
uint32	Uses variable-length encoding.	uint32	int	int/long	uint32	uint	integer	Bignum or Fixnum (as required)
uint64	Uses variable-length encoding.	uint64	long	int/long	uint64	ulong	integer/string	Bignum or Fixnum (as required)
sint32	Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.	int32	int	int	int32	int	integer	Bignum or Fixnum (as required)
sint64	Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.	int64	long	int/long	int64	long	integer/string	Bignum
fixed32	Always four bytes. More efficient than uint32 if values are often greater than 2^28.	uint32	int	int	uint32	uint	integer	Bignum or Fixnum (as required)
fixed64	Always eight bytes. More efficient than uint64 if values are often greater than 2^56.	uint64	long	int/long	uint64	ulong	integer/string	Bignum
sfixed32	Always four bytes.	int32	int	int	int32	int	integer	Bignum or Fixnum (as required)
sfixed64	Always eight bytes.	int64	long	int/long	int64	long	integer/string	Bignum
bool		bool	boolean	boolean	bool	bool	boolean	TrueClass/FalseClass
string	A string must always contain UTF-8 encoded or 7-bit ASCII text.	string	String	str/unicode	string	string	string	String (UTF-8)
bytes	May contain any arbitrary sequence of bytes.	string	ByteString	str	[]byte	ByteString	string	String (ASCII-8BIT)


Software Development Kit (SDK)

The Ory Keto SDK allows for integration with a self-hosted Ory Keto Permission Server.

Before using the SDK, consult the Ory Keto REST and gRPC API documentation.

To view the source code for the generated SDKs, visit the Ory Keto SDKs GitHub repository. Ory SDKs are generated using the openapi-generator.
Download the SDK

Ory publishes SDKs for popular languages in their respective package repositories:

    Dart
    .NET
    Elixir
    Go gRPC (import using go get github.com/ory/keto/proto)
    Go REST
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

In this document you can find code examples for the Ory Keto Go SDK.
info

Missing an example? Please create a feature request and it will be added here.

You can find more examples of SDK usage in the auto-generated documentation keto-client-go.

Ory Keto exposes two APIs for integration

    gRPC
    REST

Installation
Installation gRPC API

go get github.com/ory/keto/proto

Installation REST API

go get github.com/ory/keto-client-go

REST API examples

As an example, let's create the following minimal permission rules. These just contain a User and Blog namespace as well as the view permission for the Blog namespace.

import { Namespace, SubjectSet, Context } from "@ory/keto-namespace-types"

class User implements Namespace { }

class Blog implements Namespace {
  related: {
    viewers: User[]
  }

  permits = {
    view: (ctx: Context): boolean =>
      this.related.viewers.includes(ctx.subject)
  }
}

If you want to learn more about creating permission rules read the Create a permission model guide.
CreateRelationship and CheckPermission

The following code creates and checks the following permission:

Blog:secret_post#view@Bob

This means Bob can view the secret_post in the Blog namespace.

package main

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/keto-client-go"
)

// Use this context to access Ory APIs which require an Ory API Key.
var namespace = "Blog"
var object = "secret_post"
var relation = "view"
var subjectId = "Bob"

func main() {
	payload := ory.CreateRelationshipBody{
		Namespace: &namespace,
		Object:    &object,
		Relation:  &relation,
		SubjectId: &subjectId,
	}
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4467", // Write API
		},
	}
	writeClient := ory.NewAPIClient(configuration)
	_, r, err := writeClient.RelationshipApi.CreateRelationship(context.Background()).CreateRelationshipBody(payload).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		panic("Encountered error: " + err.Error())
	}
	fmt.Println("Successfully created tuple")
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4466", // Read API
		},
	}
	readClient := client.NewAPIClient(configuration)

	check, r, err := readClient.PermissionApi.CheckPermission(context.Background()).
		Namespace(*&namespace).
		Object(*&object).
		Relation(*&relation).
		SubjectId(*&subjectId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		panic("Encountered error: " + err.Error())
	}
	if check.Allowed {
		fmt.Println(*&subjectId + " can " + *&relation + " the " + *&object)
	}
}
