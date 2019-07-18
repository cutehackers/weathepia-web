const { topbar } = require('../../../../assets/dimens');

export default theme => ({
  container: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(4),
  },
  emptyWeatherView: {
    margin: 'auto',
    alignItems: 'center',
  }
});
