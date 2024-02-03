import { Tooltip as MuiToolTip, TooltipProps, useTheme } from '@mui/material'

// the tooltip component children need to be wrapped in div
// https://mui.com/material-ui/react-tooltip/#custom-child-element
const Tooltip = ({ children, title, ...other }: TooltipProps) => {
  const theme = useTheme()
  return (
    <MuiToolTip
      title={title}
      {...other}
      PopperProps={{
        ...other.PopperProps,
        sx: {
          ...other.PopperProps?.sx,
          '& .MuiTooltip-tooltip': {
            backgroundColor: theme.palette.background.paper,
            padding: 0,
            maxWidth: 480,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
            color: theme.palette.text.primary,
          },
        },
      }}
    >
      <div>{children}</div>
    </MuiToolTip>
  )
}

export default Tooltip
