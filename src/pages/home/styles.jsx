const { topbar } = require('../../assets/dimens');

export default theme => ({
  container: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
  contentContainer: {
    padding: theme.spacing(3),
  },
  cityTitleText: {
    fontWeight: 500
  },
  titleText: {
    marginTop: theme.spacing(3),
    fontWeight: 500
  },
  progress: {
    display: 'block',
    margin: 'auto',
  }
});
