import React from 'react';

class Mainpage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question : null,
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({[name] : value});
  }

  handleSubmit = (e) => {
    const { question } = this.state;
    // 질문하기
  }

  render() {
    return (
      <div className="contact-clean">
        {' '}
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Ask us</h2>
          <div className="form-group">
            <textarea
              className="form-control"
              name="message"
              placeholder="Message"
              rows="10"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              질문하기!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Mainpage;
