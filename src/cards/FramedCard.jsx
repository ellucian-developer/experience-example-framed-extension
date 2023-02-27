// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCache, useCardInfo } from '@ellucian/experience-extension-utils';
import { withStyles } from '@ellucian/react-design-system/core/styles';

import Framed from '../components/Framed';

const styles = (theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: theme.zIndex.drawer - 1
    }
});

const cacheKey = 'custom-configuration';

function FramedCard({classes}) {
    const { storeItem } = useCache();
    const {
        cardId,
        configuration: {
            cardIframeSrc,
            cardIframeSandboxOptions,
            customConfiguration,
            customConfiguration: {
                cardUrl,
                cardSandboxOptions
            } = {}
        }
    } = useCardInfo();

    useEffect(() => {
        storeItem({
            data: { ...customConfiguration },
            key: cacheKey,
            scope: cardId
        });
    }, [cardId, customConfiguration, storeItem])

    const src = cardUrl || cardIframeSrc;
    const sandboxOptions = cardSandboxOptions || cardIframeSandboxOptions;

    return (
        <div className={classes.root}>
            <div className={classes.overlay}/>
            <Framed src={src} sandboxOptions={sandboxOptions}/>
        </div>
    )
}
FramedCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FramedCard);
