Introduction to Ory Hydra for Ory Open Source (OSS)

OAuth2 is the industry-standard protocol that enables secure machine-to-machine communication and grants limited access to data and services on behalf of users. OpenID Connect, built on top of OAuth2, is required to become a social sign-in provider.

Ory OAuth2 and OpenID Connect, built on top of the widely deployed open-source Ory Hydra Federation Server is available out of the box in the Ory Network and is the perfect solution for securely connecting users, applications, and services. Whether you need single sign-on (SSO), mobile and third-party application authorization, API access management, server-to-server communication, or federated identity, you can find a solution based on Ory OAuth2 and OpenID Connect.
Features

Ory OAuth2 and OpenID Connect comes with a range of features that make it the ideal solution for securely connecting users, applications, and services.
Certified OpenID Connect implementation

Ory OAuth2 and OpenID Connect is a Certified OpenID Connect Implementation that meets all requirements set by the OpenID Foundation. You can trust Ory OAuth2 and OpenID Connect to meet the highest standards of security and reliability.
Flexible user management

Ory OAuth2 and OpenID Connect is connected to Ory Identities by default, but unlike many other OAuth2 service providers, Ory's service is a headless API that doesn't force you to use a specific user management system. This means that Ory OAuth2 and OpenID Connect is the perfect fit if you want to become an OAuth2 provider and already have an existing user management system.
Low latency

Ory OAuth2 and OpenID Connect is optimized for low latency, ensuring that your applications can authenticate users and access resources as quickly as possible. This is especially important for high-traffic applications or those that require real-time data access.
Global deployment

Ory OAuth2 and OpenID Connect is deployed in data centers around the world, ensuring that your applications can access the service with minimal latency from anywhere in the world. With global deployment, you can easily serve users in multiple regions and meet data sovereignty requirements.
Security-first architecture

Ory OAuth2 and OpenID Connect has a security-first architecture that neutralizes common attack vectors, as well as numerous less exploited security risks. The architecture and workflows are designed to meet the highest security standards and comply with industry best practices.
Cryptographic key storage

In addition to OAuth2 functionality, Ory OAuth2 and OpenID Connect offers safe storage for cryptographic keys that can be used, for example, to sign JSON Web Tokens.
Benefits

Ory OAuth2 and OpenID Connect provides a number of key benefits that make it the ideal choice for securely connecting users, applications, and services. With Ory OAuth2 and OpenID Connect, you can:

    Reduce development time: With Ory OAuth2 and OpenID Connect, you can get up and running quickly with a fully featured OAuth2 and OpenID Connect provider that meets all industry standards and covers a wide range of use cases.
    Ensure regulatory compliance: Ory OAuth2 and OpenID Connect is designed to comply with the latest security standards and regulatory requirements, making it easy to meet your compliance needs.
    Improve user experience: With support for SSO and mobile authentication, Ory OAuth2 and OpenID Connect makes it easy for users to access your applications securely and quickly.
    Scale with ease: Ory OAuth2 and OpenID Connect is built on a cloud-native architecture that makes it easy to deploy and scale the service to meet your needs, whether you're serving thousands or millions of users.
    Minimize security risks: Ory OAuth2 and OpenID Connect's security-first architecture and cryptographic key storage help minimize security risks, ensuring that your users and data are protected from unauthorized access and malicious attacks.

Use cases

Ory OAuth2 and OpenID Connect can be used for a wide range of use cases, including:

    Single sign-on (SSO): Allow users to authenticate with a single set of credentials across multiple applications, eliminating the need for multiple logins.
    Mobile and third-party application authorization: Enable applications to request authorization to access resources on behalf of users. This lets users give apps limited access to their resources without sharing their credentials.
    API access management: Use OAuth2 to verify the identity of clients that try to access APIs and enforce appropriate access control policies based on this identification.
    Server-to-server communication: Authorize communication between servers without a user present.
    Federated identity: Become an identity provider, authenticate users, and provide access to applications just like Google, Facebook, or GitHub.

Next steps

See Ory Network OAuth2 quickstart guide to learn how to set up your own OAuth2 and OpenID Connect provider in just a few minutes. The guide walks you through the process of setting up Ory OAuth2 and OpenID Connect and configuring a sample application to use the service.

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

Install Ory Hydra on Linux using bash <(curl ...):

