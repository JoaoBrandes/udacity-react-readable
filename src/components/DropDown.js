import React, { Component } from 'react';

export default class DropDown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          Order By
        </button>

        {
          this.state.showMenu
          ? (
            <div
              className="menu"
              ref={(element) => {
                this.dropdownMenu = element;
              }}
              >
              <button onClick={() => this.props.changeOrder('time')}> Time </button>
              <button onClick={() => this.props.changeOrder('score')}> Score </button>
            </div>
          )
          : (
            null
          )
        }
      </div>
    );
  }
}
