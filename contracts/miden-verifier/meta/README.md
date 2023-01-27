# The meta folder

This folder is ignored via the `.genignore` file. It contains meta files
that should not make it into the generated project.

In particular, it is used for an AppVeyor CI script that runs on `cw-template`
itself (running the cargo-generate script, then testing the generated project).
The `.circleci` and `.github` directories contain scripts destined for any projects created from
this template.

## Files

- `appveyor.yml`: The AppVeyor CI configuration
- `test_generate.sh`: A script for generating a project from the template and
  runnings builds and tests in it. This works almost like the CI script but
  targets local UNIX-like dev environments.
