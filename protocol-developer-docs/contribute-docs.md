# Contribute docs

Our [documentation website](https://docs.wardenprotocol.org) is built using [Docusaurus](https://docusaurus.io). To preview and check your contribution, do the following:

1. [Install Node.js](https://nodejs.org/en/download/package-manager). On macOS, you can install Node.js using [Homebrew](https://brew.sh):
    
    ```bash
    brew install node
    ```
2. Install dependencies:
    
    ```bash
    cd docs/
    npm install
        ```
3. Run docs in developer mode to preview your changes. The website will automatically update to
reflect your changes
    
    ```bash
    npm run start
    ```
4. To run spellcheck on the documentation, run this:
   
   ```bash
   npm run spellcheck
   ```

   Use the up/down arrows to navigate through the suggestions, and press `Enter`
   to accept it. Ensure that the spellcheck passes before submitting a pull request.