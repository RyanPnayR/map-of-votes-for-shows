import React, { memo, useEffect, useMemo, useState } from "react";

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { geoCentroid } from "d3-geo";
import allStates from "./utils/states-data.json";
import sortBy from "lodash/sortBy";
import { scaleLinear } from "d3-scale";
import Airtable from "airtable";
const base = new Airtable({
  apiKey:
    "patGU8A3HLFxXV1eb.8287898a4be276813ae266eaa38bab2836144cf449b1d269006464aef5523b16"
}).base("app8iVKdV28H3uokd");
const offsets = {
  VT: [-10, -40],
  NH: [34, 2],
  MA: [50, -1],
  RI: [28, 10],
  CT: [50, 30],
  NJ: [24, 1],
  DE: [60, 10],
  MD: [37, 20],
  DC: [49, 21]
};
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const MapChart = ({}) => {
  const [selectedId, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [fans, setFans] = useState(null);

  useEffect(() => {
    base
      .table("States")
      .select({ fields: ["fldYwB8DxEYKgkcBU", "Name"] })
      .all()
      .then((res) => {
        const f = res.map((rec) => ({
          state: rec.fields["Name"].split(":")[0],
          count: rec.fields["Count (Fans)"]
        }));
        setFans(f);
        const sortedCities = sortBy(f, (o) => -o.count);
        setMaxValue(sortedCities[0].count);
      });
  }, []);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 24]),
    [maxValue]
  );
  return (
    fans && (
      <div data-tip="">
        <ComposableMap
          style={{
            backgroundColor: "#2b2b2d"
          }}
          projection="geoAlbersUsa"
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  let centroid = geoCentroid(geo);
                  let cur = allStates.find((s) => s.val === geo.id);
                  let fan = fans.find((f) => f.state === cur.id);
                  return (
                    <React.Fragment key={`${geo.rsmKey}-1`}>
                      <Geography
                        id={`${geo.rsmKey}`}
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-content={geo.properties.name}
                        onMouseEnter={() => {
                          setId(geo.rsmKey);
                          setIsOpen(true);
                        }}
                        onMouseLeave={() => {
                          setId("");
                          setIsOpen(false);
                        }}
                        style={{
                          default: {
                            fill: "#555",
                            outline: "none"
                          },
                          hover: {
                            fill: "#888",
                            outline: "none"
                          },
                          pressed: {
                            fill: "#555",
                            outline: "none"
                          }
                        }}
                      />
                      {fan && cur && (
                        <g
                          id={geo.rsmKey + "-name"}
                          data-tooltip-html={`
                            <div>
                              <p>${geo.properties.name}</p>
                              <p>votes: ${fan.count}</p>
                            </div>
                          `}
                          key={geo.rsmKey + "-name"}
                          onMouseEnter={() => {
                            setId(geo.rsmKey + "-name");
                            setIsOpen(true);
                          }}
                          onMouseLeave={() => {
                            setId("");
                            setIsOpen(false);
                          }}
                        >
                          {centroid[0] > -160 &&
                            centroid[0] < -67 &&
                            (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                              <Marker coordinates={centroid}>
                                <circle
                                  fill="#fcff36"
                                  stroke="#EEE"
                                  r={popScale(fan.count)}
                                />
                                <text y="4" fontSize={10} textAnchor="middle">
                                  {fan.count}
                                </text>
                              </Marker>
                            ) : (
                              fan &&
                              cur && (
                                <Annotation
                                  subject={centroid}
                                  dx={offsets[cur.id][0]}
                                  dy={offsets[cur.id][1]}
                                  connectorProps={{
                                    stroke: "#fff",
                                    strokeWidth: 1,
                                    strokeLinecap: "round"
                                  }}
                                >
                                  <circle
                                    fill="#fcff36"
                                    stroke="#EEE"
                                    r={popScale(fan.count)}
                                  />
                                  <text y="4" fontSize={10} textAnchor="middle">
                                    {fan.count}
                                  </text>
                                </Annotation>
                              )
                            ))}
                        </g>
                      )}
                    </React.Fragment>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <Tooltip isOpen={isOpen} anchorId={selectedId}></Tooltip>
      </div>
    )
  );
};

export default memo(MapChart);
