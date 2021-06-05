'use strict';
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleList = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  onClickHandler() {
    this.props.handleMenuState(this.props.id);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickOutsideHandler(e) {
    console.log(this.props.isOpen);
    if (this.props.isOpen && !this.toggleList.current.contains(e.target)) {
      this.onClickHandler();
    }
  }

  render() {
    const isOpen = this.props.isOpen,
      content = this.props.content;

    return (
      <li onClick={this.onClickHandler} ref={this.toggleList}>
        {content || ''}
        {isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </li>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuState = this.handleMenuState.bind(this);

    this.state = { first: false, second: false, third: false };
  }

  handleMenuState(num) {
    this.setState((currentState) => ({
      [num]: !currentState[num],
    }));
  }

  render() {
    return (
      <nav>
        <ul>
          <ListItem handleMenuState={this.handleMenuState} id="first" isOpen={this.state.first} content={'first'} />
          <ListItem handleMenuState={this.handleMenuState} id="second" isOpen={this.state.second} content={'second'} />
          <ListItem handleMenuState={this.handleMenuState} id="third" isOpen={this.state.third} content={'third'} />
        </ul>
      </nav>
    );
  }
}

ReactDOM.render(<Menu />, document.getElementById('container'));
