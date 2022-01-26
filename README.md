# <div style="text-align: center">Framed Extension</div>
Includes a card implementation which renders a URL in an iframe and a page implementtation which renders a possibly different URL in an iframe.
<br/>

## Framed Card
The card's iframe source URL is configured by the Admin in Card Management. See [extension.js](./extension.js) configuration key cardIframeSource. The iframe will also attach sandbox options as configured in Card Management. Its key in extension.js is cardIframeSandboxOptions. For the list of sandbox options and their descriptions, see (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox). Example value _allow-same-origin allow-scripts_. allow-same-origin is needed if the framed content makes any JavaScript API calls. If you trust the framed URL, a list of sandbox options that you might use are: _allow-same-origin allow-forms allow-modals allow-popups allow-scripts allow-popups-to-escape-sandbox_.

As defined, you can not interact with the card. It is merely a link to the page. You can change this by altering the pageRoute entry in extension.js. If you do this, then you need to add something to the card to launch the page.

## Framed Page
The page's iframe source URL is configured by the Admin in Card Management. See [extension.js](./extension.js) configuration key pageIframeSource. The iframe will also attach sandbox options as configured in Card Management. Its key in extension.js is pageIframeSandboxOptions. For the list of sandbox options and their descriptions, see (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox).

## Template Card
The extension.js as delivered in this example uses the "Template Card" feature. This allows this card to be added in Card Management as a new card instance multiple times, with each instance configured to use different content. See the _template_ block contained in the card block of extension.js

## Multiple Cards instead of Template
There is an extension-multi-card.js file which shows an alternate way to define one or more non-template cards. This could be used as an example of creating single purpose cards in which the framed URLs are baked into the card rather than being configured in Card Management.

## Card Configuration
<p align="center">
  <img src="docs/images/config.png?raw=true" />
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