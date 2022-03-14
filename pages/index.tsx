import type { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
  * {
    background-color: red;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <div>케어닥</div>
      <style jsx>{style}</style>
    </>
  );
};

export default Home;
