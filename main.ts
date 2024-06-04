#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt([{
    type: "input", 
    name: "userInput",
    message: "Please Enter The Amount Of Seconds"
}]);

const input = +res.userInput; // Convert input to number using unary plus operator

function formatTime(seconds : number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTime(val : number) {
    const endTime = new Date(Date.now() + val * 1000);

    function updateTimer() {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(endTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Timer Has Expired");
            process.exit();
        }
        console.log(formatTime(timeDiff));
        const nextSecond = 1000 - (currentTime.getTime() % 1000);
        setTimeout(updateTimer, nextSecond); // Update timer with the remaining time till next second
    }

    updateTimer(); // Initial call to start the timer
}

startTime(input);