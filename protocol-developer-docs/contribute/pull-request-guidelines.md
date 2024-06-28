# Pull request guidelines

## Overview

When submitting a pull request, please follow the guidelines listed below.

To learn more, see the following:

- [Advanced pull-request crafting](https://codeinthehole.com/tips/advanced-pull-request-crafting/)
- [Auto-squashing Git commits](https://thoughtbot.com/blog/autosquashing-git-commits)
- [My favorite git commit](https://dhwthompson.com/2019/my-favourite-git-commit)

## Leave pull requests in draft until they are potentially ready to merge

When first opening a pull request, use [GitHub's 'draft' feature] to create it as a draft. This will prevent code owners
from being tagged prematurely.

Only once you feel it's potentially production-ready, mark it as 'ready for review'. This will then automatically tag
the code owners.

If you want to get an early review while a pull request is still in draft, that's fine.

[GitHub's 'draft' feature]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests

## Don't request a review until tests have passed

By default, wait for the test suite to pass before asking for a review. One of main purposes of the tests (in particular, the
linting) is to save a reviewer's time by picking up on issues that would otherwise be flagged by a human.

Sometimes unrelated tests '[flake]'. If you think that's what has happened, rerun the failed GitHub's workflow to give them another chance to pass.

The only exceptions to requesting a review with failing tests should be when:

- There are failing tests on the master/main branch that are unrelated to your changes. Try to rebase your branch as soon these
  are fixed, but it doesn't need to block a review.
- You need the reviewer's help to fix the tests or provide early feedback that you're going in the right direction. In this case, make sure the pull request is still in draft, as it isn't
  production ready.

In either case, mention in your pull request description why there are failing tests.

[flake]: https://tech.octopus.energy/news/2022/05/23/flakey-python-tests.html

## Link to the Issue in the pull request description

Always include a link to the GitHub's Issue in the pull request description.

The issue should be created before the pull request is opened, and should
describe the problem or feature in more detail, while the PR descriptions and
comments should be used for implementation details.

## Keep pull requests small

Avoid big pull requests. They are:

- Hard to review;
- Can get bogged down with too many comments;
- More likely to incur git conflicts;
- Riskier to deploy.

There is no hard-and-fast rule as to what constitutes too big a pull request,
but if it's running to more than a few hundred lines of code then it's probably
worth breaking up. If there are dependencies from one PR to another, [chain
them](#chain-pull-requests-by-editing-the-base-branch). (If you've [made each
commit atomic](#make-each-commit-atomic), this should be easy: you can just
move later commits to another PR.)

Don't apologize about a pull request being too big; break it up before seeking
review. It's time well spent.

It's never too late to break up a PR. If one becomes unexpectedly big or
difficult during the review process, don't soldier on: it quickly becomes
demoralizing for everyone. Instead, identify smaller parts, break them out into
separate pull requests, and focus on getting them merged incrementally.

## Chain pull requests by editing the base branch

One way of breaking a large pull request up is to 'chain' it into several
smaller ones that depend on each other. In follow-on PRs, [edit the base branch
of the pull request] so that it merges into the previous PR. This will prevent
the commits from the other PR from showing in the list of commits, making it
easier to review.

When the previous PR is merged, GitHub automatically updates the base of the
next PR to merge into the main branch.

It's helpful to flag that a pull request follows on from another by linking to
it in the description.

Note: if you rebase a chained PR, you need to rebase any downstream PRs on the
new version, otherwise the original commits from the upstream PR will show up
in the downstream PR's commits. This is just a matter of running `git rebase
some-upstream-branch && git push -f` on the downstream branch.

[edit the base branch of the pull request]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-base-branch-of-a-pull-request

## Ensure your reviewers have enough context

Use the pull request description to provide context, so others can review it
effectively.

**Code changes don't usually speak for themselves**. Reviewers need to
understand the broader context: what are we trying to achieve? Is there
anything you're unsure of? Is there any time sensitivity? And so on.

It's also important to align on the kind of review you are seeking. Do you
want feedback on the fundamental approach? Do you want someone to think, in
detail, about correctness? Are you unsure about whether it's safe to deploy?
Unless you're getting a review from a close teammate, it can be difficult for
reviewers to know what you're expecting from them. "Please review this change"
is probably not enough context for many pull requests.

## Follow our standard commit message format

Commit messages should take this form:

> \<type\>[optional scope]: \<description\>
>
> [optional body]
>
> [optional footer(s)]

And should follow the [Conventional Commits
specification](https://www.conventionalcommits.org/en/v1.0.0/).

Note especially:

- The type is mandatory.
- The scope is optional but recommended, since we work in a monorepo it can be
  the name of the package being changed.
- The short summary does not end with a full stop.
- The blank line between the first line and the optional body.

Only truly trivial changes should have a one-line commit message. All others
should include some detail on what problem is being fixed and how the commit
resolves it. To this end, consider using a
[commit message template](http://codeinthehole.com/tips/a-useful-template-for-commit-messages/).

## Write commit subjects in the imperative mood

Write imperative commit subjects and PR titles, e.g. "Fix bug" rather than
"Fixed bug" or "Fixes bug." This convention matches up with commit messages
generated by commands like `git merge` and `git revert`.

## Do only one thing with each commit

Express a single thought with each commit. This can result in notably small
commits (e.g. fixing a typo) or significantly large ones (e.g. moving many
modules to different package). The point is that a reviewer should be able to
hold the commit in their head without too much trouble.

**The golden rule is that it should make the life of the reviewer easier.**.
What constitutes 'a single thought' is a judgment call. You may choose to add
several interdependent Protobufs models in a single commit, as it makes sense
to be reviewed as a single thing: in this case, the data model. You may choose
to use one commit to add type annotations for an entire module, because it's
ultimately driven by one thought.

If you're writing 'change this and that' in a commit message, it's a strong
indication that you should break up the commit.

## Clean up mistakes by rewriting history

**Make it look like you did everything perfectly the first time around.** Avoid
commits that fix bugs or linting issues introduced in a previous commit.
Instead, rebase these commits to give a clean history before requesting code
review for a pull request.

Note: this doesn't necessarily apply once you've received a review, when you
may wish to make changes [as additional
commits](#approach-b-show-changes-using-additional-commits). However, you
should always squash away corrections before merging to the main branch.

## Don't mix refactoring with functional changes in the same commit

It's challenging to review commits that contain both refactoring (changes to
the way code is expressed) and functional changes. Split them up so refactoring
stands on its own.

## Make each commit atomic

Before a pull request merges, its commits should be self-contained (a.k.a.
"atomic").

This means that after each commit:

- The test suite should pass;
- The codebase could be safely deployed to production.

So don't half-implement a feature in one commit, then fix it in a later commit.
Structure your pull requests so that each change keeps the codebase in a
deployable state.

Tip: if you want to write a failing test and then fix it in a later commit, you
can keep the test suite passing by calling
[`t.Skip()`](https://pkg.go.dev/testing#T.Skip) within the test function.

## Try not to surprise reviewers with urgent, complex pull requests

If you have a time-sensitive pull request that you are preparing, engage with
your intended reviewers ahead of time to let them know it's coming.

Complex PRs can take a lot of time to review: if you need a fast turnaround,
the more notice the better.

## Learn our emoji shorthands

Reviewers may include [emoji shorthands](#shorthands) in their
comments. It's important you know what these mean.

## Acknowledge every review comment

Always respond to every comment to indicate to the reviewer that you've seen
and thought about what they said. This doesn't have to be onerous: often a 👍
reaction is sufficient.

## When re-requesting reviews, make it clear what has changed

When re-requesting a review after some requested changes, make it clear to the
reviewer what has changed since their last review. This helps them save time,
as they may not remember where they reviewed up to last time.

There are a few approaches for doing this:

### Approach A: comment and then rewrite history

One way to address changes is to amend previous commits.

If you're doing this, it can force the reviewer to look back and reread lots of
code they have already reviewed, so help them out by communicating each change
with a PR comment.

### Approach B: show changes using additional commits

Alternatively, you can make changes by adding commits on top of what you have
already done, leaving the original commits in place. You can, if you like, use
[fixup commits] to do this. If you do this, it's helpful also to let the
reviewer know which commit to review from.

Additional commits make changes clearer to the reviewer, but it has the
downside of a messier commit history which will need to be tidied up before
merge.

Don't forget to squash the corrections together before merging, as per [Clean
up mistakes by rewriting history](#clean-up-mistakes-by-rewriting-history). You
can add the _Fixup before merging_ label to your PR to remind yourself.

### Approach C: rewrite history and link to diffs

You can achieve the best of both worlds by:

1. Creating additional fixup commits, and push them;
2. Link to each fixup commit in PR comments;
3. Squash and push the commits, so they disappear from the history.

The links to now-disappeared fixup commits will continue to work for anyone who
wants to check the diff.

### Choosing an approach

Approach C is a nice option if you're feeling diligent, but it's a bit more
effort. More often, you'll choose one of the first two options:

- For small, simple pull requests, Approach A. (rewriting history) tends to
  work better as it's cleaner, doesn't require much rereading of code, and
  avoids the need for a final clean up before merging.
- For more complex pull requests, many reviewers find Approach B. (additional
  commits) helpful. But not everyone prefers this.

If you're not sure, the best thing to do is ask your reviewer what they would
like: the easier it's for them, the sooner you'll get a review, which is good
for you too.

[fixup commits]: https://jordanelver.co.uk/blog/2020/06/04/fixing-commits-with-git-commit-fixup-and-git-rebase-autosquash/#fixup-commits

## Only merge if you have enough buy-in for the change

One PR approval is not necessarily enough to hit the merge button. You should
gain the appropriate level of buy-in for the change.

The more people the change will affect, the more buy-in is needed. For example,
if a PR touches code that has a GitHub 'code owner' group, they'll be
automatically tagged for review. While an approval from a code owner is not a
hard requirement, you should give someone in the group a chance to respond. If
you're not sure, contact the relevant person or team. Equally, if someone has
expressed an interest in what you're working on, it's a sign that they're a
stakeholder who should be given the opportunity to be involved.

For potentially contentious pull requests, it's best to publicize it and wait a
few days before merging. Even this might not always be enough: if the original
author of the code is on holiday, you should consider waiting until they
return.

Certain pull requests hinge on a matter of preference. If that's the case,
consider conducting a poll to gauge what people think.

Sometimes it's hard to know whose buy-in you might need: if that's the case,
just ask someone more experienced to help you identify who to involve.