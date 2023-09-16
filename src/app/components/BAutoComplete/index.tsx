import { FC } from "react"
import { MenuItem, Select, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { makeStyles } from "@material-ui/styles"
import { CssVariables } from "styles/global-styles"
import { ReactComponent as chevronDownIcon } from "images/icons/chevronDown.svg"
import styled from "styled-components/macro"

interface Props {
  options: string[]
  value?: string
  onChange: (value: string) => void
}

export const BAutoComplete: FC<Props> = ({ options, onChange, value }) => {
  const classes = useStyles()

  return (
    <Select
      classes={{
        root: classes.dropdown,
        icon: classes.icon,
        select: classes.paper,
      }}
      value={value ?? options[0]}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as string)
      }}
      disableUnderline
      MenuProps={{
        classes: { paper: classes.paper },
      }}
      IconComponent={() => <ChevronDownIcon />}
    >
      {options.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </Select>
  )
}

const useStyles = makeStyles({
  dropdown: {
    background: CssVariables.Black1,
    borderRadius: "8px",
    padding: "10px 38px 10px 10px !important",
    border: `1px solid ${CssVariables.Gray2}`,
    color: CssVariables.White,

    "&:focus": {
      borderRadius: "8px",
    },

    "& .MuiFormLabel-root": {
      color: CssVariables.White,
    },
    "& svg": {
      width: "24px",
      height: "24px",
      right: "10px",
      color: CssVariables.White,
    },
  },
  icon: {
    width: "24px",
    height: "24px",
    right: "10px",
    color: CssVariables.White,
  },
  paper: {
    color: CssVariables.White,
    background: CssVariables.Black1,
  },
})

const ChevronDownIcon = styled(chevronDownIcon)`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  path {
    fill: ${CssVariables.White};
  }
`
