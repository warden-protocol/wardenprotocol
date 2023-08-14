# Security

As part of our vulnerability disclosure policy, we operate a security vulnerability program through [Immunefi](https://immunefi.com/). This document serves as a complementary guideline for reporting vulnerabilities and how the disclosure process is managed. Please refer to the official Evmos [bug bounty program](https://immunefi.com/bounty/evmos/) for up-to-date information.

## Guidelines

We require that all researchers:

- Use the Evmos [bug bounty program](https://immunefi.com/bounty/evmos/) on Immunefi to disclose all vulnerabilities, and avoid posting vulnerability information in public places, including GitHub, Discord, Telegram, Twitter or other non-private channels.
- Make every effort to avoid privacy violations, degradation of user experience, disruption to production systems, and destruction of data.
- Keep any information about vulnerabilities that you’ve discovered confidential between yourself and the engineering team until the issue has been resolved and disclosed
- Avoid posting personally identifiable information, privately or publicly

If you follow these guidelines when reporting an issue to us, we commit to:

- Not pursue or support any legal action related to your research on this vulnerability
- Work with you to understand, resolve and ultimately disclose the issue in a timely fashion

## Disclosure Process

Evmos uses the following disclosure process:

1. Once a security report is received via the Immunefi Bug Bounty program, the team works to verify the issue and confirm its severity level using [CVSS](https://nvd.nist.gov/vuln-metrics/cvss) or [Immunefi’s Vulnerability Severity Classification System v2.2](https://immunefi.com/immunefi-vulnerability-severity-classification-system-v2-2/).
    1. Two people from the affected project will review, replicate and acknowledge the report within 48-96 hours of the alert according to the table below:
        | Security Level       | Hours to First Response (ACK) from Escalation |
        | -------------------- | --------------------------------------------- |
        | Critical             | 48                                            |
        | High                 | 96                                            |
        | Medium               | 96                                            |
        | Low or Informational | 96                                            |
        | None                 | 96                                            |

    2. If the report is not applicable or reproducible, the Security Lead (or Security Secondary) will revert to the reporter to request more info or close the report.
    3. The report is confirmed by the Security Lead to the reporter.
2. The team determines the vulnerability’s potential impact on Evmos.
    1. Vulnerabilities with `Informational` and `Low` categorization will result in creating a public issue.
    2. Vulnerabilities with `Medium` categorization will result in the creation of an internal ticket and patch of the code.
    3. Vulnerabilities with `High` or `Critical` will result in the [creation of a new Security Advisory](https://docs.github.com/en/code-security/repository-security-advisories/creating-a-repository-security-advisory)

Once the vulnerability severity is defined, the following steps apply:

- For `High` and `Critical`:
    1. Patches are prepared for supported releases of Evmos in a [temporary private fork](https://docs.github.com/en/code-security/repository-security-advisories/collaborating-in-a-temporary-private-fork-to-resolve-a-repository-security-vulnerability) of the repository.
    2. Only relevant parties will be notified about an upcoming upgrade. These being validators, the core developer team, and users directly affected by the vulnerability.
    3. 24 hours following this notification, relevant releases with the patch will be made public.
    4. The nodes and validators update their Evmos and Ethermint dependencies to use these releases.
    5. A week (or less) after the security vulnerability has been patched on Evmos, we will disclose that the mentioned release contained a security fix.
    6. After an additional 2 weeks, we will publish a public announcement of the vulnerability. We also publish a security Advisory on GitHub and publish a [CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures)

- For `Informational` , `Low` and `Medium` severities:
    1. `Medium` and `Low` severity bug reports are included in a public issue and will be incorporated in the current sprint and patched in the next release. `Informational` reports are additionally categorized as with low or medium priority and might not be included in the next release.
    2. One week after the releases go out, we will publish a post with further details on the vulnerability as well as our response to it.

This process can take some time. Every effort will be made to handle the bug in as timely a manner as possible, however, it's important that we follow the process described above to ensure that disclosures are handled consistently and to keep Ethermint and its downstream dependent projects, including but not limited to Evmos, as secure as possible.

### Payment Process

The payment process will be executed according to Evmos’s Immunefi Bug Bounty program Rules.

### Contact

The Evmos Security Team is constantly being monitored. If you need to reach out to the team directly, please reach out via email: [security@evmos.org](mailto:security@evmos.org)
