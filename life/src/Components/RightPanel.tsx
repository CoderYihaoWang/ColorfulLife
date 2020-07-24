import React from 'react';
import { BorderPolicy, ICellStyle } from '../Common/Interfaces';
import { Drawer } from '@material-ui/core';

interface IProps {
    refreshFrequency: number,
    setRefreshFrequency: (value: number) => void,
    width: number,
    setWidth: (value: number) => void,
    height: number,
    setHeight: (value: number) => void,
    underPopulationCriterion: number,
    setUnderPopulationCriterion: (value: number) => void,
    overPopulationCriterion: number,
    setOverPopulationCriterion: (value: number) => void,
    borderPolicy: BorderPolicy,
    setBorderPolicy: (value: BorderPolicy) => void,
    styles: ICellStyle[][]
    setStyles: (value: ICellStyle[][]) => void,
    isPanelOpen: boolean
}

export default function RightPanel(props: IProps) {
    return <Drawer variant="persistent" anchor="right" open={props.isPanelOpen}>Place holder for right panel</Drawer>
}