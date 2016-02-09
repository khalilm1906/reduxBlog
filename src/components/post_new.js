import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  //creates a static object on the this class React interprets the contextTypes
  //object if presence whenever a react component is instantiated. React will
  //go up the parent until it found the component that has the context object
  //we need to reference. In this case we need to access the rounter context.
  //!avoid using propstype. only use it need to access the router context within
  //a child component.
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit (props) {
    this.props.createPost(props)
      .then(() => {
        //Post has been created, navigate the user to the index
        //We naviagate by calling this.context.router.push with the
        //new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit, createPost } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  };
};

function validate(values){
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a title';
  }

  if(!values.categories) {
    errors.categories = 'Enter categories';
  }

  if(!values.content) {
    errors.content = 'Enter content';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: furst argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
