import React, { Component }from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';


class PostsIndex extends Component {
  //componentWillMount() is react js component lifecycle method
  //It is called once right before the component is loaded the first
  //Time. We added here so we can load the initial posts from the
  //get post API.
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPost(){
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"post/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )
    });
  }

  //The render function renders the view as defined the using
  //JSX wich is similar to HTML.
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPost()}
        </ul>
      </div>
    );
  };
}

/*
//Instead of doing the long method of creating the
//mapDispatchToProps() call back function and bindActionCreators
//You can do the short form I am doing below instead wich is simply passing
//the { fetchPosts: fetchPosts } as the second argument of the connect function.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
};

export default connect(null, mapDispatchToProps)(PostsIndex);
*/

function mapStateToProps(state) {
  return { posts: state.posts.allPosts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
