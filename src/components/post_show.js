import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';



class PostShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then(() => {
      //Post has been deleted, navigate the user to the index
      //We naviagate by calling this.context.router.push with the
      //new path to navigate to.
      this.context.router.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      //Since it may take time for the Promise to return we need to dispaly
      //a loading spinner. For just displaying 'Loading...'.
      return <div>Loading....</div>
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.activePost };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
