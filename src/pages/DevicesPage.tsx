import React, { Component } from 'react'
import { withStyles, Theme, Box, Typography, IconButton } from '@material-ui/core'
import PageContent from 'UI/PageContent'
import PageWithMenu from 'UI/PageWithMenu'

type DevicesPageProps = {
    classes: any
}

class DevicesPage extends Component<DevicesPageProps> {
    render() {
        return (
            <PageWithMenu>
                <PageContent>
                    Devices – Coming soon...
                </PageContent>
            </PageWithMenu>
        )
    }
}

export default withStyles(({ palette }: Theme) => ({
}))(DevicesPage)
