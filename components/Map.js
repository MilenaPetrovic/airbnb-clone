import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //Transforming searchResults into
  //{"latitude": centerLat,"longitude": centerLon} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //The lat and long of the center of location coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/miskpet/cksql5hu508lx17o17zowhcap"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.longitude}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <svg
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              width="38"
              height="43"
              viewBox="0 0 38 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.79276 0.157441L6.00601 2.54861V32.9018L19 26.084V32.9018L2.24929 42.7919C1.25332 43.3785 0 42.6552 0 41.4938V1.21259C0 0.286488 0.990593 -0.296936 1.79276 0.157441Z"
                fill="url(#paint0_linear)"
              />
              <path
                d="M21.2467 27.2238L21.2696 32.2548L37.1771 23.2676C38.2683 22.6512 38.2759 21.0831 37.1913 20.4559L8.06152 3.59766V29.5487L12.1016 27.4481C13.0119 26.9744 13.5826 26.0336 13.5826 25.0078V13.9787L27.6073 21.8748L22.7734 24.5983C21.826 25.1319 21.2423 26.137 21.2467 27.2238Z"
                fill="url(#paint1_linear)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="9.5"
                  y1="0"
                  x2="9.5"
                  y2="43"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FE5564" />
                  <stop offset="1" stop-color="#FAC15F" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="8.06133"
                  y1="17.9261"
                  x2="38.001"
                  y2="17.9261"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF4265" />
                  <stop offset="1" stop-color="#F9D15E" />
                </linearGradient>
              </defs>
            </svg>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
