import React, {Component} from 'react';
import {withStyles, Select, Button, Card, Divider, FormControl, Icon, MenuItem, Typography} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import _ from '@lodash';
import { withTranslate } from 'react-redux-multilingual';

class Widget7 extends Component {

    state = {
        dataset: 'Today'
    };

    setDataSet = (ev) => {
        this.setState({dataset: ev.target.value});
    };

    render()
    {
        const {data: dataRaw, theme, translate} = this.props;
        const {dataset} = this.state;
        const data = _.merge({}, dataRaw);
        const dataWithColors = data.datasets[dataset].map(obj => ({
            ...obj,
            borderColor         : theme.palette.divider,
            backgroundColor     : [
                theme.palette.primary.dark,
                theme.palette.primary.main,
                theme.palette.primary.light
            ],
            hoverBackgroundColor: [
                theme.palette.secondary.dark,
                theme.palette.secondary.main,
                theme.palette.secondary.light
            ]
        }));
        return (
            <Card className="w-full rounded-8 shadow-none border-1">

                <div className="p-16">
                    <Typography className="h1 font-300">{translate('Sessions_by_device')}</Typography>
                </div>

                <div className="h-224 relative">
                    <Doughnut
                        data={{
                            labels  : data.labels,
                            datasets: dataWithColors
                        }}
                        options={data.options}/>
                </div>

                <div className="p-16 flex flex-row items-center justify-center">

                    {data.labels.map((label, index) => (
                        <div key={label} className="px-16 flex flex-col items-center">

                            <Typography className="h4" color="textSecondary">{label}</Typography>
                            <Typography className="h2 font-300 py-8">{data.datasets[dataset][0].data[index]}%</Typography>

                            <div className="flex flex-row items-center justify-center">

                                {data.datasets[dataset][0].change[index] < 0 && (
                                    <Icon className="text-18 pr-4 text-red">
                                        arrow_downward
                                    </Icon>
                                )}

                                {data.datasets[dataset][0].change[index] > 0 && (
                                    <Icon className="text-18 pr-4 text-green">
                                        arrow_upward
                                    </Icon>
                                )}
                                <div className="h5">
                                    {data.datasets[dataset][0].change[index]}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Divider className="mx-16"/>

                <div className="p-16 flex flex-row items-center justify-between">
                    <div>
                        <FormControl className="">
                            <Select value={dataset} onChange={this.setDataSet}>
                                {Object.keys(data.datasets).map(key => (
                                    <MenuItem key={key} value={key}>{key}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button size="small">{translate('Overview')}</Button>
                </div>
            </Card>
        );
    }
}

export default withStyles(null, {withTheme: true})(withTranslate(Widget7));
