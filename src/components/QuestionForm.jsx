import React, { useState } from "react";


const Mainpage = ({ sendMessage }) => {
  const [content, setContent] = useState('');
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(content);
    document.getElementById('pppsq').value = '';
  }

  return (
    <div className="contact-clean">
      {' '}
      <form onSubmit={handleSubmit} >
        <h2 className="text-center">Ask us</h2>
        <div className="form-group">
          <textarea
            id = 'pppsq'
            className="form-control"
            name="message"
            placeholder="Message"
            rows="10"
            onChange = {handleChange}

          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            질문하기!
          </button>
        </div>
      </form>
    </div>
  ) 
};


export default Mainpage;
