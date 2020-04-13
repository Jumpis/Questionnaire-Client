import React from 'react';

const Mainpage = (props) => (
  <div className="questionForm">
    {' '}
    <form method="post">
      <h2 class="text-center">Contact us</h2>
      <div class="form-group">
        <textarea
          class="form-control"
          name="message"
          placeholder="Message"
          rows="14"
        ></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">
          질문하기!
        </button>
      </div>
    </form>
  </div>
);

export default Mainpage;
