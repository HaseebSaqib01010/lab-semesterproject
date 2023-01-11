import React from "react";

function AddReview() {
  return (
    <div>
      <h1>Add your review here</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddReview;
