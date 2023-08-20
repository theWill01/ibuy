import React from "react";

export const FormErr = (errors) => {
  return (
    <div>
      {Object.keys(errors).map((name, idx) => {
        if (errors[name].length > 0) {
          return (
            <p key={idx}>
              {name} {errors[name]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};
