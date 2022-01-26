// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@ellucian/react-design-system/core/styles';
import {useCardInfo, usePageControl} from '@ellucian/experience-extension/extension-utilities';

import Framed from '../components/Framed';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
});

function FramedPage({classes}) {
    const {
        cardConfiguration: {
            pageIframeSrc: src,
            pageIframeSandboxOptions: sandboxOptions
        } = {}
    } = useCardInfo();

    const { setPageToolbar } = usePageControl();

    const [ refreshCount, setRefreshCount ] = useState(0);

    useEffect(() => {
        // this modifies some parent <div>s to allow the frame
        // to use 100% of the available height for the card or page
        const main = document.querySelector('[role="main"]');
        const mainParent = main.parentElement;
        const pageContent = main.children[1];

        mainParent.style = `
            display: flex;
            flex-direction: column;
        `;

        main.style = `
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
        `;

        pageContent.style = 'flex: 1 1 auto';

        setPageToolbar({
            primaryCommands: [
                {
                    icon: 'refresh',
                    label: 'Refresh',
                    callback: () => { setRefreshCount(count => count + 1) }
                }
            ]
        })
    }, [])

    return (
        <div className={classes.root}>
            <Framed key={refreshCount} src={src} sandboxOptions={sandboxOptions}/>
        </div>
    )
}

FramedPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FramedPage);
