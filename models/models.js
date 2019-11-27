const fs = require("fs");

// Take in the target string and save it as an input file
const monsterFunction = (string, cb) => {
  console.log("CB is a", typeof cb);
  console.log("Stage 1 commencing...");
  fs.writeFile(__dirname + "/../data/1-input/input.json", string.toString(), err => {
    if (err) console.log(err);
    else console.log("Written input file successfully");
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Open the input file, split it into an array of indiviual characters and save the array as a JSON object
    console.log("Stage 2 commencing...");
    fs.readFile(__dirname + "/../data/1-input/input.json", "utf-8", (err, inputString) => {
      if (err) console.log(err);
      else {
        console.log("Read input file successfully");
        let outputArray = [];
        const openedFile = inputString.toString();
        for (let i = 0; i < openedFile.length; i++) {
          outputArray.push(openedFile[i]);
        }
        console.log("Constructed input array successfully");
        const outputFile = JSON.stringify(outputArray);
        fs.writeFile(__dirname + "/../data/2-input-array/input-array.json", outputFile, err => {
          if (err) console.log(err);
          else console.log("Written input array successfully");
          // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          // Open the array, examine each element and save it as a JSON cypher object with property set accordingly
          console.log("Stage 2 commencing...");
          fs.readFile(__dirname + "/../data/2-input-array/input-array.json", (err, openedFile) => {
            if (err) console.log(err);
            else {
              const inputArray = JSON.parse(openedFile);
              for (let i = 0; i < inputArray.length; i++) {
                let fileName = "";
                if (i < 10) fileName += "000";
                else if (i < 100) fileName += "00";
                else if (i < 1000) fileName += "0";
                fileName += i;
                const keyName = inputArray[i].toLowerCase();
                const outputObj = {};
                outputObj[keyName] = "";
                console.log(`Successfully extracted ${keyName}`);
                console.log(outputObj);
                fs.writeFile(__dirname + `/../data/3-cypher-lc/${fileName}.json`, JSON.stringify(outputObj), err => {
                  if (err) console.log(err);
                  else {
                    console.log(`Written ${fileName}.json successfully`);
                  }
                });
              }
              // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              // Duplicate the above set of cypher files, but with the opposite case
              console.log("Stage 3 commencing...");
              fs.readFile(__dirname + "/../data/2-input-array/input-array.json", (err, openedFile) => {
                if (err) console.log(err);
                else {
                  const inputArray = JSON.parse(openedFile);
                  for (let i = 0; i < inputArray.length; i++) {
                    let fileName = "";
                    if (i < 10) fileName += "000";
                    else if (i < 100) fileName += "00";
                    else if (i < 1000) fileName += "0";
                    fileName += i;
                    const keyName = inputArray[i].toUpperCase();
                    const outputObj = {};
                    outputObj[keyName] = "";
                    console.log(`Successfully extracted ${keyName}`);
                    console.log(outputObj);
                    fs.writeFile(__dirname + `/../data/4-cypher-uc/${fileName}.json`, JSON.stringify(outputObj), err => {
                      if (err) console.log(err);
                      else {
                        console.log(`Written ${fileName}.json successfully`);
                      }
                    });
                  }
                  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                  // Open the all of the cypher objects for each character, fill in the values for the corresponding cases, and save them as a new set of complete cyphers
                  console.log("Stage 4 commencing...");
                  // Lowercase Cyphers
                  fs.readdir(__dirname + "/../data/3-cypher-lc", (err, data) => {
                    const folderArray = data;
                    console.log("Successfully loaded lowercase cyphers");
                    folderArray.forEach(file => {
                      fs.readFile(__dirname + `/../data/3-cypher-lc/${file}`, (err, readFile) => {
                        const fileObj = JSON.parse(readFile);
                        for (let key in fileObj) {
                          if (key === key.toLowerCase()) {
                            fileObj[key] = key.toUpperCase();
                          } else if (key === key.toUpperCase()) {
                            fileObj[key] = key.toLowerCase();
                          }
                        }
                        console.log(`${file}`, fileObj);
                        const objectToWrite = JSON.stringify(fileObj);
                        fs.writeFile(__dirname + `/../data/3-cypher-lc/${file}`, objectToWrite, err => {
                          if (err) console.log(err);
                          else {
                            console.log(`${file} updated successfully in lowercase cyphers`);
                          }
                        });
                      });
                    });
                  });
                  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                  // UpperCase Cyphers
                  fs.readdir(__dirname + "/../data/4-cypher-uc", (err, data) => {
                    const folderArray = data;
                    console.log("Successfully loaded uppercase cyphers");
                    folderArray.forEach(file => {
                      fs.readFile(__dirname + `/../data/4-cypher-uc/${file}`, (err, readFile) => {
                        const fileObj = JSON.parse(readFile);
                        for (let key in fileObj) {
                          if (key === key.toLowerCase()) {
                            fileObj[key] = key.toUpperCase();
                          } else if (key === key.toUpperCase()) {
                            fileObj[key] = key.toLowerCase();
                          }
                        }
                        console.log(`${file}`, fileObj);
                        const objectToWrite = JSON.stringify(fileObj);
                        fs.writeFile(__dirname + `/../data/4-cypher-uc/${file}`, objectToWrite, err => {
                          if (err) console.log(err);
                          else {
                            console.log(`${file} updated successfully in uppercase cyphers`);
                          }
                        });
                      });
                    });
                    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // Create a flip-flop file to tell the program which case to use
                    console.log("Stage 5 commencing...");
                    const flipFlopObj = { uppercase: true };
                    const flipFlopToWrite = JSON.stringify(flipFlopObj);
                    fs.writeFile(__dirname + "/../data/5-flipflop/flipflop.json", flipFlopToWrite, err => {
                      if (err) console.log(err);
                      else {
                        console.log(`Written flipflop.json successfully`);
                        // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        // Open the input array of characters and parse each one to a new array, using the case cyphers and flip flop to determine upper or lower case
                        console.log("Stage 6 commencing...");
                        fs.readFile(__dirname + `/../data/5-flipflop/flipflop.json`, (err, flipflopData) => {
                          if (err) console.log(err);
                          else {
                            flipflopObj = JSON.parse(flipflopData);
                            console.log("Successfully parsed flip flop into object");
                            fs.readFile(__dirname + "/../data/2-input-array/input-array.json", (err, readArray) => {
                              const parsedArray = JSON.parse(readArray);
                              console.log("Successfully parsed array for answer assembly");
                              let answerArray = [];
                              for (let i = 0; i < parsedArray.length; i++) {
                                let fileName = "";
                                if (i < 10) fileName += "000";
                                else if (i < 100) fileName += "00";
                                else if (i < 1000) fileName += "0";
                                fileName += i;
                                let filePath = "";
                                if (flipFlopObj.uppercase === true) {
                                  console.log(`Character ${i}: looking up uppercase in cypher files...`);
                                  filePath = `/../data/3-cypher-lc/${fileName}.json`;
                                  if (parsedArray[i] !== " ") {
                                    flipFlopObj.uppercase = false;
                                  }
                                  console.log(flipFlopObj);
                                  answerArray.push(parsedArray[i].toUpperCase());
                                } else if (flipFlopObj.uppercase === false) {
                                  console.log(`Character ${i}: looking up lowercase in cypher files...`);
                                  filePath = `/../data/4-cypher-uc/${fileName}.json`;
                                  if (parsedArray[i] !== " ") {
                                    flipFlopObj.uppercase = true;
                                  }
                                  console.log(flipFlopObj);
                                  answerArray.push(parsedArray[i].toLowerCase());
                                }
                              }
                              console.log("Successfully assembled answer");
                              console.log("Final answer array:", answerArray);
                              const answerArrayToWrite = JSON.stringify(answerArray);
                              fs.writeFile(__dirname + "/../data/6-answer-array/answer-array.json", answerArrayToWrite, err => {
                                if (err) console.log(err);
                                else {
                                  console.log("Written answer array successfully");
                                  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                  // Open the above array and add each character to a new answer file
                                  console.log("Stage 7 commencing...");
                                  fs.readFile(__dirname + "/../data/6-answer-array/answer-array.json", (err, data) => {
                                    if (err) console.log(err);
                                    else {
                                      const parsedAnswerArray = JSON.parse(data);
                                      let finalAnswerString = "";
                                      console.log("Parsed answer array successfully");
                                      for (let i = 0; i < parsedAnswerArray.length; i++) {
                                        finalAnswerString += parsedAnswerArray[i];
                                      }
                                      console.log("Final answer assembled:", finalAnswerString);
                                      fs.writeFile(__dirname + "/../data/7-answer-file/answer-file.json", finalAnswerString, err => {
                                        if (err) console.log(err);
                                        else {
                                          console.log("Written final answer file successfully!");
                                          // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                          // Read the output file and return it to the mother function
                                          fs.readFile(__dirname + "/../data/7-answer-file/answer-file.json", (err, data) => {
                                            if (err) console.log(err);
                                            else {
                                              const finalAnswer = data.toString();
                                              console.log("FINAL ANSWER RETRIEVED FROM FILE:", finalAnswer);
                                              cb(null, finalAnswer);
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            });
                          }
                        });
                      }
                    });
                  });
                }
              });
            }
          });
        });
      }
    });
  });
};

module.exports = {
  monsterFunction
};
