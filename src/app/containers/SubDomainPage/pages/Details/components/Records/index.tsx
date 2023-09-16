import { Box, Grid } from "@material-ui/core"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { CssVariables } from "styles/global-styles"
import { RecordBox } from "./style"
import { ReactComponent as EditIcon } from "images/icons/edit.svg"
import { ReactComponent as ExtraLinkIcon } from "images/icons/external-link.svg"
import { ReactComponent as TrashIcon } from "images/icons/trash.svg"
import { ReactComponent as PlusSquareIcon } from "images/icons/plus-square.svg"
import { IconButton } from "app/containers/DomainPage/style"

export const Records = () => {
  return (
    <Box pt={1}>
      <BTitle size="h5" weight="med" color={CssVariables.Gray4}>
        Records
      </BTitle>
      <BText size="m" weight="med">
        Attach records such as wallet addresses, URLs and texts to your domain
        name.
      </BText>
      <RecordBox mt={2} mb={3}>
        <BText size="l" weight="med" color={CssVariables.White}>
          Wallets
        </BText>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Concordium
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg" color={CssVariables.White}>
                  4c7goyyukBh2wFuc94SWvCo8XXkmTt761ty9t9v
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <ExtraLinkIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Danger}>
                    <TrashIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Ethereum
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Near wallet
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </RecordBox>
      <RecordBox mt={2} mb={3}>
        <BText size="l" weight="med" color={CssVariables.White}>
          Texts and Links
        </BText>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Twitter
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg" color={CssVariables.White}>
                  https://twitter.com/kudabank
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <ExtraLinkIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Danger}>
                    <TrashIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Facebook
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Github
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg" color={CssVariables.White}>
                  github.com/bictory_finance
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <ExtraLinkIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Primary}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton stroke={CssVariables.Danger}>
                    <TrashIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Description
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Email
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Avatar
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BText size="l" weight="med">
                Url
              </BText>
            </Grid>
            <Grid item xs={9}>
              <Box display="flex" alignItems="center">
                <BText size="l" weight="reg">
                  Not set
                </BText>
                <Box display="flex" alignItems="center" ml={1}>
                  <IconButton fill={CssVariables.Primary}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </RecordBox>
    </Box>
  )
}
