import { getLinks, saveLinks } from "./feed-manager.mjs";
import { rl, close } from "./rl.mjs";
import https from "https";
import axios from "axios";
import Parser from "rss-parser";
import { EventEmitter } from "events";

const feeds = await getLinks();
const parser = new Parser();
const emitter = new EventEmitter();

function prompt() {
  rl.setPrompt("Enter comamnd (list, add, del, read, quit): ");
  rl.prompt();
}

rl.on("line", (input) => {
  let cmdParts = input.trim().split(" ");

  emitter.emit(cmdParts[0], cmdParts[1]);
});

emitter.on("quit", async () => {
  await saveLinks(feeds);
  close();
});

emitter.on("list", async () => {
  feeds.forEach((url, index) => console.log(`${index}\t${url}`));
  prompt();
});

emitter.on("add", async (url) => {
  if (url == undefined) console.log("Please include the url");
  else feeds.push(url);
  prompt();
});

emitter.on("delete", async (idx) => {
  if (idx === undefined) console.log("Please include the index");
  else {
    idx = parseInt(idx, 10);
    if (idx > -1 && idx < feeds.length) {
      feeds.splice(idx, 1);
    } else {
      console.log("The provided index is out of range");
    }
  }
});

emitter.on("read", async (idx) => {
  if (idx === undefined) {
    console.log("Please include the index");
  } else {
    idx = parseInt(idx, 10);
    if (idx > -1 && idx < feeds.length) {
      let { data } = await axios.get(feeds[idx]);
      let feed = await parser.parseString(data);
      feed.items.forEach((item) => console.log(item.title));
    } else {
      console.log("The provided index is out of range");
    }
  }
});

prompt();

// while (input != "quit") {
//   let cmdParts = input.trim().split(" ");
//   let cmd = cmdParts[0];

//   if (cmd == "list") {
//     feeds.forEach((url, index) => console.log(`${index}\t${url}`));
//   }
//   if (cmd == "add") {
//     if (cmdParts.length < 2) {
//       console.log("Please include an url");
//     } else {
//       feeds.push(cmdParts[1]);
//     }
//   }
//   if (cmd == "del") {
//     if (cmdParts.length < 2) {
//       console.log("Please include the index");
//     } else {
//       let idx = parseInt(cmdParts[1], 10);
//       if (idx > -1 && idx < feeds.length) {
//         feeds.splice(idx, 1);
//       } else {
//         console.log("The provided index is out of range");
//       }
//     }
//   }

//   if (cmd == "read") {
//     if (cmdParts.length < 2) {
//       console.log("Please include the index");
//     } else {
//       let idx = parseInt(cmdParts[1], 10);
//       if (idx > -1 && idx < feeds.length) {
//         let { data } = await axios.get(feeds[idx]);
//         let feed = await parser.parseString(data);
//         feed.items.forEach((item) => console.log(item.title));
//       } else {
//         console.log("The provided index is out of range");
//       }
//     }
//   }

//   input = await question("Enter comamnd (List, add, del, read, quit): ");
// }