bash <(curl https://raw.githubusercontent.com/ory/meta/master/install.sh) -d -b . hydra <version-you-want>
./hydra help

You may want to move Ory Hydra to your $PATH:

sudo mv ./hydra /usr/local/bin/
hydra help

macOS

Install Ory Hydra using homebrew on macOS:

brew install ory/tap/hydra
hydra help

Windows

Install Ory Hydra on Windows using Scoop:

scoop bucket add ory https://github.com/ory/scoop.git
scoop install hydra
hydra help

Docker

Ory Hydra is available as a Docker Image for all major platforms (ARM64, AMD64, ...):

docker pull oryd/hydra:<version-you-want>
docker run --rm -it oryd/hydra:<version-you-want> help

Kubernetes

A list of available Helm Charts for Kubernetes can be found at k8s.ory.com/helm.
Download Binaries

You can download the client and server binaries on our Github releases page. No installer is available. You have to add the binary to the PATH in your environment yourself, for example by putting it into /usr/local/bin or something comparable.

Once installed, you should be able to run:

hydra help

Building from source

If you wish to compile the binary yourself, you need to install and set up Go 1.17+ and add $GOPATH/bin to your $PATH.
danger

Please note that this will check out the latest commit, which might be not yet released and unstable.

git clone https://github.com/ory/hydra.git
cd hydra
go mod download
go install -tags sqlite,json1,hsm .
$(go env GOPATH)/bin/hydra help

Migrate to Ory Hydra OEL from Self-Hosted Ory Hydra

This guide outlines the steps to upgrade from self-hosted Ory Hydra to Ory Hydra Enterprise License (OEL). Upgrading to OEL provides additional features and support for enterprise customers.
Prerequisites

Before starting the process, ensure you meet the following requirements:

    Valid Ory Enterprise License: You must have purchased an Ory Enterprise License.
    Access to the Ory Enterprise Docker Registry: You need access to download the OEL Docker images.
    Backup and Testing: Create a backup of your current Ory database if you are upgrading or migrating and test the process on a test environment to ensure compatibility and minimize risks.

    Ory Hydra Version: Your current Ory Hydra installation must be version 2.0 or higher.

Upgrade process

Follow these steps to upgrade from self-hosted Ory Hydra to Ory Hydra Enterprise License (OEL):
1. Keep the open source version running

Ensure that your current open source version of Ory Hydra is running.
2. Run the OEL Image for database migration

Use the Ory Hydra Enterprise License Docker image to run the hydra migrate sql up command against the database of the open source service. This step applies the necessary database migrations for OEL. Your current configuration file is compatible with OEL Hydra therefore no changes are required in the file.

docker run --rm \
  -e DSN=your_database_connection_string \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise/hydra-oel:<version> \
  migrate sql up -e -f config.yml

Replace your_database_connection_string with your actual database connection string.
3. Switch to Ory Hydra Enterprise License

After successfully migrating the database:

    Start the Ory Hydra Enterprise License Version: Launch the Ory Hydra OEL using the same database connection string and configuration, but with the OEL Docker image.

docker run -d \
  --name=hydra-oel \
  -e DSN=your_database_connection_string \
  -p 4444:4444 -p 4445:4445 \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise/hydra-oel:<version> \
  serve all -c config.yml

Ensure to replace your_database_connection_string with your database connection string used in the migration step.

    Switch traffic to point to the new Ory Enterprise License Hydra. Perform this step on your infrastructure.
    Stop the Open Source Version: Shut down your current open source Ory Hydra service.


Reverting Database Migration for Ory Hydra

This guide outlines the steps to revert a database migration in Ory Hydra using the custom jobs functionality provided in the Ory Hydra Helm chart. Reverting a migration can be essential when a schema change needs to be undone due to errors or unexpected issues. This method leverages your existing production configuration, with only the migration arguments being customized.
note

All other parameters - such as pod labels, service accounts, and resource configurations—are inherited from your current Hydra deployment. This minimizes potential configuration discrepancies and reduces the risk of errors.
Prerequisites

Before you begin, ensure you have the following:

    Active Ory Hydra Deployment: A production deployment is required because the migration job uses its configuration.
    Kubernetes Permissions: Ensure you have sufficient privileges to create and apply Kubernetes jobs.
    Database Backup: Always backup your database before attempting to revert any migrations.

Deployment Process
1. Create a Job Values File

Create a file named migrate-down-values.yaml to define the job with the custom arguments for reverting the migration. Adjust the parameters as needed:

hydra:
  customMigrations:
    jobs:
      sql-migration-down:
        enabled: true
        customArgs: ["migrate", "sql", "down", "-e", "-y", "--steps", "1"]

If you need to revert all database changes introduced by the last migration, you must determine the number of applied statements from the migration job. Check the migration job logs for a line similar to the following:

time=2025-03-05T11:47:18Z level=info msg=Successfully applied 2 migrations. audience=application service_name=Ory Hydra service_version=master

2. Prepare Helm resources

Pull the newest version of the Ory Helm chart and update the repository:

helm repo add ory https://k8s.ory.com/helm/charts
helm repo update

Locate the current production values file used by your Ory Hydra deployment. This file is needed to ensure that we revert the correct migrations. Using your production values file ensures that the job is created with the same container image and configuration as your production deployment.
3. Generate and Apply the Job Definition

This command produces a Kubernetes job definition that reverts the database migration using your production configuration with the custom job arguments.

helm template hydra ory/hydra --namespace oasis --show-only templates/job-migrations-custom.yaml \
 -f hydra-values-used-by-your-production-env.yaml \
 -f hydra/oel/migrate-down-values.yaml > migrate-down-job.yaml

Verify the generated job definition in migrate-down-job.yaml to ensure that the custom arguments are correctly set. If everything looks good, apply the job to your Kubernetes cluster:

kubectl apply -f migrate-down-job.yaml

Possible issues
Incorrect Migration Arguments

If the job fails, check that the custom arguments in migrate-down-values.yaml accurately reflect the intended migration reversal. The default configuration reverts the last migration step, but you may need to adjust the --steps parameter if reverting more than one migration is required.

Upgrade Ory Hydra OEL to a newer version

This document provides a comprehensive guide on how to upgrade your Ory Hydra Enterprise License (OEL) version. Upgrading to the latest version ensures you have the newest features, security updates, and performance improvements.
Prerequisites

Before starting the process, ensure you meet the following requirements:

    Valid Ory Enterprise License: You must have purchased an Ory Enterprise License.
    Access to the Ory Enterprise Docker Registry: You need access to download the OEL Docker images.
    Backup and Testing: Create a backup of your current Ory database if you are upgrading or migrating and test the process on a test environment to ensure compatibility and minimize risks.

Pick the right version

To upgrade Ory Hydra OEL, you need to know the version you are currently running. Check your Docker or Kubernetes environment to find the tag. You should find your tag in this list down below.
note

Zero-downtime migrations are only possible if you do not skip any version when upgrading.

The list is ordered by date. Pick the newest version from the top of the list to upgrade.
Image Tag	Release Date
26.2.19	2026-06-17
26.2.18	2026-06-11
26.2.17	2026-06-10
26.2.16	2026-06-05
26.2.15	2026-06-02
26.2.14	2026-05-29
26.2.13	2026-05-22
26.2.12	2026-05-20
26.2.11	2026-05-15
26.2.10	2026-05-11
26.2.9	2026-05-04
26.2.8	2026-04-28
26.2.7	2026-04-24
26.2.6	2026-04-22
26.2.5	2026-04-20
26.2.4	2026-04-14
26.2.3	2026-04-02
26.2.2	2026-03-26
26.2.1	2026-03-25
26.2.0	2026-03-20
26.1.18	2026-03-13
26.1.17	2026-03-11
26.1.16	2026-03-09
26.1.15	2026-02-26
26.1.14	2026-02-25
26.1.13	2026-02-20
26.1.12	2026-02-19
26.1.11	2026-02-17
26.1.10	2026-02-11
26.1.9	2026-02-09
26.1.8	2026-02-05
26.1.7	2026-02-04
26.1.6	2026-02-04
26.1.5	2026-02-01
26.1.4	2026-01-26
26.1.3	2026-01-22
26.1.2	2026-01-18
26.1.1	2026-01-17
26.1.0	2026-01-05
25.4.12	2025-12-24
25.4.11	2025-12-23
25.4.10	2025-12-22
25.4.9	2025-12-18
25.4.8	2025-12-09
25.4.5	2025-12-04
25.4.3	2025-12-01
25.4.2	2025-11-25
25.4.1	2025-11-19
25.4.0	2025-11-07
25.3.9	2025-10-30
25.3.8	2025-10-23
25.3.6	2025-10-10
25.3.5	2025-10-03
25.3.4	2025-09-26
25.3.3	2025-09-18
25.3.2	2025-09-08
25.3.1	2025-09-03
25.3.0	2025-08-20
8d6ee03cc8181d3277100a4b7412a3a113799964	2025-08-12
8fcb534888e8853836a97ead241bef518f6fc263	2025-08-04
beebb63c5cd4a58b218a792027b34d231735dc05	2025-07-25
097934fff2bda05c808d962a92f52140f80dff83	2025-07-25
cab093b480501b914f6b2eda1f306b8d6e179ab4	2025-07-16
9cde70b7b994db145ab08bc3e1288b49cd7b3696	2025-07-08
6147132bd97e3d9146037beeaebf8d315b760ed2	2025-07-04
86970d22e81479695c130079707f8f9dc0929885	2025-07-03
4a0cd2779d9c80fecb3f1ce49efad606942421fd	2025-07-01
37fbe9cc74369230ab90af9ea92817e39191b549	2025-06-27
ea3038323329fb703a31bde1abc1a0cf41a08926	2025-06-23
19fae4f763fa139db38db601000cb80b53ebde4d	2025-06-20
290abca8469dc46c1ba07708849fed28fdbc1b69	2025-06-11
d389bd4c1bc21c1cdaf5e60688314a5bf9bfce3e	2025-06-06
d4f640cf72989adf24ba153919ede18d4cddc98e	2025-05-27
86516686797493772d75d3ab118e2107607b530c	2025-05-23
a4de81abb7c19ee1c227aca07d43b5693252003a	2025-05-21
e85c1a42ff8bf17f38d9b62abf6e8f33432c7f2a	2025-05-16
e4fa9d0244d703c844843fc9a07f236013412894	2025-05-05
40a5e4e273445838a7cb10579c0bbcf6b43be51c	2025-04-22
2e109bde0929be56c99a1fdfd071cca71cff0027	2025-04-16
07a33841df96ebce3e61015c63c33ccfa6e245f1	2025-04-08
f9189059fadf9f4ea7e8961b05d26836673e95ab	2025-04-08
50b7f9d3f9b3bfe9258a777bfe96efffdbeb6fd8	2025-04-01
8825ef2357bc9485f39bbcfd695f2dcab51e2b2f	2025-03-31
367fce6d847b7bdba50515705ae75c9c56cbec6a	2025-03-27
ba208705029b9a015a72206e348c39bd814fcd0c	2025-03-20
25c058e5a20b8524361ecd6f8e185622745c8f79	2025-03-14
22c323f50880f0227915c536f5eefa106e9387d7	2025-03-12
b225881c54ea601c1e925f1f142c1ab373336c9c	2025-03-11
a670e7889d09bf51ef1e69d29ca61611e1b0e802	2025-03-06
3941aaf70247f3d315e545956be38de70b14c044	2025-03-04
76b6f8eb08f8371d99109cfc60da26d23bcd8b52	2025-02-28
429289a6c08b5619c86e34313376b597131108fc	2025-02-24
19f3f0fbbfb9cb48788789c47352ce8f582ea64c	2025-02-21
569c06b47e9ccd9548afa71d22e7ba4e3b1d5b01	2025-02-14
e17b2ea61cc69e70f252e384d5ccbac83e504ced	2025-02-12
29c1dd6b0b5d0b991019e2730f4efd4fce86fa48	2025-02-04
35ba5a70b32d69c3b623f312f985f69a54f71029	2025-01-31
e879d83cd5cc0cba4a0ec3399ef32f252c220b0e	2025-01-30
ea5c69132fe43cfe35e2e8f068906a652936d329	2025-01-30
9f377c2778e987aaeded444309f61361559d04ea	2025-01-22
139630050d4da09c6ea58e937ae923a27aed078f	2025-01-16
4e1c5d215f165a3b186b13fbbf3ecf0206fba92d	2025-01-16
edabe30a788945411489409852bca93a60e18837	2025-01-02
f941460ee49d64a9653ba6886700d05c1e729b9d	2024-12-24
3c860bb15843a99056e2e9ce469f935a4e68f790	2024-12-20
2ec082f971c8a85f325db338e63889017b81bf6f	2024-12-18
4de7ed84637c14f9ae3b85175156c837e472ced0	2024-12-16
6323ac2d73b302898ad2f415b28a0c87293e7eb1	2024-12-10
a1201e72919f47cb7e6dd0c6eba8db8266ed7045	2024-11-29
2575b683dcff45af2d18e7ed23a2a7aca3eea5d4	2024-11-25
94d6dfba9d81c00ff03ad61a0005e93a974a03f7	2024-11-12
69efdbbb45f642b5b142426a03a255f39e276689	2024-11-05
f5eb2f3ae6c3ece3e00dc68c5e8743de7e9f1117	2024-11-05
83f53137a823ee0ace7e2ae94e7823caa036b800	2024-10-17
14f390f978b2ebcdc8e181ac04f9978a397e21d2	2024-10-11
a22eff120ff38ee4596ed3afddb4ca4307b1adbb	2024-10-07
75ade08cd441f43f7771ed4f11417a30ff0b31ac	2024-09-27
e2439391378f3abd513fb13847bc6a1b5f0157f1	2024-09-26
52ebf819f5538176c7ac1c4afc953123e8f0d3bf	2024-09-24
c35bfb780da7ddacba23f31b5e1634fa155af9c9	2024-09-19
20b15ef54f30d3d43a5d04bcdb7fd1d1f3fa2832	2024-09-10
ce413707a03c4551b3f0bbe2e1e9c929a7e0b025	2024-09-05
bf4441cc6dc1f8e8387173ae8f1396395dc1f433	2024-08-30
9b96c2507f9f17f639f73c2a9284f32bf63cd9d8	2024-08-27
1f407d0b2035e50812e6888a71b772530d17fc7a	2024-08-12
04858989138f4b09c2b9b9676e3641326d96b1a6	2024-08-02
0fd87c560867f19ab12276edf258e42c4688454a	2024-07-24
470aebc3ab2d4c225ca14ab8b1a12809f51b7eb3	2024-07-18
73a77968be31cbcba18b02918a8c11343a1fa038	2024-07-04
1578667fa246c374ca85c5eadbf49cc53a296775	2024-06-26
f832e165e187e49657229902c13ad30c4cf10d0b	2024-06-20
f066fc62fc37ee1d28b4f2973faaa2bc098fc952	2024-06-18
39bbe4e0d99d40d5c4feb97321fc68b20f02a7ae	2024-06-14
f2ead7db68e8af72dbd1ab099fbaa6bf0f0ec8c3	2024-06-12
897e224960bb8677edf3344bd51c9edd779e9da7	2024-06-05
Upgrade Using Helm Charts in Kubernetes

Upgrading Ory Hydra OEL in Kubernetes is straightforward when using Ory's Helm Charts. Follow these steps to upgrade Ory Hydra OEL:
1. Enable auto SQL migration

Set hydra.automigration.enabled to true in the values.yaml file:

image:
  # ....
# ...
hydra:
  automigration:
    enabled: true
# ...

2. Update the image tag

image:
  registry: europe-docker.pkg.dev
  repository: ory-artifacts/ory-enterprise/hydra-oel
  tag: <replace-with-current-image-tag>
# ...

3. Apply / install the helm chart

You can now apply the upgrade:

helm upgrade ory-oel-hydra ory/hydra --namespace ory -f values.yaml

4. Wait for the upgrade to propagate

Once the init container is done and the main container is running, the upgrade is complete.
Upgrade steps without Helm Charts
1. Check Release Notes

Before upgrading, review the changelog for the new version to understand the changes, new features, and any deprecations.
2. Backup Your Data

Ensure you have a complete backup of your database and configuration files. This step is crucial for restoring your system in case of an upgrade failure.
3. Pull the Latest Docker Image

Pull the latest Ory Hydra OEL Docker image from the Ory Enterprise Docker Registry:

docker pull europe-docker.pkg.dev/ory-artifacts/ory-enterprise/hydra-oel:<new-version-tag>

5. Apply SQL Migrations

Before deploying the service, you need to apply SQL migrations:

docker run \
  -e DSN=your_database_connection_string \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise/hydra-oel:<new-version-tag> \
  -- migrate sql up -e -f /path/to/config.yaml

Replace your_database_connection_string with your actual database connection string.
5. Start the Service

Now you will be able to start the service. In most environments, the release will gracefully rotate pods.

docker run \
  -p 4444:4444 -p 4445:4445 \
  -e DSN=your_database_connection_string \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise/hydra-oel:<new-version-tag> \
  -- serve all -f /path/to/config.yaml

Replace your_database_connection_string with your actual database connection string.
Conclusion

Upgrading Ory Hydra OEL is essential to keep your system secure and up-to-date. By following the steps outlined in this guide, you can ensure a smooth upgrade process with minimal downtime.

If you encounter any issues during the upgrade process, please reach out to the Ory support team for assistance.

Apply upgrades

Follow this guide when upgrading Ory Hydra to a newer version.
danger

Back up your data! Applying upgrades can lead to data loss if handled incorrectly.

    Read the release notes. We try to make our release notes as comprehensive as possible, so make sure to give them a good read. They might contain information that is specific to your deployment.
    Review breaking changes. Visit the CHANGELOG.md to see if breaking changes have been introduced in the version you are upgrading to.
    Backup your data.
    Update the Ory Hydra SDK if used in your application.
    Install the new version of Ory Hydra.
    Run hydra migrate sql to run the SQL migrations to the new database schema.

Should you run into problems with the upgrade, consider a stepped upgrade and please visit the community chat or start a discussion.
Migrate from Hydra v1 to v2

Some consents may be erased when migrating to Hydra 2.0. We assume that only a very small number of sessions, issued by pre-1.0 Hydra, will be affected. Please contact us if this assumption doesn't apply or if the deletion adversely affects your deployment.

The below query displays the numbers of consents that will be deleted by the v2 migration. Make sure that you are happy with these consents being deleted before you proceed.

-- postgresql
SELECT
  COUNT(*) AS count,
  DATE_TRUNC('month', requested_at) AS month
FROM hydra_oauth2_consent_request
WHERE login_challenge IS NULL
GROUP BY month;

Ory Hydra (OAuth2) Quickstart
Professional support?

Ory offers support for self-hosted Ory software through the Ory Enterprise License (OEL). Read more about the OEL here.

In this quickstart, you will set up Ory Hydra OAuth2 & OpenID Connect Server and an exemplary User Login & Consent App using Docker Compose. You need to have the latest Docker and Docker Compose version and Git installed, as well as jq.

You do not want to self-host? Try out common OAuth2 grants on the fully managed version of Ory Hydra.

OAuth2 Flow with Open Source OAuth2 Server Ory Hydra

To get started, clone the Ory Hydra locally:


git clone https://github.com/ory/hydra.git
cd hydra
git checkout v26.2.0

Run the following command(s) to start the OAuth2 server:

    PostgreSQL (prod)
    PostgreSQL (dev)
    MySQL
    SQLite
    Observability
    HSM

Run the latest Ory Hydra production build:

docker compose -f quickstart.yml \
    -f quickstart-postgres.yml \
    up

Starting hydra_postgresd_1
Starting hydra_hydra_1
[...]

Let's confirm that everything is working by creating an OAuth 2.0 Client.

The OAuth 2.0 client uses port 4444 and 4445. The former is Ory Hydra's public endpoint, the latter its administrative endpoint. For more information head over to Exposing Administrative and Public API Endpoints.

Let's create the OAuth 2.0 Client:

client=$(docker compose -f quickstart.yml exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445/ \
    --format json \
    --grant-type client_credentials)

# We parse the JSON response using jq to get the client ID and client secret:
client_id=$(echo $client | jq -r '.client_id')
client_secret=$(echo $client | jq -r '.client_secret')

Let's perform the client credentials grant:

docker compose -f quickstart.yml exec hydra \
  hydra perform client-credentials \
  --endpoint http://127.0.0.1:4444/ \
  --client-id "$client_id" \
  --client-secret "$client_secret"

ACCESS TOKEN    ory_at_ZDTkKci59rH_8KlZlRjIek0812n9oPsvJX_nTdptGt0.bbpFutv5CsfjHzs8QrsnmPZ-0VxgwPvg9jgw1DQaYNg
REFRESH TOKEN   <empty>
ID TOKEN        <empty>
EXPIRY          2022-06-27 11:50:28.244046504 +0000 UTC m=+3599.059213960

Let's perform token introspection on that token. Make sure to copy the token you just got and not the dummy value.

docker compose -f quickstart.yml exec hydra \
  hydra introspect token \
  --format json-pretty \
  --endpoint http://127.0.0.1:4445/ \
  UDYMha9TwsMBejEvKfnDOXkhgkLsnmUNYVQDklT5bD8.ZNpuNRC85erbIYDjPqhMwTinlvQmNTk_UvttcLQxFJY

{
  "active": true,
  "client_id": "24451202-afa7-4278-98ce-8d40f421afec",
  "exp": 1656330629,
  "iat": 1656327029,
  "iss": "http://127.0.0.1:4444",
  "nbf": 1656327029,
  "sub": "24451202-afa7-4278-98ce-8d40f421afec",
  "token_type": "Bearer",
  "token_use": "access_token"
}

Next, we will perform the OAuth 2.0 Authorization Code Grant. For that, we must first create a client that's capable of performing that grant:

code_client=$(docker compose -f quickstart.yml exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token \
    --format json \
    --scope openid --scope offline \
    --redirect-uri http://127.0.0.1:5555/callback)

code_client_id=$(echo $code_client | jq -r '.client_id')
code_client_secret=$(echo $code_client | jq -r '.client_secret')

Note that you need to add --token-endpoint-auth-method none if your clients are public (such as SPA apps and native apps) because the public clients can't provide client secrets.

The following command starts a server that serves an example web application. The application will perform the OAuth 2.0 Authorization Code Flow using Ory Hydra. The web server runs on http://127.0.0.1:5555.

docker compose -f quickstart.yml exec hydra \
    hydra perform authorization-code \
    --client-id $code_client_id \
    --client-secret $code_client_secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 5555 \
    --scope openid --scope offline

Setting up home route on http://127.0.0.1:5555/
Setting up callback listener on http://127.0.0.1:5555/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser doesn't open automatically, navigate to:

        http://127.0.0.1:5555/

Open the URL http://127.0.0.1:5555, log in, and authorize the application. Next, you should see at least an access token in the response. If you granted the offline scope, you will also see a refresh token. If you granted the openid scope, you will get an ID Token as well.

Great! You installed Ory Hydra, connected the CLI, created a client and completed two authentication flows! Before you continue, clean up this set up in order to avoid conflicts with other tutorials from this guide:

docker compose -f quickstart.yml kill
docker compose -f quickstart.yml rm -f -v

Quickstart configuration

In this tutorial we use a simplified configuration. You can find it in contrib/quickstart/5-min/hydra.yml. The configuration gets loaded in docker compose as specified in the quickstart.yml.
https://raw.githubusercontent.com/ory/hydra/master/contrib/quickstart/5-min/hydra.yml

serve:
  cookies:
    same_site_mode: Lax

urls:
  self:
    issuer: http://127.0.0.1:4444
  consent: http://127.0.0.1:3000/consent
  login: http://127.0.0.1:3000/login
  logout: http://127.0.0.1:3000/logout
  device:
    verification: http://127.0.0.1:3000/device/verify
    success: http://127.0.0.1:3000/device/success

secrets:
  system:
    - youReallyNeedToChangeThis

oidc:
  subject_identifiers:
    supported_types:
      - pairwise
      - public
    pairwise:
      salt: youReallyNeedToChangeThis

Configuration file

You can load the config file from another source using the -c path/to/config.yaml or --config path/to/config.yaml flag: $hydra --config path/to/config.yaml.

Config files can be formatted as JSON, YAML and TOML. Some configuration values support reloading without server restart. All configuration values can be set using environment variables, as documented below.
Disclaimer

This reference configuration documents all keys, also deprecated ones! It is a reference for all possible configuration values.

If you are looking for an example configuration, it is better to try out the quickstart.

To find out more about edge cases like setting string array values through environmental variables head to the Configuration section.

## Ory Hydra Configuration


db:
  ignore_unknown_table_columns: false
log:
  level: panic
  leak_sensitive_values: false
  redaction_text: ""
  format: json
serve:
  public:
    request_log:
      disable_for_health: false
    base_url: https://my-app.com/
    host: ""
    port: 1
    socket:
      owner: ""
      group: ""
      mode: 0
    tls:
      enabled: false
      key:
        path: path/to/file.pem
      cert:
        path: path/to/file.pem
      allow_termination_from:
        - 127.0.0.1/32
    cors:
      enabled: false
      allowed_origins:
        "0": https://example.com
        "1": https://*.example.com
        "2": https://*.foo.example.com
      allowed_methods:
        - POST
      allowed_headers:
        "0": Authorization
        "1": Content-Type
        "2": Max-Age
        "3": X-Session-Token
        "4": X-XSRF-TOKEN
        "5": X-CSRF-TOKEN
      exposed_headers:
        - ""
      allow_credentials: false
      options_passthrough: false
      max_age: 0
      debug: false
  admin:
    request_log:
      disable_for_health: false
    base_url: https://my-app.com/
    host: ""
    port: 1
    socket:
      owner: ""
      group: ""
      mode: 0
    tls:
      enabled: false
      key:
        path: path/to/file.pem
      cert:
        path: path/to/file.pem
      allow_termination_from:
        - 127.0.0.1/32
    cors:
      enabled: false
      allowed_origins:
        "0": https://example.com
        "1": https://*.example.com
        "2": https://*.foo.example.com
      allowed_methods:
        - POST
      allowed_headers:
        "0": Authorization
        "1": Content-Type
        "2": Max-Age
        "3": X-Session-Token
        "4": X-XSRF-TOKEN
        "5": X-CSRF-TOKEN
      exposed_headers:
        - ""
      allow_credentials: false
      options_passthrough: false
      max_age: 0
      debug: false
  tls:
    enabled: false
    key:
      path: path/to/file.pem
    cert:
      path: path/to/file.pem
    allow_termination_from:
      - 127.0.0.1/32
  cookies:
    same_site_mode: Strict
    same_site_legacy_workaround: true
    domain: ""
    secure: false
    names:
      device_csrf: ""
      login_csrf: ""
      consent_csrf: ""
      session: ""
    paths:
      session: ""
dsn: ""
clients:
  http:
    disallow_private_ip_ranges: false
    private_ip_exception_urls:
      - http://a.aaa
hsm:
  enabled: false
  library: ""
  pin: ""
  slot: -100000000
  token_label: ""
  key_set_prefix: ""
webfinger:
  jwks:
    broadcast_keys: hydra.jwt.access-token
  oidc_discovery:
    jwks_url: https://my-service.com/.well-known/jwks.json
    token_url: https://my-service.com/oauth2/token
    auth_url: https://my-service.com/oauth2/auth
    device_authorization_url: https://my-service.com/oauth2/device/auth
    client_registration_url: https://my-service.com/clients
    supported_claims:
      - email
      - username
    supported_scope:
      - email
      - whatever
      - read.photos
    userinfo_url: https://example.org/my-custom-userinfo-endpoint
oidc:
  subject_identifiers:
    supported_types:
      - public
      - pairwise
    pairwise:
      salt: some-random-salt
  dynamic_client_registration:
    enabled: false
    default_scope:
      - openid
      - offline
      - offline_access
urls:
  self:
    issuer: https://localhost:4444/
    public: https://localhost:4444/
    admin: https://localhost:4445/
  login: https://my-login.app/login
  registration: https://my-login.app/registration
  consent: https://my-consent.app/consent
  logout: https://my-logout.app/logout
  device:
    verification: https://my-logout.app/device_verification
    success: https://my-logout.app/device_done
  error: https://my-error.app/error
  post_logout_redirect: https://my-example.app/logout-successful
  identity_provider:
    url: https://kratos.example.com/admin
    publicUrl: https://kratos.example.com/public
    headers:
      Authorization: Bearer some-token
strategies:
  scope: exact
  access_token: opaque
  jwt:
    scope_claim: list
ttl:
  login_consent_request: 1h
  authentication_session: 1h
  access_token: 1h
  refresh_token: 1h
  id_token: 1h
  auth_code: 1h
  device_user_code: 1h
oauth2:
  expose_internal_errors: true
  session:
    encrypt_at_rest: false
  exclude_not_before_claim: true
  allowed_top_level_claims:
    - username
    - email
    - user_uuid
  mirror_top_level_claims: false
  preserve_ext_claims: true
  hashers:
    algorithm: pbkdf2
    bcrypt:
      cost: 4
    pbkdf2:
      iterations: 1
  pkce:
    enforced: true
    enforced_for_public_clients: true
  client_credentials:
    default_grant_allowed_scope: false
  grant:
    refresh_token:
      rotation_grace_period: 1h
      rotation_grace_reuse_count: 0
    jwt:
      jti_optional: false
      iat_optional: false
      max_ttl: 1h
  refresh_token_hook: https://my-example.app/token-refresh-hook
  device_authorization:
    token_polling_interval: 5s
    user_code:
      entropy_preset: high
  token_hook: https://my-example.app/token-hook
secrets:
  system:
    - this-is-the-primary-secret
    - this-is-an-old-secret
    - this-is-another-old-secret
  cookie:
    - this-is-the-primary-secret
    - this-is-an-old-secret
    - this-is-another-old-secret
  pagination:
    - this-is-the-primary-secret
    - this-is-an-old-secret
    - this-is-another-old-secret
profiling: cpu
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
sqa:
  opt_out: true
version: v0.0.0
cgroups:
  v1:
    auto_max_procs_enabled: true
dev: false
feature_flags: {}

Configuration editor
Ory Hydra Configuration
db
Configures the database connection
Ignore scan errors when columns in the SQL result have no fields in the destination struct
ignore_unknown_table_columns
log
Configures the logger
level
Sets the log level.
Logs sensitive values such as cookie and URL parameter.
leak_sensitive_values
Sensitive log value redaction text
Text to use, when redacting sensitive log value.
format
Sets the log format.
serve
Controls the configuration for the http(s) daemon(s).
public
request_log
Disable request logging for /health/alive and /health/ready endpoints
Disable health endpoints request logging
Base URL
The URL where the endpoint is exposed at. This domain is used to generate redirects, form URLs, and more.
Host
The host (interface) that the endpoint listens on.
Port
The port that the endpoint listens on.
socket
Sets the permissions of the unix socket
owner
Owner of unix socket. If empty, the owner will be the user running the service.
group
Group of unix socket. If empty, the group will be the primary group of the user running the service.
mode
Mode of unix socket in numeric form
HTTPS
Configure HTTP over TLS (HTTPS).
enabled
Private Key (PEM)
key
Path to PEM-encoded File
TLS Certificate (PEM)
cert
Path to PEM-encoded File
allow_termination_from
Allow-list one or multiple CIDR address ranges and allow them to terminate TLS connections. Be aware that the X-Forwarded-Proto header must be set and must never be modifiable by anyone but your proxy / gateway / load balancer. Supports ipv4 and ipv6. The service serves http instead of https when this option is set.
CORS
Configures Cross Origin Resource Sharing for this endpoint.
enabled
allowed_origins
A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: https://*.example.com). Only one wildcard can be used per origin.
allowed_methods
A list of HTTP methods the user agent is allowed to use with cross-domain requests.
allowed_headers
A list of non-simple headers the client is allowed to use with cross-domain requests.
exposed_headers
Sets which headers are safe to expose to the API of a CORS API specification.
Sets whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
allow_credentials
TODO
options_passthrough
max_age
Sets how long (in seconds) the results of a preflight request can be cached. If set to 0, every request is preceded by a preflight request.
Adds additional log output to debug CORS issues.
debug
admin
request_log
Disable request logging for /health/alive and /health/ready endpoints
Disable health endpoints request logging
Base URL
The URL where the endpoint is exposed at. This domain is used to generate redirects, form URLs, and more.
Host
The host (interface) that the endpoint listens on.
Port
The port that the endpoint listens on.
socket
Sets the permissions of the unix socket
owner
Owner of unix socket. If empty, the owner will be the user running the service.
group
Group of unix socket. If empty, the group will be the primary group of the user running the service.
mode
Mode of unix socket in numeric form
HTTPS
Configure HTTP over TLS (HTTPS).
enabled
Private Key (PEM)
key
Path to PEM-encoded File
TLS Certificate (PEM)
cert
Path to PEM-encoded File
allow_termination_from
Allow-list one or multiple CIDR address ranges and allow them to terminate TLS connections. Be aware that the X-Forwarded-Proto header must be set and must never be modifiable by anyone but your proxy / gateway / load balancer. Supports ipv4 and ipv6. The service serves http instead of https when this option is set.
CORS
Configures Cross Origin Resource Sharing for this endpoint.
enabled
allowed_origins
A list of origins a cross-domain request can be executed from. If the special * value is present in the list, all origins will be allowed. An origin may contain a wildcard (*) to replace 0 or more characters (i.e.: https://*.example.com). Only one wildcard can be used per origin.
allowed_methods
A list of HTTP methods the user agent is allowed to use with cross-domain requests.
allowed_headers
A list of non-simple headers the client is allowed to use with cross-domain requests.
exposed_headers
Sets which headers are safe to expose to the API of a CORS API specification.
Sets whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates.
allow_credentials
TODO
options_passthrough
max_age
Sets how long (in seconds) the results of a preflight request can be cached. If set to 0, every request is preceded by a preflight request.
Adds additional log output to debug CORS issues.
debug
HTTPS
Configure HTTP over TLS (HTTPS).
enabled
Private Key (PEM)
key
Path to PEM-encoded File
TLS Certificate (PEM)
cert
Path to PEM-encoded File
allow_termination_from
Allow-list one or multiple CIDR address ranges and allow them to terminate TLS connections. Be aware that the X-Forwarded-Proto header must be set and must never be modifiable by anyone but your proxy / gateway / load balancer. Supports ipv4 and ipv6. The service serves http instead of https when this option is set.
cookies
same_site_mode
Specify the SameSite mode that cookies should be sent with.
Some older browser versions don’t work with SameSite=None. This option enables the workaround defined in https://web.dev/samesite-cookie-recipes/ which essentially stores a second cookie without SameSite as a fallback.
same_site_legacy_workaround
HTTP Cookie Domain
Sets the cookie domain for session and CSRF cookies. Useful when dealing with subdomains. Use with care!
Sets the HTTP Cookie secure flag in development mode. HTTP Cookies always have the secure flag in production mode.
HTTP Cookie Secure Flag in Development Mode
Cookie Names
Sets the session cookie name. Use with care!
CSRF Cookie Name
CSRF Cookie Name
CSRF Cookie Name
Session Cookie Name
Cookie Paths
Sets the path for which session cookie is scoped. Use with care!
Session Cookie Path
dsn
Sets the data source name. This configures the backend where Ory Hydra persists data. If dsn is `memory`, data will be written to memory and is lost when you restart this instance. Ory Hydra supports popular SQL databases. For more detailed configuration information go to: https://www.ory.com/docs/hydra/dependencies-environment#sql
Global outgoing network settings
Configure how outgoing network calls behave.
Global HTTP client configuration
Configure how outgoing HTTP calls behave.
Disallow all outgoing HTTP calls to private IP ranges. This feature can help protect against SSRF attacks.
Disallow private IP ranges
Add exempt URLs to private IP ranges
Allows the given URLs to be called despite them being in the private IP range. URLs need to have an exact and case-sensitive match to be excempt.
hsm
Configures Hardware Security Module.
enabled
library
Full path (including file extension) of the HSM vendor PKCS#11 library
pin
PIN code for token operations
slot
Slot ID of the token to use (if label is not specified)
token_label
Label of the token to use (if slot is not specified). If both slot and label are set, token label takes preference over slot. In this case first slot, that contains this label is used.
key_set_prefix
Key set prefix can be used in case of multiple Ory Hydra instances need to store keys on the same HSM partition. For example if `hsm.key_set_prefix=app1.` then key set `hydra.openid.id-token` would be generated/requested/deleted on HSM with `CKA_LABEL=app1.hydra.openid.id-token`.
webfinger
Configures ./well-known/ settings.
jwks
Configures the /.well-known/jwks.json endpoint.
broadcast_keys
A list of JSON Web Keys that should be exposed at that endpoint. This is usually the public key for verifying OpenID Connect ID Tokens. However, you might want to add additional keys here as well.
broadcast_keys-1*
oidc_discovery
Configures OpenID Connect Discovery (/.well-known/openid-configuration).
jwks_url
Overwrites the JWKS URL
token_url
Overwrites the OAuth2 Token URL
auth_url
Overwrites the OAuth2 Auth URL
device_authorization_url
Overwrites the OAuth2 Device Auth URL
client_registration_url
Sets the OpenID Connect Dynamic Client Registration Endpoint
supported_claims
A list of supported claims to be broadcasted. Claim `sub` is always included.
supported_scope
The scope OAuth 2.0 Clients may request. Scope `offline`, `offline_access`, and `openid` are always included.
userinfo_url
A URL of the userinfo endpoint to be advertised at the OpenID Connect Discovery endpoint /.well-known/openid-configuration. Defaults to Ory Hydra's userinfo endpoint at /userinfo. Set this value if you want to handle this endpoint yourself.
oidc
Configures OpenID Connect features.
subject_identifiers
Configures the Subject Identifier algorithm. For more information please head over to the documentation: https://www.ory.com/docs/hydra/advanced#subject-identifier-algorithms
supported_types
A list of algorithms to enable.
supported_types-1*
pairwise
Configures the pairwise algorithm.
salt*
dynamic_client_registration
Configures OpenID Connect Dynamic Client Registration (exposed as admin endpoints /clients/...).
Enable dynamic client registration.
enabled
default_scope
The OpenID Connect Dynamic Client Registration specification has no concept of whitelisting OAuth 2.0 Scope. If you want to expose Dynamic Client Registration, you should set the default scope enabled for newly registered clients. Keep in mind that users can overwrite this default by setting the `scope` key in the registration payload, effectively disabling the concept of whitelisted scopes.
urls
self
issuer
This value will be used as the `issuer` in access and ID tokens. It must be specified and using HTTPS protocol, unless --dev is set. This should typically be equal to the public value.
public
This is the base location of the public endpoints of your Ory Hydra installation. This should typically be equal to the issuer value. If left unspecified, it falls back to the issuer value.
admin
This is the base location of the admin endpoints of your Ory Hydra installation.
login
Sets the OAuth2 Login Endpoint URL of the OAuth2 User Login & Consent flow. Defaults to an internal fallback URL showing an error.
registration
Sets the OAuth2 Registration Endpoint URL of the OAuth2 User Login & Consent flow. Defaults to the same value as `login`. The registration URL is used if the authorization request was started with the `prompt=registration` parameter.
consent
Sets the consent endpoint of the User Login & Consent flow. Defaults to an internal fallback URL showing an error.
logout
Sets the logout endpoint. Defaults to an internal fallback URL showing an error.
device
Configure URLs for the OAuth 2.0 Device Code Flow.
verification
Sets the device user code verification endpoint. Defaults to an internal fallback URL showing an error.
success
Sets the post device authentication endpoint. Defaults to an internal fallback URL showing an error.
error
Sets the error endpoint. The error ui will be shown when an OAuth2 error occurs that which can not be sent back to the client. Defaults to an internal fallback URL showing an error.
post_logout_redirect
When a user agent requests to logout, it will be redirected to this url afterwards per default.
identity_provider
The admin URL of the ORY Kratos instance.
If set, ORY Hydra will use this URL to log out the user in addition to removing the Hydra session.
The public URL of the ORY Kratos instance.
HTTP Request Headers
These headers will be passed in HTTP requests to the Identity Provider.
strategies
scope
Defines how scopes are matched. For more details have a look at https://github.com/ory/fosite#scopes
access_token
Defines access token type. jwt is a bad idea, see https://www.ory.com/docs/oauth2-oidc/jwt-access-token
jwt
scope_claim
Defines how the scope claim is represented within a JWT access token
ttl
Configures time to live.
login_consent_request
Configures how long a user login and consent flow may take.
authentication_session
Configures how long the authentication session cookie will be valid after login has been remembered. The larger this value is, the more database storage is needed. Defaults to 30 days.
access_token
Configures how long access tokens are valid. The larger this value is, the more database storage is needed.
refresh_token
refresh_token
Configures how long refresh tokens are valid. The larger this value is, the more database storage is needed. Set to -1 for refresh tokens to never expire, which is not recommended as the database can not be cleaned from stale tokens.
id_token
Configures how long id tokens are valid.
auth_code
Configures how long auth codes are valid. The larger this value is, the more database storage is needed.
device_user_code
Configures how long device & user codes are valid. The larger this value is, the more database storage is needed.
oauth2
Set this to true if you want to share error debugging information with your OAuth 2.0 clients. Keep in mind that debug information is very valuable when dealing with errors, but might also expose database error codes and similar errors.
expose_internal_errors
session
If set to true (default) Ory Hydra encrypt OAuth2 and OpenID Connect session data using AES-GCM and the system secret before persisting it in the database.
Encrypt OAuth2 Session
Set to true if you want to omit the `nbf` (not valid before) claim in the access token.
exclude_not_before_claim
allowed_top_level_claims
A list of custom claims which are allowed to be added top level to the Access Token. They cannot override reserved claims.
Set to false if you don't want to mirror custom claims under 'ext'
mirror_top_level_claims
Set to true to keep custom claims that are not promoted to the top level in the 'ext' claim. Only applies when mirror_top_level_claims is false.
preserve_ext_claims
hashers
Configures hashing algorithms. Supports only BCrypt and PBKDF2 at the moment.
Password hashing algorithm
One of the values: pbkdf2, bcrypt. Warning! This value can not be changed once set as all existing OAuth 2.0 Clients will not be able to sign in any more.
bcrypt
Configures the BCrypt hashing algorithm used for hashing OAuth 2.0 Client Secrets.
cost
Sets the BCrypt cost. The higher the value, the more CPU time is being used to generate hashes.
pbkdf2
Configures the PBKDF2 hashing algorithm used for hashing OAuth 2.0 Client Secrets.
iterations
Sets the PBKDF2 iterations. The higher the value, the more CPU time is being used to generate hashes.
pkce
Sets whether PKCE should be enforced for all clients.
enforced
Sets whether PKCE should be enforced for public clients.
enforced_for_public_clients
client_credentials
Automatically grant authorized OAuth2 Scope in OAuth2 Client Credentials Flow. Each OAuth2 Client is allowed to request a predefined OAuth2 Scope (for example `read write`). If this option is enabled, the full scope is automatically granted when performing the OAuth2 Client Credentials flow. If disabled, the OAuth2 Client has to request the scope in the OAuth2 request by providing the `scope` query parameter. Setting this option to true is common if you need compatibility with MITREid.
default_grant_allowed_scope
grant
refresh_token
Refresh Token Rotation Grace Period
Configures how long a Refresh Token remains valid after it has been used. The maximum value is 5 minutes, unless also a reuse count is configured, in which case the maximum is 180 days.
Refresh Token Rotation Grace Period Reuse Count
Configures how many times a Refresh Token can be reused during the grace period. This is only effective if combined with a rotation grace period.
jwt
Authorization Grants using JWT configuration
Configures if the JSON Web Token ID (`jti`) claim is required in the JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants (RFC7523). If set to `false`, the `jti` claim is required. Set this value to `true` only after careful consideration.
jti_optional
Configures if the issued at (`iat`) claim is required in the JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants (RFC7523). If set to `false`, the `iat` claim is required. Set this value to `true` only after careful consideration.
iat_optional
max_ttl
Configures what the maximum age of a JWT assertion used in the JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants (RFC7523) can be. This feature uses the `exp` claim and `iat` claim to calculate assertion age. Assertions exceeding the max age will be denied. Useful as a safety measure and recommended to keep below 720h. This governs the `grant.jwt.max_ttl` setting.
refresh_token_hook
refresh_token_hook
Sets the refresh token hook endpoint. If set it will be called during token refresh to receive updated token claims.
device_authorization
token_polling_interval
Configures how often a non-interactive device should poll the device token endpoint, this is a purely informational configuration and does not enforce rate-limiting.
user_code
Configures the user code settings.
user_code
entropy_preset*
Presets for the user-code length and character set.
token_hook
token_hook
Sets the token hook endpoint for all grant types. If set it will be called while providing token to customize claims.
secrets
The secrets section configures secrets used for encryption and signing of several systems. All secrets can be rotated, for more information on this topic go to: https://www.ory.com/docs/hydra/advanced#rotation-of-hmac-token-signing-and-database-and-cookie-encryption-keys
system
The system secret must be at least 16 characters long. If none is provided, one will be generated. They key is used to encrypt sensitive data using AES-GCM (256 bit) and validate HMAC signatures. The first item in the list is used for signing and encryption. The whole list is used for verifying signatures and decryption.
cookie
Secrets that are used for cookie session encryption. Defaults to secrets.system. It is recommended to use a separate secret in production. The first item in the list is used for signing and encryption. The whole list is used for verifying signatures and decryption.
pagination
Secrets that are used for pagination token encryption. Defaults to secrets.system. It is recommended to use a separate secret in production. The first item in the list is used for signing and encryption. The whole list is used for verifying signatures and decryption.
profiling
Enables profiling if set. For more details on profiling, head over to: https://blog.golang.org/profiling-go-programs
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
sqa
Software Quality Assurance telemetry configuration section
Disables anonymized telemetry reports - for more information please visit https://www.ory.com/docs/ecosystem/sqa
opt_out
The Hydra version this config is written for.
SemVer according to https://semver.org/ prefixed with `v` as in our releases.
cgroups
Ory Hydra can respect Linux container CPU quota
v1
Configures parameters using cgroups v1 hierarchy
Set GOMAXPROCS automatically according to cgroups limits
auto_max_procs_enabled
If true, disables critical security measures to allow easier local development. Do not use in production.
Enable development mode
Feature flags


Database setup and configuration

Ory Hydra requires a database to store OAuth 2.0 clients, consent sessions, and access tokens. Choose between two operational modes based on your deployment needs.
In-memory mode

Set DSN=memory to run Hydra with an ephemeral SQLite database. This mode is useful for development and testing but has limitations:

    Data is lost when the instance restarts
    Only single-instance deployments work (no clustering)

SQL mode

For production deployments, configure Hydra with a persistent database. Hydra supports PostgreSQL 12.0+, MySQL 8.0+, CockroachDB, and SQLite. Older MySQL versions have known issues with Hydra's database schema.

Set the database connection using the DSN environment variable or the dsn configuration key.

PostgreSQL:

DSN=postgres://user:password@host:5432/database

MySQL:

DSN=mysql://user:password@tcp(host:3306)/database?parseTime=true

CockroachDB:

DSN=cockroach://user:password@host:26257/database?sslmode=verify-full

SQLite (file-based):

DSN=sqlite:///path/to/hydra.sqlite?_fk=true

The _fk=true parameter is required for SQLite to enable foreign key constraints.

For additional DSN options including SSL/TLS configuration, see Deployment Fundamentals and Requirements.
Running migrations

Hydra doesn't create the database schema automatically. You must run migrations before starting the server and after every upgrade.

Always back up your database before running migrations. For upgrade-specific guidance, see the upgrade instructions.

hydra migrate sql -e

The -e flag reads the DSN from the environment variable.

For Docker deployments, see the docker-compose example.


Configurable token prefix for OAuth2 tokens

This document explains how to configure the token prefix for OAuth2 access tokens, refresh tokens, and authorization codes. By default, all tokens use the ory_%s_ template, where %s is replaced with the token type.

Customizing the token prefix is available only to customers on an Ory Enterprise plan (Ory Network Enterprise or Ory Enterprise License). If you are interested in this feature, please contact us.
Default token prefix

By default, OAuth2 tokens use the following template: ory_%s_. The %s is a placeholder that will be replaced by the specific token type:

    rt for refresh tokens
    at for access tokens
    ac for authorization codes

Examples

    Refresh Token: ory_rt_...
    Access Token: ory_at_...
    Authorization Code: ory_ac_...

Customize the token prefix

With the oauth2.token_prefix configuration key, you can customize the prefix for your OAuth2 tokens.

The prefix must be a fmt.Sprintf-style template containing exactly one %s substitution. The rendered prefix may contain only ASCII letters, digits, and underscores - no other % directives (%d, %%, positional or width-flagged verbs), no hyphens, dots, slashes, whitespace, quotes, or non-ASCII characters. Invalid values are rejected with a 400 error.
Configure on Ory Network

On Ory Network, the prefix is set per project via the oauth2.token_prefix config key under services.oauth2.config. Use the Ory CLI:

ory patch oauth2-config --project <project-id> --workspace <workspace-id> \
  --replace '/oauth2/token_prefix="acme_token_%s_"'

To reset back to the default ory_%s_ prefix, remove the key:

ory patch oauth2-config --project <project-id> --workspace <workspace-id> \
  --remove "/oauth2/token_prefix"

Configure in self-hosted deployments

For Ory Enterprise License (OEL) deployments, set the oauth2.token_prefix key in your Ory configuration file:

oauth2:
  token_prefix: "acme_token_%s_"

Resulting tokens

With acme_token_%s_, issued tokens look like:

    Refresh Token: acme_token_rt_...
    Access Token: acme_token_at_...
    Authorization Code: acme_token_ac_...

JSON Web Tokens exception

JSON Web Tokens (JWTs) will never be prefixed because it would violate the JWT format. This applies to:

    ID Tokens: These are always JWTs and will never be prefixed.
    JWT Access Tokens: If you are using JWTs as access tokens, they will also not be prefixed.



Stateless JWT access tokens

This document explains how to configure stateless JWT access tokens in Ory Hydra. When enabled, JWT access tokens are issued as self-contained tokens without persisting them to the database, significantly improving performance for high-throughput workloads.
Need help?

    New to Ory? Talk to the team about features and plans.
    Already a customer? Open a support ticket.

Overview

By default, Ory Hydra persists all access tokens to the database, regardless of the token strategy (opaque or JWT). This persistence enables features like token introspection, revocation, and userinfo endpoint support. However, for workloads using JWT access tokens that do not require these stateful operations, database writes introduce unnecessary overhead.

The stateless JWT feature optimizes performance by skipping database persistence for JWT access tokens. When enabled, access tokens are issued as self-contained JWTs with a configurable boolean claim that identifies them as stateless. Operations that require token state (introspection, revocation, and userinfo) will return an error for these tokens.

This feature applies when either the OAuth2 client is configured to use the JWT access token strategy or the global access token strategy is set to JWT instead of opaque.
How it works

When stateless JWT tokens are enabled:

    Token Generation: JWT access tokens are issued with an additional boolean claim (default: sl) set to true. This claim identifies the token as stateless.

    No Database Writes: Access token sessions are not written to the database, eliminating write operations and improving performance.

    Stateful Operations Unavailable: Operations that require token state return HTTP 501 (Not Implemented) with error unsupported_token_type:
        Token Introspection (/oauth2/introspect): Returns 501 for stateless JWT tokens
        Token Revocation (/oauth2/revoke): Returns 501 for stateless JWT tokens
        Userinfo Endpoint (/userinfo): Returns 501 for stateless JWT tokens

    Standard JWT Validation: Token validation continues to work through standard JWT signature verification and claims validation.

Configuration

Configure stateless JWT access tokens using the strategies.jwt.stateless configuration namespace.
Configuration keys

Two configuration keys control stateless JWT behavior:

    strategies.jwt.stateless.enabled: Boolean flag to enable or disable stateless JWT tokens. Default: false
    strategies.jwt.stateless.claim_name: String value specifying the claim name used to identify stateless tokens. Default: sl

Example configuration

strategies:
  jwt:
    stateless:
      enabled: true
      claim_name: sl

In this configuration:

    Stateless JWT tokens are enabled
    JWT access tokens will include a top-level claim "sl": true
    Database writes for JWT access token sessions are skipped

Custom claim name

You can customize the claim name used to identify stateless tokens:

strategies:
  jwt:
    stateless:
      enabled: true
      claim_name: stateless

With this configuration, JWT access tokens will contain "stateless": true instead of the default "sl": true.
Token format

When stateless JWT tokens are enabled, the generated JWT access token includes the configured stateless claim as a top-level boolean claim.
Example JWT payload

{
  "iss": "https://your-hydra-instance.com",
  "sub": "user-id",
  "aud": ["api-resource"],
  "exp": 1735689600,
  "iat": 1735686000,
  "scope": "openid profile email",
  "sl": true
}

The sl claim (or your custom claim name) with a boolean value of true identifies this token as stateless.
Functional limitations

Enabling stateless JWT tokens disables certain OAuth2 and OpenID Connect features that require access to a persisted token state.
Token introspection

Endpoint: /oauth2/introspect

When introspecting a stateless JWT access token, the endpoint returns:

    HTTP Status: 501 Not Implemented
    Error: unsupported_token_type

Standard opaque and JWT access tokens (with stateless disabled) continue to support introspection normally.
Token revocation

Endpoint: /oauth2/revoke

Attempting to revoke a stateless JWT access token returns:

    HTTP Status: 501 Not Implemented
    Error: unsupported_token_type

Since stateless tokens are not persisted in the database, they cannot be revoked. Token expiration is enforced through the JWT exp claim during validation.
Userinfo endpoint

Endpoint: /userinfo

Requesting user information with a stateless JWT access token returns:

    HTTP Status: 501 Not Implemented
    Error: unsupported_token_type

The /userinfo endpoint requires database lookups to retrieve the consent session data associated with the access token.
When to use stateless JWT tokens

Stateless JWT access tokens are suitable for scenarios where:

    High throughput is required: Applications with high token issuance rates benefit from eliminating database writes
    Token revocation is not needed: Workloads that rely solely on JWT expiration for token lifecycle management, or have a dedicated mechanism for revoking tokens
    Introspection is not used: Resource servers validate tokens using JWT signature verification rather than introspection
    Userinfo endpoint is not required: Client applications do not call the userinfo endpoint for user information
    JWT access tokens are used: The feature only applies when clients or the global strategy is configured for JWT tokens

When not to use stateless JWT tokens

Do not enable stateless JWT tokens if your application requires:

    Token revocation: Immediate invalidation of access tokens before expiration
    Token introspection: Validating tokens through the introspection endpoint
    Userinfo endpoint support: Retrieving user information associated with access tokens
    Audit trail of active tokens: Database records of issued tokens for compliance or auditing purposes

Performance considerations

Enabling stateless JWT tokens provides performance benefits by:

    Eliminating database write operations for access token sessions
    Decreasing storage requirements by not persisting JWT access tokens



PostgreSQL TTL jobs for Ory Hydra

This guide outlines the steps to enable and configure the PostgreSQL TTL jobs for Ory Hydra. The TTL jobs are executed periodically to remove expired data from the PostgreSQL database. They are essential for maintaining database performance and preventing uncontrolled growth.

This feature is available in Ory Hydra Enterprise License (OEL) and it requires the PostgreSQL database with the pg_cron extension installed.

By default, Postgresql TTL jobs are disabled. They can be installed by enabling an additional migration job, similar to the default migration job that introduces schema changes. This additional job populates the database with the necessary cron job definitions containing delete statements for expired data. The cron jobs are executed by the pg_cron extension at 00:00 UTC.
Prerequisites

Before starting the upgrade process, ensure that you meet the following requirements:

    Ory Hydra Version: Your current Ory Hydra OEL installation must be version e17b2ea61cc69e70f252e384d5ccbac83e504ced or newer.
    PostgreSQL Database: The PostgreSQL database must be installed and configured with the pg_cron extension.
    Backup and Testing: Create a backup of your current Ory Hydra database and test the migration on a test environment to ensure compatibility and minimize risks.

Installation process

If you are using the official Hydra helm chart modify your values.yaml file to include the following configuration:

hydra:
  customMigrations:
    jobs:
      oel-postgresql-ttl:
        enabled: true

This change enables the additional migration job that introduces the TTL jobs to the PostgreSQL database. By default, it executes the hydra binary with following arguments:

migrate postgresql-addons up --hydra-db-name ory_hydra --pgcron-db-name postgres

If you use a different database name, you can override it by setting the --hydra-db-name and --pgcron-db-name flags in the values.yaml file:

hydra:
  customMigrations:
    jobs:
      oel-postgresql-ttl:
        enabled: true
        customArgs:
          [
            "migrate",
            "postgresql-addons",
            "up",
            "--hydra-db-name",
            "<your hydra database>",
            "--pgcron-db-name",
            "<database where pg_cron is installed>",
          ]

Possible issues
pg_cron extension not installed

If the pg_cron extension is not installed in the PostgreSQL database, the migration job will fail with the following error:

ERROR: schema "cron" does not exist (SQLSTATE 3F000)

To resolve this issue, install the pg_cron extension and enable it in the postgres database.

Hardware Security Module support for JSON Web Key sets

The PKCS#11 Cryptographic Token Interface Standard, also known as Cryptoki, is one of the Public Key Cryptography Standards developed by RSA Security. PKCS#11 defines the interface between an application and a cryptographic device.
note

If a key isn't found in the Hardware Security Module, the regular Software Key Manager with AES-GCM software encryption will be used as a fallback. Adding or updating keys always uses the Software Key Manager as it isn't possible to add keys to a Hardware Security Module.

PKCS#11 is used as a low-level interface to perform cryptographic operations without the need for the application to directly interface a device through its driver. PKCS#11 represents cryptographic devices using a common model referred to simply as a token. An application can therefore perform cryptographic operations on any device or token, using the same independent command set.
Hardware Security Module configuration

Ory Hydra can be configured using environment variables as well as a configuration file. For more information on configuration options, visit the configuration reference

HSM_ENABLED=true
HSM_LIBRARY=/path/to/hsm-vendor/library.so
HSM_TOKEN_LABEL=hydra
HSM_SLOT=0
HSM_PIN=1234
HSM_KEY_SET_PREFIX=app1.

Token that's denoted by environment variables HSM_TOKEN_LABEL or HSM_SLOT must preexist and optionally contain RSA (or ECDSA for JWT) key pairs with labels hydra.openid.id-token and hydra.jwt.access-token depending on configuration. If keys with these labels don't exist, they will be generated upon startup. If both HSM_TOKEN_LABEL and HSM_SLOT are set, HSM_TOKEN_LABEL takes precedence over HSM_SLOT. In this case first slot that contains this label is used. HSM_LIBRARY must point to vendor-specific PKCS#11 library or SoftHSM library if you want to test HSM support.

HSM_KEY_SET_PREFIX can be used in case of multiple Ory Hydra instances need to store keys on the same HSM partition. For example if HSM_KEY_SET_PREFIX=app1. then key set hydra.openid.id-token would be generated/requested/deleted on HSM with CKA_LABEL=app1.hydra.openid.id-token.
PKCS#11 attribute mappings to JSON Web Key Set attributes

When key pair is generated or requested from HSM, the CKA_LABEL attribute is used as JSON Web Key Set name, CKA_ID attribute as kid. Key usage is determined by private key attributes, where CKA_SIGN and CKA_DECRYPT are mapped to sig and enc respectively and set as key use attribute. Furthermore, CKA_ID's of key pair private/public handles must be identical. Attribute alg is determined from CKA_KEY_TYPE and CKA_ECDSA_PARAMS.
Supported key algorithms

Ory Hydra supports generating 4096 bit RSA, ECDSA keys with curves secp256r1 or secp521r1. As of now PKCS#11 v2.4 doesn't support EdDSA keys using curve Ed25519. However, PKCS#11 v3.0 contains support for EdDSA and therefore can be supported in upcoming versions. Symmetric key algorithms aren't supported because it would imply, that shared HSM is used between server and authenticating client.
Generating key pairs
Initializing token

Different policies can apply for tokens, therefore HSM configuration expects, that token where to find or generate keys already exists. Depending on HSM vendor, tools initializing tokens and generating keys vary. To demonstrate key pair generation we first initialize token using pkcs11-tool (see how to setup SoftHSM and OpenSC)

pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so --slot 0 --init-token --so-pin 0000 --pin 1234 --init-pin --label hydra

Using slot 0 with a present token (0x2763db07)
Token successfully initialized
User PIN successfully initialized

Corresponding Ory Hydra configuration to access this token would be

HSM_ENABLED=true
HSM_LIBRARY=/usr/lib/softhsm/libsofthsm2.so
HSM_TOKEN_LABEL=hydra
HSM_SLOT=0
HSM_PIN=1234

Generating key pair

Generating RSA keypair for JSON Web Key hydra.openid.id-token

pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so \
--pin 1234 --token-label hydra \
--keypairgen --key-type rsa:4096 --usage-sign \
--label hydra.openid.id-token --id 746573742d6b65792d6964

Key pair generated:
Private Key Object; RSA
  label:      hydra.openid.id-token
  ID:         746573742d6b65792d6964
  Usage:      sign
Public Key Object; RSA 4096 bits
  label:      hydra.openid.id-token
  ID:         746573742d6b65792d6964
  Usage:      verify

Parameter	Description
--module	Points to vendor specific PKCS#11 library or SoftHSM library when testing.
--pin 1234	Pin that was used in token initialization to perform token operations.
--token-label hydra	Performs key generation on first slot with label hydra. Use --slot option instead if you want to specify specific slot.
--label hydra.openid.id-token	Sets key pair label attribute CKA_LABEL and is used as JSON Web Key Set name.
--id 746573742d6b65792d6964	Sets key pair id attribute CKA_ID and is used as JSON Web Key Set kid. It must be set as a big-endian hexadecimal integer value. StringToHex("test-key-id") == 746573742d6b65792d6964
--keypairgen	Perform key pair generation on token
--key-type rsa:4096	Type and length of the key to generate. Supported values are rsa:4096, EC:secp256r1 or EC:secp521r1. Sets CKA_KEY_TYPE,CKA_ECDSA_PARAMS attributes and is used to determine JSON Web Key Set alg attribute.
--usage-sign or --usage-decrypt	Sets private key attribute CKA_SIGN or CKA_DECRYPT respectively. Used to determine JSON Web Key Set use attribute.

Key type mappings
Key type	JWT signing algorithm
rsa:4096	RS256
EC:secp256r1	ES256
EC:secp521r1	ES512

Testing with SoftHSM

SoftHSM is an implementation of a cryptographic store accessible through a PKCS #11 interface. You can use it to explore PKCS#11 without having a Hardware Security Module. It's being developed as a part of the OpenDNSSEC project.
Run Ory Hydra with HSM using Docker

Alternatively you can use quickstart docker container that setups SoftHSM/OpenSC, builds and runs Ory Hydra with HSM configuration enabled. You need to have the latest Docker and Docker Compose version installed. To run quickstart HSM change into the directory with the Hydra source code and run the following command:

docker-compose -f quickstart-hsm.yml up --build

Following is logged on startup if Hardware Security Module is successfully configured:

docker logs ory-hydra-example--hydra
time="2021-07-07T12:51:23Z" level=info msg="Hardware Security Module is configured."
time="2021-07-07T12:51:23Z" level=info msg="JSON Web Key Set 'hydra.openid.id-token' doesn't exist yet, generating new key pair..."

Run Tests with HSM enabled using Docker

make quicktest-hsm

AWS CloudHSM

The following are tips to help run Ory Hydra with AWS CloudHSM, please also refer to the official documentation.

Fetch the name of the token/slot in CloudHSM by using the pkcs11-tool with this command: pkcs11-tool --module /opt/cloudhsm/lib/libcloudhsm_pkcs11.so --list-slots.
CloudHSM only exposes a single slot/token to applications and connetions are load balanced across hsm-instances in the cluster.

HSM settings in Hydra:

hsm:
   enabled: true
   library: /opt/cloudhsm/lib/libcloudhsm_pkcs11.so
   token_label: "hsm1"
   pin: "{{ HSM_PIN }}"

AWS changed the default value of cavium for token_label to hsm1.

To generate a compatible key pair run the following command:

pkcs11-tool \
   --module /opt/cloudhsm/lib/libcloudhsm_pkcs11.so \
   --pin <PIN> \
   --token-label <LABEL> \
   --keypairgen \
   --key-type rsa:4096 \
   --label hydra.openid.id-token \
   --id <ID> \
   --login \
   --usage-sign \
   --private \
   --sensitive

The --private and --sensitive flags are important, include them to prevent errors.

Distributed tracing

Configuring Distributed Tracing (DT) will enable you to obtain a visualization of the call paths that take place in order to process a request made to Ory. It's yet another tool that you can use to aid you in profiling, debugging and ultimately understanding your deployment of Ory better.
Tracing options

You have the option to use a tracing backend or follow existing traces. Ory supports the following tracing backends:

    OpenTelemetry
    Jaeger
    Elastic APM
    Datadog
    Zipkin
    Instana

To follow existing traces: If you have deployed Ory behind a proxy that has initiated a trace, Ory will attempt to join that trace by examining the request headers for tracing context.
What an Ory trace includes

In DT speak, a trace is comprised of one or more spans which are logical units of work. Each Ory span is encapsulated with the following state:

    A name
    A start time
    A finish time
    A set of zero or more tags

Ory creates the following spans:

    Top level span (named after the request path) for the requested endpoint. Span tags: - http method - http status code - error IFF status code >= 400
    Child span will be created if bcrypt (e.g. when the token endpoint is called) is called. Span tags: - bcrypt work factor
    All SQL database interactions. Spans/tags will vary depending on the database driver used.

This is still evolving and subject to change as tracing support continues to expand in Ory. If you see something that's missing/wrong, please create an issue.
Local setup

The provided docker-compose file in the Hydra repository (other ory services have the same docker-compose file) has tracing configuration which you can use to play around with - just uncomment the desired tracing provider. We will use Jaeger as an example.

Simply run

docker-compose -f quickstart.yml \
    -f quickstart-tracing.yml \
    up --build

Grab a coffee or stretch while you wait for everything to come up. You will then be able to navigate to the Jaeger UI which you have exposed on port 16686 at http://localhost:16686/search. You can now start making requests and inspect traces!

As an example, here is a trace created by making a bad request to the POST /clients endpoint:

OpenTracing and OpenCensus exemplary trace in Jaeger UI

At a glance, you are able to see that:

    The request failed
    The request took ~80ms
    It resulted in a 409
    The hash comparison to validate the client's credentials took a whopping 70ms. Bcrypt is expensive!
    The various database operations performed

note

To see spans around database interactions, you must be using a SQL backend, such as MySQL or Postgres.

There is a more complex example to show you the interactions between Kratos, Oathkeeper and Kratos to check if the user is allowed the access the requested resource :

Kratos Oathkeeper and Kratos exemplary trace in Jaeger UI

As previously said, you can see the interactions between the different services and SQL database interactions.
Tracing configurations

You can configure tracing inside the configuration file (follow the same schema for all services) or via environment variables.

There is an example of a configuration file with tracing enabled:

tracing:
  provider: jaeger # use any of the supported tracing providers
  service_name: ory:kratos # if not set, the service name will be the service's name
  providers:
    jaeger: # per provider configuration
      local_agent_address: jaeger:6831
      sampling:
        server_url: http://jaeger:5778/sampling

note

Please refer to the configuration reference for the full list of options.

The CLI will also provide you with the list of tracing configurations and their supported values. Simply run:

docker exec -it hydra_hydra_1 hydra serve --help

And read the section on DEBUG CONTROLS.


Run Ory Hydra in Docker

The goal of this chapter is to introduce you to a fully functional set up that includes Ory Hydra as well as our User Login & Consent Provider reference implementation.

The goal of this section is to familiarize you with the specifics of setting up Ory Hydra in your environment. Before starting with this section, please check out the tutorial. It will teach you the most important flows and settings for Hydra.

This guide will:

    Download and run a PostgreSQL container in Docker.
    Download and run Ory Hydra in Docker.
    Download and run our reference User Login & Consent Provider.
    Create an OAuth 2.0 Client to perform the OAuth 2.0 Authorize Code Flow.
    Perform the OAuth 2.0 Authorize Code flow.

Before starting with this guide, please install the most recent version of Docker. While docker is not required for running Ory Hydra, we recommend using it for this tutorial as it will greatly reduce the complexity of setting up a database on your system without virtualization, installing Go, and compiling Ory Hydra.
Create a Network

Before we can start, a network must be created which we will attach all our Docker containers to. That way, the containers can talk to one another.

docker network create hydraguide

Deploy PostgreSQL

For the purpose of this tutorial, we will use PostgreSQL as a database. As you probably already know, don't run databases in Docker in production! For the sake of this tutorial however, let's use Docker to quickly deploy the database.

docker run \
  --network hydraguide \
  --name ory-hydra-example--postgres \
  -e POSTGRES_USER=hydra \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hydra \
  -d postgres:9.6

This command will start a postgres instance with name ory-hydra-example--postgres, set up a database called hydra and create a user hydra with password secret.
Deploy Ory Hydra

We highly recommend using Docker to run Hydra, as installing, configuring and running Hydra is easiest with Docker. Ory Hydra is available on Docker Hub.
note

This example remaps standard hydra ports 4444 to 5444 and 4445 to 5445 to prevent conflicts with a locally running hydra server.

# The system secret can only be set against a fresh database. Key rotation is not supported. This
# secret is used to encrypt the database and needs to be set to the same value every time the process (re-)starts.
# You can use /dev/urandom to generate a secret. But make sure that the secret must be the same anytime you define it.
# You could, for example, store the value somewhere.
export SECRETS_SYSTEM=$(export LC_CTYPE=C; cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
#
# Alternatively you can obviously just set a secret:
# export SECRETS_SYSTEM=this_needs_to_be_the_same_always_and_also_very_$3cuR3-._

# The database url points us at the postgres instance. This could also be an ephemeral in-memory database (`export DSN=memory`)
# or a MySQL URI.
export DSN=postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable

# Before starting, let's pull the latest Ory Hydra tag from docker.
docker pull oryd/hydra:v1.10.6

# This command will show you all the environment variables that you can set. Read this with care.
# It's the equivalent to `hydra help serve`.
docker run -it --rm --entrypoint hydra oryd/hydra:v1.10.6 help serve

Starts all HTTP/2 APIs and connects to a database backend.
[...]

# Ory Hydra doesn't do magic, it requires conscious decisions, for example running SQL migrations which is required
# when installing a new version of Ory Hydra, or upgrading an existing installation.
# It's the equivalent to `hydra migrate sql --yes postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable`
docker run -it --rm \
  --network hydraguide \
  oryd/hydra:v1.10.6 \
  migrate sql --yes $DSN

Applying `client` SQL migrations...
[...]
Migration successful!

# Let's run the server (settings explained below):
docker run -d \
  --name ory-hydra-example--hydra \
  --network hydraguide \
  -p 5444:4444 \
  -p 5445:4445 \
  -e SECRETS_SYSTEM=$SECRETS_SYSTEM \
  -e DSN=$DSN \
  -e URLS_SELF_ISSUER=https://localhost:5444/ \
  -e URLS_CONSENT=http://localhost:9020/consent \
  -e URLS_LOGIN=http://localhost:9020/login \
  oryd/hydra:v1.10.6 serve all

# And check if it's running:
docker logs ory-hydra-example--hydra

time=2022-04-13T11:27:32Z level=info msg=No tracer configured - skipping tracing setup audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:27:32Z level=warning msg=JSON Web Key Set "hydra.openid.id-token" does not exist yet, generating new key pair... audience=application service_name=ORY Hydra service_version=v1.10.6
[...]
time=2022-04-13T11:28:07Z level=warning msg=JSON Web Key Set "hydra.https-tls" does not exist yet, generating new key pair... audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:28:19Z level=info msg=Setting up http server on :4444 audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:28:19Z level=info msg=Setting up http server on :4445 audience=application service_name=ORY Hydra service_version=v1.10.6

Let's dive into the various settings:

    --network hydraguide connects this instance to the network and makes it possible to connect to the PostgreSQL database.
    -p 5444:4444 exposes Ory Hydra's public API on https://localhost:5444/.
    -p 5445:4445 exposes Ory Hydra's administrative API on https://localhost:5445/.
    -e SECRETS_SYSTEM=$SECRETS_SYSTEM sets the system secret environment variable (required).
    -e DSN=$DSN sets the database url environment variable (required).
    -e URLS_SELF_ISSUER=https://localhost:5444/ this value must be set to the publicly available URL of Ory Hydra (required).
    -e URLS_CONSENT=http://localhost:9020/consent this sets the URL of the consent provider (required). We will set up the service that handles requests at that URL in the next sections.
    -e URLS_LOGIN=http://localhost:9020/login this sets the URL of the login provider (required). We will set up the service that handles requests at that URL in the next sections.

In this example we didn't define a value for the optional setting URLS_ERROR. This URL can be used to provide an endpoint which will receive error messages from Ory Hydra that should be displayed to the end user. The URL receives error and error_description parameters. If this value isn't set, Hydra uses the fallback endpoint /oauth2/fallbacks/error and displays a default error message. In order to obtain a uniform UI, you might want to include such an endpoint in your login or consent provider.
note

We only used environmental variables to configure Ory Hydra in this example. If you use a configuration file instead, remember to mount it in the container. For example:

docker run -d \
  -v $(pwd)/hydra.yaml:/hydra.yaml \
  oryd/hydra:v1.10.6 serve all --config /hydra.yaml

To confirm that the instance is running properly, open the health check. If asked, accept the self-signed certificate in your browser. You should simply see ok.

On start up, Ory Hydra is initializing some values. Let's take a look at the logs:

docker logs ory-hydra-example--hydra
time=2022-04-13T11:27:32Z level=info msg=No tracer configured - skipping tracing setup audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:27:32Z level=warning msg=JSON Web Key Set "hydra.openid.id-token" does not exist yet, generating new key pair... audience=application service_name=ORY Hydra service_version=v1.10.6
[...]
time=2022-04-13T11:28:07Z level=warning msg=JSON Web Key Set "hydra.https-tls" does not exist yet, generating new key pair... audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:28:19Z level=info msg=Setting up http server on :4444 audience=application service_name=ORY Hydra service_version=v1.10.6
time=2022-04-13T11:28:19Z level=info msg=Setting up http server on :4445 audience=application service_name=ORY Hydra service_version=v1.10.6

As you can see, the following steps are performed when running Ory Hydra against a fresh database:

    If no system secret was given (in our case we provided one), a random one is generated and emitted to the logs. Note this down, otherwise you won't be able to restart Hydra.
    Cryptographic keys are generated for the OpenID Connect ID Token, the consent challenge and response, and TLS encryption using a self-signed certificate, which is why we need to run all commands using --skip-tls-verify.

Ory Hydra can be managed using the Hydra Command Line Interface (CLI), which is using Ory Hydra's REST APIs. To see the available commands, run:

docker run --rm -it --entrypoint hydra oryd/hydra:v1.10.6 help
Hydra is a cloud native high throughput OAuth2 and OpenID Connect provider

Usage:
  hydra [command]

[...]

Deploy Login & Consent App

The Login Provider and Consent Provider can be two separate web services. We provide a reference implementation which combines both features in one app. Here, we will use deploy that app using Docker.

docker pull oryd/hydra-login-consent-node:v1.10.6
docker run -d \
  --name ory-hydra-example--consent \
  -p 9020:3000 \
  --network hydraguide \
  -e HYDRA_ADMIN_URL=https://ory-hydra-example--hydra:4445 \
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
  oryd/hydra-login-consent-node:v1.10.6

# Let's check if it's running ok:
docker logs ory-hydra-example--consent

> hydra-login-consent-logout@0.0.0 serve /usr/src/app
> node lib/app.js

Listening on http://0.0.0.0:3000

Let's take a look at the arguments:

    -p 9020:3000 exposes this service at port 9020. If you remember, that's the port of the URLS_CONSENT and URLS_LOGIN value from the Ory Hydra docker container (URLS_CONSENT=http://localhost:9020/consent, URLS_LOGIN=http://localhost:9020/login).
    HYDRA_ADMIN_URL=http://hydra:4445 point to the Ory Hydra Administrative API.
    NODE_TLS_REJECT_UNAUTHORIZED=0 disables TLS verification, because we're using self-signed certificates.

Perform OAuth 2.0 Flow

Great! Our infrastructure is all set up! Next it's time to perform the OAuth 2.0 Authorize Code flow. For that purpose, the Ory Hydra CLI has a feature that sets up an OAuth 2.0 Consumer and an OAuth 2.0 callback URL. Typically, this would be a third-party application that requests access to a user's resources on your servers - for example a Facebook App you wrote that backs up a user's photos and thus requires read access to the user's photos.

Before we go ahead, the OAuth 2.0 Client that performs the request has to be set up. Let's call the client facebook-photo-backup. We've to specify which OAuth 2.0 Grant Types, OAuth 2.0 Scope, OAuth 2.0 Response Types, and Callback URLs the client may request:

docker run --rm -it \
  -e HYDRA_ADMIN_URL=https://ory-hydra-example--hydra:4445 \
  --network hydraguide \
  oryd/hydra:v1.10.6 \
  clients create --skip-tls-verify \
    --id facebook-photo-backup \
    --secret some-secret \
    --grant-types authorization_code,refresh_token,client_credentials,implicit \
    --response-types token,code,id_token \
    --scope openid,offline,photos.read \
    --callbacks http://127.0.0.1:9010/callback

Client facebook-photo-backup
Client Secret: some-secret

Let's dive into some of the arguments:

    --skip-tls-verify is supported by all management commands (create/delete/update/... OAuth 2.0 Client, JSON Web Key, ...) and tells the CLI to trust any certificate authority - even self-signed ones. We need this flag because the server uses a self-signed certificate. In production deployments, you would use a certificate signed by a trusted CA.
    --grant-types authorize_code,refresh_token,client_credentials,implicit we want to be able to perform all of these OAuth 2.0 flows.
    --response-types token,code,id_token allows us to receive authorize codes, access and refresh tokens, and OpenID Connect ID Tokens.
    --scope openid,offline,photos.read allows the client to request various permissions:
        openid allows the client to perform the OpenID Connect flow and request an OpenID Connect ID Token.
        offline allows the client to request a refresh token. Because we want to continuously backup photos, the app must be able to refresh expired access tokens. This scope allows that.
        photos.read this is an imaginary scope that'sn't handled by Ory Hydra but serves the purpose of making it clear that we could request read access to a user's photos. You can obviously omit this scope or use your own scope.
    --callbacks http://localhost:9010/callback allows the client to request this redirect uri.

Perfect, let's perform an exemplary OAuth 2.0 Authorize Code Flow! To make this easy, the Ory Hydra CLI provides a helper command called hydra perform authorization-code. Just imagine this being, for example, passport.js that's generating an auth code url, redirecting the browser to it, and then exchanging the authorize code for an access token. The same thing happens with this command:

docker run --rm -it \
  --network hydraguide \
  -p 9010:9010 \
  oryd/hydra:v1.10.6 \
  token user --skip-tls-verify \
    --port 9010 \
    --auth-url https://localhost:5444/oauth2/auth \
    --token-url https://ory-hydra-example--hydra:4444/oauth2/token \
    --client-id facebook-photo-backup \
    --client-secret some-secret \
    --scope openid,offline,photos.read

Setting up home route on http://127.0.0.1:9010/
Setting up callback listener on http://127.0.0.1:9010/callback
Press ctrl + c on Linux / Windows or cmd + c on OSX to end the process.
If your browser doesn't open automatically, navigate to:

        http://127.0.0.1:9010/

open the link, as prompted, in your browser, and follow the steps shown there. You might encounter a screen like the following one:

Allow connecting with self-signed TLS Certificate

This happens because we run Ory Hydra with a self-signed TLS certificate. In production deployments, you would probably use a certificate signed by a trusted CA and not see this screen.

When you see this screen, click on "Advanced" and "Add Exception" to continue. In some browsers, this might work differently, but it's always possible to proceed.

When completed, you should land at a screen that looks like this one:

OAuth 2.0 access and refresh token in the result page

Gitlab Hydra integration

Gitlab has several OAuth2 related features. The relevant here is the possibility to sign in to GitLab with (almost) any OAuth2 provider, in this case Ory Hydra. So, in this guide, we'll connect GitLab's omniauth-connector to Ory Hydra. We'll do that in a docker-based lab-environment in order to investigate the details before you do something like this in production.
Preparation

Even though we're mostly using Ory Hydra in a docker-container, having the command-line-client available is quite useful. So please install Ory Hydra as explained in the installation-guide. You'll also need docker and docker-compose.

The 5-min-tutorial might be worth checking out upfront. It'll a give a nice quick overview of how OAuth2 is working within Ory Hydra with a minimal example. We assume basic knowledge, here.

If you don't yet have the source code of Ory Hydra, which we'll need for the docker-compose yaml-files and the gitlab-configuration, clone the repository:

git clone https://github.com/ory/hydra.git

We will access GitLab via the URL http://gitlab.example.com. So we need to map it to localhost. This is done by modifying the hosts-file. On an unixoid system find this file in /etc/hosts, on Windows, you should find it in c:\WINDOWS\system32\drivers\etc\hosts. Add this line:

127.0.0.1 gitlab.example.com

As this POC will work with http instead of https, we need to whitelist the above domain-name to allow unencrypted http traffic. So add the following switch to the services.hydra.command-section in the quickstart.yml around line 24 so that the line looks like this:

    serve all --dev

Spin up the instances and logging in

Use this command to spin up the instances. This will show the logs on the terminal and it will take some time.

docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml -f ./contrib/quickstart/quickstart-gitlab.yml \
    up --build

After this succeeds, you can access the login page sign-in-page. Don't try to log in yet. We have to create the client in Ory Hydra first.
Creating the client in Ory Hydra

Depending on whether you have the hydra-binary available, you can use it directly or the one in the docker-container.

client=$(hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --format json \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token, email \
    --scope openid,offline_access,profile,email \
    --redirect-uri http://gitlab.example.com:8000/users/auth/Ory_Hydra/callback \
    --token-endpoint-auth-method client_secret_post)

client_id=$(echo $client | jq -r '.client_id')
client_secret=$(echo $client | jq -r '.client_secret')

Or you can use the binary within the docker-container:

docker-compose -f quickstart.yml exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --id "$client_id" \
    --secret "$client_secret" \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token,email \
    --scope openid,offline_access,profile,email \
    --redirect-uri http://gitlab.example.com:8000/users/auth/Ory_Hydra/callback \
    --token-endpoint-auth-method client_secret_post

OAuth2 login

With the first access of your GitLab-instance, you will have to change the root-password. You should see an "Ory Hydra" Login-button. Clicking it will forward you to the hydra-consent-app, where you can log in with foo@bar.com/foobar similar to the 5-min-tutorial. After that, you have to give consent to accessing your email-address. Congratulations, doing that should redirect you directly to your personal GitLab-page. You have logged into GitLab via Ory Hydra.

So now, let's look at the individual pieces and how all of them work together.
Docker-setup

Gitlab has some documentation about how to use their docker-images. It also has an example for docker-compose. The quickstart-gitlab.yaml file in the contrib directory doesn't contain surprising things:

version: "3"

services:
  gitlab:
    image: gitlab/gitlab-ce:13.0.6-ce.0
    restart: always
    hostname: gitlab.example.com
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://gitlab.example.com:8000/'
    ports:
      - "8000:8000" # http
    volumes:
      - "./contrib/quickstart/gitlab/config:/etc/gitlab"
      - "./contrib/quickstart/gitlab/logs:/var/log/gitlab"
      - "./contrib/quickstart/gitlab/data:/var/opt/gitlab"

Other than logs and data, the config directory is already prepopulated and the single most important configuration-file is the gitlab.rb file. GitLab has a mechanism to override values, and we use it here to specify the external_url.

So let's move on to gitlab.rb.
GitLab configuration - OAuth 2 setup

The Gitlab-configuration in contrib/quickstart/gitlab/config/gitlab.rb is the original "template" which consists of 2400 lines of comments on how to do stuff. Our relevant configuration starts at line 432 where the corresponding comments about OAuth2 is located as well. It looks like this:

gitlab_rails['omniauth_enabled'] = true
gitlab_rails['omniauth_block_auto_created_users'] = false
gitlab_rails['omniauth_allow_single_sign_on'] = ['Ory_Hydra']
gitlab_rails['omniauth_providers'] = [
  {
    'name' => 'oauth2_generic',
    'app_id' => '<THE-CLIENT-ID-GOES-HERE>',
    'app_secret' => '<THE-CLIENT-SECRET-GOES-HERE>',
    'args' => {
      client_options: {
        'site' => 'http://127.0.0.1:4444', # including port if necessary
        'user_info_url' => 'http://hydra:4444/userinfo',
        'authorize_url' => 'http://127.0.0.1:4444/oauth2/auth',
        'token_url' => 'http://hydra:4444/oauth2/token'
      },
      user_response_structure: {
        root_path: [],
        id_path: 'sub',
        attributes: {
                email: 'sub'
        }
      },
      authorize_params: {
        scope: 'email'
      },
      # optionally, you can add the following two lines to "white label" the display name
      # of this strategy (appears in urls and Gitlab login buttons)
      # If you do this, you must also replace oauth2_generic, everywhere it appears above, with the new name.
      name: 'Ory_Hydra', # display name for this strategy
      #strategy_class: "OmniAuth::Strategies::OAuth2Generic" # Devise-specific config option Gitlab uses to find renamed strategy
    }
  }
]

The documentation for this, other than inside the file, is a bit scattered:

    A specific step-by-step guide but not very detailed
    OmniAuth reference documentation in GitLab
    OmniAuth Generic reference documentation in GitLab
    OmniAuth Gem-documentation from Satorix

The biggest-source for errors is the clients-options-section. Here we'll specify the details for the OAuth2 flow and where Ory Hydra is located. Two things are important to keep in your mind when looking at configurations which are specifying some flow one way or another:

    Where's the DNS-name resolved? Sometimes it's on the user's browser, sometimes on GitLab or on the hydra-side. In our docker-based POC, it makes a huge difference!
    Cookies can only be written/read, if they're from the same domain. In that case, "127.0.0.1". That would be a different domain than "localhost". Pay attention to that.

These two points in our mind, let's look at the three configurations:

    'site' => 'http://127.0.0.1:4444' This is the default for the three URLs later if not specified otherwise.
    'authorize_url' => 'http://127.0.0.1:4444/oauth2/auth' this URL will be a redirect-target and therefore resolved on the browser of the user. Probably we could omit the scheme, host and port as this is already defined in site.
    'token_url' => 'http://hydra:4444/oauth2/token' the token_url will get used on the GitLab-server to get a token after GitLab received the grant. As it's resolved on the GitLab-side, we're using docker-name of the hydra-container which is by default resolvable on the GitLab-container.
    'user_info_url' => 'http://hydra:4444/userinfo', same thing for the user_info_url. It's called on the GitLab-container and needs to be resolvable there.

The paths here are by default the same paths which are specified by OpenID connect. The configuration would be simpler if we would use OpenID-Connect (more about that later in the appendix) but in our case we're simply manually specifying the values. So it's not an accident that these paths here are the very same then what you get from Ory Hydra:

curl http://127.0.0.1:4444/.well-known/openid-configuration | jq .
[...]
{
  "issuer": "http://127.0.0.1:4444/",
  "authorization_endpoint": "http://127.0.0.1:4444/oauth2/auth",
  "token_endpoint": "http://127.0.0.1:4444/oauth2/token",
  "jwks_uri": "http://127.0.0.1:4444/.well-known/jwks.json",
[...]
  "userinfo_endpoint": "http://127.0.0.1:4444/userinfo",
  "scopes_supported": [
    "offline_access",
    "offline",
    "openid"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_post",
    "client_secret_basic",
    "private_key_jwt",
    "none"
  ],
  [...]
}

Also, worth noting here is the supported token_endpoint_auth_methods: How does GitLab authenticate against Ory Hydra? So GitLab is using client_secret_post which we needed to specify when we've created the GitLab-client in Ory Hydra.

Some remarks for creating the client. We've created the client like this. The second command shows the created client:

hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --id "$client_id" \
    --secret "$client_secret" \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token, email \
    --scope openid,offline_access,profile,email \
    --redirect-uri http://gitlab.example.com:8000/users/auth/Ory_Hydra/callback \
    --token-endpoint-auth-method client_secret_post

hydra get clienthydra --endpoint http://127.0.0.1:4445
{
        "client_id": "gitlab",
        "created_at": "2020-08-31T08:47:30.000Z",
        "grant_types": [
                "authorization_code",
                "refresh_token"
        ],
        "jwks": {},
        "metadata": {},
        "redirect_uris": [
                "http://gitlab.example.com:8000/users/auth/Ory_Hydra/callback"
        ],
        "response_types": [
                "code",
                "id_token",
                ""
        ],
        "scope": "openid offline_access profile email",
        "subject_type": "public",
        "token_endpoint_auth_method": "client_secret_post",
        "updated_at": "2020-08-31T08:47:30.000Z",
        "userinfo_signed_response_alg": "none"
}

    The endpoint isn't part of the configuration, but it's a command-line-switch telling the hydra-binary to which hydra-instance to talk to
    id and secret has been specified before in the GitLab-config
    the token-endpoint-auth-method is by default client_secret_basic but GitLab is using client_secret_post (couldn't find that anywhere in the GitLab-documentation, though)
    The callback needs to be resolvable on the users-browser. However, originally, the callback-URL is created on the GitLab-side. In order to make that resolvable on the client, we set the external_url in the GitLab-configuration. Here that value is just there to cross-check with the generated one. It needs to match.

GitLab user-creation

Initially, GitLab doesn't have any user, but it needs them in order to manage authorisation, no matter how the login is done. This is a common issue, and a common solution to this is to create the users on the fly with the first login. So in order to do that, these lines are enabling that:

gitlab_rails['omniauth_block_auto_created_users'] = false
gitlab_rails['omniauth_allow_single_sign_on'] = ['Ory_Hydra']

In order to get the necessary data for the user, gitlab needs to call to hydra's userinfo-endpoint. The most important attribute is the sub-attribute which provides, according to the specification, the ID of a user which is (in this case) the email-address. However, the email-address is also an attribute in the specification but in the implementation of the of this one hardcoded user (foo@bar.com) is empty.

Therefore, we're specifying a mapping telling gitlab it should take the sub-field and use it as email:

      user_response_structure: {
        root_path: [],
        id_path: 'sub',
        attributes: {
                email: 'sub'
        }
      },

Whether the attribute "email" is there or not is quite critical here. The Login-ID has the form of an email. So in order to satisfy Gitlab's requirement, we're mapping here the email-attribute to the Login-ID, which is represented by "sub". This shouldn't be necessary in a real-world-implementation.

But assuming that it's not doing that mapping, then GitLab would need to ask Ory Hydra on that endpoint the email-address. But is GitLab even allowed to read it? We need consent from the user for that, and we configured the client above to be able to ask for that scope. However, we also need to configure GitLab to actually ask for that scope:

     authorize_params: {
           scope: 'email'
      },

Conclusion

We've successfully integrated GitLab with Ory Hydra. Everything was done as configuration. No code has been created nor has any application been monkey-patched while following this guide (so far).
Troubleshooting
Client wrong

After trying to log in, you get a message like this:

    Error: invalid_client Description: Client authentication failed (for example, unknown client, no client authentication included, or unsupported authentication method) Hint: The requested OAuth 2.0 Client doesn't exist.

Check your registered clients. Make sure ID and password are correct and matches that of the gitlab.rb:

hydra list clients --endpoint http://127.0.0.1:4445
| CLIENT ID | NAME | RESPONSE TYPES |             SCOPE              |                        REDIRECT URIS                         |           GRANT TYPES            | TOKEN ENDPOINT AUTH METHOD |
|-----------|------|----------------|--------------------------------|--------------------------------------------------------------|----------------------------------|----------------------------|
| gitlab    |      | code,id_token, | openid offline_access profile  | http://gitlab.example.com:8000/users/auth/Ory_Hydra/callback | authorization_code,refresh_token | client_secret_post         |
|           |      |                | email                          |                                                              |                                  |                            |
$

From Hydra: request is missing ... or otherwise malformed

So after this, clicking the login-button on the sign-in-page will forward to Ory Hydra, which will redirect to the consent-app on port 3000. After the login, you'd get to the granting-page of the consent-app and after you've "allowed access", you'll get redirected back to gitlab which will unfortunately mention:

    Couldn't authenticate you from OryHydra because "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed".

So the message in quotes is from Ory Hydra and not very expressive. Note that it's a bit difficult to expose very meaningful error-messages, as this could be used for security-attacks. So in such cases check the hydra-logs on what's wrong.
Ory Hydra logs: redirect URL is using an insecure protocol

hydra_1          | time=2020-08-24T12:42:36Z level=error msg=An error occurred
audience=application error=map[message:invalid_request reason:Redirect URL is
using an insecure protocol, http is only allowed for hosts with suffix `localhost`,
for example: http://myapp.localhost/. status:Bad Request status_code:400]
http_request=map[headers:map[accept:text/html,application/xhtml+xml,application/xml;
q=0.9,image/webp,*/*;q=0.8 accept-encoding:gzip, deflate accept-language:en-US,en;
q=0.5 cookie:Value is sensitive and has been redacted. To see the value set config
key "log.leak_sensitive_values = true" or environment variable
"LOG_LEAK_SENSITIVE_VALUES=true". referer:http://127.0.0.1:3000/consent?consent_challenge=b695307490fa4732a80d3324f45f5a93
user-agent:Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0]
host:127.0.0.1:4444 method:GET path:/oauth2/auth query:Value is sensitive and has
been redacted. To see the value set config key "log.leak_sensitive_values = true"
or environment variable "LOG_LEAK_SENSITIVE_VALUES=true".
remote:172.19.0.1:47684 scheme:http] service_name= service_version=

The relevant part here is: Redirect URL is using an insecure protocol. Make sure to add the --dev? to the hydra-command as described above.

After that, restart the hydra-container like this:

docker-compose -f quickstart.yml \
    -f quickstart-postgres.yml -f quickstart-gitlab.yml \
    restart hydra

GitLab: signing in ... isn't allowed

    Signing in using your Ory Hydra account without a pre-existing GitLab account isn't allowed. Create a GitLab account first, and then connect it to your Ory Hydra account.

Double-Check the above explanation about user-creation.
GitLab: email can't be blank

    Sign-in failed because Email can't be blank and Notification email can't be blank.

Double-check the user_response_structure and the authorize_params. The attributes need an email-entry.
Appendix: some notes about OpenID Connect (OIDC)

GitLab is supporting OIDC and Ory Hydra does that as well. Why hasn't that been used in this guide?

OIDC might be the better choice then plain OAuth2. When we tried that, we ran into the issue that the used OIDC implementation doesn't allow HTTP, but "only" HTTPS. That's a good thing, but not optimal for POCs like this. Whereas Ory Hydra has a switch to whitelist URLs in such cases, the used OIDC doesn't seem to have that. So, here is a reasonable OIDC configuration:

gitlab_rails['omniauth_providers'] = [
  { 'name' => 'openid_connect',
    'label' => 'Ory Hydra',
    # 'icon' => '<custom_provider_icon>',
    'args' => {
      'name' => 'openid_connect',
      'scope' => ['openid'],
      'response_type' => 'code',
      'issuer' => 'http://127.0.0.1:4444/',
      'discovery' => true,
      'client_auth_method' => 'basic',
      'send_scope_to_token_endpoint' => 'false',
      'client_options' => {
        'identifier' => 'gitlab',
        'secret' => 'theSecret',
        'redirect_uri' => 'http://gitlab.example.com:8000/users/auth/openid_connect/callback'
      }
    }
  }
]

In order to make that work, which isn't SSL, we need to patch the openid_connect gem. Checkout the details here.

docker-compose -f quickstart.yml  -f quickstart-postgres.yml -f quickstart-gitlab.yml exec gitlab /opt/gitlab/embedded/lib/ruby/gems/2.6.0/gems/openid_connect-1.1.8/lib/openid_connect/discovery/provider/config.rb

          def initialize(uri)
            @host = uri.host
            @port = uri.port unless [80, 443].include?(uri.port)
            @path = File.join uri.path, '.well-known/openid-configuration'
            @scheme = uri.scheme
            attr_missing!
          end

          def endpoint
            case scheme
            when "http"
              SWD.url_builder = URI::HTTP
            else
              SWD.url_builder = URI::HTTPS
            end
            SWD.url_builder.build [nil, host, port, path, nil, nil]
          rescue URI::Error => e
            raise SWD::Exception.new(e.message)
          end

In order to avoid that scenario, this guide avoids OIDC.

Merge multiple Hydra instances with different system.secrets
caution

Be advised that this can break client creation if done incorrectly!

Please follow this guide with caution and make sure you know what you are doing.

This guide provides practical steps to merge multiple Ory Hydra Postgres database instances with different system.secret values into one instance with one system.secret.

The system.secret or $SECRETS_SYSTEM is an environmental variable, that's used to encrypt Ory Hydras database.

If you are looking for information on how to change (rotate) the system.secret, please refer to the Secrets and Key Rotation Guide.

First we take all the system.secret keys and add them to the target instance environment variables like so:

SECRETS_SYSTEM=new-secret,secret-1,secret-2,secret-3,secret-n,secret-n+1

Then we run the following pg_dump command against the databases we need to migrate:

pg_dump --verbose -a  \
	--format=p \
	--no-owner \
	--no-acl \
	--quote-all-identifiers \
	-t hydra_client \
	-t hydra_oauth2_authentication_session \
	-t hydra_oauth2_authentication_request \
	-t hydra_oauth2_authentication_request_handled \
	-t hydra_oauth2_consent_request \
	-t hydra_oauth2_consent_request_handled \
	-t hydra_oauth2_code \
	-t hydra_oauth2_access \
	-t hydra_oauth2_refresh \
	-f hydra-dump.sql \
	<DSN>

Take extra care with the following manual edits!

Then we open each of the dump files and manually edit hydra_clients.pk be entirely set to the value DEFAULT (SQL keyword) to make it follow the sequence in the target DB.

We delete the last line of the dump, since it sets the value of the primary key sequence to the number of the donor database.
So we need to delete this line. This step is crucial!

If you don't remove it, it will potentially break client creation, since it will reset the sequence of hydra_clients.pk to what it was in the source DB

After that the final step is to import the data like so:

psql -o hydra_import_log \
 -f hydra-dump.sql \
 <DSN>

And that did it, we successfully merged multiple Hydra instances with different system.secret into one instance with one system.secret.

Secrets and key rotation

There are two types of key rotation:

    Rotation of JSON Web Token Signing Keys
    Rotation of HMAC Token Signing and Database and Cookie Encryption Keys

Rotation of JSON Web Token Signing Keys

JSON Web Token Signing Key rotation is simple with Ory Hydra. You can rotate OpenID Connect ID Token and OAuth 2.0 Access Tokens, when using the JSON Web Token strategy, keys with one simple command.

Ory Hydra takes the latest key from the key store to sign JSON Web Tokens. All public keys will be shown at http://ory-hydra-public-api/.well-known/jwks.json.
OpenID Connect ID Token

hydra create jwks --endpoint=http://ory-hydra-admin-api/ hydra.openid.id-token --alg RS256

OAuth 2.0 Access Tokens (JSON Web Token)

    This will only work when using the JWT access token strategy. Otherwise, this will have no effect.

hydra create jwks --endpoint=http://ory-hydra-admin-api/ hydra.jwt.access-token --alg RS256

Rotation of HMAC Token Signing and Database and Cookie Encryption Keys

Rotating database encryption keys is done by prepending the new encryption key to the respective configuration value. Assuming configuration

secrets:
  cookie:
    - the-old-cookie-encryption-key
  system:
    - the-old-system-encryption-key

one would add the new keys as follows

secrets:
  cookie:
    - the-new-cookie-encryption-key # the new key must be the first entry
    - the-old-cookie-encryption-key
  system:
    - the-new-system-encryption-key # the new key must be the first entry
    - the-old-system-encryption-key

    It's very important that the new key is the first entry in the list as only the first key is used for encryption while all keys from the list are used for decryption. Please note that existing data won't be automatically re-encrypted using the new key. Only new data will be signed and encrypted using the new key. It's therefore imperative that the old key is added to the list, unless you want to also invalidate all data that was signed or encrypted using the old key.



SSL/TLS, HTTPS, self-signed certificates

If you want to run Ory Hydra using self-signed TLS certificates, you can do the following:

openssl genrsa -out key.pem 4096
openssl req -new -x509 -sha256 -key key.pem -out cert.crt -days 365

SERVE_TLS_CERT_BASE64=$(base64 -i cert.crt)
SERVE_TLS_KEY_BASE64=$(base64 -i key.pem)

# or

SERVE_TLS_KEY_PATH=/path/to/key.pem
SERVE_TLS_CERT_PATH=/path/to/cert.crt

If you run Docker locally, you can then use

docker run ... \
    -e SERVE_TLS_CERT_BASE64="$SERVE_TLS_CERT_BASE64" \
    -e SERVE_TLS_KEY_BASE64="$SERVE_TLS_KEY_BASE64" \
    ...

or mount the files using --mount and linking to the files.

TLS is not enabled and set to false by default. Please check under tls in the configuration to enable and configure TLS for self-hosted Ory Hydra.


Configuring cookies

By default, cookies sent by Ory Hydra's API are set without explicitly specifying a SameSite mode. If you wish for these cookies to be set with a mode you can use the serve.cookies.same_site_mode setting. Possible values are Strict, Lax or None:

serve:
  cookies:
    same_site_mode: Strict

If you wish to embed requests to hydra on a third party site (for example an iframe that periodically polls to check session status) you will need to set the mode to None. Some browser versions reject cookies using the Same-Site=None attribute. Hydra implements a workaround that can be enabled by setting serve.cookies.same_site_legacy_workaround to true. This workaround is disabled by default, and only takes effect when serve.cookies.same_site_mode is set to None:

# SameSite=none requires HTTPS, so we need to disable dev mode:
dev: false

serve:
  cookies:
    same_site_mode: None
    same_site_legacy_workaround: true

To set the cookie domain, use the serve.cookies.domain setting:

serve:
  cookies:
    domain: example.com

To set the cookie names, use the serve.cookies.names setting:

serve:
  cookies:
    names:
      login_csrf: login_name
      consent_csrf: consent_name
      session: session_name

Configure cross-origin resource sharing (CORS)

Ory services support cross-origin resource sharing (CORS). For the full schema, see the configuration file.
Configure CORS in Ory Kratos

Enable CORS for specific origins in your configuration file:

serve:
  admin:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com # Wildcards are supported
  public:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com

Configure CORS in Ory Hydra

We recommend the following base configuration:

serve:
  admin:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
  public:
    cors:
      enabled: true
      allowed_origins:
        - * # Use wildcard for using Ory Hydra in 3rd party scenarios (public OAuth2 client registration), otherwise fixed domains.

OAuth 2.0 authorization endpoint

The authorization endpoint (/oauth2/auth) never supports CORS. Browsers call this endpoint directly, not through AJAX, so CORS is unnecessary and unsafe.
OAuth 2.0 token endpoint

The token, userinfo, and revocation endpoints (/oauth2/token, /userinfo, /oauth2/revoke) allow requests from origins defined in the OAuth 2.0 client’s allowed_cors_origins field. Example:

{
  "client_id": "foo",
  "allowed_cors_origins": ["https://foo-bar.com/"]
}

This client can make CORS requests to /oauth2/token from https://foo-bar.com/, even if that origin isn't listed in public.cors.allowed_origins.
note

For preflight (OPTIONS) requests, you must also configure the origin in the global CORS settings. OPTIONS requests don't include authorization headers, so Hydra can't resolve which OAuth 2.0 client is making the request.
Configure CORS in Ory Keto

serve:
  read:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
  write:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
  metrics:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com

Configure CORS in Ory Oathkeeper

serve:
  proxy:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com
  api:
    cors:
      enabled: true
      allowed_origins:
        - https://example.com
        - https://*.example.com

Advanced configuration

You can customize allowed methods, headers, and other CORS behavior:

cors:
  enabled: true
  allowed_origins:
    - https://example.com

  allowed_methods:
    - GET
    - POST
    - PUT
    - PATCH
    - DELETE
    - OPTIONS
  allowed_headers:
    - Content-Type
  exposed_headers:
    - Content-Type
    - Date
    - Vary
  allow_credentials: true
  debug: true

Common CSRF pitfalls
Same-site in Chrome

Google Chrome changed the behavior of SameSite=None so that it isn't possible to use this SameSite mode without the HTTP Cookie secure flag.

If you run a version of Ory Hydra 1.6 and below and experience this issue:

    Make sure to not use the --dev flag
    Set configuration value serve.cookies.same_site_mode or environment variable SERVE_COOKIES_SAME_SITE_MODE to Lax - this happens automatically for Ory Hydra v1.7.0 when running in HTTP mode.

Chrome rejects cookies without the secure flag if a cookie with the same name for the same scope (domain, path) is set that has the secure flag. Ory Hydra 1.7.0+ uses different names for cookies with and without secure flag. For versions prior to that, you need to delete the cookies for the domain in order to get them working again.
Ory Hydra Running Over HTTP Without dev-mode Enabled

You are running Ory Hydra via HTTP but are missing the --dev CLI flag:

hydra serve all -c path/to/config.yml --dev

Mixing up 127.0.0.1 and localhost

Use either 127.0.0.1 or localhost - so either IPs or hostnames - throughout your flow because cookies from an IP aren't available to the hostname and vice-versa.
Reverse proxy or load balancers

You are running Ory Hydra behind a reverse proxy that strips the Cookie header. If the reverse proxy supports path rewrites that might also cause issues!

Prepare for production

Read this document to prepare for production when self-hosting Ory Hydra.
Feel free to open an issue or pull request when you have an idea how to improve this documentation.

Read more about deployment fundamentals and requirements for Ory.
Security checklist

Before deploying to production, review and explicitly set the following security-critical configuration values. Do not rely on defaults in a production environment.
Secrets

Review the secrets section of the Configuration.

Do not rely on the defaults in production, and set a custom secret value for system, cookie, and pagination. Generate a cryptographically secure random value, for example:

openssl rand -base64 32

Ory Hydra behind an API gateway

Although Ory Hydra implements all Go best practices around running public-facing production HTTP servers, we discourage running Ory Hydra facing the public net directly. We strongly recommend running Ory Hydra behind an API gateway or a load balancer. It's common to terminate TLS on the edge (gateway / load balancer) and use certificates provided by your infrastructure provider such as AWS CA for last mile security.
HTTP clients

In some scenarios you might want to disallow HTTP calls to private IP ranges. To configure this feature, set the following configuration:

clients:
  http:
    disallow_private_ip_ranges: true

If enabled, all outgoing HTTP calls done by Ory Hydra will be checked whether they're against a private IP range. If that's the case, the request will fail with an error.
Routing

It's common to use a router, or API gateway, to route subdomains or paths to a specific service. For example, https://myservice.com/hydra/ is routed to http://10.0.1.213:3912/ where 10.0.1.213 is the host running Ory Hydra. To compute the values for the consent challenge, Ory Hydra uses the host and path headers from the HTTP request. Therefore, it's important to set up your API Gateway in such a way, that it passes the public host (in this case myservice.com) and the path without any prefix (in this case hydra/). If you use the Mashape Kong API gateway, you can achieve this by setting strip_request_path=true and preserve_host=true.
Exposing administrative and public API endpoints

Ory Hydra serves APIs via two ports:

    Public port (default 4444)
    Administrative port (default 4445)

The public port can and should be exposed to public internet traffic. That port handles requests to:

    /.well-known/jwks.json
    /.well-known/openid-configuration
    /oauth2/auth
    /oauth2/token
    /oauth2/revoke
    /oauth2/fallbacks/consent
    /oauth2/fallbacks/error
    /oauth2/sessions/logout
    /userinfo

The administrative port shouldn't be exposed to public internet traffic. If you want to expose certain endpoints, such as the /clients endpoint for OpenID Connect Dynamic Client Registry, you can do so but you need to properly secure these endpoints with an API Gateway or Authorization Proxy. Administrative endpoints include:

    All /clients endpoints.
    All /keys endpoints.
    All /health, /admin/metrics/prometheus, /admin/version endpoints.
    All /oauth2/auth/requests endpoints.
    Endpoint /oauth2/introspect.
    Endpoint /oauth2/flush.

None of the administrative endpoints have any built-in access control. You can do simple curl or Postman requests to talk to them.

The Token Introspection endpoint requires authentication. But since there is no access control, any valid authentication enables the endpoint to be used. If you need to access this endpoint in production, you should configure your API Gateway or Application Proxy to restrict which clients have access to the endpoint.

We generally advise to run Ory Hydra with hydra serve all which listens on both ports in one process.
Binding to different interfaces or UNIX sockets

Ory Hydra will bind public and administrative APIs ports to all interfaces.

The interfaces or UNIX sockets used may be specified via environment variables PUBLIC_HOST and ADMIN_HOST. Interfaces may be specified as TCP address or as UNIX socket (giving the absolute path to the socket file prefixed by unix:) like:

    PUBLIC_HOST=127.0.0.1
    ADMIN_HOST="unix:/var/run/hydra/admin_socket"

Ory Hydra will try to create the socket file during startup and the socket will be writeable by the user running Ory Hydra. The owner, group and mode of the socket can be modified:

serve:
  admin:
    host: unix:/var/run/hydra/admin_socket
    socket:
      owner: hydra
      group: hydra-admin-api
      mode: 770

Key generation and high availability environments

Be aware that on the very first launch of the Hydra container(s), a worker process will perform certain first-time installation tasks, such as generating JSON web keys if they don't already exist.

If you intend on running your production Hydra environment in a highly-available setup (for example, multiple concurrent containers behind a load-balancer), it's possible that both containers will generate JWKs at the same time.

Although this isn't a problem, we recommend that you launch your production environment with just one container to begin with, to complete the initial seeding of the database.

Once done, you can raise your number of containers to achieve high availability.
Next steps

For a deployment guide using Nginx, visit the Deploy to production documentation.

Example deployment

This guide explains how to set up and run Ory Hydra in an exemplary production environment. It uses Postgres as database, Nginx as reverse proxy, and Digital Ocean as cloud provider. You can use another relational database, a different reverse proxy, deploy on any other cloud host, and spin up a custom user interface in your favorite language - this is just an example!
Create a Droplet

Spin up a Droplet (virtual machine) with the following configuration:

    OS: Ubuntu 20.04
    Plan: Basic
    CPU options: Regular with SSD
    RAM: 1Gb
    SSD: 25Gb
    VPC network: default
    Authentication: SSH Keys. Don't forget to add your SSH key.
    Region: Choose your region

note

This example shows a basic configuration of Ory Hydra on a single virtual machine (VM). The configuration of a VM may vary depending on the scale of your application.

Wait for the Droplet to start up and copy the IP address.

This guide uses oauth2.example.com as a hostname to run Ory Hydra. Replace it with <something>.<your-domain> for your purposes. At your hosting provider, configure DNS, create an A type record, and point it to the Droplet IP.
Install dependencies

Connect to your Droplet via SSH or use the Droplet Console.

First, upgrade all packages on your Droplet.

apt-get update && apt-get upgrade

Since the default version of Node.js is outdated we need to install a newer version. You can use the following script to install Node.js 16 on a Ubuntu system.

curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
bash /tmp/nodesource_setup.sh
apt-get install nodejs npm jq unzip
# Install Node.js 16.x and other dependencies

Confirm the correct version of Node.js is installed:

node -v
v16.14.2

Install PostgreSQL

    Install PostgreSQL by running the following command:

    sudo apt install postgresql postgresql-contrib
    sudo -i -u postgres

    Create the database:

    createdb hydra

    Change the default password encryption to a stronger one as recommended by PostgreSQL:

    psql
    # Postgres command line
    ALTER SYSTEM SET password_encryption = 'scram-sha-256';
    # Change the default password encryption to stronger one
    SELECT pg_reload_conf();
    # Reload configuration

    Create a Postgres user for Hydra:

    CREATE USER hydra PASSWORD '<YOUR_PASSWORD_HERE>';

    Edit the /etc/postgresql/12/main/pg_hba.conf file and add the following to enable scram-sha-256 encryption:

    host    all             all             127.0.0.1/32            scram-sha-256

    Check your credentials against Postgres:

    psql -U hydra -W -h 127.0.0.1

    Use the password for the Ory Hydra user we created before to log into Postgres. If everything works correctly you should see a prompt similar to this:

    Password:
    psql (12.9 (Ubuntu 12.9-0ubuntu0.20.04.1))
    SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
    Type "help" for help.

    hydra=>

Congratulations, you have installed and configured the PostgreSQL database. Next, you will set up Ory Hydra.
Install Ory Hydra

    Create a new user with prohibited login:

    useradd -s /bin/false -m -d /opt/hydra hydra

    Create folders to hold the installation data and configuration files:

    mkdir /opt/hydra/{bin,config}

    Install Ory Hydra:

    cd /opt/hydra/bin
    # Download a new version of Ory Hydra
    wget https://github.com/ory/hydra/releases/download/v26.2.0/hydra_26.2.0-linux_64bit.tar.gz
    # Extract contents
    tar xfvz hydra_26.2.0-linux_64bit.tar.gz
    # Remove redundant files
    rm *md
    rm LICENSE

    Download the Quickstart configuration files

    cd ../config
    wget https://raw.githubusercontent.com/ory/hydra/v26.2.0/contrib/quickstart/5-min/hydra.yml

    Add configuration for Ory Hydra in hydra.yml to use the Postgres database. Open hydra.yml and change the DSN configuration. Ory Hydra is storing data in an SQLite database in the default quickstart configuration. Change the DSN key to use the Postgres database you configured before and add the issuer URL. This URL will be used as issuer in access and ID tokens.

    dsn: postgres://hydra:b0qw68gr3Q@127.0.0.1:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4
    urls:
      self:
        issuer: https://oauth2.example.com

    Apply migrations:

    /opt/hydra/bin/hydra -c /opt/hydra/config/hydra.yml migrate sql -y postgres://hydra:b0qw68gr3Q@127.0.0.1:5432/hydra?sslmode=disable

    Test your setup using the serve command:

    /opt/hydra/bin/hydra -c /opt/hydra/config/hydra.yml serve all

You should see something like this once the service has been started:

WARN[2022-04-15T15:24:29Z] JSON Web Key Set "hydra.openid.id-token" does not exist yet, generating new key pair...  audience=application service_name=Ory Hydra service_version=v26.2.0
WARN[2022-04-15T15:24:34Z] JSON Web Key Set "hydra.jwt.access-token" does not exist yet, generating new key pair...  audience=application service_name=Ory Hydra service_version=v26.2.0
Thank you for using Ory Hydra v26.2.0!

Run Ory Hydra using systemd

    Change the owner of /opt/hydra directory to the hydra user:

    chown -R hydra /opt/hydra/

    Create a /etc/systemd/system/hydra.service file

    cd /etc/systemd/system
    nano hydra.service

    Add the following to configure systemd to start Ory Hydra using the serve command from earlier:

    [Unit]
    Description=Hydra Service
    After=network.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    Restart=always
    RestartSec=1
    User=hydra
    Environment=SERVE_ADMIN_HOST=127.0.0.1
    Environment=SERVE_PUBLIC_HOST=127.0.0.1
    ExecStart=/opt/hydra/bin/hydra -c /opt/hydra/config/hydra.yml serve all

    [Install]
    WantedBy=multi-user.target

Read more about the administrative and public APIs.

    To run Ory Hydra using systemd add the systemd service to startup:

    systemctl enable hydra.service
    Created symlink /etc/systemd/system/multi-user.target.wants/hydra.service → /etc/systemd/system/hydra.service.

    Start hydra.service using systemd:

    systemctl start hydra.service

    Check running processes with ps ax | grep hydra. If everything worked correctly you should see something like this:

    ps ax | grep hydra
    19191 ?        Ssl    0:00 /opt/hydra/bin/hydra -c /opt/hydra/config/hydra.yml serve
    19206 ?        Ss     0:00 postgres: 12/main: hydra hydra 127.0.0.1(36094) idle

We have Ory Hydra up and running, now we need to configure a reverse proxy to make the Hydra Admin API inaccessible via the public internet.
Install and configure Nginx

We'll use Nginx as a reverse proxy and load balancer for our service. You can use another reverse proxy and load balancer instead.

    Install Nginx (and certbot) by running:

    apt install nginx certbot python3-certbot-nginx

    Create a default configuration for the virtual host. To do this create the file accounts.example.com at /etc/nginx/sites-available/ with the following content

    cd /etc/nginx/sites-available/
    nano oauth2.example.com

    server {
            listen 80;
            server_name oauth2.example.com;
    }

    Create a symlink to sites-enabled directory:

    ln -s /etc/nginx/sites-available/oauth2.example.com /etc/nginx/sites-enabled/oauth2.example.com

    Configure SSL via Certbot. Run the following command and answer the questions to set it up. When prompted choose to redirect HTTP traffic to HTTPS.

    certbot --nginx -d oauth2.example.com

After running Certbot your configuration file will look like this:

cat /etc/nginx/sites-enabled/oauth2.example.com

server {
        listen 80;
        server_name oauth2.example.com;
        if ($host = oauth2.example.com) {
                return 301 https://$host$request_uri;
        }
}
server {
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/oauth2.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/oauth2.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

Some parts are missing from your configuration at this point, and we need to configure locations and upstream APIs. You can balance network traffic between different instances of Ory Hydra running on the various virtual machines. We need two upstream APIs:

    public_api to proxy traffic to the Public API of Ory Hydra
    admin_api to proxy traffic to the Admin API of Ory Hydra

Read more about exposing admin and public API endpoints.

    Add the following configuration before the server section to the /etc/nginx/sites-enabled/oauth2.example.com file:

    +upstream public_api {
    +        server 127.0.0.1:4444;
    # We can load balance the traffic to support scaling
    +        server 127.0.0.1:4444;
    +}
    +upstream admin_api {
    +        server 127.0.0.1:4445;
    +        server 127.0.0.1:4445;
    +}
    server {
    ...

    Add your locations and the /etc/nginx/sites-enabled/oauth2.example.com has the following content:

    ...
    server {
      listen [::]:443 ssl ipv6only=on;
      listen 443 ssl;
      ssl_certificate /etc/letsencrypt/live/oauth2.example.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/oauth2.example.com/privkey.pem;
      include /etc/letsencrypt/options-ssl-nginx.conf;
      ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    +  location ~ ^/(admin|clients|keys|health|metrics|version|oauth2/auth/requests|oauth2/introspect|oauth2/flush)/? {
    +    set $allow 0;
    +    if ($remote_addr ~* "172.28.0.*") {
    +      set $allow 1;
    +    }
    +    if ($arg_secret = "CHANGE-ME-INSECURE-PASSWORD") {
    +      set $allow 1;
    +    }
    +    if ($allow = 0) {
    +      return 403;
    +    }
    +
    +    proxy_pass http://admin_api;
    +    proxy_redirect    off;
    +    proxy_set_header  Host               $host;
    +    proxy_set_header  X-Real-IP          $remote_addr;
    +    proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
    +    proxy_set_header  X-Forwarded-Proto  $http_x_forwarded_proto;
    +  }
    +
    +  location ~ ^/(.well-known|oauth2/auth|oauth2/token|oauth2/sessions|oauth2/revoke|oauth2/fallbacks/consent|oauth2/fallbacks/error|userinfo)/? {
    +    proxy_pass http://public_api;
    +    proxy_redirect    off;
    +    proxy_set_header  Host              $host;
    +    proxy_set_header  X-Real-IP         $remote_addr;
    +    proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
    +    proxy_set_header  X-Forwarded-Proto $http_x_forwarded_proto;
    +  }

    }

Let's take a closer look at the configuration. We have two location blocks.

    The first location block proxies network traffic to the admin API of Ory Hydra. Nginx proxies requests only from the 172.28.0.0/24 subnet or by providing ?secret=CHANGE-ME-INSECURE-PASSWORD argument for additional security. The Admin API implements administrative endpoints to manage data or /health endpoints to check the availability of your instance. You should either not expose these endpoints or implement additional security checks for them.
    The second location block proxies network traffic to the public API of Ory Hydra. It allows to utilize OAuth 2.0 flows and can be exposed to the public internet without additional authentication/authorization/access control checks.

You can find more information about endpoints in the Prepare for production guide.

Your full Nginx configuration should now look something like this:

upstream public_api {
        server 127.0.0.1:4444;
        server 127.0.0.1:4444;
}
upstream admin_api {
        server 127.0.0.1:4445;
        server 127.0.0.1:4445;
}
server {
        listen 80;
        server_name oauth2.example.com;
        if ($host = oauth2.example.com) {
                return 301 https://$host$request_uri;
        }
}
server {
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/oauth2.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/oauth2.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    location ~ ^/(admin|clients|keys|health|metrics|version|oauth2/auth/requests|oauth2/introspect|oauth2/flush)/? {
      set $allow 0;
      if ($remote_addr ~* "172.28.0.*") {
        set $allow 1;
      }
      if ($arg_secret = "CHANGE-ME-INSECURE-PASSWORD") {
        set $allow 1;
      }
      if ($allow = 0) {
        return 403;
      }

      proxy_pass http://admin_api;
      proxy_redirect    off;
      proxy_set_header  Host               $host;
      proxy_set_header  X-Real-IP          $remote_addr;
      proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
      proxy_set_header  X-Forwarded-Proto  $http_x_forwarded_proto;
    }

    location ~ ^/(.well-known|oauth2/auth|oauth2/token|oauth2/sessions|oauth2/revoke|oauth2/fallbacks/consent|oauth2/fallbacks/error|userinfo)/? {
      proxy_pass http://public_api;
      proxy_redirect    off;
      proxy_set_header  Host              $host;
      proxy_set_header  X-Real-IP         $remote_addr;
      proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
      proxy_set_header  X-Forwarded-Proto $http_x_forwarded_proto;
    }

}

    Test the Nginx configuration:

    nginx -t

    If your configuration is correct, you should get the following outputs:

    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful

    Now reload the Nginx service:

    service nginx reload

    Test if Ory Hydra runs by doing a health check at https://oauth2.example.com/health/ready?secret=CHANGE-ME-INSECURE-PASSWORD.

Next Steps

    Read the Prepare for production.
    Fork the Ory Hydra Node.js UI Reference or build a custom UI in the language of your choice.
    Add Identity and Account Management


Kubernetes Helm Chart

The Ory Hydra Helm Chart helps you deploy Ory Hydra on Kubernetes using Helm. The source code is available on github.com/ory/k8s.
Installation

To install Ory Hydra, the following configuration values must be set:

    hydra.config.dsn
    hydra.config.urls.self.issuer
    hydra.config.urls.login
    hydra.config.urls.consent
    hydra.config.secrets.system

    NOTE: If no hydra.config.secrets.system secrets is supplied and hydra.existingSecret is empty, a secret is generated automatically. The generated secret is cryptographically secure, and 32 signs long.

If you wish to install Ory Hydra with an in-memory database, a cryptographically strong secret, a Login and Consent provider located at https://my-idp/ run:

helm install \
    --set 'hydra.config.secrets.system={'$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | base64 | head -c 32)'}' \
    --set 'hydra.config.dsn=memory' \
    --set 'hydra.config.urls.self.issuer=https://my-hydra/' \
    --set 'hydra.config.urls.login=https://my-idp/login' \
    --set 'hydra.config.urls.consent=https://my-idp/consent' \
    ory/hydra

You can optionally also set the cookie secrets:

helm install \
    ...
    --set 'hydra.config.secrets.cookie=$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | base64 | head -c 32)' \
    ...
    ory/hydra

Alternatively, you can use an existing Kubernetes Secret instead of letting the Helm Chart create one for you:


kubectl create secret generic my-secure-secret --from-literal=dsn=postgres://foo:bar@baz:1234/db \
    --from-literal=secretsCookie=$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | base64 | head -c 32) \
    --from-literal=secretsSystem=$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | base64 | head -c 32)

helm install \
    ...
    --set 'hydra.existingSecret=my-secure-secret' \
    ...
    ory/hydra

With SQL database

To run Ory Hydra against a SQL database, set the connection string. For example:

helm install \
    ...
    --set 'dsn=postgres://foo:bar@baz:1234/db' \
    ory/hydra

This chart doesn't require MySQL, PostgreSQL, or CockroachDB as dependencies because we strongly encourage you not to run a database in Kubernetes but instead recommend to rely on a managed SQL database such as Google Cloud SQL or AWS Aurora.
With Google Cloud SQL

To connect to Google Cloud SQL, you could use the gcloud-sqlproxy chart:

helm upgrade pg-sqlproxy rimusz/gcloud-sqlproxy --namespace sqlproxy \
    --set 'serviceAccountKey="$(cat service-account.json | base64 | tr -d '\n')"' \
    ...

When bringing up Ory Hydra, set the host to pg-sqlproxy-gcloud-sqlproxy as documented here:

helm install \
    ...
    --set 'dsn=postgres://foo:bar@pg-sqlproxy-gcloud-sqlproxy:5432/db' \
    ory/hydra

Configuration

You can pass your Ory Hydra configuration file by creating a yaml file with key hydra.config

# hydra-config.yaml

hydra:
  config:
    # example:
    ttl:
      access_token: 1h
    # ...

and passing that as a value override to helm:

helm install -f ./path/to/hydra-config.yaml ory/hydra

Additionally, the following extra settings are available:

    autoMigrate (bool): If enabled, an initContainer running hydra migrate sql will be created.
    dev (bool): If enabled, sets the --dev flag on hydra serve all.

Examples
Exemplary login and consent app

This tutorial assumes that you're running Minikube locally. If you're not running Kubernetes locally, please adjust the hostnames accordingly.

Let's install the Login and Consent App first

helm install hydra-example-idp ory/example-idp \
    --set 'hydraAdminUrl=http://hydra-example-admin/' \
    --set 'hydraPublicUrl=http://public.hydra.localhost/' \
    --set 'ingress.enabled=true'

with hostnames

    http://hydra-example-admin corresponding to deployment name --name hydra-example (see next code sample) with suffix -admin which is the hostname of the Ory Hydra Admin API Service.
    https://public.hydra.localhost/ which is the default value for ingress.public.hosts[0].host from ory/hydra ( see next code sample).

Next install Ory Hydra. Please note that SSL is disabled using --set hydra.dangerousForceHttp=true which should never be done when working outside of localhost and only for testing and demonstration purposes. Install the Ory Hydra Helm Chart

helm install hydra-example ory/hydra \
    --set 'hydra.config.secrets.system={'$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | base64 | head -c 32)'}' \
    --set 'hydra.config.dsn=memory' \
    --set 'hydra.config.urls.self.issuer=http://public.hydra.localhost/' \
    --set 'hydra.config.urls.login=http://example-idp.localhost/login' \
    --set 'hydra.config.urls.consent=http://example-idp.localhost/consent' \
    --set 'hydra.config.urls.logout=http://example-idp.localhost/logout' \
    --set 'ingress.public.enabled=true' \
    --set 'ingress.admin.enabled=true' \
    --set 'hydra.dangerousForceHttp=true' \
    --set 'hydra.dev=true'

with hostnames

    example-idp.localhost which is the default for ingress.hosts[0].host from ory/example-idp.

If running Minikube, enable the Ingress addon

minikube addons enable ingress

and get the IP addresses for the Ingress controllers with (you may need to wait a bit)

kubectl get ing
NAME                   HOSTS                    ADDRESS        PORTS   AGE
hydra-example-idp      example-idp.localhost    192.168.64.3   80      3m47s
hydra-example-public   public.hydra.localhost   192.168.64.3   80      35s
hydra-example-admin    admin.hydra.localhost    192.168.64.3   80      35s

or alternatively with

minikube ip192.168.64.3

next route the hostnames to the IP Address from above by editing, for example /etc/hosts. The result should look something like:

cat /etc/hosts
127.0.0.1	    localhost
255.255.255.255	broadcasthost
::1             localhost
# ...
192.168.64.3    example-idp.localhost
192.168.64.3    admin.hydra.localhost
192.168.64.3    public.hydra.localhost

Please note that file contents will be different on every operating system and network. Now, confirm that everything is working:

curl http://example-idp.localhost/
http://public.hydra.localhost/.well-known/openid-configuration

Next, you can follow the 5 Minute Tutorial, skipping the git and docker-compose set up sections. Assuming you have Ory Hydra installed locally, you can rewrite commands from, for example,

client=$(docker-compose -f quickstart.yml exec hydra \
  hydra create client \
  --endpoint http://127.0.0.1:4445/ \
  --format json \
  -g client_credentials)

client_id=$(echo $client | jq -r '.client_id')
client_secret=$(echo $client | jq -r '.client_secret')

docker-compose -f quickstart.yml exec hydra \
  hydra perform client-credentials \
  --endpoint http://127.0.0.1:4444/ \
  --client-id "$client_id" \
  --client-secret "$client_secret"

to

client=$(docker-compose -f quickstart.yml exec hydra \
  hydra create client \
    --endpoint http://admin.hydra.localhost/ \
  --format json \
  -g client_credentials)

hydra perform client-credentials \
    --endpoint http://public.hydra.localhost/ \
  --client-id "$client_id" \
  --client-secret "$client_secret"

Hydra Maester

This chart includes a helper chart in the form of Hydra Maester, a Kubernetes controller, which manages OAuth2 clients using the oauth2clients.hydra.ory.com custom resource. By default, this component is enabled and installed together with Hydra. However, it can be disabled by setting the proper flag:

helm install \
    --set 'maester.enabled=false' \
    ory/hydra

Using fullnameOverride

If you use need to override the name of the hydra resources such as the deployment or services, the traditional fullnameOverride value is available.

If you use it and deploy maester as part of hydra, make sure you also set maester.hydraFullnameOverride with the same value, so that the admin service name used by maester is properly computed with the new value.

Should you forget, helm will fail and remind you to.


    Ory Open SourceOry HydraReferenceHTTP API

    oAuth2
    oidc
    jwk
    wellknown
    metadata
        getCheck HTTP Server Status
        getCheck HTTP Server and Database Status
        getReturn Running Software Version.

redocly logoAPI docs by Redocly
Ory Hydra API

Download OpenAPI specification:Download
E-mail: hi@ory.sh License: Apache 2.0

Documentation for all of Ory Hydra's APIs.
oAuth2

OAuth 2.0
List OAuth 2.0 Clients

This endpoint lists all clients in the database, and never returns client secrets. As a default it lists the first 100 clients.
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
client_name	
string

The name of the clients to filter by.
owner	
string

The owner of the clients to filter by.
Responses
Response samples

    200default

Content type
application/json
[

    {
        "access_token_strategy": "string",
        "allowed_cors_origins": [],
        "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
        "authorization_code_grant_access_token_lifespan": "string",
        "authorization_code_grant_id_token_lifespan": "string",
        "authorization_code_grant_refresh_token_lifespan": "string",
        "backchannel_logout_session_required": true,
        "backchannel_logout_uri": "string",
        "client_credentials_grant_access_token_lifespan": "string",
        "client_id": "string",
        "client_name": "string",
        "client_secret": "string",
        "client_secret_expires_at": 0,
        "client_uri": "string",
        "contacts": "help@example.org",
        "created_at": "2019-08-24T14:15:22Z",
        "device_authorization_grant_access_token_lifespan": "string",
        "device_authorization_grant_id_token_lifespan": "string",
        "device_authorization_grant_refresh_token_lifespan": "string",
        "frontchannel_logout_session_required": true,
        "frontchannel_logout_uri": "string",
        "grant_types": [],
        "implicit_grant_access_token_lifespan": "string",
        "implicit_grant_id_token_lifespan": "string",
        "jwks": {},
        "jwks_uri": "string",
        "jwt_bearer_grant_access_token_lifespan": "string",
        "logo_uri": "string",
        "metadata": null,
        "owner": "string",
        "policy_uri": "string",
        "post_logout_redirect_uris": [],
        "redirect_uris": "http://mydomain/oauth/callback",
        "refresh_token_grant_access_token_lifespan": "string",
        "refresh_token_grant_id_token_lifespan": "string",
        "refresh_token_grant_refresh_token_lifespan": "string",
        "registration_access_token": "string",
        "registration_client_uri": "string",
        "request_object_signing_alg": "string",
        "request_uris": [],
        "response_types": [],
        "scope": "scope1 scope-2 scope.3 scope:4",
        "sector_identifier_uri": "string",
        "skip_consent": true,
        "skip_logout_consent": true,
        "subject_type": "string",
        "token_endpoint_auth_method": "client_secret_basic",
        "token_endpoint_auth_signing_alg": "string",
        "tos_uri": "string",
        "updated_at": "2019-08-24T14:15:22Z",
        "userinfo_signed_response_alg": "string"
    }

]
Create OAuth 2.0 Client

Create a new OAuth 2.0 client. If you pass client_secret the secret is used, otherwise a random secret is generated. The secret is echoed in the response. It is not possible to retrieve it later on.
Request Body schema: application/json
required

OAuth 2.0 Client Request Body
access_token_strategy	
string

OAuth 2.0 Access Token Strategy

AccessTokenStrategy is the strategy used to generate access tokens. Valid options are jwt and opaque. jwt is a bad idea, see https://www.ory.com/docs/oauth2-oidc/jwt-access-token Setting the strategy here overrides the global setting in strategies.access_token.
allowed_cors_origins	
Array of strings

OAuth 2.0 Client Allowed CORS Origins

One or more URLs (scheme://host[:port]) which are allowed to make CORS requests to the /oauth/token endpoint. If this array is empty, the server's CORS origin configuration (CORS_ALLOWED_ORIGINS) will be used instead. If this array is set, the allowed origins are appended to the server's CORS origin configuration. Be aware that environment variable CORS_ENABLED MUST be set to true for this to work.
audience	
Array of strings

OAuth 2.0 Client Audience

An allow-list defining the audiences this client is allowed to request tokens for. An audience limits the applicability of an OAuth 2.0 Access Token to, for example, certain API endpoints. The value is a list of URLs. URLs MUST NOT contain whitespaces.
authorization_code_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
backchannel_logout_session_required	
boolean

OpenID Connect Back-Channel Logout Session Required

Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false.
backchannel_logout_uri	
string

OpenID Connect Back-Channel Logout URI

RP URL that will cause the RP to log itself out when sent a Logout Token by the OP.
client_credentials_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
client_id	
string

OAuth 2.0 Client ID

The ID is immutable. If no ID is provided, a UUID4 will be generated.
client_name	
string

OAuth 2.0 Client Name

The human-readable name of the client to be presented to the end-user during authorization.
client_secret	
string

OAuth 2.0 Client Secret

The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost.
client_secret_expires_at	
integer <int64>

OAuth 2.0 Client Secret Expires At

The field is currently not supported and its value is always 0.
client_uri	
string

OAuth 2.0 Client URI

ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion.
contacts	
Array of strings

OAuth 2.0 Client Contact

An array of strings representing ways to contact people responsible for this client, typically email addresses.
created_at	
string <date-time>

OAuth 2.0 Client Creation Date

CreatedAt returns the timestamp of the client's creation.
device_authorization_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
frontchannel_logout_session_required	
boolean

OpenID Connect Front-Channel Logout Session Required

Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false.
frontchannel_logout_uri	
string

OpenID Connect Front-Channel Logout URI

RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be.
grant_types	
Array of strings

OAuth 2.0 Client Grant Types

An array of OAuth 2.0 grant types the client is allowed to use. Can be one of:

Client Credentials Grant: client_credentials Authorization Code Grant: authorization_code OpenID Connect Implicit Grant (deprecated!): implicit Refresh Token Grant: refresh_token OAuth 2.0 Token Exchange: urn:ietf:params:oauth:grant-type:jwt-bearer OAuth 2.0 Device Code Grant: urn:ietf:params:oauth:grant-type:device_code
implicit_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
	
object (jsonWebKeySet)

JSON Web Key Set
jwks_uri	
string

OAuth 2.0 Client JSON Web Key Set URL

URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate.
jwt_bearer_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
logo_uri	
string

OAuth 2.0 Client Logo URI

A URL string referencing the client's logo.
metadata	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
owner	
string

OAuth 2.0 Client Owner

Owner is a string identifying the owner of the OAuth 2.0 Client.
policy_uri	
string

OAuth 2.0 Client Policy URI

PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.
post_logout_redirect_uris	
Array of strings

Allowed Post-Redirect Logout URIs

Array of URLs supplied by the RP to which it MAY request that the End-User's User Agent be redirected using the post_logout_redirect_uri parameter after a logout has been performed.
redirect_uris	
Array of strings

OAuth 2.0 Client Redirect URIs

RedirectURIs is an array of allowed redirect urls for the client.
refresh_token_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
registration_access_token	
string

OpenID Connect Dynamic Client Registration Access Token

RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration.
registration_client_uri	
string

OpenID Connect Dynamic Client Registration URL

RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client.
request_object_signing_alg	
string

OpenID Connect Request Object Signing Algorithm

JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm.
request_uris	
Array of strings

OpenID Connect Request URIs

Array of request_uri values that are pre-registered by the RP for use at the OP. Servers MAY cache the contents of the files referenced by these URIs and not retrieve them at the time they are used in a request. OPs can require that request_uri values used be pre-registered with the require_request_uri_registration discovery parameter.
response_types	
Array of strings

OAuth 2.0 Client Response Types

An array of the OAuth 2.0 response type strings that the client can use at the authorization endpoint. Can be one of:

Needed for OpenID Connect Implicit Grant: Returns ID Token to redirect URI: id_token Returns Access token redirect URI: token Needed for Authorization Code Grant: code
scope	
string

OAuth 2.0 Client Scope

Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens.
sector_identifier_uri	
string

OpenID Connect Sector Identifier URI

URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
skip_consent	
boolean

SkipConsent skips the consent screen for this client. This field can only be set from the admin API.
skip_logout_consent	
boolean

SkipLogoutConsent skips the logout consent screen for this client. This field can only be set from the admin API.
subject_type	
string

OpenID Connect Subject Type

The subject_types_supported Discovery parameter contains a list of the supported subject_type values for this server. Valid types include pairwise and public.
token_endpoint_auth_method	
string
Default: "client_secret_basic"

OAuth 2.0 Token Endpoint Authentication Method

Requested Client Authentication method for the Token Endpoint. The options are:

client_secret_basic: (default) Send client_id and client_secret as application/x-www-form-urlencoded encoded in the HTTP Authorization header. client_secret_post: Send client_id and client_secret as application/x-www-form-urlencoded in the HTTP body. private_key_jwt: Use JSON Web Tokens to authenticate the client. none: Used for public clients (native apps, mobile apps) which can not have secrets.
token_endpoint_auth_signing_alg	
string

OAuth 2.0 Token Endpoint Signing Algorithm

Requested Client Authentication signing algorithm for the Token Endpoint.
tos_uri	
string

OAuth 2.0 Client Terms of Service URI

A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
updated_at	
string <date-time>

OAuth 2.0 Client Last Update Date

UpdatedAt returns the timestamp of the last update.
userinfo_signed_response_alg	
string

OpenID Connect Request Userinfo Signed Response Algorithm

JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type.
Responses
Request samples

    Payload

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Response samples

    201400default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Delete OAuth 2.0 Client

Delete an existing OAuth 2.0 Client by its ID.

OAuth 2.0 clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.

Make sure that this endpoint is well protected and only callable by first-party components.
path Parameters
id
required
	
string

The id of the OAuth 2.0 Client.
Responses
Response samples

    default

Content type
application/json
{

    "code": 404,
    "debug": "SQL field \"foo\" is not a bool.",
    "details": null,
    "id": "string",
    "message": "The resource could not be found",
    "reason": "User with ID 1234 does not exist.",
    "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
    "status": "Not Found"

}
Get an OAuth 2.0 Client

Get an OAuth 2.0 client by its ID. This endpoint never returns the client secret.

OAuth 2.0 clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.
path Parameters
id
required
	
string

The id of the OAuth 2.0 Client.
Responses
Response samples

    200default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Patch OAuth 2.0 Client

Patch an existing OAuth 2.0 Client using JSON Patch. If you pass client_secret the secret will be updated and returned via the API. This is the only time you will be able to retrieve the client secret, so write it down and keep it safe.

OAuth 2.0 clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.
path Parameters
id
required
	
string

The id of the OAuth 2.0 Client.
Request Body schema: application/json
required

OAuth 2.0 Client JSON Patch Body
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

    200404default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Set OAuth 2.0 Client

Replaces an existing OAuth 2.0 Client with the payload you send. If you pass client_secret the secret is used, otherwise the existing secret is used.

If set, the secret is echoed in the response. It is not possible to retrieve it later on.

OAuth 2.0 Clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.
path Parameters
id
required
	
string

OAuth 2.0 Client ID
Request Body schema: application/json
required

OAuth 2.0 Client Request Body
access_token_strategy	
string

OAuth 2.0 Access Token Strategy

AccessTokenStrategy is the strategy used to generate access tokens. Valid options are jwt and opaque. jwt is a bad idea, see https://www.ory.com/docs/oauth2-oidc/jwt-access-token Setting the strategy here overrides the global setting in strategies.access_token.
allowed_cors_origins	
Array of strings

OAuth 2.0 Client Allowed CORS Origins

One or more URLs (scheme://host[:port]) which are allowed to make CORS requests to the /oauth/token endpoint. If this array is empty, the server's CORS origin configuration (CORS_ALLOWED_ORIGINS) will be used instead. If this array is set, the allowed origins are appended to the server's CORS origin configuration. Be aware that environment variable CORS_ENABLED MUST be set to true for this to work.
audience	
Array of strings

OAuth 2.0 Client Audience

An allow-list defining the audiences this client is allowed to request tokens for. An audience limits the applicability of an OAuth 2.0 Access Token to, for example, certain API endpoints. The value is a list of URLs. URLs MUST NOT contain whitespaces.
authorization_code_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
backchannel_logout_session_required	
boolean

OpenID Connect Back-Channel Logout Session Required

Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false.
backchannel_logout_uri	
string

OpenID Connect Back-Channel Logout URI

RP URL that will cause the RP to log itself out when sent a Logout Token by the OP.
client_credentials_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
client_id	
string

OAuth 2.0 Client ID

The ID is immutable. If no ID is provided, a UUID4 will be generated.
client_name	
string

OAuth 2.0 Client Name

The human-readable name of the client to be presented to the end-user during authorization.
client_secret	
string

OAuth 2.0 Client Secret

The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost.
client_secret_expires_at	
integer <int64>

OAuth 2.0 Client Secret Expires At

The field is currently not supported and its value is always 0.
client_uri	
string

OAuth 2.0 Client URI

ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion.
contacts	
Array of strings

OAuth 2.0 Client Contact

An array of strings representing ways to contact people responsible for this client, typically email addresses.
created_at	
string <date-time>

OAuth 2.0 Client Creation Date

CreatedAt returns the timestamp of the client's creation.
device_authorization_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
frontchannel_logout_session_required	
boolean

OpenID Connect Front-Channel Logout Session Required

Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false.
frontchannel_logout_uri	
string

OpenID Connect Front-Channel Logout URI

RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be.
grant_types	
Array of strings

OAuth 2.0 Client Grant Types

An array of OAuth 2.0 grant types the client is allowed to use. Can be one of:

Client Credentials Grant: client_credentials Authorization Code Grant: authorization_code OpenID Connect Implicit Grant (deprecated!): implicit Refresh Token Grant: refresh_token OAuth 2.0 Token Exchange: urn:ietf:params:oauth:grant-type:jwt-bearer OAuth 2.0 Device Code Grant: urn:ietf:params:oauth:grant-type:device_code
implicit_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
	
object (jsonWebKeySet)

JSON Web Key Set
jwks_uri	
string

OAuth 2.0 Client JSON Web Key Set URL

URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate.
jwt_bearer_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
logo_uri	
string

OAuth 2.0 Client Logo URI

A URL string referencing the client's logo.
metadata	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
owner	
string

OAuth 2.0 Client Owner

Owner is a string identifying the owner of the OAuth 2.0 Client.
policy_uri	
string

OAuth 2.0 Client Policy URI

PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.
post_logout_redirect_uris	
Array of strings

Allowed Post-Redirect Logout URIs

Array of URLs supplied by the RP to which it MAY request that the End-User's User Agent be redirected using the post_logout_redirect_uri parameter after a logout has been performed.
redirect_uris	
Array of strings

OAuth 2.0 Client Redirect URIs

RedirectURIs is an array of allowed redirect urls for the client.
refresh_token_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
registration_access_token	
string

OpenID Connect Dynamic Client Registration Access Token

RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration.
registration_client_uri	
string

OpenID Connect Dynamic Client Registration URL

RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client.
request_object_signing_alg	
string

OpenID Connect Request Object Signing Algorithm

JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm.
request_uris	
Array of strings

OpenID Connect Request URIs

Array of request_uri values that are pre-registered by the RP for use at the OP. Servers MAY cache the contents of the files referenced by these URIs and not retrieve them at the time they are used in a request. OPs can require that request_uri values used be pre-registered with the require_request_uri_registration discovery parameter.
response_types	
Array of strings

OAuth 2.0 Client Response Types

An array of the OAuth 2.0 response type strings that the client can use at the authorization endpoint. Can be one of:

Needed for OpenID Connect Implicit Grant: Returns ID Token to redirect URI: id_token Returns Access token redirect URI: token Needed for Authorization Code Grant: code
scope	
string

OAuth 2.0 Client Scope

Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens.
sector_identifier_uri	
string

OpenID Connect Sector Identifier URI

URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
skip_consent	
boolean

SkipConsent skips the consent screen for this client. This field can only be set from the admin API.
skip_logout_consent	
boolean

SkipLogoutConsent skips the logout consent screen for this client. This field can only be set from the admin API.
subject_type	
string

OpenID Connect Subject Type

The subject_types_supported Discovery parameter contains a list of the supported subject_type values for this server. Valid types include pairwise and public.
token_endpoint_auth_method	
string
Default: "client_secret_basic"

OAuth 2.0 Token Endpoint Authentication Method

Requested Client Authentication method for the Token Endpoint. The options are:

client_secret_basic: (default) Send client_id and client_secret as application/x-www-form-urlencoded encoded in the HTTP Authorization header. client_secret_post: Send client_id and client_secret as application/x-www-form-urlencoded in the HTTP body. private_key_jwt: Use JSON Web Tokens to authenticate the client. none: Used for public clients (native apps, mobile apps) which can not have secrets.
token_endpoint_auth_signing_alg	
string

OAuth 2.0 Token Endpoint Signing Algorithm

Requested Client Authentication signing algorithm for the Token Endpoint.
tos_uri	
string

OAuth 2.0 Client Terms of Service URI

A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
updated_at	
string <date-time>

OAuth 2.0 Client Last Update Date

UpdatedAt returns the timestamp of the last update.
userinfo_signed_response_alg	
string

OpenID Connect Request Userinfo Signed Response Algorithm

JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type.
Responses
Request samples

    Payload

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Response samples

    200400404default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Set OAuth2 Client Token Lifespans

Set lifespans of different token types issued for this OAuth 2.0 client. Does not modify other fields.
path Parameters
id
required
	
string

OAuth 2.0 Client ID
Request Body schema: application/json
authorization_code_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
client_credentials_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
jwt_bearer_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
Responses
Request samples

    Payload

Content type
application/json
{

    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string"

}
Response samples

    200default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Get OAuth 2.0 Consent Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell Ory now about it. If the subject authenticated, he/she must now be asked if the OAuth 2.0 Client which initiated the flow should be allowed to access the resources on the subject's behalf.

The consent challenge is appended to the consent provider's URL to which the subject's user-agent (browser) is redirected to. The consent provider uses that challenge to fetch information on the OAuth2 request and then tells Ory if the subject accepted or rejected the request.

The default consent provider is available via the Ory Managed Account Experience. To customize the consent provider, please head over to the OAuth 2.0 documentation.
query Parameters
consent_challenge
required
	
string

OAuth 2.0 Consent Request Challenge
Responses
Response samples

    200410default

Content type
application/json
{

    "acr": "string",
    "amr": [
        "string"
    ],
    "challenge": "string",
    "client": {
        "access_token_strategy": "string",
        "allowed_cors_origins": [],
        "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
        "authorization_code_grant_access_token_lifespan": "string",
        "authorization_code_grant_id_token_lifespan": "string",
        "authorization_code_grant_refresh_token_lifespan": "string",
        "backchannel_logout_session_required": true,
        "backchannel_logout_uri": "string",
        "client_credentials_grant_access_token_lifespan": "string",
        "client_id": "string",
        "client_name": "string",
        "client_secret": "string",
        "client_secret_expires_at": 0,
        "client_uri": "string",
        "contacts": "help@example.org",
        "created_at": "2019-08-24T14:15:22Z",
        "device_authorization_grant_access_token_lifespan": "string",
        "device_authorization_grant_id_token_lifespan": "string",
        "device_authorization_grant_refresh_token_lifespan": "string",
        "frontchannel_logout_session_required": true,
        "frontchannel_logout_uri": "string",
        "grant_types": [],
        "implicit_grant_access_token_lifespan": "string",
        "implicit_grant_id_token_lifespan": "string",
        "jwks": {},
        "jwks_uri": "string",
        "jwt_bearer_grant_access_token_lifespan": "string",
        "logo_uri": "string",
        "metadata": null,
        "owner": "string",
        "policy_uri": "string",
        "post_logout_redirect_uris": [],
        "redirect_uris": "http://mydomain/oauth/callback",
        "refresh_token_grant_access_token_lifespan": "string",
        "refresh_token_grant_id_token_lifespan": "string",
        "refresh_token_grant_refresh_token_lifespan": "string",
        "registration_access_token": "string",
        "registration_client_uri": "string",
        "request_object_signing_alg": "string",
        "request_uris": [],
        "response_types": [],
        "scope": "scope1 scope-2 scope.3 scope:4",
        "sector_identifier_uri": "string",
        "skip_consent": true,
        "skip_logout_consent": true,
        "subject_type": "string",
        "token_endpoint_auth_method": "client_secret_basic",
        "token_endpoint_auth_signing_alg": "string",
        "tos_uri": "string",
        "updated_at": "2019-08-24T14:15:22Z",
        "userinfo_signed_response_alg": "string"
    },
    "consent_request_id": "string",
    "context": null,
    "login_challenge": "string",
    "login_session_id": "string",
    "oidc_context": {
        "acr_values": [],
        "display": "string",
        "id_token_hint_claims": {},
        "login_hint": "string",
        "ui_locales": []
    },
    "request_url": "string",
    "requested_access_token_audience": [
        "string"
    ],
    "requested_scope": [
        "string"
    ],
    "skip": true,
    "subject": "string"

}
Accept OAuth 2.0 Consent Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell Ory now about it. If the subject authenticated, he/she must now be asked if the OAuth 2.0 Client which initiated the flow should be allowed to access the resources on the subject's behalf.

The consent challenge is appended to the consent provider's URL to which the subject's user-agent (browser) is redirected to. The consent provider uses that challenge to fetch information on the OAuth2 request and then tells Ory if the subject accepted or rejected the request.

This endpoint tells Ory that the subject has authorized the OAuth 2.0 client to access resources on his/her behalf. The consent provider includes additional information, such as session data for access and ID tokens, and if the consent request should be used as basis for future requests.

The response contains a redirect URL which the consent provider should redirect the user-agent to.

The default consent provider is available via the Ory Managed Account Experience. To customize the consent provider, please head over to the OAuth 2.0 documentation.
query Parameters
consent_challenge
required
	
string

OAuth 2.0 Consent Request Challenge
Request Body schema: application/json
context	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
grant_access_token_audience	
Array of strings

GrantedAudience sets the audience the user authorized the client to use. Should be a subset of requested_access_token_audience.
grant_scope	
Array of strings

GrantScope sets the scope the user authorized the client to use. Should be a subset of requested_scope.
remember	
boolean

Remember, if set to true, tells ORY Hydra to remember this consent authorization and reuse it if the same client asks the same user for the same, or a subset of, scope.
remember_for	
integer <int64>

RememberFor sets how long the consent authorization should be remembered for in seconds. If set to 0, the authorization will be remembered indefinitely.
	
object (Pass session data to a consent request.)
Responses
Request samples

    Payload

Content type
application/json
{

    "context": null,
    "grant_access_token_audience": [
        "string"
    ],
    "grant_scope": [
        "string"
    ],
    "remember": true,
    "remember_for": 0,
    "session": {
        "access_token": null,
        "id_token": null
    }

}
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Reject OAuth 2.0 Consent Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell Ory now about it. If the subject authenticated, he/she must now be asked if the OAuth 2.0 Client which initiated the flow should be allowed to access the resources on the subject's behalf.

The consent challenge is appended to the consent provider's URL to which the subject's user-agent (browser) is redirected to. The consent provider uses that challenge to fetch information on the OAuth2 request and then tells Ory if the subject accepted or rejected the request.

This endpoint tells Ory that the subject has not authorized the OAuth 2.0 client to access resources on his/her behalf. The consent provider must include a reason why the consent was not granted.

The response contains a redirect URL which the consent provider should redirect the user-agent to.

The default consent provider is available via the Ory Managed Account Experience. To customize the consent provider, please head over to the OAuth 2.0 documentation.
query Parameters
consent_challenge
required
	
string

OAuth 2.0 Consent Request Challenge
Request Body schema: application/json
error	
string

The error should follow the OAuth2 error format (e.g. invalid_request, login_required).

Defaults to request_denied.
error_debug	
string

Debug contains information to help resolve the problem as a developer. Usually not exposed to the public but only in the server logs.
error_description	
string

Description of the error in a human readable format.
error_hint	
string

Hint to help resolve the error.
status_code	
integer <int64>

Represents the HTTP status code of the error (e.g. 401 or 403)

Defaults to 400
Responses
Request samples

    Payload

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "string",
    "status_code": 0

}
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Accepts a device grant user_code request

Accepts a device grant user_code request
query Parameters
device_challenge
required
	
string
Request Body schema: application/json
user_code	
string
Responses
Request samples

    Payload

Content type
application/json
{

    "user_code": "string"

}
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Get OAuth 2.0 Login Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell the Ory OAuth2 Service about it.

Per default, the login provider is Ory itself. You may use a different login provider which needs to be a web-app you write and host, and it must be able to authenticate ("show the subject a login screen") a subject (in OAuth2 the proper name for subject is "resource owner").

The authentication challenge is appended to the login provider URL to which the subject's user-agent (browser) is redirected to. The login provider uses that challenge to fetch information on the OAuth2 request and then accept or reject the requested authentication process.
query Parameters
login_challenge
required
	
string

OAuth 2.0 Login Request Challenge
Responses
Response samples

    200410default

Content type
application/json
{

    "challenge": "string",
    "client": {
        "access_token_strategy": "string",
        "allowed_cors_origins": [],
        "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
        "authorization_code_grant_access_token_lifespan": "string",
        "authorization_code_grant_id_token_lifespan": "string",
        "authorization_code_grant_refresh_token_lifespan": "string",
        "backchannel_logout_session_required": true,
        "backchannel_logout_uri": "string",
        "client_credentials_grant_access_token_lifespan": "string",
        "client_id": "string",
        "client_name": "string",
        "client_secret": "string",
        "client_secret_expires_at": 0,
        "client_uri": "string",
        "contacts": "help@example.org",
        "created_at": "2019-08-24T14:15:22Z",
        "device_authorization_grant_access_token_lifespan": "string",
        "device_authorization_grant_id_token_lifespan": "string",
        "device_authorization_grant_refresh_token_lifespan": "string",
        "frontchannel_logout_session_required": true,
        "frontchannel_logout_uri": "string",
        "grant_types": [],
        "implicit_grant_access_token_lifespan": "string",
        "implicit_grant_id_token_lifespan": "string",
        "jwks": {},
        "jwks_uri": "string",
        "jwt_bearer_grant_access_token_lifespan": "string",
        "logo_uri": "string",
        "metadata": null,
        "owner": "string",
        "policy_uri": "string",
        "post_logout_redirect_uris": [],
        "redirect_uris": "http://mydomain/oauth/callback",
        "refresh_token_grant_access_token_lifespan": "string",
        "refresh_token_grant_id_token_lifespan": "string",
        "refresh_token_grant_refresh_token_lifespan": "string",
        "registration_access_token": "string",
        "registration_client_uri": "string",
        "request_object_signing_alg": "string",
        "request_uris": [],
        "response_types": [],
        "scope": "scope1 scope-2 scope.3 scope:4",
        "sector_identifier_uri": "string",
        "skip_consent": true,
        "skip_logout_consent": true,
        "subject_type": "string",
        "token_endpoint_auth_method": "client_secret_basic",
        "token_endpoint_auth_signing_alg": "string",
        "tos_uri": "string",
        "updated_at": "2019-08-24T14:15:22Z",
        "userinfo_signed_response_alg": "string"
    },
    "oidc_context": {
        "acr_values": [],
        "display": "string",
        "id_token_hint_claims": {},
        "login_hint": "string",
        "ui_locales": []
    },
    "request_url": "string",
    "requested_access_token_audience": [
        "string"
    ],
    "requested_scope": [
        "string"
    ],
    "session_id": "string",
    "skip": true,
    "subject": "string"

}
Accept OAuth 2.0 Login Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell the Ory OAuth2 Service about it.

The authentication challenge is appended to the login provider URL to which the subject's user-agent (browser) is redirected to. The login provider uses that challenge to fetch information on the OAuth2 request and then accept or reject the requested authentication process.

This endpoint tells Ory that the subject has successfully authenticated and includes additional information such as the subject's ID and if Ory should remember the subject's subject agent for future authentication attempts by setting a cookie.

The response contains a redirect URL which the login provider should redirect the user-agent to.
query Parameters
login_challenge
required
	
string

OAuth 2.0 Login Request Challenge
Request Body schema: application/json
acr	
string

ACR sets the Authentication AuthorizationContext Class Reference value for this authentication session. You can use it to express that, for example, a user authenticated using two-factor authentication.
amr	
Array of strings

AMR sets the Authentication Methods References value for this authentication session. You can use it to specify the method a user used to authenticate. For example, if the acr indicates a user used two-factor authentication, the amr can express they used a software-secured key.
context	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
extend_session_lifespan	
boolean

Extend OAuth2 authentication session lifespan

If set to true, the OAuth2 authentication cookie lifespan is extended. This is for example useful if you want the user to be able to use prompt=none continuously.

This value can only be set to true if the user has an authentication, which is the case if the skip value is true.
force_subject_identifier	
string

ForceSubjectIdentifier forces the "pairwise" user ID of the end-user that authenticated. The "pairwise" user ID refers to the (Pairwise Identifier Algorithm)[http://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg] of the OpenID Connect specification. It allows you to set an obfuscated subject ("user") identifier that is unique to the client.

Please note that this changes the user ID on endpoint /userinfo and sub claim of the ID Token. It does not change the sub claim in the OAuth 2.0 Introspection.

Per default, ORY Hydra handles this value with its own algorithm. In case you want to set this yourself you can use this field. Please note that setting this field has no effect if pairwise is not configured in ORY Hydra or the OAuth 2.0 Client does not expect a pairwise identifier (set via subject_type key in the client's configuration).

Please also be aware that ORY Hydra is unable to properly compute this value during authentication. This implies that you have to compute this value on every authentication process (probably depending on the client ID or some other unique value).

If you fail to compute the proper value, then authentication processes which have id_token_hint set might fail.
identity_provider_session_id	
string

IdentityProviderSessionID is the session ID of the end-user that authenticated. If specified, we will use this value to propagate the logout.
remember	
boolean

Remember, if set to true, tells Ory Hydra to remember this user by telling the user agent (browser) to store a cookie with authentication data. If the same user performs another OAuth 2.0 Authorization Request, they will not be asked to log in again.
remember_for	
integer <int64>

RememberFor sets how long the authentication should be remembered for in seconds. If set to 0, the authorization will be remembered for the duration of the browser session (using a session cookie).
subject
required
	
string

Subject is the user ID of the end-user that authenticated.
Responses
Request samples

    Payload

Content type
application/json
{

    "acr": "string",
    "amr": [
        "string"
    ],
    "context": null,
    "extend_session_lifespan": true,
    "force_subject_identifier": "string",
    "identity_provider_session_id": "string",
    "remember": true,
    "remember_for": 0,
    "subject": "string"

}
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Reject OAuth 2.0 Login Request

When an authorization code, hybrid, or implicit OAuth 2.0 Flow is initiated, Ory asks the login provider to authenticate the subject and then tell the Ory OAuth2 Service about it.

The authentication challenge is appended to the login provider URL to which the subject's user-agent (browser) is redirected to. The login provider uses that challenge to fetch information on the OAuth2 request and then accept or reject the requested authentication process.

This endpoint tells Ory that the subject has not authenticated and includes a reason why the authentication was denied.

The response contains a redirect URL which the login provider should redirect the user-agent to.
query Parameters
login_challenge
required
	
string

OAuth 2.0 Login Request Challenge
Request Body schema: application/json
error	
string

The error should follow the OAuth2 error format (e.g. invalid_request, login_required).

Defaults to request_denied.
error_debug	
string

Debug contains information to help resolve the problem as a developer. Usually not exposed to the public but only in the server logs.
error_description	
string

Description of the error in a human readable format.
error_hint	
string

Hint to help resolve the error.
status_code	
integer <int64>

Represents the HTTP status code of the error (e.g. 401 or 403)

Defaults to 400
Responses
Request samples

    Payload

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "string",
    "status_code": 0

}
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Get OAuth 2.0 Session Logout Request

Use this endpoint to fetch an Ory OAuth 2.0 logout request.
query Parameters
logout_challenge
required
	
string
Responses
Response samples

    200410default

Content type
application/json
{

    "challenge": "string",
    "client": {
        "access_token_strategy": "string",
        "allowed_cors_origins": [],
        "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
        "authorization_code_grant_access_token_lifespan": "string",
        "authorization_code_grant_id_token_lifespan": "string",
        "authorization_code_grant_refresh_token_lifespan": "string",
        "backchannel_logout_session_required": true,
        "backchannel_logout_uri": "string",
        "client_credentials_grant_access_token_lifespan": "string",
        "client_id": "string",
        "client_name": "string",
        "client_secret": "string",
        "client_secret_expires_at": 0,
        "client_uri": "string",
        "contacts": "help@example.org",
        "created_at": "2019-08-24T14:15:22Z",
        "device_authorization_grant_access_token_lifespan": "string",
        "device_authorization_grant_id_token_lifespan": "string",
        "device_authorization_grant_refresh_token_lifespan": "string",
        "frontchannel_logout_session_required": true,
        "frontchannel_logout_uri": "string",
        "grant_types": [],
        "implicit_grant_access_token_lifespan": "string",
        "implicit_grant_id_token_lifespan": "string",
        "jwks": {},
        "jwks_uri": "string",
        "jwt_bearer_grant_access_token_lifespan": "string",
        "logo_uri": "string",
        "metadata": null,
        "owner": "string",
        "policy_uri": "string",
        "post_logout_redirect_uris": [],
        "redirect_uris": "http://mydomain/oauth/callback",
        "refresh_token_grant_access_token_lifespan": "string",
        "refresh_token_grant_id_token_lifespan": "string",
        "refresh_token_grant_refresh_token_lifespan": "string",
        "registration_access_token": "string",
        "registration_client_uri": "string",
        "request_object_signing_alg": "string",
        "request_uris": [],
        "response_types": [],
        "scope": "scope1 scope-2 scope.3 scope:4",
        "sector_identifier_uri": "string",
        "skip_consent": true,
        "skip_logout_consent": true,
        "subject_type": "string",
        "token_endpoint_auth_method": "client_secret_basic",
        "token_endpoint_auth_signing_alg": "string",
        "tos_uri": "string",
        "updated_at": "2019-08-24T14:15:22Z",
        "userinfo_signed_response_alg": "string"
    },
    "expires_at": "2019-08-24T14:15:22Z",
    "request_url": "string",
    "requested_at": "2019-08-24T14:15:22Z",
    "rp_initiated": true,
    "sid": "string",
    "subject": "string"

}
Accept OAuth 2.0 Session Logout Request

When a user or an application requests Ory OAuth 2.0 to remove the session state of a subject, this endpoint is used to confirm that logout request.

The response contains a redirect URL which the consent provider should redirect the user-agent to.
query Parameters
logout_challenge
required
	
string

OAuth 2.0 Logout Request Challenge
Responses
Response samples

    200default

Content type
application/json
{

    "redirect_to": "string"

}
Reject OAuth 2.0 Session Logout Request

When a user or an application requests Ory OAuth 2.0 to remove the session state of a subject, this endpoint is used to deny that logout request. No HTTP request body is required.

The response is empty as the logout provider has to chose what action to perform next.
query Parameters
logout_challenge
required
	
string
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
Revoke OAuth 2.0 Consent Sessions of a Subject

This endpoint revokes a subject's granted consent sessions and invalidates all associated OAuth 2.0 Access Tokens. You may also only revoke sessions for a specific OAuth 2.0 Client ID.
query Parameters
subject	
string

OAuth 2.0 Consent Subject

The subject whose consent sessions should be deleted.
client	
string

OAuth 2.0 Client ID

If set, deletes only those consent sessions that have been granted to the specified OAuth 2.0 Client ID.
consent_request_id	
string

Consent Request ID

If set, revoke all token chains derived from this particular consent request ID.
all	
boolean

Revoke All Consent Sessions

If set to true deletes all consent sessions by the Subject that have been granted.
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
List OAuth 2.0 Consent Sessions of a Subject

This endpoint lists all subject's granted consent sessions, including client and granted scope. If the subject is unknown or has not granted any consent sessions yet, the endpoint returns an empty JSON array with status code 200 OK.
query Parameters
page_size	
integer <int64> [ 1 .. 500 ]
Default: 250

Items per Page

This is the number of items per page to return. For details on pagination please head over to the pagination documentation.
page_token	
string

Next Page Token

The next page token. For details on pagination please head over to the pagination documentation.
subject
required
	
string

The subject to list the consent sessions for.
login_session_id	
string

The login session id to list the consent sessions for.
Responses
Response samples

    200default

Content type
application/json
[

    {
        "consent_request": {},
        "consent_request_id": "string",
        "context": null,
        "grant_access_token_audience": [],
        "grant_scope": [],
        "handled_at": "2019-08-24T14:15:22Z",
        "remember": true,
        "remember_for": 0,
        "session": {}
    }

]
Revokes OAuth 2.0 Login Sessions by either a Subject or a SessionID

This endpoint invalidates authentication sessions. After revoking the authentication session(s), the subject has to re-authenticate at the Ory OAuth2 Provider. This endpoint does not invalidate any tokens.

If you send the subject in a query param, all authentication sessions that belong to that subject are revoked. No OpenID Connect Front- or Back-channel logout is performed in this case.

Alternatively, you can send a SessionID via sid query param, in which case, only the session that is connected to that SessionID is revoked. OpenID Connect Back-channel logout is performed in this case.

When using Ory for the identity provider, the login provider will also invalidate the session cookie.
query Parameters
subject	
string

OAuth 2.0 Subject

The subject to revoke authentication sessions for.
sid	
string

Login Session ID

The login session to revoke.
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
Introspect OAuth2 Access and Refresh Tokens

The introspection endpoint allows to check if a token (both refresh and access) is active or not. An active token is neither expired nor revoked. If a token is active, additional information on the token will be included. You can set additional data for a token by setting session.access_token during the consent flow.
Request Body schema: application/x-www-form-urlencoded
scope	
string

An optional, space separated list of required scopes. If the access token was not granted one of the scopes, the result of active will be false.
token
required
	
string

The string value of the token. For access tokens, this is the "access_token" value returned from the token endpoint defined in OAuth 2.0. For refresh tokens, this is the "refresh_token" value returned.
Responses
Response samples

    200default

Content type
application/json
{

    "active": true,
    "aud": [
        "string"
    ],
    "client_id": "string",
    "exp": 0,
    "ext": {
        "property1": null,
        "property2": null
    },
    "iat": 0,
    "iss": "string",
    "nbf": 0,
    "obfuscated_subject": "string",
    "scope": "string",
    "sub": "string",
    "token_type": "string",
    "token_use": "string",
    "username": "string"

}
Delete OAuth 2.0 Access Tokens from specific OAuth 2.0 Client

This endpoint deletes OAuth2 access tokens issued to an OAuth 2.0 Client from the database.
query Parameters
client_id
required
	
string

OAuth 2.0 Client ID
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
List Trusted OAuth2 JWT Bearer Grant Type Issuers

Use this endpoint to list all trusted JWT Bearer Grant Type Issuers.
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
issuer	
string

If optional "issuer" is supplied, only jwt-bearer grants with this issuer will be returned.
Responses
Response samples

    200default

Content type
application/json
[

    {
        "allow_any_subject": true,
        "created_at": "2019-08-24T14:15:22Z",
        "expires_at": "2019-08-24T14:15:22Z",
        "id": "9edc811f-4e28-453c-9b46-4de65f00217f",
        "issuer": "https://jwt-idp.example.com",
        "public_key": {},
        "scope": [],
        "subject": "mike@example.com"
    }

]
Trust OAuth2 JWT Bearer Grant Type Issuer

Use this endpoint to establish a trust relationship for a JWT issuer to perform JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants RFC7523.
Request Body schema: application/json
allow_any_subject	
boolean

The "allow_any_subject" indicates that the issuer is allowed to have any principal as the subject of the JWT.
expires_at
required
	
string <date-time>

The "expires_at" indicates, when grant will expire, so we will reject assertion from "issuer" targeting "subject".
issuer
required
	
string

The "issuer" identifies the principal that issued the JWT assertion (same as "iss" claim in JWT).
required
	
object (jsonWebKey)
scope
required
	
Array of strings

The "scope" contains list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749])
subject	
string

The "subject" identifies the principal that is the subject of the JWT.
Responses
Request samples

    Payload

Content type
application/json
{

    "allow_any_subject": true,
    "expires_at": "2019-08-24T14:15:22Z",
    "issuer": "https://jwt-idp.example.com",
    "jwk": {
        "alg": "RS256",
        "crv": "P-256",
        "d": "T_N8I-6He3M8a7X1vWt6TGIx4xB_GP3Mb4SsZSA4v-orvJzzRiQhLlRR81naWYxfQAYt5isDI6_C2L9bdWo4FFPjGQFvNoRX-_sBJyBI_rl-TBgsZYoUlAj3J92WmY2inbA-PwyJfsaIIDceYBC-eX-xiCu6qMqkZi3MwQAFL6bMdPEM0z4JBcwFT3VdiWAIRUuACWQwrXMq672x7fMuaIaHi7XDGgt1ith23CLfaREmJku9PQcchbt_uEY-hqrFY6ntTtS4paWWQj86xLL94S-Tf6v6xkL918PfLSOTq6XCzxvlFwzBJqApnAhbwqLjpPhgUG04EDRrqrSBc5Y1BLevn6Ip5h1AhessBp3wLkQgz_roeckt-ybvzKTjESMuagnpqLvOT7Y9veIug2MwPJZI2VjczRc1vzMs25XrFQ8DpUy-bNdp89TmvAXwctUMiJdgHloJw23Cv03gIUAkDnsTqZmkpbIf-crpgNKFmQP_EDKoe8p_PXZZgfbRri3NoEVGP7Mk6yEu8LjJhClhZaBNjuWw2-KlBfOA3g79mhfBnkInee5KO9mGR50qPk1V-MorUYNTFMZIm0kFE6eYVWFBwJHLKYhHU34DoiK1VP-svZpC2uAMFNA_UJEwM9CQ2b8qe4-5e9aywMvwcuArRkAB5mBIfOaOJao3mfukKAE",
        "dp": "G4sPXkc6Ya9y8oJW9_ILj4xuppu0lzi_H7VTkS8xj5SdX3coE0oimYwxIi2emTAue0UOa5dpgFGyBJ4c8tQ2VF402XRugKDTP8akYhFo5tAA77Qe_NmtuYZc3C3m3I24G2GvR5sSDxUyAN2zq8Lfn9EUms6rY3Ob8YeiKkTiBj0",
        "dq": "s9lAH9fggBsoFR8Oac2R_E2gw282rT2kGOAhvIllETE1efrA6huUUvMfBcMpn8lqeW6vzznYY5SSQF7pMdC_agI3nG8Ibp1BUb0JUiraRNqUfLhcQb_d9GF4Dh7e74WbRsobRonujTYN1xCaP6TO61jvWrX-L18txXw494Q_cgk",
        "e": "AQAB",
        "k": "GawgguFyGrWKav7AX4VKUg",
        "kid": "1603dfe0af8f4596",
        "kty": "RSA",
        "n": "vTqrxUyQPl_20aqf5kXHwDZrel-KovIp8s7ewJod2EXHl8tWlRB3_Rem34KwBfqlKQGp1nqah-51H4Jzruqe0cFP58hPEIt6WqrvnmJCXxnNuIB53iX_uUUXXHDHBeaPCSRoNJzNysjoJ30TIUsKBiirhBa7f235PXbKiHducLevV6PcKxJ5cY8zO286qJLBWSPm-OIevwqsIsSIH44Qtm9sioFikhkbLwoqwWORGAY0nl6XvVOlhADdLjBSqSAeT1FPuCDCnXwzCDR8N9IFB_IjdStFkC-rVt2K5BYfPd0c3yFp_vHR15eRd0zJ8XQ7woBC8Vnsac6Et1pKS59pX6256DPWu8UDdEOolKAPgcd_g2NpA76cAaF_jcT80j9KrEzw8Tv0nJBGesuCjPNjGs_KzdkWTUXt23Hn9QJsdc1MZuaW0iqXBepHYfYoqNelzVte117t4BwVp0kUM6we0IqyXClaZgOI8S-WDBw2_Ovdm8e5NmhYAblEVoygcX8Y46oH6bKiaCQfKCFDMcRgChme7AoE1yZZYsPbaG_3IjPrC4LBMHQw8rM9dWjJ8ImjicvZ1pAm0dx-KHCP3y5PVKrxBDf1zSOsBRkOSjB8TPODnJMz6-jd5hTtZxpZPwPoIdCanTZ3ZD6uRBpTmDwtpRGm63UQs1m5FWPwb0T2IF0",
        "p": "6NbkXwDWUhi-eR55Cgbf27FkQDDWIamOaDr0rj1q0f1fFEz1W5A_09YvG09Fiv1AO2-D8Rl8gS1Vkz2i0zCSqnyy8A025XOcRviOMK7nIxE4OH_PEsko8dtIrb3TmE2hUXvCkmzw9EsTF1LQBOGC6iusLTXepIC1x9ukCKFZQvdgtEObQ5kzd9Nhq-cdqmSeMVLoxPLd1blviVT9Vm8-y12CtYpeJHOaIDtVPLlBhJiBoPKWg3vxSm4XxIliNOefqegIlsmTIa3MpS6WWlCK3yHhat0Q-rRxDxdyiVdG_wzJvp0Iw_2wms7pe-PgNPYvUWH9JphWP5K38YqEBiJFXQ",
        "q": "0A1FmpOWR91_RAWpqreWSavNaZb9nXeKiBo0DQGBz32DbqKqQ8S4aBJmbRhJcctjCLjain-ivut477tAUMmzJwVJDDq2MZFwC9Q-4VYZmFU4HJityQuSzHYe64RjN-E_NQ02TWhG3QGW6roq6c57c99rrUsETwJJiwS8M5p15Miuz53DaOjv-uqqFAFfywN5WkxHbraBcjHtMiQuyQbQqkCFh-oanHkwYNeytsNhTu2mQmwR5DR2roZ2nPiFjC6nsdk-A7E3S3wMzYYFw7jvbWWoYWo9vB40_MY2Y0FYQSqcDzcBIcq_0tnnasf3VW4Fdx6m80RzOb2Fsnln7vKXAQ",
        "qi": "GyM_p6JrXySiz1toFgKbWV-JdI3jQ4ypu9rbMWx3rQJBfmt0FoYzgUIZEVFEcOqwemRN81zoDAaa-Bk0KWNGDjJHZDdDmFhW3AN7lI-puxk_mHZGJ11rxyR8O55XLSe3SPmRfKwZI6yU24ZxvQKFYItdldUKGzO6Ia6zTKhAVRU",
        "use": "sig",
        "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
        "x5c": [],
        "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"
    },
    "scope": [
        "openid",
        "offline"
    ],
    "subject": "mike@example.com"

}
Response samples

    201default

Content type
application/json
{

    "allow_any_subject": true,
    "created_at": "2019-08-24T14:15:22Z",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "9edc811f-4e28-453c-9b46-4de65f00217f",
    "issuer": "https://jwt-idp.example.com",
    "public_key": {
        "kid": "123e4567-e89b-12d3-a456-426655440000",
        "set": "https://jwt-idp.example.com"
    },
    "scope": [
        "openid",
        "offline"
    ],
    "subject": "mike@example.com"

}
Delete Trusted OAuth2 JWT Bearer Grant Type Issuer

Use this endpoint to delete trusted JWT Bearer Grant Type Issuer. The ID is the one returned when you created the trust relationship.

Once deleted, the associated issuer will no longer be able to perform the JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grant.
path Parameters
id
required
	
string

The id of the desired grant
Responses
Response samples

    default

Content type
application/json
{

    "code": 404,
    "debug": "SQL field \"foo\" is not a bool.",
    "details": null,
    "id": "string",
    "message": "The resource could not be found",
    "reason": "User with ID 1234 does not exist.",
    "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
    "status": "Not Found"

}
Get Trusted OAuth2 JWT Bearer Grant Type Issuer

Use this endpoint to get a trusted JWT Bearer Grant Type Issuer. The ID is the one returned when you created the trust relationship.
path Parameters
id
required
	
string

The id of the desired grant
Responses
Response samples

    200default

Content type
application/json
{

    "allow_any_subject": true,
    "created_at": "2019-08-24T14:15:22Z",
    "expires_at": "2019-08-24T14:15:22Z",
    "id": "9edc811f-4e28-453c-9b46-4de65f00217f",
    "issuer": "https://jwt-idp.example.com",
    "public_key": {
        "kid": "123e4567-e89b-12d3-a456-426655440000",
        "set": "https://jwt-idp.example.com"
    },
    "scope": [
        "openid",
        "offline"
    ],
    "subject": "mike@example.com"

}
OAuth 2.0 Authorize Endpoint

Use open source libraries to perform OAuth 2.0 and OpenID Connect available for any programming language. You can find a list of libraries at https://oauth.net/code/

This endpoint should not be used via the Ory SDK and is only included for technical reasons. Instead, use one of the libraries linked above.
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
The OAuth 2.0 Device Authorize Endpoint

This endpoint is not documented here because you should never use your own implementation to perform OAuth2 flows. OAuth2 is a very popular protocol and a library for your programming language will exist.

To learn more about this flow please refer to the specification: https://tools.ietf.org/html/rfc8628
Responses
Response samples

    200default

Content type
application/json
{

    "device_code": "ory_dc_smldfksmdfkl.mslkmlkmlk",
    "expires_in": 16830,
    "interval": 5,
    "user_code": "AAAAAA",
    "verification_uri": "https://auth.ory.sh/tv",
    "verification_uri_complete": "https://auth.ory.sh/tv?user_code=AAAAAA"

}
OAuth 2.0 Device Verification Endpoint

This is the device user verification endpoint. The user is redirected here when trying to log in using the device flow.
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
Revoke OAuth 2.0 Access or Refresh Token

Revoking a token (both access and refresh) means that the tokens will be invalid. A revoked access token can no longer be used to make access requests, and a revoked refresh token can no longer be used to refresh an access token. Revoking a refresh token also invalidates the access token that was created with it. A token may only be revoked by the client the token was generated for.
Authorizations:
basicoauth2
Request Body schema: application/x-www-form-urlencoded
client_id	
string
client_secret	
string
token
required
	
string
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
The OAuth 2.0 Token Endpoint

Use open source libraries to perform OAuth 2.0 and OpenID Connect available for any programming language. You can find a list of libraries here https://oauth.net/code/

This endpoint should not be used via the Ory SDK and is only included for technical reasons. Instead, use one of the libraries linked above.
Authorizations:
basicoauth2
Request Body schema: application/x-www-form-urlencoded
client_id	
string
code	
string
grant_type
required
	
string
redirect_uri	
string
refresh_token	
string
Responses
Response samples

    200default

Content type
application/json
{

    "access_token": "string",
    "expires_in": 0,
    "id_token": "string",
    "refresh_token": "string",
    "scope": "string",
    "token_type": "string"

}
oidc

OpenID Connect
OpenID Connect Discovery

A mechanism for an OpenID Connect Relying Party to discover the End-User's OpenID Provider and obtain information needed to interact with it, including its OAuth 2.0 endpoint locations.

Popular libraries for OpenID Connect clients include oidc-client-js (JavaScript), go-oidc (Golang), and others. For a full list of clients go here: https://openid.net/developers/certified/
Responses
Response samples

    200default

Content type
application/json
{

    "authorization_endpoint": "https://playground.ory.sh/ory-hydra/public/oauth2/auth",
    "backchannel_logout_session_supported": true,
    "backchannel_logout_supported": true,
    "claims_parameter_supported": true,
    "claims_supported": [
        "string"
    ],
    "code_challenge_methods_supported": [
        "string"
    ],
    "credentials_endpoint_draft_00": "string",
    "credentials_supported_draft_00": [
        {}
    ],
    "device_authorization_endpoint": "https://playground.ory.sh/ory-hydra/public/oauth2/device/oauth",
    "end_session_endpoint": "string",
    "frontchannel_logout_session_supported": true,
    "frontchannel_logout_supported": true,
    "grant_types_supported": [
        "string"
    ],
    "id_token_signed_response_alg": [
        "string"
    ],
    "id_token_signing_alg_values_supported": [
        "string"
    ],
    "issuer": "https://playground.ory.sh/ory-hydra/public/",
    "jwks_uri": "https://{slug}.projects.oryapis.com/.well-known/jwks.json",
    "registration_endpoint": "https://playground.ory.sh/ory-hydra/admin/client",
    "request_object_signing_alg_values_supported": [
        "string"
    ],
    "request_parameter_supported": true,
    "request_uri_parameter_supported": true,
    "require_request_uri_registration": true,
    "response_modes_supported": [
        "string"
    ],
    "response_types_supported": [
        "string"
    ],
    "revocation_endpoint": "string",
    "scopes_supported": [
        "string"
    ],
    "subject_types_supported": [
        "string"
    ],
    "token_endpoint": "https://playground.ory.sh/ory-hydra/public/oauth2/token",
    "token_endpoint_auth_methods_supported": [
        "string"
    ],
    "userinfo_endpoint": "string",
    "userinfo_signed_response_alg": [
        "string"
    ],
    "userinfo_signing_alg_values_supported": [
        "string"
    ]

}
Issues a Verifiable Credential

This endpoint creates a verifiable credential that attests that the user authenticated with the provided access token owns a certain public/private key pair.

More information can be found at https://openid.net/specs/openid-connect-userinfo-vc-1_0.html.
Request Body schema: application/json
format	
string
	
object (VerifiableCredentialProof contains the proof of a verifiable credential.)
types	
Array of strings
Responses
Request samples

    Payload

Content type
application/json
{

    "format": "string",
    "proof": {
        "jwt": "string",
        "proof_type": "string"
    },
    "types": [
        "string"
    ]

}
Response samples

    200400default

Content type
application/json
{

    "credential_draft_00": "string",
    "format": "string"

}
Register OAuth2 Client using OpenID Dynamic Client Registration

This endpoint behaves like the administrative counterpart (createOAuth2Client) but is capable of facing the public internet directly and can be used in self-service. It implements the OpenID Connect Dynamic Client Registration Protocol. This feature needs to be enabled in the configuration. This endpoint is disabled by default. It can be enabled by an administrator.

Please note that using this endpoint you are not able to choose the client_secret nor the client_id as those values will be server generated when specifying token_endpoint_auth_method as client_secret_basic or client_secret_post.

The client_secret will be returned in the response and you will not be able to retrieve it later on. Write the secret down and keep it somewhere safe.
Request Body schema: application/json
required

Dynamic Client Registration Request Body
access_token_strategy	
string

OAuth 2.0 Access Token Strategy

AccessTokenStrategy is the strategy used to generate access tokens. Valid options are jwt and opaque. jwt is a bad idea, see https://www.ory.com/docs/oauth2-oidc/jwt-access-token Setting the strategy here overrides the global setting in strategies.access_token.
allowed_cors_origins	
Array of strings

OAuth 2.0 Client Allowed CORS Origins

One or more URLs (scheme://host[:port]) which are allowed to make CORS requests to the /oauth/token endpoint. If this array is empty, the server's CORS origin configuration (CORS_ALLOWED_ORIGINS) will be used instead. If this array is set, the allowed origins are appended to the server's CORS origin configuration. Be aware that environment variable CORS_ENABLED MUST be set to true for this to work.
audience	
Array of strings

OAuth 2.0 Client Audience

An allow-list defining the audiences this client is allowed to request tokens for. An audience limits the applicability of an OAuth 2.0 Access Token to, for example, certain API endpoints. The value is a list of URLs. URLs MUST NOT contain whitespaces.
authorization_code_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
backchannel_logout_session_required	
boolean

OpenID Connect Back-Channel Logout Session Required

Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false.
backchannel_logout_uri	
string

OpenID Connect Back-Channel Logout URI

RP URL that will cause the RP to log itself out when sent a Logout Token by the OP.
client_credentials_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
client_id	
string

OAuth 2.0 Client ID

The ID is immutable. If no ID is provided, a UUID4 will be generated.
client_name	
string

OAuth 2.0 Client Name

The human-readable name of the client to be presented to the end-user during authorization.
client_secret	
string

OAuth 2.0 Client Secret

The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost.
client_secret_expires_at	
integer <int64>

OAuth 2.0 Client Secret Expires At

The field is currently not supported and its value is always 0.
client_uri	
string

OAuth 2.0 Client URI

ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion.
contacts	
Array of strings

OAuth 2.0 Client Contact

An array of strings representing ways to contact people responsible for this client, typically email addresses.
created_at	
string <date-time>

OAuth 2.0 Client Creation Date

CreatedAt returns the timestamp of the client's creation.
device_authorization_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
frontchannel_logout_session_required	
boolean

OpenID Connect Front-Channel Logout Session Required

Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false.
frontchannel_logout_uri	
string

OpenID Connect Front-Channel Logout URI

RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be.
grant_types	
Array of strings

OAuth 2.0 Client Grant Types

An array of OAuth 2.0 grant types the client is allowed to use. Can be one of:

Client Credentials Grant: client_credentials Authorization Code Grant: authorization_code OpenID Connect Implicit Grant (deprecated!): implicit Refresh Token Grant: refresh_token OAuth 2.0 Token Exchange: urn:ietf:params:oauth:grant-type:jwt-bearer OAuth 2.0 Device Code Grant: urn:ietf:params:oauth:grant-type:device_code
implicit_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
	
object (jsonWebKeySet)

JSON Web Key Set
jwks_uri	
string

OAuth 2.0 Client JSON Web Key Set URL

URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate.
jwt_bearer_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
logo_uri	
string

OAuth 2.0 Client Logo URI

A URL string referencing the client's logo.
metadata	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
owner	
string

OAuth 2.0 Client Owner

Owner is a string identifying the owner of the OAuth 2.0 Client.
policy_uri	
string

OAuth 2.0 Client Policy URI

PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.
post_logout_redirect_uris	
Array of strings

Allowed Post-Redirect Logout URIs

Array of URLs supplied by the RP to which it MAY request that the End-User's User Agent be redirected using the post_logout_redirect_uri parameter after a logout has been performed.
redirect_uris	
Array of strings

OAuth 2.0 Client Redirect URIs

RedirectURIs is an array of allowed redirect urls for the client.
refresh_token_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
registration_access_token	
string

OpenID Connect Dynamic Client Registration Access Token

RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration.
registration_client_uri	
string

OpenID Connect Dynamic Client Registration URL

RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client.
request_object_signing_alg	
string

OpenID Connect Request Object Signing Algorithm

JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm.
request_uris	
Array of strings

OpenID Connect Request URIs

Array of request_uri values that are pre-registered by the RP for use at the OP. Servers MAY cache the contents of the files referenced by these URIs and not retrieve them at the time they are used in a request. OPs can require that request_uri values used be pre-registered with the require_request_uri_registration discovery parameter.
response_types	
Array of strings

OAuth 2.0 Client Response Types

An array of the OAuth 2.0 response type strings that the client can use at the authorization endpoint. Can be one of:

Needed for OpenID Connect Implicit Grant: Returns ID Token to redirect URI: id_token Returns Access token redirect URI: token Needed for Authorization Code Grant: code
scope	
string

OAuth 2.0 Client Scope

Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens.
sector_identifier_uri	
string

OpenID Connect Sector Identifier URI

URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
skip_consent	
boolean

SkipConsent skips the consent screen for this client. This field can only be set from the admin API.
skip_logout_consent	
boolean

SkipLogoutConsent skips the logout consent screen for this client. This field can only be set from the admin API.
subject_type	
string

OpenID Connect Subject Type

The subject_types_supported Discovery parameter contains a list of the supported subject_type values for this server. Valid types include pairwise and public.
token_endpoint_auth_method	
string
Default: "client_secret_basic"

OAuth 2.0 Token Endpoint Authentication Method

Requested Client Authentication method for the Token Endpoint. The options are:

client_secret_basic: (default) Send client_id and client_secret as application/x-www-form-urlencoded encoded in the HTTP Authorization header. client_secret_post: Send client_id and client_secret as application/x-www-form-urlencoded in the HTTP body. private_key_jwt: Use JSON Web Tokens to authenticate the client. none: Used for public clients (native apps, mobile apps) which can not have secrets.
token_endpoint_auth_signing_alg	
string

OAuth 2.0 Token Endpoint Signing Algorithm

Requested Client Authentication signing algorithm for the Token Endpoint.
tos_uri	
string

OAuth 2.0 Client Terms of Service URI

A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
updated_at	
string <date-time>

OAuth 2.0 Client Last Update Date

UpdatedAt returns the timestamp of the last update.
userinfo_signed_response_alg	
string

OpenID Connect Request Userinfo Signed Response Algorithm

JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type.
Responses
Request samples

    Payload

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Response samples

    201400default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Delete OAuth 2.0 Client using the OpenID Dynamic Client Registration Management Protocol

This endpoint behaves like the administrative counterpart (deleteOAuth2Client) but is capable of facing the public internet directly and can be used in self-service. It implements the OpenID Connect Dynamic Client Registration Protocol. This feature needs to be enabled in the configuration. This endpoint is disabled by default. It can be enabled by an administrator.

To use this endpoint, you will need to present the client's authentication credentials. If the OAuth2 Client uses the Token Endpoint Authentication Method client_secret_post, you need to present the client secret in the URL query. If it uses client_secret_basic, present the Client ID and the Client Secret in the Authorization header.

OAuth 2.0 clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.
Authorizations:
bearer
path Parameters
id
required
	
string

The id of the OAuth 2.0 Client.
Responses
Response samples

    default

Content type
application/json
{

    "code": 404,
    "debug": "SQL field \"foo\" is not a bool.",
    "details": null,
    "id": "string",
    "message": "The resource could not be found",
    "reason": "User with ID 1234 does not exist.",
    "request": "d7ef54b1-ec15-46e6-bccb-524b82c035e6",
    "status": "Not Found"

}
Get OAuth2 Client using OpenID Dynamic Client Registration

This endpoint behaves like the administrative counterpart (getOAuth2Client) but is capable of facing the public internet directly and can be used in self-service. It implements the OpenID Connect Dynamic Client Registration Protocol.

To use this endpoint, you will need to present the client's authentication credentials. If the OAuth2 Client uses the Token Endpoint Authentication Method client_secret_post, you need to present the client secret in the URL query. If it uses client_secret_basic, present the Client ID and the Client Secret in the Authorization header.
Authorizations:
bearer
path Parameters
id
required
	
string

The id of the OAuth 2.0 Client.
Responses
Response samples

    200default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Set OAuth2 Client using OpenID Dynamic Client Registration

This endpoint behaves like the administrative counterpart (setOAuth2Client) but is capable of facing the public internet directly to be used by third parties. It implements the OpenID Connect Dynamic Client Registration Protocol.

This feature is disabled per default. It can be enabled by a system administrator.

If you pass client_secret the secret is used, otherwise the existing secret is used. If set, the secret is echoed in the response. It is not possible to retrieve it later on.

To use this endpoint, you will need to present the client's authentication credentials. If the OAuth2 Client uses the Token Endpoint Authentication Method client_secret_post, you need to present the client secret in the URL query. If it uses client_secret_basic, present the Client ID and the Client Secret in the Authorization header.

OAuth 2.0 clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.
Authorizations:
bearer
path Parameters
id
required
	
string

OAuth 2.0 Client ID
Request Body schema: application/json
required

OAuth 2.0 Client Request Body
access_token_strategy	
string

OAuth 2.0 Access Token Strategy

AccessTokenStrategy is the strategy used to generate access tokens. Valid options are jwt and opaque. jwt is a bad idea, see https://www.ory.com/docs/oauth2-oidc/jwt-access-token Setting the strategy here overrides the global setting in strategies.access_token.
allowed_cors_origins	
Array of strings

OAuth 2.0 Client Allowed CORS Origins

One or more URLs (scheme://host[:port]) which are allowed to make CORS requests to the /oauth/token endpoint. If this array is empty, the server's CORS origin configuration (CORS_ALLOWED_ORIGINS) will be used instead. If this array is set, the allowed origins are appended to the server's CORS origin configuration. Be aware that environment variable CORS_ENABLED MUST be set to true for this to work.
audience	
Array of strings

OAuth 2.0 Client Audience

An allow-list defining the audiences this client is allowed to request tokens for. An audience limits the applicability of an OAuth 2.0 Access Token to, for example, certain API endpoints. The value is a list of URLs. URLs MUST NOT contain whitespaces.
authorization_code_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
authorization_code_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
backchannel_logout_session_required	
boolean

OpenID Connect Back-Channel Logout Session Required

Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false.
backchannel_logout_uri	
string

OpenID Connect Back-Channel Logout URI

RP URL that will cause the RP to log itself out when sent a Logout Token by the OP.
client_credentials_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
client_id	
string

OAuth 2.0 Client ID

The ID is immutable. If no ID is provided, a UUID4 will be generated.
client_name	
string

OAuth 2.0 Client Name

The human-readable name of the client to be presented to the end-user during authorization.
client_secret	
string

OAuth 2.0 Client Secret

The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost.
client_secret_expires_at	
integer <int64>

OAuth 2.0 Client Secret Expires At

The field is currently not supported and its value is always 0.
client_uri	
string

OAuth 2.0 Client URI

ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion.
contacts	
Array of strings

OAuth 2.0 Client Contact

An array of strings representing ways to contact people responsible for this client, typically email addresses.
created_at	
string <date-time>

OAuth 2.0 Client Creation Date

CreatedAt returns the timestamp of the client's creation.
device_authorization_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
device_authorization_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
frontchannel_logout_session_required	
boolean

OpenID Connect Front-Channel Logout Session Required

Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false.
frontchannel_logout_uri	
string

OpenID Connect Front-Channel Logout URI

RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be.
grant_types	
Array of strings

OAuth 2.0 Client Grant Types

An array of OAuth 2.0 grant types the client is allowed to use. Can be one of:

Client Credentials Grant: client_credentials Authorization Code Grant: authorization_code OpenID Connect Implicit Grant (deprecated!): implicit Refresh Token Grant: refresh_token OAuth 2.0 Token Exchange: urn:ietf:params:oauth:grant-type:jwt-bearer OAuth 2.0 Device Code Grant: urn:ietf:params:oauth:grant-type:device_code
implicit_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
implicit_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
	
object (jsonWebKeySet)

JSON Web Key Set
jwks_uri	
string

OAuth 2.0 Client JSON Web Key Set URL

URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate.
jwt_bearer_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
logo_uri	
string

OAuth 2.0 Client Logo URI

A URL string referencing the client's logo.
metadata	
any (JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.)
owner	
string

OAuth 2.0 Client Owner

Owner is a string identifying the owner of the OAuth 2.0 Client.
policy_uri	
string

OAuth 2.0 Client Policy URI

PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.
post_logout_redirect_uris	
Array of strings

Allowed Post-Redirect Logout URIs

Array of URLs supplied by the RP to which it MAY request that the End-User's User Agent be redirected using the post_logout_redirect_uri parameter after a logout has been performed.
redirect_uris	
Array of strings

OAuth 2.0 Client Redirect URIs

RedirectURIs is an array of allowed redirect urls for the client.
refresh_token_grant_access_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_id_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
refresh_token_grant_refresh_token_lifespan	
string (Time duration) ^([0-9]+(ns|us|ms|s|m|h))*$

Specify a time duration in milliseconds, seconds, minutes, hours.
registration_access_token	
string

OpenID Connect Dynamic Client Registration Access Token

RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration.
registration_client_uri	
string

OpenID Connect Dynamic Client Registration URL

RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client.
request_object_signing_alg	
string

OpenID Connect Request Object Signing Algorithm

JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm.
request_uris	
Array of strings

OpenID Connect Request URIs

Array of request_uri values that are pre-registered by the RP for use at the OP. Servers MAY cache the contents of the files referenced by these URIs and not retrieve them at the time they are used in a request. OPs can require that request_uri values used be pre-registered with the require_request_uri_registration discovery parameter.
response_types	
Array of strings

OAuth 2.0 Client Response Types

An array of the OAuth 2.0 response type strings that the client can use at the authorization endpoint. Can be one of:

Needed for OpenID Connect Implicit Grant: Returns ID Token to redirect URI: id_token Returns Access token redirect URI: token Needed for Authorization Code Grant: code
scope	
string

OAuth 2.0 Client Scope

Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens.
sector_identifier_uri	
string

OpenID Connect Sector Identifier URI

URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.
skip_consent	
boolean

SkipConsent skips the consent screen for this client. This field can only be set from the admin API.
skip_logout_consent	
boolean

SkipLogoutConsent skips the logout consent screen for this client. This field can only be set from the admin API.
subject_type	
string

OpenID Connect Subject Type

The subject_types_supported Discovery parameter contains a list of the supported subject_type values for this server. Valid types include pairwise and public.
token_endpoint_auth_method	
string
Default: "client_secret_basic"

OAuth 2.0 Token Endpoint Authentication Method

Requested Client Authentication method for the Token Endpoint. The options are:

client_secret_basic: (default) Send client_id and client_secret as application/x-www-form-urlencoded encoded in the HTTP Authorization header. client_secret_post: Send client_id and client_secret as application/x-www-form-urlencoded in the HTTP body. private_key_jwt: Use JSON Web Tokens to authenticate the client. none: Used for public clients (native apps, mobile apps) which can not have secrets.
token_endpoint_auth_signing_alg	
string

OAuth 2.0 Token Endpoint Signing Algorithm

Requested Client Authentication signing algorithm for the Token Endpoint.
tos_uri	
string

OAuth 2.0 Client Terms of Service URI

A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.
updated_at	
string <date-time>

OAuth 2.0 Client Last Update Date

UpdatedAt returns the timestamp of the last update.
userinfo_signed_response_alg	
string

OpenID Connect Request Userinfo Signed Response Algorithm

JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type.
Responses
Request samples

    Payload

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
Response samples

    200404default

Content type
application/json
{

    "access_token_strategy": "string",
    "allowed_cors_origins": [
        "string"
    ],
    "audience": "https://mydomain.com/api/users, https://mydomain.com/api/posts",
    "authorization_code_grant_access_token_lifespan": "string",
    "authorization_code_grant_id_token_lifespan": "string",
    "authorization_code_grant_refresh_token_lifespan": "string",
    "backchannel_logout_session_required": true,
    "backchannel_logout_uri": "string",
    "client_credentials_grant_access_token_lifespan": "string",
    "client_id": "string",
    "client_name": "string",
    "client_secret": "string",
    "client_secret_expires_at": 0,
    "client_uri": "string",
    "contacts": "help@example.org",
    "created_at": "2019-08-24T14:15:22Z",
    "device_authorization_grant_access_token_lifespan": "string",
    "device_authorization_grant_id_token_lifespan": "string",
    "device_authorization_grant_refresh_token_lifespan": "string",
    "frontchannel_logout_session_required": true,
    "frontchannel_logout_uri": "string",
    "grant_types": [
        "string"
    ],
    "implicit_grant_access_token_lifespan": "string",
    "implicit_grant_id_token_lifespan": "string",
    "jwks": {
        "keys": []
    },
    "jwks_uri": "string",
    "jwt_bearer_grant_access_token_lifespan": "string",
    "logo_uri": "string",
    "metadata": null,
    "owner": "string",
    "policy_uri": "string",
    "post_logout_redirect_uris": [
        "string"
    ],
    "redirect_uris": "http://mydomain/oauth/callback",
    "refresh_token_grant_access_token_lifespan": "string",
    "refresh_token_grant_id_token_lifespan": "string",
    "refresh_token_grant_refresh_token_lifespan": "string",
    "registration_access_token": "string",
    "registration_client_uri": "string",
    "request_object_signing_alg": "string",
    "request_uris": [
        "string"
    ],
    "response_types": [
        "string"
    ],
    "scope": "scope1 scope-2 scope.3 scope:4",
    "sector_identifier_uri": "string",
    "skip_consent": true,
    "skip_logout_consent": true,
    "subject_type": "string",
    "token_endpoint_auth_method": "client_secret_basic",
    "token_endpoint_auth_signing_alg": "string",
    "tos_uri": "string",
    "updated_at": "2019-08-24T14:15:22Z",
    "userinfo_signed_response_alg": "string"

}
OpenID Connect Front- and Back-channel Enabled Logout

This endpoint initiates and completes user logout at the Ory OAuth2 & OpenID provider and initiates OpenID Connect Front- / Back-channel logout:

https://openid.net/specs/openid-connect-frontchannel-1_0.html https://openid.net/specs/openid-connect-backchannel-1_0.html

Back-channel logout is performed asynchronously and does not affect logout flow.
Responses
OpenID Connect Userinfo

This endpoint returns the payload of the ID Token, including session.id_token values, of the provided OAuth 2.0 Access Token's consent request.

In the case of authentication error, a WWW-Authenticate header might be set in the response with more information about the error. See the spec for more details about header format.
Authorizations:
oauth2
Responses
Response samples

    200default

Content type
application/json
{

    "birthdate": "string",
    "email": "string",
    "email_verified": true,
    "family_name": "string",
    "gender": "string",
    "given_name": "string",
    "locale": "string",
    "middle_name": "string",
    "name": "string",
    "nickname": "string",
    "phone_number": "string",
    "phone_number_verified": true,
    "picture": "string",
    "preferred_username": "string",
    "profile": "string",
    "sub": "string",
    "updated_at": 0,
    "website": "string",
    "zoneinfo": "string"

}
jwk

JSON Web Keys
Delete JSON Web Key Set

Use this endpoint to delete a complete JSON Web Key Set and all the keys in that set.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

The JSON Web Key Set
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
Retrieve a JSON Web Key Set

This endpoint can be used to retrieve JWK Sets stored in ORY Hydra.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

JSON Web Key Set ID
Responses
Response samples

    200default

Content type
application/json
{

    "keys": [
        {}
    ]

}
Create JSON Web Key

This endpoint is capable of generating JSON Web Key Sets for you. There are different strategies available, such as symmetric cryptographic keys (HS256, HS512) and asymmetric cryptographic keys (RS256, ECDSA). If the specified JSON Web Key Set does not exist, it will be created.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

The JSON Web Key Set ID
Request Body schema: application/json
required
alg
required
	
string

JSON Web Key Algorithm

The algorithm to be used for creating the key. Supports RS256, ES256, ES512, HS512, and HS256.
kid
required
	
string

JSON Web Key ID

The Key ID of the key to be created.
use
required
	
string

JSON Web Key Use

The "use" (public key use) parameter identifies the intended use of the public key. The "use" parameter is employed to indicate whether a public key is used for encrypting data or verifying the signature on data. Valid values are "enc" and "sig".
Responses
Request samples

    Payload

Content type
application/json
{

    "alg": "string",
    "kid": "string",
    "use": "string"

}
Response samples

    201default

Content type
application/json
{

    "keys": [
        {}
    ]

}
Update a JSON Web Key Set

Use this method if you do not want to let Hydra generate the JWKs for you, but instead save your own.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

The JSON Web Key Set ID
Request Body schema: application/json
	
Array of objects (jsonWebKey)

List of JSON Web Keys

The value of the "keys" parameter is an array of JSON Web Key (JWK) values. By default, the order of the JWK values within the array does not imply an order of preference among them, although applications of JWK Sets can choose to assign a meaning to the order for their purposes, if desired.
Array
alg
required
	
string

The "alg" (algorithm) parameter identifies the algorithm intended for use with the key. The values used should either be registered in the IANA "JSON Web Signature and Encryption Algorithms" registry established by [JWA] or be a value that contains a Collision- Resistant Name.
crv	
string
d	
string
dp	
string
dq	
string
e	
string
k	
string
kid
required
	
string

The "kid" (key ID) parameter is used to match a specific key. This is used, for instance, to choose among a set of keys within a JWK Set during key rollover. The structure of the "kid" value is unspecified. When "kid" values are used within a JWK Set, different keys within the JWK Set SHOULD use distinct "kid" values. (One example in which different keys might use the same "kid" value is if they have different "kty" (key type) values but are considered to be equivalent alternatives by the application using them.) The "kid" value is a case-sensitive string.
kty
required
	
string

The "kty" (key type) parameter identifies the cryptographic algorithm family used with the key, such as "RSA" or "EC". "kty" values should either be registered in the IANA "JSON Web Key Types" registry established by [JWA] or be a value that contains a Collision- Resistant Name. The "kty" value is a case-sensitive string.
n	
string
p	
string
q	
string
qi	
string
use
required
	
string

Use ("public key use") identifies the intended use of the public key. The "use" parameter is employed to indicate whether a public key is used for encrypting data or verifying the signature on data. Values are commonly "sig" (signature) or "enc" (encryption).
x	
string
x5c	
Array of strings

The "x5c" (X.509 certificate chain) parameter contains a chain of one or more PKIX certificates [RFC5280]. The certificate chain is represented as a JSON array of certificate value strings. Each string in the array is a base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER [ITU.X690.1994] PKIX certificate value. The PKIX certificate containing the key value MUST be the first certificate.
y	
string
Responses
Request samples

    Payload

Content type
application/json
{

    "keys": [
        {}
    ]

}
Response samples

    200default

Content type
application/json
{

    "keys": [
        {}
    ]

}
Delete JSON Web Key

Use this endpoint to delete a single JSON Web Key.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

The JSON Web Key Set
kid
required
	
string

The JSON Web Key ID (kid)
Responses
Response samples

    default

Content type
application/json
{

    "error": "string",
    "error_debug": "string",
    "error_description": "string",
    "error_hint": "The redirect URL is not allowed.",
    "status_code": 401

}
Get JSON Web Key

This endpoint returns a singular JSON Web Key contained in a set. It is identified by the set and the specific key ID (kid).
path Parameters
set
required
	
string

JSON Web Key Set ID
kid
required
	
string

JSON Web Key ID
Responses
Response samples

    200default

Content type
application/json
{

    "keys": [
        {}
    ]

}
Set JSON Web Key

Use this method if you do not want to let Hydra generate the JWKs for you, but instead save your own.

A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) data structure that represents a cryptographic key. A JWK Set is a JSON data structure that represents a set of JWKs. A JSON Web Key is identified by its set and key id. ORY Hydra uses this functionality to store cryptographic keys used for TLS and JSON Web Tokens (such as OpenID Connect ID tokens), and allows storing user-defined keys as well.
path Parameters
set
required
	
string

The JSON Web Key Set ID
kid
required
	
string

JSON Web Key ID
Request Body schema: application/json
alg
required
	
string

The "alg" (algorithm) parameter identifies the algorithm intended for use with the key. The values used should either be registered in the IANA "JSON Web Signature and Encryption Algorithms" registry established by [JWA] or be a value that contains a Collision- Resistant Name.
crv	
string
d	
string
dp	
string
dq	
string
e	
string
k	
string
kid
required
	
string

The "kid" (key ID) parameter is used to match a specific key. This is used, for instance, to choose among a set of keys within a JWK Set during key rollover. The structure of the "kid" value is unspecified. When "kid" values are used within a JWK Set, different keys within the JWK Set SHOULD use distinct "kid" values. (One example in which different keys might use the same "kid" value is if they have different "kty" (key type) values but are considered to be equivalent alternatives by the application using them.) The "kid" value is a case-sensitive string.
kty
required
	
string

The "kty" (key type) parameter identifies the cryptographic algorithm family used with the key, such as "RSA" or "EC". "kty" values should either be registered in the IANA "JSON Web Key Types" registry established by [JWA] or be a value that contains a Collision- Resistant Name. The "kty" value is a case-sensitive string.
n	
string
p	
string
q	
string
qi	
string
use
required
	
string

Use ("public key use") identifies the intended use of the public key. The "use" parameter is employed to indicate whether a public key is used for encrypting data or verifying the signature on data. Values are commonly "sig" (signature) or "enc" (encryption).
x	
string
x5c	
Array of strings

The "x5c" (X.509 certificate chain) parameter contains a chain of one or more PKIX certificates [RFC5280]. The certificate chain is represented as a JSON array of certificate value strings. Each string in the array is a base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER [ITU.X690.1994] PKIX certificate value. The PKIX certificate containing the key value MUST be the first certificate.
y	
string
Responses
Request samples

    Payload

Content type
application/json
{

    "alg": "RS256",
    "crv": "P-256",
    "d": "T_N8I-6He3M8a7X1vWt6TGIx4xB_GP3Mb4SsZSA4v-orvJzzRiQhLlRR81naWYxfQAYt5isDI6_C2L9bdWo4FFPjGQFvNoRX-_sBJyBI_rl-TBgsZYoUlAj3J92WmY2inbA-PwyJfsaIIDceYBC-eX-xiCu6qMqkZi3MwQAFL6bMdPEM0z4JBcwFT3VdiWAIRUuACWQwrXMq672x7fMuaIaHi7XDGgt1ith23CLfaREmJku9PQcchbt_uEY-hqrFY6ntTtS4paWWQj86xLL94S-Tf6v6xkL918PfLSOTq6XCzxvlFwzBJqApnAhbwqLjpPhgUG04EDRrqrSBc5Y1BLevn6Ip5h1AhessBp3wLkQgz_roeckt-ybvzKTjESMuagnpqLvOT7Y9veIug2MwPJZI2VjczRc1vzMs25XrFQ8DpUy-bNdp89TmvAXwctUMiJdgHloJw23Cv03gIUAkDnsTqZmkpbIf-crpgNKFmQP_EDKoe8p_PXZZgfbRri3NoEVGP7Mk6yEu8LjJhClhZaBNjuWw2-KlBfOA3g79mhfBnkInee5KO9mGR50qPk1V-MorUYNTFMZIm0kFE6eYVWFBwJHLKYhHU34DoiK1VP-svZpC2uAMFNA_UJEwM9CQ2b8qe4-5e9aywMvwcuArRkAB5mBIfOaOJao3mfukKAE",
    "dp": "G4sPXkc6Ya9y8oJW9_ILj4xuppu0lzi_H7VTkS8xj5SdX3coE0oimYwxIi2emTAue0UOa5dpgFGyBJ4c8tQ2VF402XRugKDTP8akYhFo5tAA77Qe_NmtuYZc3C3m3I24G2GvR5sSDxUyAN2zq8Lfn9EUms6rY3Ob8YeiKkTiBj0",
    "dq": "s9lAH9fggBsoFR8Oac2R_E2gw282rT2kGOAhvIllETE1efrA6huUUvMfBcMpn8lqeW6vzznYY5SSQF7pMdC_agI3nG8Ibp1BUb0JUiraRNqUfLhcQb_d9GF4Dh7e74WbRsobRonujTYN1xCaP6TO61jvWrX-L18txXw494Q_cgk",
    "e": "AQAB",
    "k": "GawgguFyGrWKav7AX4VKUg",
    "kid": "1603dfe0af8f4596",
    "kty": "RSA",
    "n": "vTqrxUyQPl_20aqf5kXHwDZrel-KovIp8s7ewJod2EXHl8tWlRB3_Rem34KwBfqlKQGp1nqah-51H4Jzruqe0cFP58hPEIt6WqrvnmJCXxnNuIB53iX_uUUXXHDHBeaPCSRoNJzNysjoJ30TIUsKBiirhBa7f235PXbKiHducLevV6PcKxJ5cY8zO286qJLBWSPm-OIevwqsIsSIH44Qtm9sioFikhkbLwoqwWORGAY0nl6XvVOlhADdLjBSqSAeT1FPuCDCnXwzCDR8N9IFB_IjdStFkC-rVt2K5BYfPd0c3yFp_vHR15eRd0zJ8XQ7woBC8Vnsac6Et1pKS59pX6256DPWu8UDdEOolKAPgcd_g2NpA76cAaF_jcT80j9KrEzw8Tv0nJBGesuCjPNjGs_KzdkWTUXt23Hn9QJsdc1MZuaW0iqXBepHYfYoqNelzVte117t4BwVp0kUM6we0IqyXClaZgOI8S-WDBw2_Ovdm8e5NmhYAblEVoygcX8Y46oH6bKiaCQfKCFDMcRgChme7AoE1yZZYsPbaG_3IjPrC4LBMHQw8rM9dWjJ8ImjicvZ1pAm0dx-KHCP3y5PVKrxBDf1zSOsBRkOSjB8TPODnJMz6-jd5hTtZxpZPwPoIdCanTZ3ZD6uRBpTmDwtpRGm63UQs1m5FWPwb0T2IF0",
    "p": "6NbkXwDWUhi-eR55Cgbf27FkQDDWIamOaDr0rj1q0f1fFEz1W5A_09YvG09Fiv1AO2-D8Rl8gS1Vkz2i0zCSqnyy8A025XOcRviOMK7nIxE4OH_PEsko8dtIrb3TmE2hUXvCkmzw9EsTF1LQBOGC6iusLTXepIC1x9ukCKFZQvdgtEObQ5kzd9Nhq-cdqmSeMVLoxPLd1blviVT9Vm8-y12CtYpeJHOaIDtVPLlBhJiBoPKWg3vxSm4XxIliNOefqegIlsmTIa3MpS6WWlCK3yHhat0Q-rRxDxdyiVdG_wzJvp0Iw_2wms7pe-PgNPYvUWH9JphWP5K38YqEBiJFXQ",
    "q": "0A1FmpOWR91_RAWpqreWSavNaZb9nXeKiBo0DQGBz32DbqKqQ8S4aBJmbRhJcctjCLjain-ivut477tAUMmzJwVJDDq2MZFwC9Q-4VYZmFU4HJityQuSzHYe64RjN-E_NQ02TWhG3QGW6roq6c57c99rrUsETwJJiwS8M5p15Miuz53DaOjv-uqqFAFfywN5WkxHbraBcjHtMiQuyQbQqkCFh-oanHkwYNeytsNhTu2mQmwR5DR2roZ2nPiFjC6nsdk-A7E3S3wMzYYFw7jvbWWoYWo9vB40_MY2Y0FYQSqcDzcBIcq_0tnnasf3VW4Fdx6m80RzOb2Fsnln7vKXAQ",
    "qi": "GyM_p6JrXySiz1toFgKbWV-JdI3jQ4ypu9rbMWx3rQJBfmt0FoYzgUIZEVFEcOqwemRN81zoDAaa-Bk0KWNGDjJHZDdDmFhW3AN7lI-puxk_mHZGJ11rxyR8O55XLSe3SPmRfKwZI6yU24ZxvQKFYItdldUKGzO6Ia6zTKhAVRU",
    "use": "sig",
    "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
    "x5c": [
        "string"
    ],
    "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"

}
Response samples

    200default

Content type
application/json
{

    "alg": "RS256",
    "crv": "P-256",
    "d": "T_N8I-6He3M8a7X1vWt6TGIx4xB_GP3Mb4SsZSA4v-orvJzzRiQhLlRR81naWYxfQAYt5isDI6_C2L9bdWo4FFPjGQFvNoRX-_sBJyBI_rl-TBgsZYoUlAj3J92WmY2inbA-PwyJfsaIIDceYBC-eX-xiCu6qMqkZi3MwQAFL6bMdPEM0z4JBcwFT3VdiWAIRUuACWQwrXMq672x7fMuaIaHi7XDGgt1ith23CLfaREmJku9PQcchbt_uEY-hqrFY6ntTtS4paWWQj86xLL94S-Tf6v6xkL918PfLSOTq6XCzxvlFwzBJqApnAhbwqLjpPhgUG04EDRrqrSBc5Y1BLevn6Ip5h1AhessBp3wLkQgz_roeckt-ybvzKTjESMuagnpqLvOT7Y9veIug2MwPJZI2VjczRc1vzMs25XrFQ8DpUy-bNdp89TmvAXwctUMiJdgHloJw23Cv03gIUAkDnsTqZmkpbIf-crpgNKFmQP_EDKoe8p_PXZZgfbRri3NoEVGP7Mk6yEu8LjJhClhZaBNjuWw2-KlBfOA3g79mhfBnkInee5KO9mGR50qPk1V-MorUYNTFMZIm0kFE6eYVWFBwJHLKYhHU34DoiK1VP-svZpC2uAMFNA_UJEwM9CQ2b8qe4-5e9aywMvwcuArRkAB5mBIfOaOJao3mfukKAE",
    "dp": "G4sPXkc6Ya9y8oJW9_ILj4xuppu0lzi_H7VTkS8xj5SdX3coE0oimYwxIi2emTAue0UOa5dpgFGyBJ4c8tQ2VF402XRugKDTP8akYhFo5tAA77Qe_NmtuYZc3C3m3I24G2GvR5sSDxUyAN2zq8Lfn9EUms6rY3Ob8YeiKkTiBj0",
    "dq": "s9lAH9fggBsoFR8Oac2R_E2gw282rT2kGOAhvIllETE1efrA6huUUvMfBcMpn8lqeW6vzznYY5SSQF7pMdC_agI3nG8Ibp1BUb0JUiraRNqUfLhcQb_d9GF4Dh7e74WbRsobRonujTYN1xCaP6TO61jvWrX-L18txXw494Q_cgk",
    "e": "AQAB",
    "k": "GawgguFyGrWKav7AX4VKUg",
    "kid": "1603dfe0af8f4596",
    "kty": "RSA",
    "n": "vTqrxUyQPl_20aqf5kXHwDZrel-KovIp8s7ewJod2EXHl8tWlRB3_Rem34KwBfqlKQGp1nqah-51H4Jzruqe0cFP58hPEIt6WqrvnmJCXxnNuIB53iX_uUUXXHDHBeaPCSRoNJzNysjoJ30TIUsKBiirhBa7f235PXbKiHducLevV6PcKxJ5cY8zO286qJLBWSPm-OIevwqsIsSIH44Qtm9sioFikhkbLwoqwWORGAY0nl6XvVOlhADdLjBSqSAeT1FPuCDCnXwzCDR8N9IFB_IjdStFkC-rVt2K5BYfPd0c3yFp_vHR15eRd0zJ8XQ7woBC8Vnsac6Et1pKS59pX6256DPWu8UDdEOolKAPgcd_g2NpA76cAaF_jcT80j9KrEzw8Tv0nJBGesuCjPNjGs_KzdkWTUXt23Hn9QJsdc1MZuaW0iqXBepHYfYoqNelzVte117t4BwVp0kUM6we0IqyXClaZgOI8S-WDBw2_Ovdm8e5NmhYAblEVoygcX8Y46oH6bKiaCQfKCFDMcRgChme7AoE1yZZYsPbaG_3IjPrC4LBMHQw8rM9dWjJ8ImjicvZ1pAm0dx-KHCP3y5PVKrxBDf1zSOsBRkOSjB8TPODnJMz6-jd5hTtZxpZPwPoIdCanTZ3ZD6uRBpTmDwtpRGm63UQs1m5FWPwb0T2IF0",
    "p": "6NbkXwDWUhi-eR55Cgbf27FkQDDWIamOaDr0rj1q0f1fFEz1W5A_09YvG09Fiv1AO2-D8Rl8gS1Vkz2i0zCSqnyy8A025XOcRviOMK7nIxE4OH_PEsko8dtIrb3TmE2hUXvCkmzw9EsTF1LQBOGC6iusLTXepIC1x9ukCKFZQvdgtEObQ5kzd9Nhq-cdqmSeMVLoxPLd1blviVT9Vm8-y12CtYpeJHOaIDtVPLlBhJiBoPKWg3vxSm4XxIliNOefqegIlsmTIa3MpS6WWlCK3yHhat0Q-rRxDxdyiVdG_wzJvp0Iw_2wms7pe-PgNPYvUWH9JphWP5K38YqEBiJFXQ",
    "q": "0A1FmpOWR91_RAWpqreWSavNaZb9nXeKiBo0DQGBz32DbqKqQ8S4aBJmbRhJcctjCLjain-ivut477tAUMmzJwVJDDq2MZFwC9Q-4VYZmFU4HJityQuSzHYe64RjN-E_NQ02TWhG3QGW6roq6c57c99rrUsETwJJiwS8M5p15Miuz53DaOjv-uqqFAFfywN5WkxHbraBcjHtMiQuyQbQqkCFh-oanHkwYNeytsNhTu2mQmwR5DR2roZ2nPiFjC6nsdk-A7E3S3wMzYYFw7jvbWWoYWo9vB40_MY2Y0FYQSqcDzcBIcq_0tnnasf3VW4Fdx6m80RzOb2Fsnln7vKXAQ",
    "qi": "GyM_p6JrXySiz1toFgKbWV-JdI3jQ4ypu9rbMWx3rQJBfmt0FoYzgUIZEVFEcOqwemRN81zoDAaa-Bk0KWNGDjJHZDdDmFhW3AN7lI-puxk_mHZGJ11rxyR8O55XLSe3SPmRfKwZI6yU24ZxvQKFYItdldUKGzO6Ia6zTKhAVRU",
    "use": "sig",
    "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
    "x5c": [
        "string"
    ],
    "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"

}
wellknown

Well-Known Endpoints
Discover Well-Known JSON Web Keys

This endpoint returns JSON Web Keys required to verifying OpenID Connect ID Tokens and, if enabled, OAuth 2.0 JWT Access Tokens. This endpoint can be used with client libraries like node-jwks-rsa among others.

Adding custom keys requires first creating a keyset via the createJsonWebKeySet operation, and then configuring the webfinger.jwks.broadcast_keys configuration value to include the keyset name.
Responses
Response samples

    200default

Content type
application/json
{

    "keys": [
        {}
    ]

}
metadata

Service Metadata
Check HTTP Server Status

This endpoint returns a HTTP 200 status code when Ory Hydra is accepting incoming HTTP requests. This status does currently not include checks whether the database connection is working.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of this service, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200500

Content type
application/json
{

    "status": "string"

}
Check HTTP Server and Database Status

This endpoint returns a HTTP 200 status code when Ory Hydra is up running and the environment dependencies (e.g. the database) are responsive as well.

If the service supports TLS Edge Termination, this endpoint does not require the X-Forwarded-Proto header to be set.

Be aware that if you are running multiple nodes of Ory Hydra, the health status will never refer to the cluster state, only to a single instance.
Responses
Response samples

    200503

Content type
application/json
{

    "status": "string"

}
Return Running Software Version.

This endpoint returns the version of Ory Hydra.

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

The Ory Hydra SDK allows for integration with a self-hosted Ory Hydra OAuth2 Server.

Before using the SDK, consult the Ory Hydra REST API documentation′.

To view the source code for the generated SDKs, visit the Ory Hydra SDKs GitHub repository. Ory SDKs are generated using the openapi-generator.
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
Handling OAuth2 flows

The Ory Hydra SDK doesn't provide a comprehensive API for handling OAuth 2.0 flows such as the authorization code flow and refresh flow. Use one of the many well-established libraries for this purpose, don't write your own code to interact with OAuth 2.0.

Read the OAuth2 client libraries document for more information.
SDK backward compatibility

The Ory SDK uses automated code generation by openapi-generator. openapi-generator can make changes to the generated code with each new version, which breaks backwards compatibility in some cases. As a result, Ory SDK may not be compatible with previous versions.


Ory Hydra Go

In this document you can find code examples for the Ory Hydra Go SDK.

The Ory Hydra Go SDK is generated using go-swagger.
danger

Don't consume the /oauth2/auth and /oauth2/token endpoints using this SDK. Use golang.org/x/oauth2. For more information visit the Using OAuth2 guide.
info

Missing an example? Please create a feature request and it will be added here.

You can find more auto-generated examples of SDK usage in the documentation hydra-client-go.
Installation

To install the Go SDK, run:

go get github.com/ory/hydra-client-go@v26.2.0

Configuration

The following code example shows how to set up and configure Ory Hydra using the Go SDK:

package main

import (
  client "github.com/ory/hydra-client-go"
)

func main() {
  configuration := client.NewConfiguration()
  configuration.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4445", // Admin API URL
    },
  }
  // admin := client.NewAPIClient(configuration)
  // admin.OAuth2Api.CreateOAuth2Client(...

  configuration.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4445", // Public API URL
    },
  }

  // hydraPublic := client.NewAPIClient(configuration)
  // public.PublicApi.RevokeOAuth2Token(...
}

Making requests

The following code example shows how to make requests to the Ory Hydra Public API. In this example the request is used to create an OAuth 2.0 client:

package main

import (
  "context"
  "fmt"
  "net/http"
  "os"

  client "github.com/ory/hydra-client-go"
)

func main() {
  clientName := "example_client"
  oAuth2Client := *client.NewOAuth2Client() // OAuth2Client |
  oAuth2Client.SetClientId("example_client_id")
  oAuth2Client.SetClientName(clientName)

  configuration := client.NewConfiguration()
  configuration.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4445", // Public API URL
    },
  }
  apiClient := client.NewAPIClient(configuration)
  resp, r, err := apiClient.OAuth2Api.CreateOAuth2Client(context.Background()).OAuth2Client(oAuth2Client).Execute()
  if err != nil {
    switch r.StatusCode {
    case http.StatusConflict:
      fmt.Fprintf(os.Stderr, "Conflict when creating oAuth2Client: %v\n", err)
    default:
      fmt.Fprintf(os.Stderr, "Error when calling `OAuth2Api.CreateOAuth2Client``: %v\n", err)
      fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
  }
  // response from `CreateOAuth2Client`: OAuth2Client
  fmt.Fprintf(os.Stdout, "Created client with name %s\n", resp.GetClientName())

  limit := int64(20)
  offset := int64(0)
  clients, r, err := apiClient.OAuth2Api.ListOAuth2Clients(context.Background()).Limit(limit).Offset(offset).ClientName(clientName).Execute()
  if err != nil {
    fmt.Fprintf(os.Stderr, "Error when calling `OAuth2Api.ListOAuth2Clients``: %v\n", err)
    fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
  }
  fmt.Fprintf(os.Stdout, "We have %d clients\n", len(clients))
  fmt.Fprintf(os.Stdout, "First client name: %s\n", clients[0].GetClientName())

}

With Authentication

Some endpoints require basic authentication. The following code example shows how to make an authenticated request to the Ory Hydra Admin API:

package main

import (
  "context"
  "encoding/base64"
  "fmt"
  "net/http"

  client "github.com/ory/hydra-client-go"
)

type BasicAuthTransport struct {
  Username string
  Password string
}

func (t BasicAuthTransport) RoundTrip(req *http.Request) (*http.Response, error) {
  req.Header.Set("Authorization", fmt.Sprintf("Basic %s",
    base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s",
      t.Username, t.Password)))))
  return http.DefaultTransport.RoundTrip(req)
}

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4445", // Admin API
    },
  }

  c := client.NewAPIClient(config)
  config.HTTPClient.Transport = BasicAuthTransport{Username: "foo", Password: "bar"}

  req := c.OAuth2Api.GetOAuth2ConsentRequest(context.Background()).ConsentChallenge("consentChallenge_example")
  fmt.Println(req.Execute())

}

Status codes and error handling

The following code example shows how to handle errors and status codes:

package main

import (
  "context"
  "fmt"
  "net/http"
  "os"

  client "github.com/ory/hydra-client-go"
)

func main() {
  consentChallenge := "consentChallenge_example" // string |

  configuration := client.NewConfiguration()
  configuration.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4445", // Admin API
    },
  }
  apiClient := client.NewAPIClient(configuration)
  resp, r, err := apiClient.OAuth2Api.GetOAuth2ConsentRequest(context.Background()).ConsentChallenge(consentChallenge).Execute()
  if err != nil {
    switch r.StatusCode {
    case http.StatusNotFound:
      // Accessing to response details
      // cast err to *client.GenericOpenAPIError object first and then
      // to your desired type
      notFound, ok := err.(*client.GenericOpenAPIError).Model().(client.JsonError)
      fmt.Println(ok)
      fmt.Println(*notFound.ErrorDescription)
    case http.StatusGone:

      r, ok := err.(*client.GenericOpenAPIError).Model().(client.RequestWasHandledResponse)
      fmt.Println(r, ok)
      fmt.Println("It's gone")
    default:
      fmt.Fprintf(os.Stderr, "Error when calling `OAuth2Api.GetOAuth2ConsentRequest``: %v\n", err)
      fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
  }
  // response from `GetConsentRequest`: ConsentRequest
  fmt.Fprintf(os.Stdout, "Response from `OAuth2Api.GetOAuth2ConsentRequest`: %v\n", resp)
}

On every request

You may want to protect Ory Hydra using OAuth2 Access Tokens. In that case, you can enhance the SDK by using the OAuth2 Client:

package main

import (
  "context"

  client "github.com/ory/hydra-client-go"
  "golang.org/x/oauth2/clientcredentials"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "http://localhost:4444", // Public API URL
    },
  }

  creds := clientcredentials.Config{
    TokenURL:     "http://hydra.localhost:4444/oauth2/token",
    ClientID:     "my-client",
    ClientSecret: "my-secret",
    Scopes:       []string{"scope-a", "scope-b"},
  }
  config.HTTPClient = creds.Client(context.TODO())
  c := client.NewAPIClient(config)
  req := c.PublicApi.RevokeOAuth2Token(context.TODO())
  req.Execute()

}

JavaScript

In this document you can find code examples for the Ory Hydra JavaScript SDK.
danger

Don't consume the /oauth2/auth and /oauth2/token endpoints using this SDK. Use golang.org/x/oauth2. For more information visit the Using OAuth2 guide.
info

Missing an example? Please create a feature request and it will be added here.

You can find more auto-generated examples of SDK usage in the API documentation hydra-client.
Installation

To install the JavaScript SDK, run:

npm install --save @ory/hydra-client

Basic configuration

import { Configuration, PublicApi, AdminApi } from "@ory/hydra-client"

const hydraPublic = new PublicApi(
  new Configuration({
    basePath: "https://public.hydra:4444/",
  }),
)

const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: "https://public.hydra:4445/",
  }),
)
