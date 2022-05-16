// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { icons, Icon } from '@ellucian/ds-icons/lib';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Dialog,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { sizingXxLarge, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCardControl, useCardInfo, useThemeInfo } from '@ellucian/experience-extension/extension-utilities';

import InfoIconPopper from '../components/InfoIconPopper';
import { withIntl } from '../components/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    gridItemWithInfo: {
        width: 'inherit',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    urlPopper: {
        maxWidth: '20rem'
    },
    infoIconPopper: {
        marginTop: spacing30,
        marginLeft: spacing30
    },
    selectButton: {
    },
    selectButtonIcon: {
        height: `${sizingXxLarge} !important`,
        width: `${sizingXxLarge} !important`
    },
    iconsIcon: {
        cursor: 'pointer'
    },
    textField: {
        width: '80%'
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: '9999'
    }
});

const sandboxOptionsList = [
    'allow-downloads',
    'allow-forms',
    'allow-modals',
    'allow-popups',
    'allow-popups-to-escape-sandbox',
    'allow-same-origin',
    'allow-scripts',
    'allow-scrolling',
    'allow-top-navigation'
];

/*
const additionalSandboxOptionsList = [
    'allow-downloads-without-user-activation',
    'allow-orientation-lock',
    'allow-pointer-lock',
    'allow-presentation',
    'allow-storage-access-by-user-activation',
    'allow-top-navigation-by-user-activation'
]
*/

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/;
function isValidUrl(value = '') {
    return urlRegex.test(value);
}

