import React, { Component } from 'react'
import Menu from 'UI/Menu/Menu'
import { withStyles, Theme, Box, Typography, IconButton } from '@material-ui/core'
import PageContent from 'UI/PageContent'

type SharedGroupsPageProps = {
    classes: any
}

class SharedGroupsPage extends Component<SharedGroupsPageProps> {
    render() {
        return (
            <Box>
                <Menu username="haspen" selectedTab="SharedGroupsPage"/>
                <PageContent>
                    Shared Groups
                </PageContent>
            </Box>
        )
    }
}

export default withStyles(({ palette }: Theme) => ({
}))(SharedGroupsPage)
