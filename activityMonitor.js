const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");

let logs = [];

const adaptLogs = (logs) =>
  logs.map((item) => `${item.unixTime} : ${item.processData}`).join("");

const clearLogsData = (logs) =>
  Array.isArray(logs) ? logs.splice(0, logs.length) : logs;

const getUnixTime = () => new Date().getTime() / 1000;

const getCurrentOSInfo = () => {
  const type = os.type();

  if (type === "Linux" || type === "Darwin") {
    return {
      command: "ps",
      args: "-A -o %cpu,%mem,comm | sort -nr | head -n 1",
    };
  }

  return {
    command: "powershell",
    args: "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }",
  };
};

const updateFileInfo = (data) => {
  fs.appendFile("activityMonitor.log", data, (err) => {
    if (err) throw err;
  });
};

const execFile = (command, args) => {
  childProcess.execFile(command, args, (error, processData) => {
    const unixTime = getUnixTime();

    logs.push({ unixTime, processData });

    console.clear();
    console.log(`${unixTime}: ${processData}`);

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
};

setInterval(() => {
  const currentOS = getCurrentOSInfo();

  // add optimal delay to see logs
  // logs are not visible with - refresh rate is ten times per second(interval delay = 100)
  execFile(currentOS.command, [currentOS.args]);
}, 1000);

setInterval(() => {
  const adaptedLogs = adaptLogs(logs);

  updateFileInfo(adaptedLogs);
  clearLogsData();
}, 60000);