function FramedCardConfiguration(props) {
    const {classes} = props;
    console.log(props);
    const intl = useIntl();

    const { primaryColor } = useThemeInfo();

    const {
        setCustomConfiguration,
        setIsCustomConfigurationValid
    } = useCardControl();

    const {
        configuration: { customConfiguration = {} }
    } = useCardInfo();

    const [ configurationLoaded, setConfigurationLoaded ] = useState(false);
    const [ showSelectIcon, setShowSelectIcon ] = useState(false);
    const [ cardIconName, setCardIconName ] = useState('');
    const [ cardMessageHeader, setCardMessageHeader ] = useState('');
    const [ cardMessage, setCardMessage ] = useState('');
    const [ pageUrl, setPageUrl ] = useState('');
    const [ pageUrlIsValid, setPageUrlIsValid ] = useState(true);
    const [ pageSandboxOptions, setPageSandboxOptions ] = useState({});

    useEffect(() => {
        if (customConfiguration && !configurationLoaded) {
            setConfigurationLoaded(true);

            const {
                client: {
                    cardIconName,
                    cardMessageHeader,
                    cardMessage,
                    pageSandboxOptions = '',
                    pageUrl
                } = {}
            } = customConfiguration;

            setCardIconName(cardIconName);
            setCardMessageHeader(cardMessageHeader);
            setCardMessage(cardMessage);

            setPageUrl(pageUrl);

            const newPageSanboxOptions = {};
            const configuredPageOptions = pageSandboxOptions.split(' ');
            configuredPageOptions.forEach(option => {
                // make sure it is in the list
                if (sandboxOptionsList.includes(option)) {
                    newPageSanboxOptions[option] = true;
                }
            })
            setPageSandboxOptions(newPageSanboxOptions);
        }
    }, [customConfiguration, configurationLoaded]);

    useEffect(() => {
        // validate and set custom configuration
        setPageUrlIsValid(isValidUrl(pageUrl));

        const pageSandboxOptionsValue = sandboxOptionsList.reduce( (value, option) => {
            const optionValue = pageSandboxOptions[option] === true ? `${option} ` : '';
            return `${value}${optionValue}`
        }, '').slice(0, -1);

        const newConfig = {
            customConfiguration: {
                client: {
                    cardIconName,
                    cardMessageHeader,
                    cardMessage,
                    pageUrl,
                    pageSandboxOptions: pageSandboxOptionsValue
                }
            }
        }

        setCustomConfiguration(newConfig);
    }, [cardIconName, cardMessage, cardMessageHeader, pageUrl, pageSandboxOptions, setCustomConfiguration]);

    useEffect(() => {
        setIsCustomConfigurationValid(cardIconName && cardIconName !== '' && pageUrlIsValid);
    }, [cardIconName, pageUrlIsValid, setIsCustomConfigurationValid]);

    function onShowSelectIcon() {
        setShowSelectIcon(true);
    }

    function onCloseSelectIcon() {
        setShowSelectIcon(false);
    }

    function onSelectIcon(name) {
        setCardIconName(name);
        setShowSelectIcon(false);
    }

    function onCardMessageHeaderChange({target}) {
        setCardMessageHeader(target.value);
    }

    function onCardMessageChange({target}) {
        setCardMessage(target.value);
    }

    function onPageUrlChange({target}) {
        setPageUrl(target.value);
    }

    function onPageOptionChange(event) {
        const option = event.target.value;
        const currentValue = pageSandboxOptions[option] || false;

        setPageSandboxOptions(options => ({...options, [option]: !currentValue}))
    }

    return (
        <Grid container spacing={4} alignItems={'stretch'} justify='center'>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardHeader title={intl.formatMessage({id: 'card-header'})}/>
                    <CardContent>
                        <Grid container spacing={4} direction={'column'} alignItems={'stretch'} justify='flex-start'>
                            <Grid item>
                                <Grid container spacing={4} alignItems={'center'}>
                                    <Grid item>
                                        <Button
                                            className={classes.selectButton}
                                            size="large"
                                            onClick={onShowSelectIcon}
                                        >
                                            {intl.formatMessage({id: 'select-icon'})}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Icon
                                            className={classes.selectButtonIcon}
                                            name={cardIconName}
                                            style={{ color: primaryColor }}
                                        />
                                    </Grid>
                                </Grid>
                                <Dialog open={showSelectIcon} onClose={onCloseSelectIcon}>
                                    <Typography variant="h3">
                                        {intl.formatMessage({id: 'select-an-icon'})}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {icons.map( iconName => (
                                            <Grid item key={iconName}>
                                                <Icon
                                                    className={classes.iconsIcon}
                                                    large
                                                    style={{ color: primaryColor }}
                                                    name={iconName}
                                                    onClick={() => onSelectIcon(iconName)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Dialog>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="card-message-header"
                                    className={classes.textField}
                                    label={intl.formatMessage({id: 'message-header'})}
                                    onChange={onCardMessageHeaderChange}
                                    placeholder={intl.formatMessage({ id: 'enter-message-header'})}
                                    required={true}
                                    value={cardMessageHeader}
                                    fullWidth={false}
                                    type='text'
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="card-message"
                                    className={classes.textField}
                                    label={intl.formatMessage({id: 'description-text'})}
                                    onChange={onCardMessageChange}
                                    placeholder={intl.formatMessage({ id: 'enter-description-text' })}
                                    required={true}
                                    value={cardMessage}
                                    fullWidth={false}
                                    type='text'
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardHeader title={intl.formatMessage({id: 'page-header'})}/>
                    <CardContent>
                        <Grid container spacing={4} direction={'column'} alignItems={'stretch'} justify='center'>
                            <Grid item>
                                <div className={classes.gridItemWithInfo}>
                                    <TextField
                                        id="page-url"
                                        className={classes.textField}
                                        error={!pageUrlIsValid && pageUrl !== undefined}
                                        helperText={pageUrlIsValid ? '' : intl.formatMessage({id: 'urlMustBeValid'})}
                                        label={intl.formatMessage({id: 'url'})}
                                        onChange={onPageUrlChange}
                                        placeholder={intl.formatMessage({ id: 'enterPageUrl'})}
                                        required={true}
                                        value={pageUrl}
                                        fullWidth={false}
                                        type='url'
                                    />
                                    <InfoIconPopper
                                        id='dynamicUrlInfoText'
                                        popperText={'standardCardEditor.dynamicUrlInfoText'}
                                        popperClasses={classes.urlPopper}
                                        buttonClasses={classes.infoIconPopper}
                                    />
                                </div>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" color="textSecondary">
                                    {intl.formatMessage({id: 'optionsTitle'})}
                                </Typography>
                                <Typography variant="body3" component="span" color="textSecondary">
                                    {intl.formatMessage({id: 'optionsSecurityWarning'})}
                                </Typography>
                                <FormGroup className={classes.group} >
                                    {sandboxOptionsList.map( option => (
                                        <FormControlLabel
                                            key={option}
                                            className={classes.label}
                                            control={
                                                <Checkbox
                                                    checked={pageSandboxOptions[option] === true}
                                                    onChange={onPageOptionChange}
                                                />
                                            }
                                            label={option}
                                            value={option}
                                        />

                                    ))}
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
FramedCardConfiguration.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withIntl(withStyles(styles)(FramedCardConfiguration));
