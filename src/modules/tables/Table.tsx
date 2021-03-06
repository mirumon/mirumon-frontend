import React, { Component } from 'react'
import { Theme, withStyles } from '@material-ui/core'
import { ITableConfiguration } from './ITableConfiguration'
import { ITableData, ITableRecord, TID } from './ITableData'
import TableRow from './rows/TableRow'
import CreatingRow from './rows/CreatingRow'

interface ITableHandlers {
    onCreate?(value: Partial<ITableRecord>): any
    onUpdate?(value: ITableRecord): any
    onDelete?(targetId: TID): any
    onCreateCancel?(): any
}

interface TableProps {
    isCreating?: boolean
    data?: ITableData
    configuration: ITableConfiguration
    handlers?: ITableHandlers
    classes: any
}

// TODO 1. Configuration preprocessing and memoization of preprocessing result.
// TODO 2. Preprocessing should convert arrays of columns into tree
// TODO 3. Preprocessing should convert keys into sets for faster search
// TODO 4. Refactor:
//         4.1. Extract search logic from all components. Components shouldn't know how processed configuration looks. Needed for separation of rendering and configuration preprocessing
// TODO 5. Configurations inheritance. Single storage of columns configuration in the app as basic pattern should be introduced.
class Table extends Component<TableProps> {
    render() {
        const { 
            isCreating,
            configuration,
            data = null,
            classes,
            handlers
        } = this.props
        const RowComponent = configuration.rows?.component || TableRow
        return (
            <table className={classes.table}>
                <thead>
                    <tr>
                        {
                            configuration.columns.map(column => {
                                const { key, label = key, type = 'text' } = column
                                return (
                                    <th className={classes.th} key={`${key}:${type}:${label}`}>
                                        <h3 style={{ margin: 0 }}>{label}</h3>
                                    </th>
                                )
                            })
                        }
                        <th className={classes.th} key={`Table::actions`}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isCreating && <CreatingRow
                            configuration={configuration}
                            onApply={handlers?.onCreate}
                            onClose={handlers?.onCreateCancel}
                        />
                    }
                    {
                        data && data.map(record => (
                            <RowComponent
                                key={"id" + record.id}
                                configuration={configuration}
                                data={record}
                                onChange={handlers?.onUpdate}
                                onDelete={() => handlers?.onDelete && handlers?.onDelete(record.id)}
                            />
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default withStyles(({ palette, typography }: Theme) => ({
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: typography.fontFamily,
    },
    th: {
        boxSizing: 'border-box',
        textAlign: 'left',
        borderBottom: `2px solid ${palette.primary.light}`,
        padding: '15px 20px',
        color: palette.text.disabled
    },
    td: {
        width: 'auto',
        padding: '15px 20px',
    }
}))(Table)