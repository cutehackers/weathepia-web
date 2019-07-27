import React from 'react';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
  cell: {
    marginLeft: theme.spacing(2)
  }
}));

// const headRows = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)'
//   },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' }
// ];
const headRows = [
  {
    id: 'contents',
    numeric: false,
    disablePadding: true,
    label: 'Contents'
  }
];

function isAdmin(user) {
  return user && user.type === 1
}

const ArticleHead = (props) => {
  const classes = useStyles();

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    user
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {isAdmin(user) && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        )}
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            // padding={row.disablePadding ? 'none' : 'default'}

            sortDirection={orderBy === row.id ? order : false}
            className={classes.cell}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}>
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ArticleHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.authorization;
  return {
    user
  };
}

export default compose(
  connect(mapStateToProps)
)(ArticleHead);
