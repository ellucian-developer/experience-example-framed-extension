// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@ellucian/react-design-system/core/styles';

const styles = () => ({
    root: {
        border: 'none',
        flex: '1 1 auto'
    }
});

function Framed({classes, sandboxOptions, src, title = 'framed'}) {

    return (
        <iframe
            className={classes.root}
            sandbox={ sandboxOptions }
            title={ title }
            src={ src }
        />
    )
}

Framed.propTypes = {
    classes: PropTypes.object.isRequired,
    sandboxOptions: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default withStyles(styles)(Framed);
