import React from 'react';
import {Button, Icon} from '@material-ui/core';

const PurchaseButton = () => {
    return (
        <Button component="a"
                href="https://pdf.co.ir/en/"
                target="_blank"
                rel="noreferrer noopener"
                role="button"
                className="normal-case"
                variant="contained"
                color="secondary">
            <Icon className="text-16 mr-4">shopping_cart</Icon>
            <span>Pishgaman Company</span>
        </Button>
    );
};

export default PurchaseButton;
