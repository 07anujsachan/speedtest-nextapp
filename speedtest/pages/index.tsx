import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleDown,
  faCircleUp,
} from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGaugeSimpleHigh } from "@fortawesome/free-solid-svg-icons";

interface SpeedTestData {
  downloadSpeed: number;
  uploadSpeed: number;
  downloaded: number;
  uploaded: number;
  latency: number;
  bufferBloat: number;
  userLocation: string;
  userIp: string;
  
}
 

const Home: React.FC = () => {
  const defaultData = {
    downloadSpeed: 0,
    uploadSpeed: 0,
    downloaded: 0,
    uploaded: 0,
    latency: 0,
    bufferBloat: 0,
    userLocation: " ___ ",
    userIp: "0.0.0.0",
  }
  const [speedData, setSpeedData] = useState<SpeedTestData | null>(defaultData);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnStatus, setBtnStatus] = useState("go");

  const fetchSpeedData = async () => {
    setSpeedData(defaultData);
    setLoading(true);
    setBtnStatus("loading");
    try {
      const response = await fetch("/api/speed", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSpeedData(data.data);
      setBtnStatus("reload");
    } catch (error) {
      console.error("Error fetching speed data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App py-4 px-8 bg-[#2c2b2b] h-[100vh]">
      <div className="flex text-white hover:text-blue-500">
        <FontAwesomeIcon
          className=" mt-1 text-xl mr-2 hover:text-blue-500"
          icon={faGaugeSimpleHigh}
        />
        <h1 className=" text-xl font-semibold ">SPEED TEST</h1>
      </div>
      <div>
        <div className="flex justify-center mt-8">
          <div>
            <p className="text-white">
              <span>
                <FontAwesomeIcon
                  className=" mt-1 text-[#8d8a8a]  mr-1"
                  icon={faCircleDown}
                />
              </span>{" "}
              DOWNLOAD <span className="text-[#8d8a8a]">mbps</span>
            </p>
            <p className="text-center text-white">
              {speedData?.downloadSpeed === 0
                ? "___"
                : speedData?.downloadSpeed}
            </p>
          </div>
          <div className="ml-4">
            {" "}
            <p className="text-white">
              <span>
                <FontAwesomeIcon
                  className=" mt-1 text-[#8d8a8a]  mr-1"
                  icon={faCircleUp}
                />
              </span>{" "}
              UPLOAD <span className="text-[#8d8a8a]">mbps</span>
            </p>
            <p className="text-center text-white">
              {speedData?.uploadSpeed === 0 ? "___" : speedData?.uploadSpeed}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <p className="text-[#8d8a8a] text-xl">
            Latency{" "}
            <span>{speedData?.latency === 0 ? "___" : speedData?.latency}</span>
          </p>
          <p className="text-[#8d8a8a] text-xl">
            <span>
              <FontAwesomeIcon
                className=" mt-1   text-[#8d8a8a]   ml-8"
                icon={faCircleDown}
              />
            </span>{" "}
            <span>
              {speedData?.downloaded === 0 ? "___" : speedData?.downloaded}
            </span>
          </p>
          <p className="text-[#8d8a8a] text-xl">
            <span>
              <FontAwesomeIcon
                className=" mt-1   text-[#8d8a8a]   ml-8"
                icon={faCircleUp}
              />
            </span>{" "}
            <span>
              {speedData?.uploaded === 0 ? "___" : speedData?.uploaded}
            </span>
          </p>
        </div>

        <div className="flex justify-center my-16 ">
          <div className="h-40 w-40 rounded-full bg-gradient-to-r from-[#2AE3D1] to-[#21A7E7] p-1 ">
            <div className=" h-full w-full bg-gray-800 rounded-full text-center flex justify-center items-center">
              <button
                onClick={() => fetchSpeedData()}
                className="text-white text-4xl"
              >
                {
                  btnStatus == "go"
                    ? "GO"
                    : btnStatus == "reload"
                    ? "Reload"
                    : "loading..."
                  
                }
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex ">
            <div>
              <p className="text-white">User IP</p>
              <p className="text-[#8d8a8a]">
                {speedData?.userIp =="0" 
                  ? "___"
                  : speedData?.userIp.slice(0, 9)}
              </p>
            </div>
            <FontAwesomeIcon
              className=" mt-1 text-2xl  text-[#8d8a8a] border border-[#8d8a8a] p-2 rounded-full ml-2"
              icon={faUser}
            />
          </div>
          <div className="flex ml-8 ">
            <FontAwesomeIcon
              className=" mt-1 text-2xl  text-[#8d8a8a] border border-[#8d8a8a] p-2 rounded-full mr-2"
              icon={faGlobe}
            />
            <div>
              <p className="text-white">User Location</p>
              <p className="text-[#8d8a8a]">
                {speedData?.userLocation === "___"
                  ? "___"
                  : speedData?.userLocation}
              </p>
            </div>
          </div>
        </div>
        <p className="text-center mt-8 text-white text-lg">
          Use Speedtest® on all your devices.
        </p>
      </div>
    </div>
  );
};

export default Home;
