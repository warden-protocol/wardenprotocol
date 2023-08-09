# Build and deploy

Guide for building Docker images of the Fusion Chain services.

## Access to private repo

We depend on private repositories. To access them during the build you need to
set up personal tokens and export them as environment variables.

### Gitlab

- navigate to https://gitlab.qredo.com/-/profile/personal_access_tokens
- select `read_repository` and generate the token

### GitHub

- navigate to https://github.com/settings/tokens
- select `repo` permissions and generate the token

### Set up direnv

`direnv` is a tool that automatically sets some environment variables when you
enter a folder (and unsets them when you exit the folder).

- install with `brew install direnv`
- create a `.envrc` file with the following content:

```
export GITLAB_TOKEN='glpat-********'
export GITHUB_TOKEN='ghp_********'
```

You can put this file directly into the `fusionchain` folder, or one level
above - it can be useful for applying those variables to other repos as well.


## Docker compose

To build all the services run:

```sh
docker compose build
```

or to build a single service run:

```sh
docker compose build [service]
```
