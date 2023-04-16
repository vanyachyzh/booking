/* eslint-disable object-curly-newline */
import { Component } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  isFiniteCarousel: boolean,
};

type State = {
  isFinite: boolean
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  coordX: number,
  isNextDisabled: boolean,
  isPrevDisabled: boolean,
};

class Carousel extends Component<Props, State> {
  state: State = {
    isFinite: this.props.isFiniteCarousel,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    isNextDisabled: false,
    isPrevDisabled: true,
    coordX: 0,
  };

  swipe = (direction: 'prev' | 'next') => {
    const { images } = this.props;
    const { coordX, itemWidth, frameSize, step, isFinite } = this.state;
    const frameWidth = images.length * itemWidth;
    const limit = frameWidth - frameSize * itemWidth;
    const oneStepWidth = step * itemWidth;

    switch (direction) {
      case 'next':
        if (coordX === limit && isFinite) {
          this.setState({ coordX: 0 });
        } else if (coordX + oneStepWidth >= limit && isFinite) {
          this.setState({
            coordX: limit,
            isNextDisabled: false,
          });
        } else if (coordX + oneStepWidth >= limit) {
          this.setState({
            coordX: limit,
            isNextDisabled: true,
          });
        } else {
          this.setState(state => ({
            coordX: state.coordX + state.step * state.itemWidth,
            isPrevDisabled: false,
          }));
        }

        break;

      case 'prev':
        if (coordX === 0 && isFinite) {
          this.setState({ coordX: limit });
        } else if (coordX <= oneStepWidth && isFinite) {
          this.setState({
            coordX: 0,
            isPrevDisabled: false,
          });
        } else if (coordX <= oneStepWidth) {
          this.setState({
            coordX: 0,
            isPrevDisabled: true,
          });
        } else {
          this.setState(state => ({
            coordX: state.coordX - state.step * state.itemWidth,
            isNextDisabled: false,
          }));
        }

        break;

      default:
        break;
    }
  };

  limit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { min, max, name, value } = target;

    if (+value < +min) {
      this.setState(state => {
        return {
          ...state,
          [name]: min,
        };
      });
    } else if (+value > +max) {
      this.setState(state => {
        return {
          ...state,
          [name]: max,
        };
      });
    } else {
      this.setState(state => {
        return {
          ...state,
          [name]: +value,
        };
      });
    }
  };

  setInfinity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    this.setState({
      isFinite: isChecked,
      isPrevDisabled: false,
      isNextDisabled: false,
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      coordX,
      animationDuration,
      isNextDisabled,
      isPrevDisabled,
    } = this.state;
    const { images } = this.props;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${frameSize * itemWidth}px`
          }}
        >
          <div
            className="carousel__list"
            style={{
              transform: `translateX(${coordX > 0 ? -coordX : coordX}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          >
            {images.map(image => (
              <img
                key={image}
                className='carousel__image'
                src={image}
                alt="1"
                style={{ width: itemWidth }}
              />
            ))}
          </div>

          {coordX !== 0 && (
            <button
              type="button"
              className="carousel__button--prev"
              disabled={isPrevDisabled}
              onClick={() => {
                this.swipe('prev');
              }}
            >
            </button>
          )}


          {coordX - itemWidth !== (images.length - 2) * itemWidth && (
            <button
              data-cy="Next"
              type="button"
              disabled={isNextDisabled}
              className="carousel__button--next"
              onClick={() => {
                this.swipe('next');
                console.log(coordX, (images.length - 2) * itemWidth)
              }}
            >
            </button>
          )}


          {/* <div className="carousel__points">
            {images.map((image, index) => {
              const imageIndex = coordX / itemWidth;

              return (
                <div
                  className={classNames(
                    'carousel__point',
                    { 'carousel__point-active': index === imageIndex }
                  )}
                  key={image}
                />
              )
            })}
          </div> */}
        </div>
      </>
    );
  }
}

export default Carousel;
