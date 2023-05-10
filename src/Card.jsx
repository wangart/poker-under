import cx from 'classnames'
import { useEffect, useState } from 'react';
// Hearts, Diamonds, Clubs, Spades
const suits = {
  heart: "\u2665",
  diamond: "\u2666",
  club: "\u2663",
  spade: "\u2660"
};

const ranks = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
}

function Card({suit, value, offset, live, placeCard, top}) {
  const [cssDead, setCssDead] = useState(false);
  const rank = ranks[value] ?? value;
  const symbol = suits[suit];

  useEffect(() => {
    if (!live) {
      console.log('set', suit, value, 'dead');
      setCssDead(true)
    }
  }, [live])

  return (
    <div style={{
      left: offset * 4,
      top: offset * 4,
    }} className={cx('card', ["heart", "diamond"].includes(suit) ? "red" : undefined, cssDead ? 'dead' : undefined )}>
      <div className='flipCardInner'>
        
      <div className='front'>
      <div className='m'>
        {rank}
        <br/>
        {symbol}
      </div>
      <div className="cardBody">
        {Array(value).fill(0).map(v => <div>{symbol}</div>)}
      </div>
      <div className={"reverse"}>
        {rank}
        <br/>
        {symbol}
      </div>

      <div className={cx("button", live && top ? "buttonHover" : undefined)}  onClick={() => {
          if (live && top) {
            placeCard(true)
          }
        }}>
            Over
          </div>
          <div className={cx("button", "buttonBottom", live && top ? "buttonHover" : undefined)}  onClick={() => {
          if (live && top) {
            placeCard(false)
          }
        }}>
            Under
          </div>
      </div>
      <div className='back'>
        <div className='cardBack'>
          <img
          width={50}
            src="/cardback.svg"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Card;
