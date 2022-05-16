import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Popper, IconButton } from '@ellucian/react-design-system/core';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { Icon } from '@ellucian/ds-icons/lib';
import { withStyles } from '@ellucian/react-design-system/core/styles';

const styles = {
    popper: {
        maxWidth: '17rem'
    },
    button: {
        padding: spacing20
    }
};

const InfoIconPopper = props => {
    const [anchorEl, setAnchorEl] = useState();

    const {
        buttonClasses,
        children,
        classes,
        IconButtonProps,
        IconProps,
        id,
        name,
        popperClasses,
        popperOptions,
        PopperProps,
        popperText
    } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <IconButton id={`${id}-icon-btn`}
                className={classes.button}
                aria-label={props['aria-label'] ? props['aria-label'] : popperText}
                aria-labelledby={props['aria-labelledby']}
                aria-controls={`${id}-popper`}
                aria-expanded={Boolean(anchorEl)}
                color="gray"
                onClick={handleClick}
                classes={{
                    root: buttonClasses
                }}
                {...IconButtonProps}
            >
                <Icon
                    name={name ? name : 'info'}
                    {...IconProps}
                />
            </IconButton>
            <Popper
                id={`${id}-popper`}
                classes={{paperRoot: popperClasses ? popperClasses : classes.popper}}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                arrow
                text={popperText}
                placement="bottom-start"
                popperOptions={popperOptions}
                transition={false}
                onClickAway={handleClose}
                {...PopperProps}
            >
                {children}
            </Popper>
        </Fragment>
    );
}

InfoIconPopper.propTypes = {
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    buttonClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    IconButtonProps: PropTypes.object,
    IconProps: PropTypes.object,
    name: PropTypes.string,
    popperClasses: PropTypes.string,
    popperOptions: PropTypes.object,
    PopperProps: PropTypes.object,
    popperText: PropTypes.string
};

export default withStyles(styles)(InfoIconPopper);
