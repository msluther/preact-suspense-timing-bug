import { createElement, render, Component, Suspense, lazy } from 'react';

function ShowMounted({ mounted }) {
  return <div>
    Is mounted? { mounted ? 'yes' : 'no' }
  </div>
}

const LazyComponent = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve({ default: ShowMounted });
  }, 5000)
}));

class Bug extends Component {
  constructor() {
    super(...arguments);
    this.setState({
      ...this.state,
      mounted: false
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    return <div>
      <h1>Lazy/Suspense Timing bug</h1>
      <p>Throws: `TypeError: Cannot set property '0' of null`</p>
      <Suspense fallback={<div>Fallback rendering</div>}>
        <LazyComponent mounted={ this.state.mounted } />
      </Suspense>
    </div>
  }
}

render(<Bug />, document.body);
