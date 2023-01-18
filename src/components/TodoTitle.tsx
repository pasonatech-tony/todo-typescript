import React, { memo } from "react";

// タイトルの表示コンポーネント - Title display component
export const TodoTitle = memo(
  ({ title, as }: { title: string; as: string }) => {
    if (as === "h1") {
      return <h1 className="my-4">{title}</h1>;
    } else if (as === "h2") {
      return <h2 className="my-4">{title}</h2>;
    } else {
      return <p className="my-4">{title}</p>;
    }
  }
);
