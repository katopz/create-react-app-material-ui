import React, { Component } from 'react'

// Material-UI
import Button from 'material-ui-next/Button'
import Input, { InputLabel } from 'material-ui-next/Input'
import { FormGroup, FormControlLabel, FormControl } from 'material-ui-next/Form'
import Card, { CardActions, CardContent } from 'material-ui-next/Card'
import Divider from 'material-ui-next/Divider'
import Checkbox from 'material-ui-next/Checkbox'
import Grid from 'material-ui-next/Grid'
import Typography from 'material-ui-next/Typography'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui-next/styles'

// Theme
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles'
import blue from 'material-ui-next/colors/blue'

// Font
import 'typeface-roboto'

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin'

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

// Styles
const styles = theme => ({
  card: {
    maxWidth: 630
  },
  container: {
    display: 'grid',
    gridGap: `${theme.spacing.unit * 3}px`
  },
  button: {
    width: '100%'
  }
})

class App extends Component {
  constructor (props, context) {
    super(props, context)

    // Default text
    this.state = {
      publicKey: '',
      secret: '',
      isAccepted: false
    }
  }

  handleChange = name => event => {
    // Set state
    this.setState({ [name]: event.target.checked })

    // Do something with text
    alert(`Agree : ${event.target.checked}`)
  }

  onSubmit = e => {
    // No real submit
    e.preventDefault()

    // Get input value
    const publicKey = e.target.publicKey.value
    const secret = e.target.secret.value

    // Set state
    this.setState({
      publicKey,
      secret
    })

    // Do something with text
    alert(
      `Public key : ${publicKey}
    Secret : ${secret}`
    )
  }

  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <form onSubmit={this.onSubmit}>
            <CardContent>
              <div className={classes.container}>
                <Typography variant='title' gutterBottom>
                  Material-UI Example
                </Typography>
                <FormGroup row>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='publicKey'>Public Key</InputLabel>
                    <Input id='publicKey' defaultValue={this.state.publicKey} />
                  </FormControl>
                  <Divider className={classes.divider} />
                  <FormControl fullWidth>
                    <InputLabel htmlFor='secret'>Secret</InputLabel>
                    <Input id='secret' defaultValue={this.state.secret} />
                  </FormControl>
                  <Divider className={classes.divider} />
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={<Checkbox checked={this.state.isAccepted} onChange={this.handleChange('isAccepted')} value='isAccepted' color='primary' />}
                      label='I understand and will use this with my own risk'
                    />
                  </FormControl>
                </FormGroup>
              </div>
            </CardContent>
            <CardActions>
              <Grid container spacing={24}>
                <Grid item xs={8}>
                  <Button onClick={() => alert(':p')}>Cancel</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button type='submit' variant='raised' color='primary' className={classes.button}>OK</Button>
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
