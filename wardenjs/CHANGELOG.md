<!--
Guiding Principles:

Changelogs are for humans, not machines.
There should be an entry for every single version.
The same types of changes should be grouped.
Versions and sections should be linkable.
The latest version comes first.
The release date of each version is displayed.
Mention whether you follow Semantic Versioning.

Usage:

Change log entries are to be added to the Unreleased section under the
appropriate stanza (see below). Each entry is required to include a tag and
the GitHub issue reference in the following format:

* (<tag>) \#<issue-number> message

The tag should consist of where the change is being made ex. (x/staking), (store)
The issue numbers will later be link-ified during the release process so you do
not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Bug Fixes" for any bug fixes.
"API Breaking" for breaking exported APIs used by developers building on SDK.
"Consensus Breaking CHANGES" for any changes that result in a different AppState given same genesisState and txList.
Ref: https://keepachangelog.com/en/1.1.0/
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Unreleased (v0.0.9)

-

### [v0.0.8]

### Features

- Upgrade protobufs for wardend v0.4.0.

### [v0.0.7]

### Features

- Switch from Long to BigInt, for representing `uint64` values. This removes the need for `Long` dependency.

## [v0.0.6]

### Misc

- More fixes to Node.js support, extensions were missing from imports paths.

## [v0.0.5]

### Misc

- Fix ESM support in Node.js. Previous versions were only tested in React apps using Vite.

## [v0.0.4]

### Misc

- (wardenjs) [#205](https://github.com/warden-protocol/wardenprotocol/pull/205) Drop CommonJS support. Keep ESM only.

## [v0.0.2]

### Features

### Bug Fixes

### Misc

- (wardenjs) [#142](https://github.com/warden-protocol/wardenprotocol/pull/142) Use the main `proto` folder instead of copy-pasted one.
