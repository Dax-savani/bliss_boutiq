import { Box } from "@mui/material";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const Map = () => {
  const markers = [
    {
      gecode: [48.86, 2.3522],
      pop: "hello i am popup 1",
    },
    {
      gecode: [48.85, 2.3522],
      pop: "hello i am popup 2",
    },
    {
      gecode: [48.855, 2.34],
      pop: "hello i am popup 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("../../assets/images/contact/location.png"),
    iconSize: [48, 48],
  });
  return (
    <>
      <Box my={5}>
        <div style={{ height: "60vh", width: "100%" }}>
          <MapContainer
            center={[48.8566, 2.3522]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <MarkerClusterGroup chunkedLoading> */}
            {markers.map((item, index) => (
              <Marker key={index} position={item.gecode} icon={customIcon}>
                <Popup>
                  <h2>{item.pop}</h2>
                </Popup>
              </Marker>
            ))}
            {/* </MarkerClusterGroup> */}
          </MapContainer>
        </div>
      </Box>
    </>
  );
};

export default Map;
