// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { useCache, useCardInfo, usePageControl } from '@ellucian/experience-extension-utils';

import Framed from '../components/Framed';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
});

const cacheKey = 'custom-configuration';

function FramedPage({classes}) {
    const { getItem } = useCache();
    const {
        cardId,
        cardConfiguration: {
            pageIframeSrc,
            pageIframeSandboxOptions,
            customConfiguration: {
                pageUrl,
                pageSandboxOptions
            } = {}
        } = {}
    } = useCardInfo();

    const [cacheCustomConfiguration, setCustomConfiguration ] = useState();

    useEffect(() => {
        const { data: customConfiguration } = getItem({key: cacheKey, scope: cardId});
        if (customConfiguration) {
            setCustomConfiguration(customConfiguration);
        }
    }, [cardId, getItem])

    const src = pageUrl || pageIframeSrc || cacheCustomConfiguration?.pageUrl;
    const sandboxOptions = pageSandboxOptions || pageIframeSandboxOptions || cacheCustomConfiguration?.pageSandboxOptions;

    const { setPageToolbar } = usePageControl();

    const [ refreshCount, setRefreshCount ] = useState(0);

    useEffect(() => {
        setPageToolbar({
            primaryCommands: [
                {
                    icon: 'refresh',
                    label: 'Refresh',
                    callback: () => { setRefreshCount(count => count + 1) }
                }
            ]
        })
    }, [setPageToolbar])

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
