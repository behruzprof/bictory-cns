import { Box, Grid } from "@material-ui/core"
import { BText } from "app/components/common/BText"
import { BTitle } from "app/components/common/BTitle"
import { CssVariables } from "styles/global-styles"
import { RecordBox } from "./style"
import { RecordValue } from "../RecordValue"
import { SetAddress } from "../SetAddress"
import { DomainPageSelectors } from "app/containers/DomainPage/selectors"
import { useSelector } from "react-redux"

export const Records = () => {
  const domain = useSelector(DomainPageSelectors.domain)

  const canCud = domain?.status !== "listed"

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
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Concordium
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <SetAddress />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Ethereum
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Ethereum" type="4" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Solana
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Solana" type="4" canCud={canCud} />
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
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Twitter
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Twitter" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Facebook
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Facebook" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Github
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Github" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Description
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Description" type="4" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Email
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Email" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Avatar
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Avatar" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={[4, 4, 3]}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <BText size="l" weight="med">
                Url
              </BText>
            </Grid>
            <Grid item xs={12} md={9}>
              <RecordValue name="Url" type="2" canCud={canCud} />
            </Grid>
          </Grid>
        </Box>
      </RecordBox>
    </Box>
  )
}
