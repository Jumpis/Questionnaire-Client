import React, { useState } from "react";


const Mainpage = ({ sendMessage }) => {

  const [content, setContent] = useState('');
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(content);

  }

  return (
    <div className="questionForm">
      {' '}
      <form method="post" onSubmit={handleSubmit} >
        <h2 className="text-center">Contact us</h2>
        <div className="form-group">
          <textarea
            className="form-control"
            name="message"
            placeholder="Message"
            rows="14"
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
  




  
}


export default Mainpage;
