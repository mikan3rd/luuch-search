import React from 'react';
import ons from 'onsenui';
import {Page, Toolbar,BackButton, } from 'react-onsenui';


class Browser extends React.Component {

  constructor(props) {
    super(props);

    const isIOS = ons.platform.isIOS();

    this.state = {
      width: window.innerWidth,
      height: isIOS ? '' : '100%',
      scrolling: isIOS ? 'no' : 'yes',
    }
  }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'>
                <BackButton>戻る</BackButton>
                </div>
            </Toolbar>
        );
        }

  render () {
    const {index} = this.props;
    const {
      naviShop,
    } = index;

    const {
      width,
      height,
      scrolling,
    } = this.state;

    let url = naviShop.urls.pc;
    url = url.replace(/\?.+/, 'food/');

    return (
      <Page renderToolbar={this.renderToolbar}>
        <div className="c-browser__iframe__wrapper">
          <iframe
            id="browser-iframe"
            className="c-browser__iframe"
            src={url}
            width={width}
            height={height}
            scrolling={scrolling}
          />
        </div>
      </Page>
    );
  }
}

export default Browser