---
sidebar_position: 9
---

# Manage Rules

## Overview

**Rules** are a set of user-defined conditions under which a Keychain signs a transaction with a private key.

SpaceWard users can set up their own Rules as conditions to get transactions approved. For example, an Intent can allow executing a transaction only if 2 of 3 approvers sign it.

## Create and enable a Rule

To create a Rule, do this:

1. Connect to [SpaceWard](https://spaceward.buenavista.wardenprotocol.org).
2. In the left menu, navigate to **Rules**.
3. Click **Create a new Rule**.
4. Select the preferred Rule type:
    - **Joint approval**: All approvers must approve the transaction.
    - **Approval by certain amount**: A minimum threshold number of approvals is required.
    - **Approval by anyone**: One approval is required.
    - **Advance mode**: Create a custom Rule.
5. If needed, add approvers and specify other details by [editing your Rule](#edit).
6. To start applying a new Rule, switch a slider on it.

## Edit a Rule

You can edit your Rule at any moment:

1. Connect to [SpaceWard](https://spaceward.buenavista.wardenprotocol.org) and navigate to **Rules**.
2. Click the pencil symbol on your Rule. Click **Edit**.
3. You can make the following adjustments:
    - To add an approver, click **Add approver**. Approvers are accounts participating in your Rule, which includes you as the default approver.
    - To add a condition, click the plus button and select **Add Approval Condition**. This will result in a Rule operating under multiple conditions: the one you selected when initially setting the Rule type and additional conditions you added after.
    - To add a whitelist address, click the plus button and select **Add whitelist address**.
4. Click **Save**.

## Create an advanced Rule

To create an advanced Rule, take these steps:

1. Connect to [SpaceWard](https://spaceward.buenavista.wardenprotocol.org) and navigate to **Rules**.
2. Click the pencil symbol on your Rule. Click **Edit in Advanced mode**.
3. Enter a custom expression for your Rule.

Custom expressions are based on the [Intent-Specific Language](https://docs.wardenprotocol.org/learn/glossary#intent-specific-language). For example, here is an expression for approval by certain amount:

```
ANY 2 FROM (3)
```

