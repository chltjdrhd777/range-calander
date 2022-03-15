import react, { useState } from "react";
import type { NextPage } from "next";
import css from "styled-jsx/css";
import Calander from "components/Calander";

const style = css`
  main {
  }
`;

const Schedule: NextPage = () => {
  return (
    <>
      <main>
        <Calander />
      </main>
      <style jsx>{style}</style>
    </>
  );
};

export default Schedule;
