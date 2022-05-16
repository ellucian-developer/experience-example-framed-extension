# <div style="text-align: center">Framed Extension</div>
Includes two card styles that can be used to launch a Page with an iframed URL.

The first card style includes an icon, a message header and a description. Clicking or touching the card will launch the page that will load the specified URL into an iframe.

The second card style uses an iframe in the card to render a URL. Clicking or touching the card will launch the page that will load the specified URL into an iframe.
<br/>

## Icon Card and Page
This card renders an icon, a message header and a description as configured in Card Management. This card has a Custom Configuration component that is used to manage the card icon, message header, description, and the page URL and sandbox options. See: [IconMessageCardConfiguration.jsx](./src/cards/IconMessageCardConfiguration.jsx).

The card includes an overlay \<div\> that intercepts interactions. Any click on the card will cause the page to be launched.

## Iframe Card and Page
This card's iframe source URL is configured by the Admin in Card Management. This card has a Custom Configuration component that is used to manage the card and page URL's and sandbox options. See: [FramedCardConfiguration.jsx](/src/cards/FramedCardConfiguration.jsx). 

The card includes an overlay \<div\> that intercepts interactions. Any click on the card will cause the page to be launched.

## Framed Page
Both cards launch a Page that is entirely composed of an iframe using the configured URL. There are several sandbox options that are also configured.

## Template Card
Both cards in this extension use the "Template Card" feature. This allows the cards to be added in Card Management as a new card instance multiple times, with each instance configured to use different content. See the _template_ block contained in the card block of extension.js

## Card Configuration
Icon Message Card Configuration
<p align="center">
  <img src="docs/images/IconMessageCardConfiguration.jpg?raw=true" />
</p>

Iframe Card Configuration
<p align="center">
  <img src="docs/images/FramedCardConfiguration.jpg?raw=true" />
</p>

## Using this example

### Download ZIP
Navigate to https://github.com/ellucian-developer/experience-example-framed-extension and select Code -> Download ZIP

Expanding the zip file will yield a directory named experience-example-framed-extension-main. Rename and use as desired

### Fork and use Github for source control
Navigate to https://github.com/ellucian-developer/experience-example-framed-extension and click on the "Fork" button (top right). This will allow you to create your own forked repository.

After forking, in your new repository, click the Code button and either copy the URL, GitHub CLI, or Open with GitHub Desktop to clone a local working directory for your fork.

### Clone and contribute
Navigate to https://github.com/ellucian-developer/experience-example-framed-extension. Click on the Code button and either copy the URL, GitHub CLI, or Open with GitHub Desktop to clone a local working directory for your fork.

Minimum contribution steps
1. Create a fork and clone
1. Make your changes, including an appropriate version increment
1. Commit changes to your local repo
1. Push your commit to GitHub to your fork
1. Create a PR
1. After being reviewed and approved, it will be merged

Copyright 2021–2022 Ellucian Company L.P. and its affiliates.