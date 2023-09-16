import {
  AppBar,
  Container,
  createStyles,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { SidebarWidth } from "app/constants"
import { useState } from "react"
import { CssVariables } from "styles/global-styles"
import { SideBar } from "../Sidebar"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("lg")]: {
        width: SidebarWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      background: CssVariables.Black1,
      borderBottom: `1px solid ${CssVariables.Gray1}`,
      [theme.breakpoints.up("lg")]: {
        width: `calc(100% - ${SidebarWidth}px)`,
        marginLeft: SidebarWidth,
      },
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      marginLeft: theme.spacing(2),
      color: CssVariables.White,
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      width: "max-content",
      color: CssVariables.Secondary,
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    drawerPaper: {
      width: SidebarWidth,
      borderRight: `1px solid ${CssVariables.Gray1}`,
      background: CssVariables.Black1,
    },
  })
)

export const Navigation = () => {
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container className={classes.content}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <span className={classes.logo}>Concordium Name Service</span>
        </Container>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden lgUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <SideBar />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <SideBar />
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}
