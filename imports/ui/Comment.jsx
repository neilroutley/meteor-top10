import React from "react";
import PropTypes from "prop-types";

export default function Comment(props) {
  const { owner, body } = props.comment;

  return (
    <div className="media mb-3 p-2">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://api.adorable.io/avatars/48/${owner.toLowerCase()}@adorable.io.png`}
        alt={owner}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        {/*<small className="float-right text-muted">{createdAt}</small>*/}
        <h6 className="mt-0 mb-1 text-muted float-left">{owner}</h6>
        {body}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
