import React, { Component } from 'react';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

import { withStyles } from '@material-ui/core';
import { getArticles, createArticle } from '../../redux/actions/article.actions';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomePageLayout from '../../layout/home/HomePageLayout';
import ArticleTable from './components/ArticleTable';
import styles from './styles';


/**
 * Article page container component
 */
class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      articleContent: '',
    };
  }

  openDialog = (isOpenDialog) => {
    this.setState(prevState => ({
      isOpen: isOpenDialog
    }));
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  isAdmin = user => {
    return user && user.type === 1
  }

  handleAddClick = () => {
    this.openDialog(true);
  }

  handleDialogClose = () => {
    this.openDialog(false);
  }

  handleArticleContentChange = (event) => {
    this.setState({
      articleContent: event.target.value
    })
  }

  handleArticleCreateClick = () => {
    const { dispatch } = this.props;
    const { articleContent } = this.state;

    if (articleContent && articleContent.length > 0) {
      dispatch(createArticle({
        content: articleContent
      }));
      this.handleDialogClose();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getArticles());
  }
  
  render() {
    const { classes } = this.props;
    const { isOpen, articleContent } = this.state;
    const { user, isArticleRequesting, articles } = this.props;
    
    return (
      <HomePageLayout title="Article">
        <div className={classes.root}> 
          <div className={classes.contentsContainer}>
            <Typography
              className={classes.titleText}
              variant="h3"
            >
              {'Boards'}
            </Typography>
            {isArticleRequesting ? (
              <CircularProgress className={classes.progress} />
            ): (
              <ArticleTable source={articles} />
            )}
          </div>
          {this.isAdmin(user) && (
            <Fab 
              aria-label="add" 
              className={classes.fab}
              color="primary" 
            >
              <AddIcon onClick={this.handleAddClick} />
            </Fab>
          )}
          <Dialog 
            open={isOpen} 
            onClose={this.handleDialogClose} 
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth={'sm'}
          >
            <DialogTitle id="form-dialog-title">Article</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a notification message.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="content"
                label="Content"
                type="text"
                fullWidth
                onChange={this.handleArticleContentChange}
                value={articleContent}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleArticleCreateClick} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </HomePageLayout>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object.isRequired,
  isArticleRequesting: PropTypes.bool.isRequired,
  articles: PropTypes.array,
};

function mapStateToProps(state) {
  const { user } = state.authorization;
  const { isArticleRequesting, articles } = state.articles;
  return {
    user,
    isArticleRequesting,
    articles
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ArticlePage);
