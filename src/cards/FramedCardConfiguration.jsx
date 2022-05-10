// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {useCardControl, useCardInfo} from '@ellucian/experience-extension/extension-utilities';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@ellucian/react-design-system/core';
import {withStyles} from '@ellucian/react-design-system/core/styles';
import {spacing30} from '@ellucian/react-design-system/core/styles/tokens';

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
    textField: {
        width: '80%',
        marginBottom: '1rem'
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
    'allow-top-navigation',
    'allow-top-navigation-by-user-activation'
]
*/

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/;
function isValidUrl(value = '') {
    return urlRegex.test(value);
}

function FramedCardConfiguration({classes}) {
    const intl = useIntl();

    const {
        setCustomConfiguration,
        setIsCustomConfigurationValid
    } = useCardControl();

    const {
        configuration: {
            client: {
                cardIframeSrc,
                cardIframeSandboxOptions,
                pageIframeSrc,
                pageIframeSandboxOptions
            },
            customConfiguration = {}
        }
    } = useCardInfo();

    const [ configurationLoaded, setConfigurationLoaded ] = useState(false);
    const [ cardUrl, setCardUrl ] = useState('');
    const [ cardUrlIsValid, setCardUrlIsValid ] = useState(true);
    const [ cardSandboxOptions, setCardSandboxOptions ] = useState({});
    const [ pageUrl, setPageUrl ] = useState('');
    const [ pageUrlIsValid, setPageUrlIsValid ] = useState(true);
    const [ pageSandboxOptions, setPageSandboxOptions ] = useState({});

    useEffect(() => {
        if (customConfiguration && !configurationLoaded) {
            setConfigurationLoaded(true);

            const {
                client: {
                    cardSandboxOptions,
                    cardUrl,
                    pageSandboxOptions,
                    pageUrl
                } = {}
            } = customConfiguration;

            setCardUrl(cardUrl || cardIframeSrc);

            const newCardSanboxOptions = {};
            const configuredCardOptions = (cardSandboxOptions || cardIframeSandboxOptions || '').split(' ');
            configuredCardOptions.forEach(option => {
                // make sure it is in the list
                if (sandboxOptionsList.includes(option)) {
                    newCardSanboxOptions[option] = true;
                }
            })
            setCardSandboxOptions(newCardSanboxOptions);

            setPageUrl(pageUrl || pageIframeSrc);

            const newPageSanboxOptions = {};
            const configuredPageOptions = (pageSandboxOptions || pageIframeSandboxOptions || '').split(' ');
            configuredPageOptions.forEach(option => {
                // make sure it is in the list
                if (sandboxOptionsList.includes(option)) {
                    newPageSanboxOptions[option] = true;
                }
            })
            setPageSandboxOptions(newPageSanboxOptions);
        }
    }, [customConfiguration, configurationLoaded, cardIframeSrc, cardIframeSandboxOptions, pageIframeSrc, pageIframeSandboxOptions]);

    useEffect(() => {
        // validate and set custom configuration
        setCardUrlIsValid(isValidUrl(cardUrl));
        setPageUrlIsValid(isValidUrl(pageUrl));

        const cardSandboxOptionsValue = sandboxOptionsList.reduce( (value, option) => {
            const optionValue = cardSandboxOptions[option] === true ? `${option} ` : '';
            return `${value}${optionValue}`
        }, '').slice(0, -1);


        const pageSandboxOptionsValue = sandboxOptionsList.reduce( (value, option) => {
            const optionValue = pageSandboxOptions[option] === true ? `${option} ` : '';
            return `${value}${optionValue}`
        }, '').slice(0, -1);

        const newConfig = {
            customConfiguration: {
                client: {
                    cardUrl,
                    cardSandboxOptions: cardSandboxOptionsValue,
                    pageUrl,
                    pageSandboxOptions: pageSandboxOptionsValue
                }
            }
        }

        setCustomConfiguration(newConfig);
    }, [cardUrl, cardSandboxOptions, pageUrl, pageSandboxOptions, setCustomConfiguration]);

    useEffect(() => {
        setIsCustomConfigurationValid(cardUrlIsValid && pageUrlIsValid);
    }, [cardUrlIsValid, pageUrlIsValid, setIsCustomConfigurationValid]);

    function onCardUrlChange({target}) {
        setCardUrl(target.value);
    }

    function onCardOptionChange(event) {
        const option = event.target.value;
        const currentValue = cardSandboxOptions[option] || false;

        setCardSandboxOptions(options => ({...options, [option]: !currentValue}))
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
                        <Grid container spacing={0} direction={'column'} alignItems={'stretch'} justify='flex-start'>
                            <Grid item>
                                <div className={classes.gridItemWithInfo}>
                                    <TextField
                                        id="card-url"
                                        className={classes.textField}
                                        error={!cardUrlIsValid && cardUrl !== undefined}
                                        helperText={cardUrlIsValid ? '' : intl.formatMessage({id: 'urlMustBeValid'})}
                                        label={intl.formatMessage({id: 'url'})}
                                        onChange={onCardUrlChange}
                                        placeholder={intl.formatMessage({ id: 'enterCardUrl'})}
                                        required={true}
                                        value={cardUrl}
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
                                                    checked={cardSandboxOptions[option] === true}
                                                    onChange={onCardOptionChange}
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
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardHeader title={intl.formatMessage({id: 'page-header'})}/>
                    <CardContent>
                        <Grid container spacing={0} direction={'column'} alignItems={'stretch'} justify='flex-start'>
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
