const { topbar } = require('../../assets/dimens');

// Article styles
export default theme => ({
  root: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
  titleText: {
    fontWeight: 500
  },
  contentsContainer: {
    padding: theme.spacing(3),
    width: '100%',
    height: '100%',
  },
  contentsTable: {
    marginTop: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  progress: {
    marginTop: theme.spacing(2),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
})