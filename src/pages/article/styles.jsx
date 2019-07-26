const { topbar } = require('../../assets/dimens');

// Article styles
export default theme => ({
  root: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
})