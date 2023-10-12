
import React, { useEffect, useState, Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { BaseDataEntry } from 'react-minimal-pie-chart/types/commonTypes';

// interface for our extended dataset
interface ChartDatasetGroup extends Array<BaseDataEntry> { } // ChartDataset or BaseDataEntry

const Cake: React.FC = () => {

  const colours = ['#282c34', '#aa324c', '#fc7721', '#5aab16']; // grey, red, orange, green
  const [loading, setLoading] = useState(true); //loading
  const [chartData, setChartData] = useState<ChartDatasetGroup[]>(); //our chart data


  // handle getting our data from the api with async
  const handleFetchData = async () => {
    setLoading(true);

    //! Update API URL
    const response = await fetch('[ENTER THE URL OF THE API ENDPOING IN HERE] ... <url>/dev/demoData');
    const data = await response.json();

    // =====================

    // process our data for the charts, and dummy hierarchical values into 3 data sets
    let processedDataOuter: any = [];
    let processedDataMid: any = [];
    let processedDataInner: any = [];

    await data?.stats?.map((val: number) => {
      if (val >= 20) {
        processedDataOuter.push({ value: 10, color: colours[1], title: val });
        processedDataMid.push({ value: 10, color: colours[1], title: val });
        processedDataInner.push({ value: 10, color: colours[1], title: val });
      } else if (val >= 15 && val < 20) {
        processedDataOuter.push({ value: 10, color: colours[1], title: val });
        processedDataMid.push({ value: 10, color: colours[2], title: val });
        processedDataInner.push({ value: 10, color: colours[2], title: val });
      } else if (val >= 10 && val < 15) {
        processedDataOuter.push({ value: 10, color: colours[2], title: val });
        processedDataMid.push({ value: 10, color: colours[2], title: val });
        processedDataInner.push({ value: 10, color: colours[2], title: val });
      } else if (val >= 5 && val < 10) {
        processedDataOuter.push({ value: 10, color: colours[2], title: val });
        processedDataMid.push({ value: 10, color: colours[3], title: val });
        processedDataInner.push({ value: 10, color: colours[3], title: val });
      } else {
        processedDataOuter.push({ value: 10, color: colours[3], title: val });
        processedDataMid.push({ value: 10, color: colours[3], title: val });
        processedDataInner.push({ value: 10, color: colours[3], title: val });
      }

    })
    // save to our state
    setChartData([processedDataOuter, processedDataMid, processedDataInner]);

    setLoading(false);
  }

  useEffect(() => {
    handleFetchData();
  }, []);


  return (
    <div className="App">
      {loading ? <>Loading...</> : (
        <div style={{ position: 'relative', width: 600 }}>
          {/* Outer */}
          <PieChart
            segmentsStyle={{ transition: 'stroke 2s' }}
            segmentsShift={0.5}
            radius={49}
            lineWidth={30}
            label={({ dataEntry }) => dataEntry?.title || ""}
            labelPosition={90}
            labelStyle={{
              fill: '#fff',
              fontSize: 5,
              pointerEvents: 'none',
            }}
            data={chartData ? chartData[0] : []}
          />
          {/* Mid */}
          <PieChart
            segmentsStyle={{ transition: 'stroke 2s' }}
            segmentsShift={0.5}
            style={{ position: 'absolute', left: 0, top: -3 }}
            radius={34}
            lineWidth={40}
            data={chartData ? chartData[1] : []}
          />
          {/* Inner */}
          <PieChart
            segmentsStyle={{ transition: 'stroke 2s' }}
            segmentsShift={0.5}
            style={{ position: 'absolute', left: 0, top: -3 }}
            radius={20}
            lineWidth={60}
            data={chartData ? chartData[2] : []}
          />
        </div>
      )}
      <button onClick={() => { handleFetchData(); }}>Fetch</button>
    </div >
  );
}

export default Cake;