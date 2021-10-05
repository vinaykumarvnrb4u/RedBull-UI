import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './TablePaginationActions';

import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';

import { limit } from '../utils/constants';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables({ data, handleAction, actions, count, handleChangePageNum, page }) {

    if (!data || !data.length) return <div> NO DATA </div>;

    const formatColumns = () => {
        const keys = Object.keys(data[0]);
        if (keys.length && actions && actions.length) keys.push('actions');
        return keys;
    }
    const columns = formatColumns();

    const getRow = (row, index) => {
        const cols = Object.keys(data[0]);
        const rowCells = cols.map((column, i) => <StyledTableCell component="th" scope="row" key={`${column}-${i}`}>{row[column]}</StyledTableCell>)
        if (!actions || !actions.length) return rowCells;
        const actionCell = (<StyledTableCell component="th" scope="row" key={`$action-${row.id}`}>
            {actions.map((action, i) => (
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={action.name} key={`${action}-${i}`}>
                    <IconButton aria-label="delete" size="small" onClick={(e) => handleAction(e, row.queue, row.id, action.name, index)} key={`${i}`}>
                        <action.icon />
                    </IconButton>
                </Tooltip>
            ))}
        </StyledTableCell>);
        return rowCells.concat(actionCell);
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
            <Table sx={{ minWidth: 700 }} stickyHeader aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) =>
                            <StyledTableCell key={column}> {column.toUpperCase()} </StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <StyledTableRow key={`${row.id || row.name}-${i}`}>
                            {getRow(row, i)}
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[limit]}
                            colSpan={2}
                            count={count}
                            rowsPerPage={limit}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePageNum}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
