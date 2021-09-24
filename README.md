# <div style="text-align: center">Framed Extension</div>
Includes a card implementation which renders a URL in an iframe and a page implementtation which renders a possibly different URL in an iframe.
<br/>

## Framed Card
The card's iframe source URL is configured by the Admin in Card Management. See [extension.js](./extension.js) configuration key cardIframeSource. The iframe will also attach sandbox options as configured in Card Management. Its key in extension.js is cardIframeSandboxOptions. For the list of sandbox options and their descriptions, see (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox). Example value _allow-same-origin allow-scripts. allow-same-origin is needed if the framed content makes any JavaScript API calls.

This example extension.js defines five instances of the card. This example shows how you could create as many cards as needed. Each card will launch the same page with a different page URL.

As defined, you can not interact with the card. It is merely a link to the page. You can change this by altering the pageRoute entry in extension.js. If you do this, then you need to add something to the card to launch the page.

## Framed Page
The page's iframe source URL is configured by the Admin in Card Management. See [extension.js](./extension.js) configuration key pageIframeSource. The iframe will also attach sandbox options as configured in Card Management. Its key in extension.js is pageIframeSandboxOptions. For the list of sandbox options and their descriptions, see (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox).

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
1. Create a branch
1. Make your changes, including an appropriate version increment
1. Commit changes to your local branch
1. Push your branch to GitHub (origin)
1. Create a PR
1. After being reviewed, merge to main branch
