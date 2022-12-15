<!--
order: false
parent:
  order: 0
-->

# Architecture Decision Records (ADR)

This is a location to record all high-level architecture decisions in Ethermint.

You can read more about the ADR concept in this blog posts:

- [GitHub - Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)
- [Reverb - Documenting architecture decisions, the Reverb way](https://product.reverb.com/documenting-architecture-decisions-the-reverb-way-a3563bb24bd0#.78xhdix6t)

An ADR should provide:

- Context on the relevant goals and the current state
- Proposed changes to achieve the goals
- Summary of pros and cons
- References
- Changelog

Note the distinction between an ADR and a spec. The ADR provides the context, intuition, reasoning, and
justification for a change in architecture, or for the architecture of something
new. The spec is much more compressed and streamlined summary of everything as
it stands today.

If recorded decisions turned out to be lacking, convene a discussion, record the new decisions here, and then modify the code to match.

Note the context/background should be written in the present tense.

Please add a entry below in your Pull Request for an ADR.

## ADR Table of Contents

- [ADR 001: State](adr-001-state.md)
- [ADR 002: EVM Hooks](adr-002-evm-hooks.md)
