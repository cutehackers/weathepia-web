// Places styles
export default theme => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  horizontalGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  placesGrid: {
    flexWrap: 'nowrap',
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  itemContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  subtitle: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  info: {
    color: theme.palette.text.secondary
  },
  itemSeperator: {
    marginTop: theme.spacing(1),
  },
  placeGridBackgroud: {
    maxHeight: '185px',
    marginTop: theme.spacing(1),
  },
  progress: {
    marginTop: theme.spacing(2),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
