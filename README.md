# Ten Documentation Site

This repository contains the documentation website for Ten Protocol, built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator optimized for technical documentation.

## Prerequisites
Before you begin, ensure you have the following installed:

 - Node.js (version 16 or higher)
 - Yarn package manager
 - Git

## Getting Started

### Installation
Clone the repository and install dependencies:

```
$ git clone https://github.com/ten-protocol/ten-documentation.git && cd documentation && yarn
```

### Local Development
Start the development server:

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build
Generate a production-ready build:

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

To test the production build locally:

```
$ yarn serve
```

## Deployment

### GitHub Pages
The site can be deployed to GitHub pages using one of the following methods:

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

This deployment script will:

 1. Build the project (equivalent to yarn build)

 2. Push the built assets to the gh-pages branch

 3. Trigger GitHub Pages deployment automatically

Note: Ensure GitHub Pages is configured to use the gh-pages branch in your repository settings.

## Other Hosting Services
The static build (build/ directory) can be deployed to any static hosting platform:

 - Vercel: Drag-and-drop build/ folder or connect Git repository

 - Netlify: Set build command to yarn build and publish directory to build/

 - AWS S3: Sync build/ directory with your S3 bucket

## Contributing
We welcome contributions! Please follow these steps:

 1. Fork the repository

 2. Create your feature branch (git checkout -b your-feature)

 3. Commit your changes (git commit -m 'Add some feature')

 4. Push to the branch (git push origin your-feature)

 5. Open a Pull Request

## Support
For questions and support:

 - Open an issue in the GitHub repository
 - Join our [Discord community](https://t.co/UJC0FUAY2T)
 - Check our [documentation](https://docs.ten.xyz/)