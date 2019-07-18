const { topbar } = require('../../assets/dimens');

export default theme => ({
  container: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
  progress: {
    display: 'block',
    margin: 'auto',
  }
});
