module.exports = {
    name: 'Framed',
    // remove before commit
    publisher: 'Ellucian',
    cards: [{
        type: 'FramedCard1',
        source: './src/cards/FramedCard.jsx',
        title: 'Framed Card 1',
        displayCardType: 'FramedCard1',
        description: 'Renders a URL in an iframe',
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
    }, {
        type: 'FramedCard2',
        source: './src/cards/FramedCard.jsx',
        title: 'Framed Card 2',
        displayCardType: 'FramedCard2',
        description: 'Renders a URL in an iframe',
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