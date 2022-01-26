// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React from 'react';
import PropTypes from 'prop-types';
import {useCardInfo} from '@ellucian/experience-extension/extension-utilities';
import {withStyles} from '@ellucian/react-design-system/core/styles';

import Framed from '../components/Framed';

const styles = () => ({
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
        zIndex: '9999'
    }
});

function FramedCard({classes}) {
    const {
        configuration: {
            cardIframeSrc: src,
            cardIframeSandboxOptions: sandboxOptions
        }
    } = useCardInfo();

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
