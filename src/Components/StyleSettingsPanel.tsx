import React, { useState } from 'react';
import { IPropertyName, IStyleSettingsPanelProps } from '../Common/Interfaces';
import { Tabs, makeStyles, Tab, Button, FormControlLabel, Select, MenuItem, RadioGroup, Radio, List, ListItem, Divider, Paper } from '@material-ui/core';
import InputTitle from './InputTitle';
import makeSettingsByPropertiesPanel from './SettingsByPropertiesPanel';
import makeSettingsByNeighborsPanel from './SettingsByNeighborsPanel';
import Random from '../Common/Random';

const useStyles = makeStyles({
  tab: {
    minWidth: 0,
    width: '50%',
    marginTop: 20
  },
  selectorWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 14
  }
});

export default function StyleSettingsPanel(props: IStyleSettingsPanelProps) {
  const classes = useStyles();

  const [tab, setTab] = useState<number>(0)
    , [isGroupedByProperties, setIsGroupedByProperties] = useState<boolean>(false)
    , [neighbors, setNeighbors] = useState<number>(0)
    , [propertyName, setPropertyName] = useState<IPropertyName>('size');

  const handleRandom = () => {
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j < 9; j++) {
        props.styles[i][j] = Random.style();
      }
    }
    props.setStyles([...props.styles]);
  }

  const handleReset = () => {
    props.setStyles(JSON.parse(JSON.stringify(props.template.styles)))
  };

  const NeighborsSelector = <div className={classes.selectorWrapper}>
    <InputTitle>Neighbors</InputTitle>
      <Select value={neighbors} onChange={(e) => setNeighbors(e.target.value as number)}>
        {
          new Array(9).fill(0)
            .map((v, i) => <MenuItem value={i} key={i}>{i}</MenuItem>)
        }
      </Select>
  </div>

  const PropertyNameSelector = <div className={classes.selectorWrapper}>
    <InputTitle>Property</InputTitle>
      <Select value={propertyName} onChange={(e) => setPropertyName(e.target.value as IPropertyName)}>
        <MenuItem value="size">Size</MenuItem>
        <MenuItem value="shape">Shape</MenuItem>
        <MenuItem value="elevation">Elevation</MenuItem>
        <MenuItem value="borderWidth">Border Width</MenuItem>
        <MenuItem value="color">Color</MenuItem>
        <MenuItem value="background">Background Color</MenuItem>
        <MenuItem value="borderColor">Border Color</MenuItem>
      </Select>
  </div>

  return <div>
    <InputTitle>Group by:</InputTitle>
    <RadioGroup
      value={isGroupedByProperties}
      onChange={(e) => setIsGroupedByProperties((e.target as HTMLInputElement).value === "properties")}
    >
      <div className={classes.labelWrapper}>
        <FormControlLabel
          labelPlacement="start"
          classes={{label: classes.label}}
          value={"neighbors"}
          control={<Radio color="primary" checked={!isGroupedByProperties} />}
          label="Neighbors" />
        <FormControlLabel
          labelPlacement="start"
          classes={{label: classes.label}}
          value={"properties"}
          control={<Radio color="primary" checked={isGroupedByProperties} />}
          label="Properties" />
      </div>
    </RadioGroup>
    <Tabs
      value={tab}
      onChange={(e, v) => setTab(v)}
    >
      <Tab label="Alive" className={classes.tab}/>
      <Tab label="Dead" className={classes.tab} />
    </Tabs>
    <div hidden={tab !== 0}>
      {
        isGroupedByProperties
          ? PropertyNameSelector
          : NeighborsSelector
      }
      {
        isGroupedByProperties
          ? makeSettingsByPropertiesPanel("alive", propertyName)(props)
          : makeSettingsByNeighborsPanel("alive", neighbors)(props)
      }
    </div>
    <div hidden={tab !== 1}>
      {
        isGroupedByProperties
          ? PropertyNameSelector
          : NeighborsSelector
      }
      {
        isGroupedByProperties
          ? makeSettingsByPropertiesPanel("dead", propertyName)(props)
          : makeSettingsByNeighborsPanel("dead", neighbors)(props)
      }
    </div>
    <Divider />
    <List>
      <ListItem>
        <Button variant="contained" fullWidth color="primary" onClick={handleReset}>
          Reset All
        </Button>
      </ListItem>
      <ListItem>
        <Button variant="contained" fullWidth color="primary" onClick={handleRandom}>
          Randomise All
        </Button>
      </ListItem>
    </List>
  </div>
}