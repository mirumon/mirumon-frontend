import React, { Component } from 'react'
import { Theme, withStyles, IconButton, Typography } from '@material-ui/core'
import { TRowActionTypes, ValidatorError } from '../ITableConfiguration'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import WarningTooltip from './WarningTooltip'

interface EditingOptions {
    isEditing?: boolean
    onCancel?(): any
    onApply?(): any
    onEdit?(): any
}

interface TableRowActionsProps extends EditingOptions{
    actions: Array<TRowActionTypes>
    onDelete?(): any
    classes: any
    children?: React.ReactNode
    validatorErrorMessages?: ValidatorError
}

class TableRowActions extends Component<TableRowActionsProps> {
    render() {
        const {
            isEditing,
            actions,
            classes,
            onCancel,
            onApply,
            onEdit,
            onDelete,
            children,
            validatorErrorMessages
        } = this.props
        return (
            <td className={classes.td}>
                {
                    !isEditing ? (
                        <>
                            { actions.includes('update') && (
                                <IconButton onClick={() => onEdit && onEdit()}>
                                    <EditIcon />
                                </IconButton>
                            )}
                            {children}
                            { actions.includes('delete') && (
                                <IconButton onClick={() => onDelete && onDelete()}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            )}
                        </>
                    ) : (
                        <>
                            {
                                !validatorErrorMessages ? (
                                    <IconButton className={classes.successButton} onClick={() => onApply && onApply()}>
                                        <DoneIcon />
                                    </IconButton>
                                ) : (
                                    <WarningTooltip
                                        title={
                                            <>{ validatorErrorMessages.map(err => <Typography>{err.message}</Typography>) }</>
                                        }
                                    >
                                        <IconButton className={classes.warningButton}>
                                            <WarningIcon />
                                        </IconButton>
                                    </WarningTooltip>
                                )
                            }
                            <IconButton className={classes.errorButton} onClick={() => onCancel && onCancel()}>
                                <CloseIcon />
                            </IconButton>
                        </>
                    )
                }
            </td>
        )
    }
}

export default withStyles(({ palette, typography }: Theme) => ({
    td: {
        textAlign: 'right',
    },
    warningButton: {
        color: palette.warning.main
    },
    successButton: {
        color: palette.success.main
    },
    errorButton: {
        color: palette.error.main
    },
}))(TableRowActions)