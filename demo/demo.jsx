import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import shiftDate from '../src/shiftDate';

const today = new Date();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = today) {
  return range(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  })
}

function customClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return {
    1: 'color-small',
    2: 'color-medium',
    3: 'color-large',
    4: 'color-huge',
  }[value.count];
}

const randomValues = generateRandomValues(200);
const halfYearAgo = shiftDate(new Date(), -180);
const pastRandomValues = generateRandomValues(200, halfYearAgo);

const DemoItem = (props) => (
  <div className="row m-b-3">
    <div className="col-md-6">
      {props.children}
    </div>
    <div className="col-md-6">
      <p>{props.description}</p>
      <small><a href="https://github.com/patientslikeme/react-calendar-heatmap/blob/master/demo/demo.jsx">See demo.jsx</a></small>
    </div>
  </div>
);

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    let counter = 0;
    setInterval(() => {
      if (counter < 200) {
        this.setState({
          values: this.state.values.concat([{ date: shiftDate(today, -counter) }])
        });
        counter += 1;
      }
    }, 500);
  }

  render() {
    return (
      <div className="container">
        <div className="row m-t-3">
          <div className="text-md-center">
            <h1><a href="https://github.com/patientslikeme/react-calendar-heatmap">react-calendar-heatmap</a></h1>
            <p>A calendar heatmap component built on SVG, inspired by github's contribution graph.</p>
          </div>
        </div>

        <DemoItem
          description="Default configuration with custom color scheme and randomly generated data"
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={customClassForValue}
          />
        </DemoItem>

        <DemoItem
          description="Shorter or longer time spans"
        >
          <div className="row">
            <div className="col-md-4">
              <CalendarHeatmap
                numDays={60}
                values={randomValues}
              />
            </div>
            <div className="col-md-8">
              <CalendarHeatmap
                numDays={400}
                values={randomValues}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          description="Display days that are out of date range"
        >
          <CalendarHeatmap
            values={randomValues}
            showOutOfRangeDays={true}
          />
        </DemoItem>

        <DemoItem
          description="Adjusting date window"
        >
          <CalendarHeatmap
            endDate={halfYearAgo}
            values={pastRandomValues}
          />
        </DemoItem>

        <DemoItem
          description="Use millisecond timestamps or parseable strings for date attribute"
        >
          <CalendarHeatmap
            endDate={new Date(2016, 3, 1)}
            values={[
              { date: '2016-01-01' },
              { date: (new Date('2016-02-02')).getTime() },
            ]}
          />
        </DemoItem>

        <DemoItem
          description="Loading values asynchronously"
        >
          <CalendarHeatmap
            values={this.state.values}
          />
        </DemoItem>

        <DemoItem
          description="Removing month labels"
        >
          <CalendarHeatmap
            values={randomValues}
            showMonthLabels={false}
          />
        </DemoItem>

        <DemoItem
          description="Setting an onClick callback"
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={customClassForValue}
            onClick={(value) => alert(`Clicked on ${value.date} with value ${value.count}`)}
          />
        </DemoItem>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
