import react, { useState } from "react";
import css from "styled-jsx/css";
import { RiCalendarCheckLine } from "react-icons/ri";

const Calander = () => {
  const [open, setOpen] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  const [nextMove, setNextMove] = useState(1);

  //@ date 계산 시작
  const dateSet = new Date();

  //현재 기준
  const currentYear = dateSet.getFullYear();
  const currentMonth = dateSet.getMonth() + 1;
  const currentDate = dateSet.getDate();

  interface MakeDatesResult {
    calcPrevDates: number[];
    calcCurrentDates: number[];
    calcNextDates: number[];
  }

  function makeDates(year: number, month: number, move: number) {
    //저번달 끝 날짜
    const prevEnd = new Date(year, month + move - 1, 0);
    const prevEndDate = prevEnd.getDate();
    const prevEndDay = prevEnd.getDay();

    //현재 끝 날짜
    const currentEnd = new Date(year, month + move, 0);
    const currentEndDate = currentEnd.getDate();
    const currentEndDay = currentEnd.getDay();

    const calcPrevDates = Array(prevEndDay === 6 ? 7 : prevEndDay + 1)
      .fill(null)
      .map((_, i) => {
        return prevEndDate - i;
      })
      .sort((a, b) => a - b);

    const calcCurrentDates = Array(currentEndDate)
      .fill(null)
      .map((_, i) => i + 1);

    const calcNextDates = Array(currentEndDay === 6 ? 0 : 6 - currentEndDay)
      .fill(null)
      .map((_, i) => i + 1);

    return {
      calcPrevDates,
      calcCurrentDates,
      calcNextDates,
    };
  }
  function makeDatesMove(year: number, month: number, move: number) {
    month += move;
    if (month === 13) {
      month = 1;
      year += 1;
    }

    if (month <= 0) {
      month = 12 + month;
      year -= 1;
    }

    return {
      year,
      month,
    };
  }

  const currentDates = makeDates(currentYear, currentMonth, currentMove);
  const nextDates = makeDates(currentYear, currentMonth, nextMove);
  const currentCalanderTitle = makeDatesMove(
    currentYear,
    currentMonth,
    currentMove
  );
  const nextCalanderTitle = makeDatesMove(currentYear, currentMonth, nextMove);

  //@ why not work?///
  const renderCalander = (dates: MakeDatesResult) => {
    return (
      <>
        {dates.calcPrevDates.map((e) => (
          <div className="disabled hide" key={e}>
            {e}
          </div>
        ))}
        {dates.calcCurrentDates.map((e) => (
          <div className={e < currentDate ? "disabled" : ""} key={e}>
            {e}
          </div>
        ))}
        {dates.calcNextDates.map((e) => (
          <div className="disabled hide" key={e}>
            {e}
          </div>
        ))}
      </>
    );
  };
  //@///////

  return (
    <>
      <section>
        <button type="button" onClick={() => setOpen((prev) => !prev)}>
          <span className="placeholder">날짜 선택</span>
          <RiCalendarCheckLine />
        </button>

        {open && (
          <div className="calander-box">
            <div className="calander-header">
              <span>돌봄 날짜 선택</span>
              <div className="close">x</div>
            </div>

            <div className="calander current-calander">
              <div className="move-month">
                <button onClick={() => setCurrentMove((prev) => prev - 1)}>
                  {"<-"}
                </button>
                <span>{`${currentCalanderTitle.year}년 ${currentCalanderTitle.month}월`}</span>
                <button onClick={() => setCurrentMove((prev) => prev + 1)}>
                  {"->"}
                </button>
              </div>

              <div className="grid">
                <>
                  {currentDates.calcPrevDates.map((e) => (
                    <div className="disabled hide" key={e}>
                      {e}
                    </div>
                  ))}
                  {currentDates.calcCurrentDates.map((e) => {
                    let className = "";
                    if (
                      (currentMove === 0 && e < currentDate) ||
                      currentMove < 0
                    ) {
                      className = "disabled";
                    }
                    return (
                      <div className={className} key={e}>
                        {e}
                      </div>
                    );
                  })}
                  {currentDates.calcNextDates.map((e) => (
                    <div className="disabled hide" key={e}>
                      {e}
                    </div>
                  ))}
                </>
              </div>
            </div>

            <div className="calander next-calander">
              <div className="move-month">
                <button
                  onClick={() => {
                    if (nextMove - 1 !== 0) {
                      setNextMove((prev) => prev - 1);
                    }
                  }}
                >
                  {"<-"}
                </button>
                <span>
                  <span>{`${nextCalanderTitle.year}년 ${nextCalanderTitle.month}월`}</span>
                </span>
                <button onClick={() => setNextMove((prev) => prev + 1)}>
                  {"->"}
                </button>
              </div>

              <div className="grid">
                <>
                  {nextDates.calcPrevDates.map((e) => (
                    <div className="disabled hide" key={e}>
                      {e}
                    </div>
                  ))}
                  {nextDates.calcCurrentDates.map((e) => {
                    let className = "";
                    if ((nextMove === 0 && e < currentDate) || nextMove < 0) {
                      className = "disabled";
                    }

                    return (
                      <div className={className} key={e}>
                        {e}
                      </div>
                    );
                  })}
                  {nextDates.calcNextDates.map((e) => (
                    <div className="disabled hide" key={e}>
                      {e}
                    </div>
                  ))}
                </>
              </div>
            </div>
          </div>
        )}
      </section>
      <style jsx>{style}</style>
    </>
  );
};

// interface ICalander {
//   placeholder: string;
//   placeholderIcon: any;
// }

const style = css`
  section {
    width: 160px;
    height: 48px;
    border-radius: 4px;

    & > button {
      width: 100%;
      height: 100%;
      background-color: #f6f6f6;
      font-size: 1.4rem;
      font-weight: bold;
      color: #b6b3b3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      cursor: pointer;
    }

    & .calander-box {
      position: absolute;
      background-color: white;
      width: 100%;
      height: 100%;
      top: 0;
      padding: 1rem;

      & .calander-header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & .calander {
        & .move-month {
          display: flex;
        }

        & .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);

          justify-items: center;
          align-items: center;
          font-size: 2rem;
          grid-gap: 1.5rem;
          & > * {
            cursor: pointer;
            &.disabled {
              color: lightgrey;
              cursor: initial;
            }

            &.hide {
              visibility: hidden;
            }
          }
        }
      }
    }
  }
`;

export default Calander;
