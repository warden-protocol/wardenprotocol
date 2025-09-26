# Help center website

Our [documentation website](https://help.wardenprotocol.org) is built using [Docusaurus](https://docusaurus.io), a modern static website generator.

To run docs locally and preview your contribution, do the following:

1. [Install Node.js](https://nodejs.org/en/download/package-manager) or [yarn](https://yarnpkg.com/getting-started/install).

    On macOS, you can install Node.js using [Homebrew](https://brew.sh):
    
    ```bash
    brew install node
    ```

2. Install dependencies:
    
    ```bash
    cd docs/
    npm install
    ```

    ```bash
    yarn
    ```

3. Run docs in developer mode to preview your changes locally in a browser window. The website will automatically update to reflect your changes.
    
    ```bash
    npm run start
    ```

    ```bash
    yarn start
    ```

4. To run a spellcheck on the documentation, run this:
   
   ```bash
   npm run spellcheck
   ```

   ```bash
   yarn spellcheck
   ```

   Use the up/down arrows to navigate through the suggestions, and press `Enter`
   to accept it. Ensure that the spellcheck passes before submitting a pull request.

5. This command generates static content into the `build` directory and can be served using any static content hosting service:

    ```bash
    npm run build
    ```
    
    ```bash
    yarn build
    ```
