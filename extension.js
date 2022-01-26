// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

module.exports = {
    name: 'Framed',
    publisher: '',
    cards: [{
        type: 'FramedCard',
        source: './src/cards/FramedCard.jsx',
        title: 'Framed Card',
        displayCardType: 'Framed',
        description: 'Renders a URL in an iframe',
        // Remove the template block if card should be a single card vs a template
        template: {
            image: './src/assets/embedded_content.png',
            title: 'Framed Card and Page'
        },
        pageRoute: {
            route: '/'
        },
        configuration: {
            client: [{
                key: 'cardIframeSrc',
                label: 'Card Iframe src',
                type: 'string',
                required: true
            }, {
                key: 'cardIframeSandboxOptions',
                label: 'Card Iframe Sandbox Options',
                type: 'string',
                required: true
            }, {
                key: 'pageIframeSrc',
                label: 'Page Iframe src',
                type: 'string',
                required: true
            }, {
                key: 'pageIframeSandboxOptions',
                label: 'Page Iframe Sandbox Options',
                type: 'string',
                required: true
            }]
        }
    }],
    page: {
        source: './src/page/FramedPage.jsx'
    }
}