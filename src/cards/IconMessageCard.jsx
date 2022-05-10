// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ellucian/ds-icons/lib';
import { Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { colorTextNeutral500, sizingXxLarge, spacing30, spacing60 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCache, useCardInfo, useThemeInfo } from '@ellucian/experience-extension/extension-utilities';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: spacing60
    },
    icon: {
        height: `${sizingXxLarge} !important`,
        width: `${sizingXxLarge} !important`,
        marginBottom: spacing30
    },
    text: {
        color: colorTextNeutral500
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: '9998'
    }
});

const cacheKey = 'custom-configuration';

function IconMessageCard({classes}) {
    const { storeItem } = useCache();
    const {
        cardId,
        configuration: {
            customConfiguration,
            customConfiguration: {
                cardIconName,
                cardMessageHeader,
                cardMessage
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

    const { primaryColor } = useThemeInfo();

    return (
        <div className={classes.root}>
            <div className={classes.overlay}/>
            <Icon className={classes.icon} style={{ color: primaryColor }} name={cardIconName} large/>
            <Typography variant="h4" component="div">
                {cardMessageHeader}
            </Typography>
            <Typography className={classes.text} variant="body2" component="div">
                {cardMessage}
            </Typography>
        </div>
    )
}
IconMessageCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconMessageCard);
